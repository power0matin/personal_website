(() => {
  // مقدار فعلی تم از localStorage
  const theme = localStorage.getItem('theme');

  // اگر ذخیره شده بود، همون رو اعمال کن
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else if (theme === 'light') document.documentElement.classList.remove('dark');
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.add('dark');

  // شنود برای تغییر دستی تم (در هر سایتی)
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  });

  // تابع تغییر تم
  window.toggleTheme = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
})();
