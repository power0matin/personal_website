document.addEventListener('DOMContentLoaded', () => {
 // Mobile menu toggle
 const menuToggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('nav');

 menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
 });

 // Close menu when a link is clicked
 nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
   nav.classList.remove('active');
  });
 });

 // Typing animation
 const words = [
  'Software Developer',
  'Web Designer',
  'Backend Engineer',
  'Script Writer',
  'Freelancer',
 ];
 const typedTextSpan = document.getElementById('typed-text');

 if (typedTextSpan) {
  // Check if element exists (only on index.html)
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
   const currentWord = words[wordIndex];
   const currentText = currentWord.substring(0, charIndex);
   typedTextSpan.textContent = currentText;

   if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    delay = 100;
   } else if (isDeleting && charIndex > 0) {
    charIndex--;
    delay = 50;
   } else if (!isDeleting && charIndex === currentWord.length) {
    delay = 2000;
    isDeleting = true;
   } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 500;
   }

   setTimeout(type, delay);
  }

  setTimeout(type, 1000);
 }

 // Theme toggle
 const themeToggle = document.querySelector('.theme-toggle');
 const body = document.body;

 // Check system preference and localStorage
 const savedTheme = localStorage.getItem('theme');
 const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

 if (savedTheme) {
  body.classList.toggle('light-theme', savedTheme === 'light');
 } else if (prefersDark) {
  body.classList.remove('light-theme');
 } else {
  body.classList.add('light-theme');
 }

 // Update icon based on current theme
 const updateIcon = () => {
  const isLight = body.classList.contains('light-theme');
  themeToggle.querySelector('i').classList.toggle('fa-moon', !isLight);
  themeToggle.querySelector('i').classList.toggle('fa-sun', isLight);
 };
 updateIcon();

 // Toggle theme on button click
 themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateIcon();
 });
});
