document.addEventListener('DOMContentLoaded', () => {
 /* ==========================================================
     Mobile Menu Toggle
     ========================================================== */
 const menuToggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('nav');

 if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

  nav.querySelectorAll('a').forEach((link) => {
   link.addEventListener('click', () => nav.classList.remove('active'));
  });
 }

 /* ==========================================================
     Typing Animation
     ========================================================== */
 const words = [
  'Software Developer',
  'Web Designer',
  'Backend Engineer',
  'Script Writer',
  'Freelancer',
 ];
 const typedTextSpan = document.getElementById('typed-text');

 if (typedTextSpan) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  const type = () => {
   const currentWord = words[wordIndex];
   typedTextSpan.textContent = currentWord.substring(0, charIndex);

   if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    delay = 100;
   } else if (isDeleting && charIndex > 0) {
    charIndex--;
    delay = 50;
   } else if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    delay = 2000;
   } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 500;
   }

   setTimeout(type, delay);
  };

  setTimeout(type, 1000);
 }

 /* ==========================================================
     Theme Toggle
     ========================================================== */
 const themeToggle = document.querySelector('.theme-toggle');
 const body = document.body;

 const applyTheme = (theme) => {
  body.classList.toggle('light-theme', theme === 'light');
  localStorage.setItem('theme', theme);
  updateIcon();
 };

 const updateIcon = () => {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  const isLight = body.classList.contains('light-theme');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
 };

 // Load theme preference
 const savedTheme = localStorage.getItem('theme');
 const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

 if (savedTheme) {
  applyTheme(savedTheme);
 } else {
  applyTheme(prefersDark ? 'dark' : 'light');
 }

 // Toggle theme on button click
 if (themeToggle) {
  themeToggle.addEventListener('click', () => {
   const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
   applyTheme(newTheme);
  });
 }
});
