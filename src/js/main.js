// ===== main.js =====
// Mobile nav, typing effect, theme toggle (Font Awesome icons)

document.addEventListener('DOMContentLoaded', () => {
  // ------- Mobile Menu -------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;

  const closeMenu = () => {
    nav?.classList.remove('active');
    body.classList.remove('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
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

  // ------- Typing Effect (only if #typed-text exists) -------
  const typedTextSpan = document.getElementById('typed-text');
  const words = [
    'Software Developer',
    'Web Designer',
    'Backend Engineer',
    'Script Writer',
    'Freelancer',
  ];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedTextSpan) {
    if (prefersReducedMotion) {
      typedTextSpan.textContent = words[0];
    } else {
      let w = 0, c = 0, del = false, timer;
      const loop = () => {
        const word = words[w];
        typedTextSpan.textContent = word.slice(0, c);

        if (!del && c < word.length) c++;
        else if (del && c > 0) c--;
        else if (!del && c === word.length) { del = true; return timer = setTimeout(loop, 1400); }
        else { del = false; w = (w + 1) % words.length; }

        timer = setTimeout(loop, del ? 55 : 110);
      };
      timer = setTimeout(loop, 500);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearTimeout(timer);
        else { clearTimeout(timer); timer = setTimeout(loop, 300); }
      });
    }
  }

  // ------- Theme Toggle -------
  const themeToggle = document.querySelector('.theme-toggle');
  const icon = themeToggle ? themeToggle.querySelector('i') : null;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (mode) => {
    if (mode === 'light') body.classList.add('light-theme');
    else body.classList.remove('light-theme');

    if (icon) icon.className = body.classList.contains('light-theme')
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  };

  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') applyTheme(saved);
  else applyTheme(media.matches ? 'dark' : 'light');

  const onSystemChange = (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  };
  media.addEventListener?.('change', onSystemChange);

  themeToggle?.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    const mode = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
    applyTheme(mode);
  });
});
