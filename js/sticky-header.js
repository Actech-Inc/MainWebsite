// Preserve the original header's space so the intro threshold never shifts.
(() => {
  const header = document.querySelector('.site-header');
  const intro = document.querySelector('.cap-intro, .home-page .hero');
  if (!header || !intro) return;
  document.body.classList.add('has-scroll-header');
  const slot = document.createElement('div');
  header.before(slot);
  slot.append(header);
  let pending = false;
  let exitAnimation = null;
  const cancelExit = () => {
    exitAnimation?.cancel();
    exitAnimation = null;
  };
  const update = () => {
    pending = false;
    if (!header.classList.contains('is-sticky')) {
      slot.style.minHeight = (document.body.classList.contains('home-page') || document.body.classList.contains('project-example-v2-page'))
        ? '0px' : `${header.offsetHeight}px`;
    }
    const sticky = intro.getBoundingClientRect().bottom <= 0;
    if (sticky) cancelExit();
    if (sticky === header.classList.contains('is-sticky') || exitAnimation) return;
    header.querySelectorAll('details[open]').forEach(menu => { menu.open = false; });
    header.querySelector('#navigation')?.classList.remove('is-open');
    header.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    if (sticky || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      header.classList.toggle('is-sticky', sticky);
      return;
    }
    exitAnimation = header.animate([
      { transform: getComputedStyle(header).transform, opacity: 1 },
      { transform: 'translateY(-100%)', opacity: 0 }
    ], { duration: 600, easing: 'ease-in', fill: 'forwards' });
    exitAnimation.onfinish = () => {
      header.classList.remove('is-sticky');
      cancelExit();
    };
  };
  const schedule = () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => {
    cancelExit();
    header.classList.remove('is-sticky');
    slot.style.minHeight = '';
    update();
  });
  window.addEventListener('pageshow', schedule);
  new ResizeObserver(schedule).observe(intro);
  update();
})();
