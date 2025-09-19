// ===== main.js (menu + typing + theme + lightbox; modular & robust) =====

// --- Boot theme early to prevent FOUC (can live in this file if loaded with <script defer>) ---
(function bootTheme() {
  try {
    const saved = localStorage.getItem("theme"); // 'light' | 'dark' | 'auto'
    document.documentElement.setAttribute(
      "data-theme",
      (saved === "light" || saved === "dark" || saved === "auto") ? saved : "auto"
    );
  } catch (_) {
    document.documentElement.setAttribute("data-theme", "auto");
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  /* ========== Mobile menu ========== */
  (function mobileMenu(){
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    if (!menuToggle || !nav) return;

    nav.id ||= 'primary-nav';
    menuToggle.setAttribute('aria-controls', nav.id);
    menuToggle.setAttribute('aria-expanded', 'false');

    const closeMenu = () => {
      nav.classList.remove('active');
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('active');
      body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('active')) return;
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    }, { passive: true });
  })();

  /* ========== Typing effect ========== */
  (function typing(){
    const el = document.getElementById('typed-text');
    if (!el) return;

    const words = [
      'Software Developer',
      'Web Designer',
      'Backend Engineer',
      'Script Writer',
      'Freelancer',
    ];

    const force = el.closest('.typing-text')?.dataset.forceAnimate === 'true';
    const reducePref = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const useTyping = force || !reducePref;

    if (!useTyping) {
      let w = 0;
      el.textContent = words[w];
      let id = setInterval(() => {
        w = (w + 1) % words.length;
        el.textContent = words[w];
      }, 1800);
      const stop = () => { clearInterval(id); };
      window.addEventListener('beforeunload', stop);
      document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
      return;
    }

    let w = 0, c = 0, del = false, timerId = null;
    const schedule = (fn, ms) => { clearTimeout(timerId); timerId = setTimeout(fn, ms); };

    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);

      if (!del && c < word.length) { c++; schedule(tick, 95); }          // typing
      else if (del && c > 0)       { c--; schedule(tick, 45); }          // deleting
      else if (!del && c === word.length) { del = true; schedule(tick, 1400); } // pause
      else { del = false; w = (w + 1) % words.length; schedule(tick, 380); }
    };

    schedule(tick, 400);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(timerId);
      else schedule(tick, 300);
    });
    window.addEventListener('beforeunload', () => clearTimeout(timerId));
  })();

  /* ========== Theme toggle (animated & precise) ========== */
  (function themeToggle(){
    const root  = document.documentElement;
    const btn   = document.getElementById("themeButton");
    if (!btn) return console.warn("[theme-toggle] #themeButton not found.");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const getEffective = (mode) => mode === "auto" ? (media.matches ? "dark" : "light") : mode;

    const applyTheme = (mode) => {
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem("theme", mode); } catch(_) {}
      const effective = getEffective(mode);
      root.dataset.mode = effective;                  // 🔑 برای CSS (جای شست + آیکن)
      btn.setAttribute("aria-pressed", effective === "light" ? "true" : "false");
      root.style.colorScheme = effective;             // برای کنترل‌های سیستم
    };

    const saved = ["light","dark","auto"].includes(localStorage.getItem("theme"))
      ? localStorage.getItem("theme") : "auto";
    applyTheme(saved);

    const onMedia = () => { if ((localStorage.getItem("theme") || "auto") === "auto") applyTheme("auto"); };
    media.addEventListener?.("change", onMedia);
    media.addListener?.(onMedia); // fallback برای Safari قدیمی

    window.addEventListener("storage", (e) => {
      if (e.key === "theme" && ["light","dark","auto"].includes(e.newValue)) applyTheme(e.newValue);
    });

    // Click: toggle Light<->Dark ؛ Alt+Click ⇒ Auto
    btn.addEventListener("click", (ev) => {
      const current   = root.getAttribute("data-theme") || "auto";
      const effective = getEffective(current);
      const next = ev.altKey ? "auto" : (effective === "light" ? "dark" : "light");
      applyTheme(next);
    });

    // (اختیاری) شورتکات: Shift+D toggle ، Shift+A -> Auto
    document.addEventListener("keydown", (e) => {
      if (!e.shiftKey) return;
      if (e.code === "KeyD") {
        const eff = getEffective(root.getAttribute("data-theme") || "auto");
        applyTheme(eff === "light" ? "dark" : "light");
      } else if (e.code === "KeyA") {
        applyTheme("auto");
      }
    });
  })();

  /* ========== Portfolio Lightbox ========== */
  (function lightbox(){
    const body = document.body;
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox__panel" role="dialog" aria-modal="true" aria-label="Project preview">
          <button class="lightbox__close" aria-label="Close preview"><i class="fa-solid fa-xmark"></i></button>
          <div class="lightbox__img"><img alt=""></div>
          <div class="lightbox__details">
            <h3 class="lightbox__title"></h3>
            <p class="lightbox__desc"></p>
            <div class="lightbox__actions"></div>
          </div>
        </div>`;
      document.body.appendChild(lightbox);
    }

    const lbImg = lightbox.querySelector('.lightbox__img img');
    const lbTitle = lightbox.querySelector('.lightbox__title');
    const lbDesc = lightbox.querySelector('.lightbox__desc');
    const lbActions = lightbox.querySelector('.lightbox__actions');
    const lbClose = lightbox.querySelector('.lightbox__close');

    const openLB = (img) => {
      const card = img.closest('.portfolio-item');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbTitle.textContent = card?.querySelector('h3')?.textContent?.trim() || 'Project';
      lbDesc.textContent = card?.querySelector('p')?.textContent?.trim() || '';
      const href = card?.querySelector('a.btn')?.getAttribute('href');
      lbActions.innerHTML = href ? `<a class="btn" href="${href}" target="_blank" rel="noopener">View Project</a>` : '';
      lightbox.classList.add('open');
      body.classList.add('modal-open');
    };
    const closeLB = () => {
      lightbox.classList.remove('open');
      body.classList.remove('modal-open');
      lbImg.src = '';
    };

    document.addEventListener('click', (e) => {
      const img = e.target.closest('.portfolio-item img');
      if (img) { e.preventDefault(); openLB(img); }
    });
    lbClose?.addEventListener('click', closeLB);
    lightbox.addEventListener('click', (e) => { if (!e.target.closest('.lightbox__panel')) closeLB(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLB(); });
  })();
});
