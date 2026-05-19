const nodemailer = require('nodemailer');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
   Personal site: 5 submissions per IP per hour is more than enough.            */
const ipRequests = new Map();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

function sanitize(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit by IP
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail  = process.env.CONTACT_TO_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass || !toEmail) {
    return res.status(500).json({ error: 'Contact mail is not configured.' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid request body.' });
    }
  }

  // Honeypot — bots fill this hidden field, humans don't
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const name         = sanitize(body.name, 120);
  const email        = sanitize(body.email, 180);
  const organisation = sanitize(body.organisation, 160);
  const purpose      = sanitize(body.purpose, 120);
  const message      = sanitize(body.message, 4000);

  if (!name || !email || !message || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid name, email, and message.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from:    `"Website Contact" <${smtpUser}>`,
      to:      toEmail,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Website contact: ${purpose || 'General enquiry'}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organisation: ${organisation || '-'}`,
        `Purpose: ${purpose || '-'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <h2>New website contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisation || '-')}</p>
        <p><strong>Purpose:</strong> ${escapeHtml(purpose || '-')}</p>
        <hr>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact mail error:', err?.message || err);
    return res.status(500).json({ error: 'Unable to send your message right now. Please try again.' });
  }
};
