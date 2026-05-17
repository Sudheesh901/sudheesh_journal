/* ════════════════════════════════════════
   SPA NAVIGATION
════════════════════════════════════════ */
const pages = ['home','experience','ds','recsys','nlp','mlops','cloud','sysdesign','interview','collab','contact'];

function showPage(id) {
  pages.forEach(p => {
    const el = document.getElementById('page-'+p);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById('page-'+id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  // close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
}

function scrollToSection(sectionId) {
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ════════════════════════════════════════
   TABS
════════════════════════════════════════ */
function switchTab(tabId, pageCtx) {
  const container = document.getElementById('page-'+pageCtx);
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const pane = document.getElementById(tabId);
  if (pane) pane.classList.add('active');
  // Activate corresponding button
  container.querySelectorAll('.tab-btn').forEach(b => {
    if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(tabId)) {
      b.classList.add('active');
    }
  });
}

/* ════════════════════════════════════════
   ACCORDION
════════════════════════════════════════ */
function toggleAcc(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  document.querySelectorAll('.acc-head').forEach(h => {
    h.classList.remove('open');
    if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    header.classList.add('open');
    if (body) body.classList.add('open');
  }
}

/* ════════════════════════════════════════
   NAV SCROLL SHADOW
════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

/* ════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════ */
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('burger');
  const isOpen = links.classList.contains('open');
  links.classList.toggle('open');
  burger.classList.toggle('open');
  // Prevent body scroll when menu open on mobile
  document.body.style.overflow = isOpen ? '' : '';
}

/* ════════════════════════════════════════
   FORM SUBMISSIONS
════════════════════════════════════════ */
function submitRequest() {
  const name = document.querySelector('#reqForm .form-input').value.trim();
  if (!name) { alert('Please fill in your name.'); return; }
  document.getElementById('reqSuccess').style.display = 'block';
  document.querySelector('#reqForm .btn-primary').style.display = 'none';
}

async function submitContact() {
  const btn = document.getElementById('contactSubmitBtn');
  const error = document.getElementById('contactError');
  const payload = {
    name: document.getElementById('cf-name').value.trim(),
    email: document.getElementById('cf-email').value.trim(),
    organisation: document.getElementById('cf-org').value.trim(),
    purpose: document.getElementById('cf-purpose').value.trim(),
    message: document.getElementById('cf-msg').value.trim(),
    website: document.getElementById('cf-website').value.trim()
  };

  error.classList.remove('show');
  error.textContent = '';

  if (!payload.name || !payload.email || !payload.message) {
    error.textContent = 'Please fill in your name, email, and message.';
    error.classList.add('show');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Unable to send your message right now.');
    document.getElementById('contactFormWrap').style.display = 'none';
    document.getElementById('contactSuccess').classList.add('show');
  } catch (err) {
    error.textContent = err.message || 'Unable to send your message right now.';
    error.classList.add('show');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
}

/* ════════════════════════════════════════
   SCROLL ANIMATIONS (IntersectionObserver)
════════════════════════════════════════ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.expertise-card, .topic-card, .iq-card, .collab-item, .exp-pub-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity 0.4s ease ${(i % 6) * 0.06}s, transform 0.4s ease ${(i % 6) * 0.06}s`;
  io.observe(el);
});
