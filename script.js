/* ============================================
   MUHAMMAD SHAHBAZ PORTFOLIO — SCRIPT.JS
   Dark & Futuristic Theme
   ============================================ */

/* ===== ANIMATED BACKGROUND CANVAS ===== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1
    });
  }
}

initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw particles
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}

animateTrail();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .edu-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'rgba(0, 245, 255, 0.4)';
    trail.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = '#00f5ff';
    trail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

/* ===== NAVBAR SCROLL & ACTIVE LINK ===== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Navbar style
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ===== TYPING ANIMATION ===== */
const roles = [
  'Data Analyst',
  'eCommerce Expert',
  'Power BI Developer',
  'Business Intelligence',
  'Dashboard Creator'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Trigger skill bars
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== SKILL BAR OBSERVER ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') + '%';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + (target >= 10 ? '+' : '');
    if (count >= target) clearInterval(timer);
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        animateCounter(num, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) counterObserver.observe(aboutSection);

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('send-btn');
    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'block';
      btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== GLITCH TITLE EFFECT (subtle) ===== */
function glitchEffect() {
  const name = document.querySelector('.line2');
  if (!name) return;
  const original = name.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  let iterations = 0;
  const maxIter = original.length * 3;

  const interval = setInterval(() => {
    name.textContent = original.split('').map((char, i) => {
      if (i < iterations / 3) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    iterations++;
    if (iterations > maxIter) {
      clearInterval(interval);
      name.textContent = original;
    }
  }, 30);
}

// Trigger glitch on hover of hero name
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    glitchEffect();
  });
}

/* ===== PAGE LOAD ANIMATION ===== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

/* ===== PROFILE IMAGE FALLBACK ===== */
const profileImg = document.getElementById('profile-img');
const profilePlaceholder = document.getElementById('profile-placeholder');

if (profileImg) {
  profileImg.addEventListener('load', () => {
    profilePlaceholder.style.display = 'none';
    profileImg.style.display = 'block';
  });

  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    profilePlaceholder.style.display = 'flex';
  });
}
