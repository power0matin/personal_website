document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Close menu when a link is clicked
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
});
const words = ["Software Developer", "Web Designer", "Backend Engineer", "Script Writer", "Freelancer"];
const typedTextSpan = document.getElementById("typed-text");

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

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});
