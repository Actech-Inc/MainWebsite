document.querySelectorAll('.case-carousel').forEach(track => {
  const controls = track.previousElementSibling;
  if (!controls?.matches('.case-carousel-controls')) return;
  const move = direction => {
    const cards = [...track.children];
    if (track.scrollWidth <= track.clientWidth + 2) {
      if (direction > 0) track.append(cards[0]);
      else track.prepend(cards[cards.length - 1]);
    } else {
      const step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
      const end = track.scrollWidth - track.clientWidth;
      const start = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const target = direction > 0
        ? (track.scrollLeft >= end - 2 ? 0 : Math.min(end, track.scrollLeft + step))
        : (track.scrollLeft <= start + 2 ? end : Math.max(0, track.scrollLeft - step));
      track.scrollTo({left:target, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  };
  controls.querySelector('.case-prev').addEventListener('click', () => move(-1));
  controls.querySelector('.case-next').addEventListener('click', () => move(1));
});
