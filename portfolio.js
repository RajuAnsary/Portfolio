(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const art = document.querySelector('.hero-art');
  const scene = document.querySelector('.scene');
  const toggle = document.getElementById('motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  let paused = reducedMotion.matches;
  const updateMotion = () => {
    document.body.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = reducedMotion.matches ? 'Reduced motion enabled' : paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    toggle.disabled = reducedMotion.matches;
    if (paused) scene.style.transform = '';
  };
  toggle.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updateMotion();
  });
  art.addEventListener('pointermove', (event) => {
    if (paused || reducedMotion.matches || !finePointer.matches) return;
    const bounds = art.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    scene.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 15}deg)`;
  });
  art.addEventListener('pointerleave', () => { scene.style.transform = ''; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('motion-paused', paused || !entry.isIntersecting);
    }).observe(art);
  }
  updateMotion();
})();
