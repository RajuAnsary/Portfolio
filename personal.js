(() => {
  const themeButton = document.getElementById('theme-toggle');
  const syncTheme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.textContent = light ? '☾' : '☼';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.setAttribute('aria-pressed', String(light));
    document.querySelector('meta[name="theme-color"]').content = light ? '#f5f7fc' : '#101827';
  };
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
    syncTheme();
  });
  syncTheme();
  const profile = document.querySelector('.profile-container');
  const trigger = document.querySelector('.profile-trigger');
  trigger.addEventListener('click', () => profile.classList.toggle('greeting-open'));
  trigger.addEventListener('blur', () => profile.classList.remove('greeting-open'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      profile.classList.remove('greeting-open');
      profile.classList.add('greeting-dismissed');
    }
  });
  profile.addEventListener('pointerleave', () => profile.classList.remove('greeting-dismissed','greeting-open'));
  trigger.addEventListener('focus', () => profile.classList.remove('greeting-dismissed'));
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const pointer = matchMedia('(pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const updateCursor = () => {
    document.body.classList.toggle('custom-cursor', pointer.matches && !reduced.matches);
    document.body.classList.remove('cursor-visible');
  };
  pointer.addEventListener('change', updateCursor);
  reduced.addEventListener('change', updateCursor);
  document.addEventListener('pointermove', event => {
    if (!pointer.matches || reduced.matches || event.pointerType === 'touch') return;
    document.body.classList.add('cursor-visible');
    dot.style.left = ring.style.left = event.clientX + 'px';
    dot.style.top = ring.style.top = event.clientY + 'px';
    ring.classList.toggle('cursor-hover', Boolean(event.target.closest('a,button,summary,input,textarea,select')));
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => document.body.classList.remove('cursor-visible'));
  window.addEventListener('blur', () => document.body.classList.remove('cursor-visible'));
  updateCursor();
})();
