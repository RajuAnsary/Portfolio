(() => {
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  const theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
  document.documentElement.dataset.theme = theme;
})();
