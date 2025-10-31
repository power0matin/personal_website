// form-handler.js — EN, with validation + toast + no redirect
document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('contact-form');
  if (!form) return; // form not found => nothing to do

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const msgEl     = document.getElementById('message');
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl  = document.getElementById('form-status');
  const toastHost = document.getElementById('toastHost');
  const ENDPOINT  = 'https://formspree.io/f/mzzkjnvo';

  // --- Toast
  const TOAST = (message, type = 'success', timeout = 4000) => {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.setAttribute('role', type === 'success' ? 'status' : 'alert');
    t.innerHTML = `
      <i class="${type==='success'?'fa-regular fa-circle-check':'fa-solid fa-triangle-exclamation'}" aria-hidden="true"></i>
      <span>${message}</span>
      <i class="close fa-solid fa-xmark" tabindex="0" aria-label="Close"></i>`;
    toastHost.appendChild(t);
    requestAnimationFrame(() => t.classList.add('toast--show'));

    let timer = setTimeout(leave, timeout);
    t.addEventListener('mouseenter', () => { clearTimeout(timer); timer = null; });
    t.addEventListener('mouseleave', () => { if (!t._leaving && !timer) timer = setTimeout(leave, 1200); });
    t.querySelector('.close').addEventListener('click', leave);
    t.addEventListener('keydown', e => { if (e.key === 'Escape') leave(); });

    function leave() {
      if (t._leaving) return;
      t._leaving = true;
      t.classList.remove('toast--show');
      t.classList.add('toast--leaving');
      t.addEventListener('transitionend', onFadeDone, { once: true });
    }
    function onFadeDone(ev) {
      if (ev.propertyName !== 'opacity' && ev.propertyName !== 'transform') return;
      const cs = getComputedStyle(t), h = t.offsetHeight;
      Object.assign(t.style, {
        height: h + 'px',
        marginTop: cs.marginTop, marginBottom: cs.marginBottom,
        paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom,
        borderTopWidth: cs.borderTopWidth, borderBottomWidth: cs.borderBottomWidth
      });
      t.classList.add('toast--collapse');
      requestAnimationFrame(() => {
        Object.assign(t.style, {
          height: '0px', marginTop: '0px', marginBottom: '0px',
          paddingTop: '0px', paddingBottom: '0px',
          borderTopWidth: '0px', borderBottomWidth: '0px'
        });
      });
      t.addEventListener('transitionend', e2 => { if (e2.propertyName === 'height') t.remove(); }, { once: true });
    }
  };

  // --- Validation
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const setInvalid = (el, bad) => {
    el.classList.toggle('invalid', !!bad);
    el.setAttribute('aria-invalid', String(!!bad));
  };
  function validate() {
    const badName  = (nameEl.value.trim().length < 2);
    const badEmail = !isEmail(emailEl.value.trim());
    const badMsg   = (msgEl.value.trim().length < 10);

    setInvalid(nameEl,  badName);
    setInvalid(emailEl, badEmail);
    setInvalid(msgEl,   badMsg);

    if (badName)  nameEl.focus();
    if (!badName && badEmail) emailEl.focus();
    if (!badName && !badEmail && badMsg) msgEl.focus();

    return !(badName || badEmail || badMsg);
  }
  [nameEl, emailEl, msgEl].forEach(el => el.addEventListener('input', () => el.classList.remove('invalid')));

  // --- Submit (AJAX)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();               // ← جلوگیری از ریدایرکت
    e.stopPropagation();

    if (!validate()) {
      TOAST('Please fix the highlighted fields.', 'error');
      statusEl.textContent = 'Please fix the highlighted fields.';
      return false;                  // ← برای اطمینان
    }

    // Honeypot
    const hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) return false;

    try {
      submitBtn.setAttribute('data-loading', 'true');
      form.setAttribute('aria-busy', 'true');
      statusEl.textContent = '';

      const fd = new FormData(form);
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });

      if (res.ok) {
        form.reset();
        TOAST('Your message has been sent. Thank you! ✅', 'success');
        statusEl.textContent = 'Your message has been sent.';
      } else {
        let msg = 'Failed to send. Please try again.';
        try {
          const data = await res.json();
          if (data?.errors?.length) msg = data.errors.map(e => e.message).join(' • ');
        } catch {}
        TOAST(msg, 'error');
        statusEl.textContent = msg;
      }
    } catch {
      TOAST('Network error. Please try again later.', 'error');
      statusEl.textContent = 'Network error.';
    } finally {
      submitBtn.setAttribute('data-loading', 'false');
      form.setAttribute('aria-busy', 'false');
    }

    return false;                     // ← ایمنی مضاعف
  });
});
