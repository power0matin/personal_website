// document.addEventListener('DOMContentLoaded', function () {
//     const toggle = document.getElementById('theme-toggle');
//     const body = document.body;
//     const thumb = document.querySelector('.toggle-thumb');
  
//     // بارگذاری تم ذخیره شده
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       body.classList.add(savedTheme);
//     } else {
//       body.classList.add('light-mode');
//     }
  
//     // وضعیت اولیه موقعیت thumb
//     updateThumbPosition();
  
//     toggle.addEventListener('click', () => {
//       if (body.classList.contains('dark-mode')) {
//         body.classList.replace('dark-mode', 'light-mode');
//         localStorage.setItem('theme', 'light-mode');
//       } else {
//         body.classList.replace('light-mode', 'dark-mode');
//         localStorage.setItem('theme', 'dark-mode');
//       }
  
//       updateThumbPosition();
//     });
  
//     function updateThumbPosition() {
//       if (body.classList.contains('dark-mode')) {
//         thumb.style.left = '33px';
//       } else {
//         thumb.style.left = '3px';
//       }
//     }
//   });
// const toggleButton = document.querySelector(".toggle-button"); // گرفتن دکمه
// const body = document.body; // گرفتن تگ body

// toggleButton.addEventListener("click", function() {
//     body.classList.toggle("dark-mode"); // تغییر حالت دارک مود
// });
