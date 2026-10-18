(function (global) {
  'use strict';
  // Hand-picked from the existing covers. Each pair is calibrated on the site's
  // light / dark paper; the monochrome cover deliberately stays neutral.
  const themes = Object.freeze({
    nanqing_march: ['#25483b', '#a2c3ad'],
    nanqing_four_seasons: ['#63303e', '#e7a9b9'],
    nanqing_streetless_city: ['#6a2c21', '#e7ad82'],
    nanqing_scatter_wealth: ['#692626', '#e4a3a0'],
    nanqing_i_wish_you_do_too_live: ['#243d62', '#9dbbea'],
    nanqing_hunter_and_love: ['#234a51', '#a1c7cd'],
    zanshi_jump_jinshui: ['#30445c', '#b0c1d9'],
    zanshi_shennong_vol1: ['#523a28', '#cfb28a'],
    zanshi_shennong_vol2: ['#3c403a', '#c4c7bf']
  });
  global.createArchiveDetail = function ({ root, render, motion = matchMedia('(prefers-reduced-motion: reduce)') }) {
    let key = '', revision = 0, timers = [], current = null;
    let reservedHeight = 0, measuredWidth = 0;
    root.hidden = false;
    root.dataset.reveal = 'closed'; root.inert = true; root.setAttribute('aria-hidden', 'true');
    function cancel() { revision++; timers.forEach(clearTimeout); timers = []; }
    function reveal(stage) {
      root.dataset.reveal = stage; root.inert = false; root.removeAttribute('aria-hidden');
      const body = root.querySelector('.detail-body');
      if (body) { body.inert = stage !== 'body'; body.setAttribute('aria-hidden', String(stage !== 'body')); }
    }
    function reserve() {
      const width = root.clientWidth;
      if (!width) return;
      if (width !== measuredWidth) { reservedHeight = 0; measuredWidth = width; root.style.minHeight = ''; }
      reservedHeight = Math.max(reservedHeight, root.scrollHeight);
      root.style.minHeight = `${reservedHeight}px`;
    }
    new ResizeObserver(reserve).observe(root);
    function update(state) {
      current = state;
      if (!state.activeId || !['opening', 'selected'].includes(state.phase)) {
        if (key) { cancel(); key = ''; }
        root.dataset.reveal = 'closed'; root.inert = true; root.setAttribute('aria-hidden', 'true');
        return;
      }
      const nextKey = `${state.activeId}:${state.started}`;
      if (key === nextKey) return;
      cancel(); key = nextKey;
      root.dataset.reveal = 'pending'; root.inert = true; root.setAttribute('aria-hidden', 'true');
      render(state.activeId);
      const colors = themes[state.activeId] || ['#3c403a', '#c4c7bf'];
      root.style.setProperty('--album-light', colors[0]); root.style.setProperty('--album-dark', colors[1]);
      const body = root.querySelector('.detail-body');
      if (body) { body.inert = true; body.setAttribute('aria-hidden', 'true'); }
      reserve();
      // Commit the hidden starting frame even for a same-album reopen. No old
      // timeout can reveal a replacement album, or resurrect a closed article.
      void root.offsetHeight;
      const token = revision;
      const remaining = motion.matches || state.phase === 'selected' ? 0 : Math.max(0, 720 - (performance.now() - state.started));
      for (const [stage, delay] of [['header', remaining], ['body', remaining + (motion.matches ? 0 : 100)]]) {
        timers.push(setTimeout(() => { if (revision === token) reveal(stage); }, delay));
      }
    }
    motion.addEventListener('change', () => { key = ''; cancel(); if (current) update(current); });
    return Object.freeze({ update });
  };
}(window));
