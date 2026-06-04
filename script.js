/* ===================================================
   Şegra Pure Life — Etkileşimler
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobil menü --- */
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Menü linkine tıklayınca kapat
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Header gölge / back-to-top --- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 12);
    backToTop?.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal animasyonları (IntersectionObserver) --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* --- Görsel yedekleri: gerçek görsel yüklenince emojiyi gizle --- */
  document.querySelectorAll('.img-fill, .img-contain').forEach(img => {
    const markLoaded = () => img.parentElement?.classList.add('has-img');
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
    }
  });

  /* --- Yıl --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
