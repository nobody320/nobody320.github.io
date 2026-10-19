(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  let theme = 'light';
  try { theme = localStorage.getItem('nobody320-theme') === 'dark' ? 'dark' : 'light'; } catch (_) {}
  function applyTheme() {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '切换浅色' : '切换深色';
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#1b201d' : '#f7f6f2';
  }
  applyTheme();
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try { localStorage.setItem('nobody320-theme', theme); } catch (_) {}
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  if ('IntersectionObserver' in window && links.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio);
      if (!visible.length) return;
      links.forEach(link => {
        if (link.hash === '#' + visible[0].target.id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-5% 0px -35% 0px', threshold: [0, 0.25, 0.5]});
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
})();
