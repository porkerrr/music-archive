(function () {
  'use strict';
  window.createArchiveNavigation = function ({ onOpenAlbum }) {
    const names = ['works', 'timeline', 'about'], positions = new Map();
    let section = 'works';
    function show(name, focus = false) {
      const changed = name !== section;
      if (changed) positions.set(section, { x: window.scrollX, y: window.scrollY });
      document.querySelectorAll('[data-page]').forEach(page => { page.hidden = page.dataset.page !== name; });
      document.querySelectorAll('[data-nav]').forEach(link => {
        if (link.dataset.nav === name) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
      section = name;
      if (changed) {
        const pos = positions.get(section) || { x: 0, y: 0 }; window.scrollTo(pos.x, pos.y);
        if (focus) document.querySelector(`[data-page="${section}"] h1`).focus({ preventScroll: true });
      }
    }
    function focusDetail() {
      const detail = document.getElementById('album-detail');
      detail.scrollIntoView({ block: 'start' }); detail.focus({ preventScroll: true });
    }
    function render() {
      const hash = location.hash.slice(1);
      if (hash.startsWith('album/')) {
        // Legacy deep links resolve inline and are normalized, never modal.
        show('works'); history.replaceState(null, '', '#works');
        if (onOpenAlbum(hash.slice(6)) !== false) focusDetail();
        return;
      }
      show(names.includes(hash) ? hash : 'works');
      if (hash === 'collection') document.getElementById('collection').scrollIntoView();
    }
    function go(name) {
      if (!names.includes(name)) return;
      if (name !== section) history.pushState(null, '', `#${name}`);
      show(name, true);
    }
    document.querySelector('.skip-link').addEventListener('click', event => {
      event.preventDefault(); document.getElementById('main').focus();
    });
    document.querySelectorAll('[data-nav],.wordmark').forEach(link => link.addEventListener('click', event => {
      event.preventDefault(); go(link.hash.slice(1));
    }));
    document.querySelector('.browse-link').addEventListener('click', event => {
      event.preventDefault(); document.getElementById('collection').scrollIntoView();
    });
    window.addEventListener('hashchange', render);
    window.addEventListener('popstate', render);
    render();
    return Object.freeze({ go,
      // Explicit timeline/list links may scroll to the requested inline article.
      // Ordinary shelf input calls onSelect directly, not this navigation API.
      openAlbum(id) {
        if (onOpenAlbum(id) === false) return false;
        go('works'); focusDetail(); return true;
      }
    });
  };
}());
