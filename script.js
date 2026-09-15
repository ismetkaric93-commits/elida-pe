(() => {
  const dialog = document.getElementById('lightbox');
  const large = document.getElementById('large-photo');
  const caption = document.getElementById('caption');
  const close = document.getElementById('close');

  document.querySelectorAll('.photo').forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    const openPhoto = () => {
      if (!dialog || !large) return;
      large.src = card.dataset.src || card.querySelector('img')?.src || '';
      large.alt = card.dataset.caption || card.querySelector('img')?.alt || 'Uvećana fotografija';
      if (caption) caption.textContent = card.dataset.caption || card.querySelector('figcaption')?.textContent || '';
      dialog.showModal?.();
    };
    card.addEventListener('click', openPhoto);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPhoto();
      }
    });
  });
  close?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  const video = document.getElementById('intro-video');
  const sound = document.getElementById('video-sound');
  const status = document.getElementById('video-status');
  sound?.addEventListener('click', async () => {
    if (!video) return;
    video.muted = !video.muted;
    sound.textContent = video.muted ? 'Uključi zvuk' : 'Isključi zvuk';
    sound.setAttribute('aria-pressed', String(!video.muted));
    status.textContent = video.muted ? 'Video je bez zvuka.' : 'Zvuk je uključen.';
    try { await video.play(); } catch (_) {}
  });
  if (video) {
    video.addEventListener('error', () => {
      const section = video.closest('.top-video');
      if (!section || section.querySelector('.video-fallback')) return;
      video.style.display = 'none';
      section.querySelector('.video-toolbar')?.remove();
      const box = document.createElement('div');
      box.className = 'video-fallback';
      box.innerHTML = '<div><strong>Video sekcija</strong><span>Dodajte datoteku <code>assets/video.mp4</code> da bi se video prikazao.</span></div>';
      section.prepend(box);
    }, {once:true});
  }

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      img.src = 'assets/placeholder.svg';
      img.removeAttribute('srcset');
    }, {once:true});
  });
})();
