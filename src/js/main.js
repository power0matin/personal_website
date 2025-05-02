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

document.addEventListener("DOMContentLoaded", () => {
    const portfolioItems = document.querySelectorAll(".portfolio-item img");
    const modal = document.createElement("div");
    modal.classList.add("portfolio-modal");

    modal.innerHTML = `
        <div class="portfolio-modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Portfolio Image">
            <div class="modal-text">
                <h3></h3>
                <p></p>
                <a href="#" class="btn">View Project</a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const modalImage = modal.querySelector("img");
    const modalTitle = modal.querySelector("h3");
    const modalDescription = modal.querySelector("p");
    const modalLink = modal.querySelector(".btn");
    const closeModal = modal.querySelector(".close-modal");

    portfolioItems.forEach(item => {
        item.addEventListener("click", (e) => {
            const parent = e.target.closest(".portfolio-item");
            const title = parent.querySelector("h3").textContent;
            const description = parent.querySelector("p").textContent;
            const link = parent.querySelector("a").href;

            modalImage.src = e.target.src;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalLink.href = link;

            modal.classList.add("active");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});
