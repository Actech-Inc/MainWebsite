const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  document.documentElement.classList.add('js-ready');
  const mobile = window.matchMedia('(max-width: 760px)');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };
  const syncMenu = () => { toggle.hidden = !mobile.matches; closeMenu(); };
  syncMenu();
  mobile.addEventListener('change', syncMenu);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu(); toggle.focus();
    }
  });
}

const subject = 'Design review request';
document.querySelectorAll('.cap-menu').forEach(menu => {
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let closeTimer;
  menu.addEventListener('mouseenter', () => {
    if (!hoverPointer.matches) return;
    clearTimeout(closeTimer);
    document.querySelectorAll('.cap-menu').forEach(other => {
      if (other !== menu) other.open = false;
    });
    menu.open = true;
  });
  menu.addEventListener('mouseleave', () => {
    if (!hoverPointer.matches) return;
    closeTimer = setTimeout(() => { menu.open = false; }, 200);
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
});
const body = 'Hello Actech,\n\nI would like to discuss a manufacturing project.\n\nProject / part description:\nMaterials and finishes:\nEstimated quantities:\nTarget timing:\nSpecial requirements:\n\nI will attach the relevant drawings or CAD files.\n\nName / company:\n';
document.querySelectorAll('.email-link').forEach(link => {
  link.href = `mailto:info@actech-inc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Manual product galleries: arrows, dot navigation and keyboard controls.
document.querySelectorAll('.product-gallery').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const dots = [...gallery.querySelectorAll('.gallery-dot')];
  let current = 0;
  let switching = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fade = async (slide, from, to) => {
    if (reducedMotion.matches || !slide.animate) return;
    const animation = slide.animate([{ opacity: from }, { opacity: to }],
      { duration: 200, easing: 'ease-in-out', fill: 'forwards' });
    try { await animation.finished; } catch (_) { /* A cancelled animation still releases the gallery. */ }
    animation.cancel();
  };
  const show = async index => {
    const next = (index + slides.length) % slides.length;
    if (switching || next === current) return;
    switching = true;
    gallery.setAttribute('aria-busy', 'true');
    try {
      const image = slides[next].querySelector('img');
      // Hidden lazy-loaded images may never start decoding until shown.
      // Request loading without blocking the slide change on decode().
      if (image) image.loading = 'eager';
      await fade(slides[current], 1, 0);
      current = next;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    gallery.querySelector('.gallery-status').textContent = `Photo ${current + 1} of ${slides.length}: ${slides[current].querySelector('figcaption').textContent}`;
      await fade(slides[current], 0, 1);
    } finally {
      switching = false;
      gallery.removeAttribute('aria-busy');
    }
  };
  gallery.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
});
