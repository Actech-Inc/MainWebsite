(() => {
  if (!window.HTMLDialogElement) return;
  const sections = document.querySelectorAll('.cap-technical, .process-card > details');
  if (!sections.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'technical-dialog';
  dialog.setAttribute('aria-labelledby', 'technical-dialog-title');
  dialog.innerHTML = '<div class="technical-dialog-header"><div><p class="eyebrow">Technical details</p><h2 id="technical-dialog-title"></h2></div><button class="technical-dialog-close" type="button" aria-label="Close technical details">×</button></div><div class="technical-dialog-content" tabindex="0" aria-label="Technical details content"></div>';
  document.body.append(dialog);
  const content = dialog.querySelector('.technical-dialog-content');
  let trigger, oldOverflow;
  sections.forEach(details => {
    const summary = details.querySelector('summary');
    summary.setAttribute('aria-haspopup', 'dialog');
    summary.addEventListener('click', event => {
      event.preventDefault();
      trigger = summary;
      details.open = false;
      const card = details.closest('.process-card');
      const label = card ? 'Step details' : 'Technical details';
      dialog.querySelector('.eyebrow').textContent = label;
      dialog.querySelector('button').setAttribute('aria-label', 'Close ' + label.toLowerCase());
      content.setAttribute('aria-label', label + ' content');
      dialog.querySelector('h2').textContent = card ? card.querySelector('h3').textContent : details.closest('section').querySelector('h2').textContent;
      content.replaceChildren(details.querySelector(card ? '.stage-details' : '.cap-technical-grid').cloneNode(true));
      oldOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      content.scrollTop = 0;
      dialog.querySelector('button').focus({ preventScroll: true });
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  const outside = event => {
    const r = dialog.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  };
  let backdropDown = false;
  dialog.addEventListener('pointerdown', event => { backdropDown = outside(event); });
  dialog.addEventListener('click', event => { if (backdropDown && outside(event)) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    trigger?.focus({ preventScroll: true });
  });
})();
