(() => {
  if (!window.HTMLDialogElement) return;
  const letters = document.querySelectorAll('.testimonial-letter');
  if (!letters.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'testimonial-dialog';
  dialog.setAttribute('aria-labelledby', 'testimonial-dialog-title');
  dialog.innerHTML = '<div class="testimonial-dialog-header"><div><p class="eyebrow">Client perspective</p><h2 id="testimonial-dialog-title"></h2></div><button class="testimonial-dialog-close" type="button" aria-label="Close testimonial">×</button></div><div class="testimonial-dialog-content" tabindex="0" aria-label="Full testimonial"></div>';
  document.body.append(dialog);
  const content = dialog.querySelector('.testimonial-dialog-content');
  let trigger;
  let oldOverflow;
  letters.forEach(letter => {
    const card = letter.closest('.testimonial-card');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'testimonial-open';
    button.textContent = 'Read full testimonial';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', 'Read full testimonial from ' + card.querySelector('.testimonial-author strong').textContent);
    const copy = letter.querySelector('.testimonial-copy').cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'testimonial-letter';
    wrapper.append(button);
    letter.replaceWith(wrapper);
    button.addEventListener('click', () => {
      trigger = button;
      dialog.querySelector('h2').textContent = card.querySelector('.testimonial-author strong').textContent;
      content.replaceChildren(card.querySelector('.testimonial-author').cloneNode(true), copy.cloneNode(true));
      oldOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      content.scrollTop = 0;
      dialog.querySelector('button').focus({ preventScroll: true });
    });
  });
  dialog.querySelector('.testimonial-dialog-close').addEventListener('click', () => dialog.close());
  let backdropDown = false;
  const outside = event => {
    const r = dialog.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  };
  dialog.addEventListener('pointerdown', event => { backdropDown = outside(event); });
  dialog.addEventListener('click', event => { if (backdropDown && outside(event)) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    trigger?.focus({ preventScroll: true });
  });
})();
