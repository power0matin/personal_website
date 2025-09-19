// ===== main.js (typing fix + modal + small nav tweaks) =====
document.addEventListener('DOMContentLoaded', () => {
  /* Mobile menu */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;

  const closeMenu = () => {
    nav?.classList.remove('active');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && nav) {
    nav.id ||= 'primary-nav';
    menuToggle.setAttribute('aria-controls', nav.id);
    menuToggle.setAttribute('aria-expanded', 'false');

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
    });
  }
  /* Typing effect — supports force-animate via data attribute */
  (() => {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const words = [
      'Software Developer',
      'Web Designer',
      'Backend Engineer',
      'Script Writer',
      'Freelancer',
    ];

    // آیا انیمیشن را به‌اجبار می‌خواهیم؟
    const force = el.closest('.typing-text')?.dataset.forceAnimate === 'true';

    // اگر کاربر reduced-motion دارد ولی ما force نکرده‌ایم، فقط چرخش بدون تایپ
    const reducePref = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const useTyping = force || !reducePref;

    if (!useTyping) {
      let w = 0;
      el.textContent = words[w];
      let id = setInterval(() => {
        w = (w + 1) % words.length;
        el.textContent = words[w];
      }, 1800);
      window.addEventListener('beforeunload', () => clearInterval(id));
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(id);
      });
      return;
    }

    // مسیر تایپی
    let w = 0, c = 0, del = false, timerId = null;

    const schedule = (fn, ms) => { clearTimeout(timerId); timerId = setTimeout(fn, ms); };

    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);

      if (!del && c < word.length) {
        c++; schedule(tick, 95);           // تایپ
      } else if (del && c > 0) {
        c--; schedule(tick, 45);           // پاک‌کردن
      } else if (!del && c === word.length) {
        del = true; schedule(tick, 1400);  // مکث روی کلمه کامل
      } else {
        del = false;
        w = (w + 1) % words.length;        // کلمه بعدی
        schedule(tick, 380);
      }
    };

    schedule(tick, 400);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(timerId);
      else schedule(tick, 300);
    });

    window.addEventListener('beforeunload', () => clearTimeout(timerId));
  })();

  /* Theme toggle */
  const themeToggle = document.querySelector('.theme-toggle');
  const icon = themeToggle ? themeToggle.querySelector('i') : null;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = (mode) => {
    if (mode === 'light') body.classList.add('light-theme');
    else body.classList.remove('light-theme');
    if (icon) icon.className = body.classList.contains('light-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') apply(saved); else apply(media.matches ? 'dark' : 'light');
  media.addEventListener?.('change', e => { if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light'); });
  themeToggle?.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    const mode = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
    apply(mode);
  });

  /* Portfolio Lightbox (blurred backdrop + animated panel) */
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
});
