/* NPRD site behaviors: nav toggle, smooth-scroll, fade-in observer, form */
(function () {
  // Mark JS-enabled (this is what activates .fade-in initial opacity:0 in CSS)
  document.documentElement.classList.add('js-on');

  // -------- Mobile nav --------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
      });
    });
  }

  // -------- Fade-in on scroll --------
  const els = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('is-visible'));
  }

  // -------- Smooth anchor scroll with header offset --------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // -------- Contact form: submit to Formspree via fetch, no page redirect --------
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = document.querySelector('#form-success');
      const errorEl = document.querySelector('#form-error');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.setAttribute('disabled', 'disabled');
      if (errorEl) errorEl.classList.remove('is-visible');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            if (success) {
              success.classList.add('is-visible');
              form.querySelectorAll('input, textarea, select, button').forEach(el => el.setAttribute('disabled', 'disabled'));
              success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            throw new Error('Formspree response not ok');
          }
        })
        .catch(() => {
          if (submitBtn) submitBtn.removeAttribute('disabled');
          if (errorEl) {
            errorEl.classList.add('is-visible');
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            alert('送信に失敗しました。お手数ですが、しばらくしてから再度お試しください。');
          }
        });
    });
  }
})();
