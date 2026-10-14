(function () {
  'use strict';
  const button = document.getElementById('theme-toggle');
  if (!button || !window.archiveTheme) return;
  window.archiveTheme.subscribe(theme => {
    const dark = theme === 'dark';
    button.textContent = dark ? '浅色' : '深色';
    button.setAttribute('aria-label', dark ? '切换到浅色主题' : '切换到深色主题');
    button.title = dark ? '当前深色主题；切换到浅色' : '当前浅色主题；切换到深色';
  });
  button.addEventListener('click', () => window.archiveTheme.choose(window.archiveTheme.get() === 'dark' ? 'light' : 'dark'));
}());
