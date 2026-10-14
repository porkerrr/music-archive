(function (global) {
  'use strict';
  // Selection is synchronous and independent of routes, audio, and animation.
  global.createRecordShelfState = function ({ ids, now = () => performance.now(), reduced = () => false, onChange = () => {}, onSelect = () => {} }) {
    let phase = 'browsing', activeId = null, detailId = null;
    let visible = ids.slice(), position = 0, started = 0;
    function snapshot() { return { phase, activeId, detailId, position, started, visible: visible.slice() }; }
    function emit() { onChange(snapshot()); }
    function activate(id) {
      if (!visible.includes(id)) return false;
      // Repeated taps do not restart animation, re-render text, or move the rail.
      if (activeId === id && ['opening', 'selected'].includes(phase)) return false;
      activeId = id; position = visible.indexOf(id); started = now();
      phase = reduced() ? 'selected' : 'opening';
      const changed = detailId !== id; detailId = id;
      emit();
      if (changed) onSelect(id);
      return true;
    }
    function close() {
      if (!['opening', 'selected'].includes(phase)) return false;
      started = now(); phase = reduced() ? 'browsing' : 'closing';
      if (phase === 'browsing') activeId = null;
      emit(); return true;
    }
    function tick() {
      if (phase === 'opening' && now() - started >= 900) { phase = 'selected'; emit(); }
      else if (phase === 'closing' && now() - started >= 650) { phase = 'browsing'; activeId = null; emit(); }
    }
    return Object.freeze({ snapshot, activate, close, tick,
      setPosition(value) {
        if (phase !== 'browsing' || !Number.isFinite(value)) return false;
        position = Math.max(0, Math.min(visible.length - 1, value)); emit(); return true;
      },
      setVisible(next) {
        if (!next.length || new Set(next).size !== next.length || !next.every(id => ids.includes(id))) return false;
        const nearest = visible[Math.round(position)]; visible = next.slice();
        if (activeId && !visible.includes(activeId)) { activeId = null; phase = 'browsing'; }
        position = Math.max(0, visible.indexOf(activeId || nearest)); emit(); return true;
      },
      cancelMotion() {
        if (phase === 'opening') phase = 'selected';
        if (phase === 'closing') { phase = 'browsing'; activeId = null; }
        emit();
      }
    });
  };
}(window));
