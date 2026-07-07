// script.js
document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('site-header');
  const headerHeight = header ? header.offsetHeight : 80;

  // Header dynamic opacity on scroll
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Smooth scroll for navigation links (local anchor links only)
  const navLinks = document.querySelectorAll('nav a, .hero-cta, .cta-button');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Interactive Teacher switcher logic
  const teacherCards = document.querySelectorAll('.teacher-small-card');
  const teacherDetails = document.querySelectorAll('.teacher-detail-content');

  if (teacherCards.length > 0 && teacherDetails.length > 0) {
    teacherCards.forEach(function (card) {
      card.addEventListener('click', function () {
        // Remove active state from all cards
        teacherCards.forEach(function (c) {
          c.classList.remove('active');
        });
        // Add active state to clicked card
        this.classList.add('active');

        // Hide all teacher details
        teacherDetails.forEach(function (detail) {
          detail.classList.remove('active');
        });

        // Show the details of the selected teacher
        const teacherKey = this.getAttribute('data-teacher');
        const targetDetail = document.getElementById('prof-' + teacherKey);
        if (targetDetail) {
          targetDetail.classList.add('active');
        }
      });
    });
  }
});
