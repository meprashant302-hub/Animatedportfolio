/* ═══════════════════════════════════════
   PRASHANT MISHRA — PORTFOLIO JS
═══════════════════════════════════════ */

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ── THEME TOGGLE (dark <-> light) ── */
const themeBtn = document.getElementById('themeBtn');
const rootEl = document.documentElement;

/* Restore saved theme (falls back to whatever data-theme is already set in the HTML) */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  rootEl.setAttribute('data-theme', savedTheme);
}

themeBtn.addEventListener('click', () => {
  const isLight = rootEl.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  rootEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains('reveal'));
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), idx * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

/* ── STICKY NAV SHADOW ON SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) navbar.style.boxShadow = '0 8px 30px -10px rgba(0,0,0,0.5)';
  else navbar.style.boxShadow = 'none';
});

/* ── CONTACT FORM -> MAILTO ── */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:prashantmishr302@gmail.com?subject=${subject}&body=${body}`;
});
