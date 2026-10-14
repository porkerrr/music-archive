(function (global) {
  'use strict';
  // Blocking, local, before styles: never wait for the deferred app to choose.
  const key = 'archive-theme';
  const system = global.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => value === 'light' || value === 'dark';
  let manual = null;
  try { const saved = global.localStorage.getItem(key); if (valid(saved)) manual = saved; } catch (_) {}
  let current;
  const listeners = new Set();
  function apply(value) {
    if (!valid(value)) return;
    const changed = current !== value;
    current = value;
    document.documentElement.dataset.theme = value;
    if (changed) listeners.forEach(listener => listener(value));
  }
  function choose(value) {
    if (!valid(value)) return;
    // Memory remains authoritative for this visit when storage is denied.
    manual = value;
    try { global.localStorage.setItem(key, value); } catch (_) {}
    apply(value);
  }
  apply(manual || (system.matches ? 'dark' : 'light'));
  system.addEventListener('change', () => { if (!manual) apply(system.matches ? 'dark' : 'light'); });
  global.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    manual = valid(event.newValue) ? event.newValue : null;
    apply(manual || (system.matches ? 'dark' : 'light'));
  });
  global.archiveTheme = Object.freeze({
    get: () => current,
    choose,
    subscribe(listener) { listeners.add(listener); listener(current); return () => listeners.delete(listener); }
  });
}(window));
