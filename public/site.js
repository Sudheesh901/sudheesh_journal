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
  if (!links || !burger) return;
  const willOpen = !links.classList.contains('open');
  links.classList.toggle('open', willOpen);
  burger.classList.toggle('open', willOpen);
  burger.setAttribute('aria-expanded', String(willOpen));
  document.body.style.overflow = willOpen ? 'hidden' : '';
  if (!willOpen) closeMobileSubmenus();
}

function closeMobileSubmenus() {
  document.querySelectorAll('.nav-item--submenu-open').forEach(item => {
    item.classList.remove('nav-item--submenu-open');
    const trigger = item.querySelector('.nav-link[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

function closeMobileMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('burger');
  if (links) links.classList.remove('open');
  if (burger) {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
  closeMobileSubmenus();
}

function initMobileNav() {
  const burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-item--has-dropdown > .nav-link').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (!window.matchMedia('(max-width: 1100px)').matches) return;
      const links = document.getElementById('navLinks');
      if (!links || !links.classList.contains('open')) return;
      event.preventDefault();

      const item = trigger.closest('.nav-item');
      const shouldOpen = !item.classList.contains('nav-item--submenu-open');
      closeMobileSubmenus();
      item.classList.toggle('nav-item--submenu-open', shouldOpen);
      trigger.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.querySelectorAll('#navLinks a').forEach(link => {
    if (link.closest('.nav-item--has-dropdown') && link.classList.contains('nav-link')) return;
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1100px)').matches) closeMobileMenu();
    });
  });
}

window.addEventListener('resize', () => {
  if (!window.matchMedia('(max-width: 1100px)').matches) closeMobileMenu();
});

window.toggleMenu = toggleMenu;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
  initMobileNav();
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
