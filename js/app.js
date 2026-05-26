const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const revealElements = document.querySelectorAll('.reveal');

// Header scroll effect and back-to-top button
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('show', window.scrollY > 500);
  setActiveLink();
});

// Mobile menu
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = menuBtn.querySelector('i');
  icon.className = navMenu.classList.contains('open') ? 'ri-close-line' : 'ri-menu-3-line';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuBtn.querySelector('i').className = 'ri-menu-3-line';
  });
});

// Active nav link while scrolling
function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Portfolio filter
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.dataset.filter;

    portfolioCards.forEach((card) => {
      const category = card.dataset.category;
      if (filterValue === 'all' || filterValue === category) {
        card.classList.remove('hide-card');
      } else {
        card.classList.add('hide-card');
      }
    });
  });
});

// Theme toggle with localStorage
const savedTheme = localStorage.getItem('rezume-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.querySelector('i').className = 'ri-sun-line';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.querySelector('i').className = isLight ? 'ri-sun-line' : 'ri-moon-line';
  localStorage.setItem('rezume-theme', isLight ? 'light' : 'dark');
});

// Contact form demo message
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Your message has been prepared. Connect backend/email service to send it.';
  contactForm.reset();
});

// Back to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealElements.forEach((element) => observer.observe(element));

setActiveLink();
