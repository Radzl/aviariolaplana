/* =========================================
   AVIARIO LA PLANA — JavaScript
   Navbar scroll, reveal animations, form
   ========================================= */

'use strict';

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK on scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, { passive: true });

// ===== CONTACT FORM (mailto) =====
const CONTACT_EMAIL = 'luisgarciallansola@aviariolaplana.es';
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre  = form.nombre.value.trim();
    const email   = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const especieSelect = form.especie;
    const especie = especieSelect.value
      ? especieSelect.options[especieSelect.selectedIndex].text
      : 'No indicada';

    if (!nombre || !email || !mensaje) {
      showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage('Por favor, introduce un correo electrónico válido.', 'error');
      return;
    }

    const subject = encodeURIComponent('Consulta web — Aviario La Plana');
    const body = encodeURIComponent(
      `Nombre: ${nombre}\n` +
      `Email de contacto: ${email}\n` +
      `Especie de interés: ${especie}\n\n` +
      `Mensaje:\n${mensaje}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    showFormMessage(
      'Se abrirá tu programa de correo con el mensaje preparado. Revisa y pulsa enviar para completar el contacto.',
      'success'
    );
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = `form-message form-message--${type}`;
  msg.textContent = text;
  msg.style.cssText = `
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
    font-size: 0.88rem;
    line-height: 1.6;
    border-left: 3px solid ${type === 'success' ? '#4a7c45' : '#c0392b'};
    background: ${type === 'success' ? 'rgba(74,124,69,0.08)' : 'rgba(192,57,43,0.08)'};
    color: ${type === 'success' ? '#2d4a29' : '#922b21'};
  `;

  const btn = form.querySelector('button[type="submit"]');
  form.insertBefore(msg, btn);

  setTimeout(() => msg.remove(), 6000);
}

// ===== GALLERY hover effect =====
document.querySelectorAll('.galeria-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.zIndex = '2';
  });
  item.addEventListener('mouseleave', () => {
    item.style.zIndex = '';
  });
});

// ===== Parallax subtle on hero =====
const heroBg = document.querySelector('.hero-img-placeholder');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ===== Nav toggle animation =====
navToggle.addEventListener('click', function () {
  const spans = this.querySelectorAll('span');
  if (this.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
