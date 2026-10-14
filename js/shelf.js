(function (global) {
  'use strict';
  global.createArchiveShelf = function ({ albums, onSelect, onNavigate }) {
    const stage = document.getElementById('shelf-stage');
    const track = document.getElementById('shelf-track');
    const status = document.getElementById('shelf-status');
    const filters = [...document.querySelectorAll('[data-filter]')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const byId = new Map(albums.map(album => [album.id, album]));
    const entries = new Map();
    let filter = 'all', scene = null, ready = false, failureReason = '';
    let frameId = 0, viewable = true, visualPosition = 0, lastFrame = 0;
    let pull = 0, lid = 0, closePull = 0, closeLid = 0, state;
    let gesture = null, wheelTimer = 0, pointerIntent = false, lastUIKey = '';
    let centerId = albums[0]?.id, hitId = null;
    function make(tag, className, text) {
      const element = document.createElement(tag); element.className = className;
      if (text !== undefined) element.textContent = text; return element;
    }
    const host = make('div', 'shelf-scene-host');
    const caption = make('div', 'shelf-caption');
    const title = make('p', 'shelf-title'); caption.append(title);
    track.replaceChildren(host); stage.after(caption);
    stage.setAttribute('aria-describedby', 'shelf-instructions');
    const list = make('details', 'album-access-list'); list.id = 'album-access-list';
    const summary = make('summary', '', '专辑列表');
    const listNote = make('p', 'shelf-fallback-note', '');
    const ul = make('ul', 'album-access-items'); listNote.hidden=true; list.append(summary, listNote, ul);
    document.getElementById('album-detail').after(list);
    albums.forEach(album => {
      const li = make('li', 'album-access-item');
      const img = make('img', 'album-list-cover'); img.src = album.cover.path; img.alt = ''; img.width = 64; img.height = 64;
      const button = make('button', 'album-access-open', album.displayTitle); button.type = 'button'; button.dataset.album = album.id;
      button.setAttribute('aria-label', `查看${album.artistNameSource}《${album.displayTitle}》详情`);
      button.addEventListener('click', () => onNavigate(album.id));
      const meta = make('span', 'album-access-meta', `${album.artistNameSource} · ${album.platformReleaseDate.slice(0,4)} · ${album.releaseType}`);
      const copy = make('div', ''); copy.append(button, meta); li.append(img, copy); ul.append(li); entries.set(album.id, li);

    });
    const controller = global.createRecordShelfState({
      ids: albums.map(album => album.id), reduced: () => motion.matches || Boolean(failureReason), onSelect,
      onChange(nextState) {
        if (nextState.phase === 'closing' && state?.phase !== 'closing') { closePull = pull; closeLid = lid; }
        state = nextState; updateUI(); requestFrame();
      }
    });
    state = controller.snapshot();
    function currentId() { return centerId; }
    function updateUI() {
      if (!state) return;
      stage.dataset.phase = state.phase;
      caption.classList.toggle('is-open', ['opening','selected','closing'].includes(state.phase));
      title.setAttribute('aria-hidden','true');
      if (state.activeId) stage.dataset.album = state.activeId; else delete stage.dataset.album;
      stage.dataset.center = centerId || '';
      const id = currentId(), album = byId.get(id), key = `${state.phase}:${id}:${ready}`;
      if (lastUIKey === key) return; lastUIKey = key;
      title.textContent = album?.displayTitle || '';
      stage.setAttribute('aria-label', `唱片架，${album?.displayTitle || ''}`);
      const messages = { browsing:'移动鼠标或横向拖动浏览，轻点唱片打开下方介绍。', opening:'正在开盒，下方专辑介绍已更新。', selected:'已开盒。可选择另一张；点唱片架空白处或 Esc 收回。', closing:'正在合盒，下方介绍保留。' };
      status.textContent = ready ? `${album?.displayTitle || ''}。${messages[state.phase]}` : failureReason || '3D 加载中，也可使用下方专辑列表。';
    }
    function requestFrame() { if (!frameId && viewable && !document.hidden && ready) frameId = requestAnimationFrame(frame); }
    function ease(value) { value = Math.max(0, Math.min(1,value)); return value * value * (3 - 2 * value); }
    function frame(time, immediate = false) {
      frameId = 0; if (!ready || (!viewable && !immediate) || document.hidden) return;
      // An immediate keyboard render can run after the timestamp of an already
      // queued RAF. Never let that negative delta reverse the interpolation.
      const dt = Math.max(0, Math.min(64, lastFrame ? time - lastFrame : 16)); lastFrame = time; controller.tick();
      visualPosition = motion.matches ? state.position : visualPosition + (state.position - visualPosition) * (1 - Math.exp(-dt / 110));
      if (Math.abs(visualPosition - state.position) < 0.001) visualPosition = state.position;
      if (state.phase === 'opening') { pull = ease((time - state.started) / 450); lid = ease((time - state.started - 230) / 670); }
      else if (state.phase === 'selected') { pull = 1; lid = 1; }
      else if (state.phase === 'closing') { pull = closePull * (1 - ease((time-state.started)/650)); lid = closeLid * (1 - ease((time-state.started)/430)); }
      else { pull = 0; lid = 0; }
      let rendered;
      try { rendered = scene.render({ ...state, position: visualPosition, pull, lid, reduced: motion.matches, dt }); centerId = rendered?.centerId || centerId; }
      catch (error) { fallback('3D 绘制未成功，请使用专辑列表。'); return; }
      updateUI();
      if (rendered?.moving || visualPosition !== state.position || ['opening','closing'].includes(state.phase)) requestFrame();
    }
    function fallback(message) {
      ready = false; failureReason = message; if(frameId) cancelAnimationFrame(frameId); frameId = 0;
      const focused = stage.contains(document.activeElement);
      scene?.dispose(); stage.dataset.renderer = 'fallback'; stage.hidden = true; caption.hidden = true;
      controller.cancelMotion();
      list.open = true; listNote.hidden=false; listNote.textContent = message; status.textContent = message;
      document.getElementById('shelf-instructions').hidden = true;
      if(focused) summary.focus();
    }
    function select(id) {
      if(!state.visible.includes(id)) return false;
      cancelGesture(); clearTimeout(wheelTimer); pointerIntent = false;
      controller.activate(id); return true;
    }
    function choose(index, forceSelect = false) {
      index = Math.max(0, Math.min(state.visible.length-1, Math.round(index)));
      if(forceSelect || state.activeId) select(state.visible[index]);
      else {
        cancelGesture(); pointerIntent=false; controller.setPosition(index);
        // Keyboard positioning completes before Enter, even in the same frame.
        visualPosition=state.position; renderNow();
      }
    }
    function renderNow() {
      if(frameId) cancelAnimationFrame(frameId); frameId=0;
      frame(performance.now(), true);
    }
    function retract() { if(controller.close()) stage.focus({preventScroll:true}); }
    function cancelGesture() {
      const ended = gesture; gesture = null;
      if(ended && stage.hasPointerCapture(ended.id)) stage.releasePointerCapture(ended.id);
      stage.classList.remove('is-dragging');
    }
    stage.addEventListener('pointerdown', event => {
      if(!event.isPrimary) { cancelGesture(); return; }
      if((event.pointerType==='mouse' && event.button!==0)||!ready) return;
      controller.setPosition(visualPosition);
      hitId=scene.pick(event.clientX,event.clientY);
      gesture={id:event.pointerId,pointerType:event.pointerType,x:event.clientX,y:event.clientY,position:visualPosition,moved:false,hit:hitId};
    });
    stage.addEventListener('pointermove', event => {
      if(!ready) return;
      hitId=scene.pick(event.clientX,event.clientY);
      if(gesture && event.pointerId===gesture.id) {
        const dx=event.clientX-gesture.x, dy=event.clientY-gesture.y;
        if(!gesture.moved) {
          if(Math.abs(dy)>9 && Math.abs(dy)>Math.abs(dx)) { cancelGesture(); return; }
          if(Math.abs(dx)<8 || Math.abs(dx)<=Math.abs(dy)) return;
          gesture.moved=true;
          if(state.phase !== 'browsing') return;
          stage.setPointerCapture(event.pointerId);stage.classList.add('is-dragging');
        }
        if(state.phase !== 'browsing') return;
        event.preventDefault();
        const gain=gesture.pointerType==='touch'?2:1;
        controller.setPosition(gesture.position-dx*gain/Math.max(110,Math.min(260,stage.clientWidth*.25)));
      } else if(event.pointerType==='mouse'&&fine.matches&&!event.buttons&&!motion.matches&&state.phase==='browsing') {
        const rect=stage.getBoundingClientRect();
        const ratio=Math.max(0,Math.min(1,(event.clientX-rect.left-rect.width*.08)/(rect.width*.84)));
        pointerIntent=true;controller.setPosition(ratio*(state.visible.length-1));
      }
    });
    stage.addEventListener('pointerup', event => {
      if(!gesture||event.pointerId!==gesture.id) return;
      const ended=gesture;cancelGesture();
      if(ended.moved) { controller.setPosition(Math.round(state.position)); return; }
      if(Math.abs(event.clientX-ended.x)>8 || Math.abs(event.clientY-ended.y)>8) return;
      const hit=hitId=scene.pick(event.clientX,event.clientY);
      if(!hit&&!ended.hit) { retract(); return; }
      if(hit!==ended.hit) return;
      select(hit);stage.focus({preventScroll:true});
    });
    // Only shelf pointerup can treat blank space as a close action. Article
    // clicks, text selection, track controls, and navigation never reach here.
    stage.addEventListener('pointercancel',()=>{cancelGesture();controller.setPosition(Math.round(state.position));});
    stage.addEventListener('lostpointercapture',event=>{if(gesture?.id===event.pointerId)cancelGesture();});
    stage.addEventListener('pointerleave',()=>{
      hitId=null;
      if(gesture&&!gesture.moved)cancelGesture();
      if(!gesture&&pointerIntent){pointerIntent=false;controller.setPosition(Math.round(state.position));}
    });
    stage.addEventListener('dragstart',event=>event.preventDefault());
    stage.addEventListener('wheel',event=>{
      if(event.ctrlKey||event.metaKey||!ready||state.phase!=='browsing')return;
      const horizontal=Math.abs(event.deltaX)>Math.abs(event.deltaY);if(!horizontal&&!event.shiftKey)return;
      let delta=horizontal?event.deltaX:event.deltaY;delta*=event.deltaMode===1?16:event.deltaMode===2?stage.clientWidth:1;
      if((state.position<=0&&delta<0)||(state.position>=state.visible.length-1&&delta>0))return;
      event.preventDefault();controller.setPosition(state.position+delta/220);clearTimeout(wheelTimer);
      wheelTimer=setTimeout(()=>controller.setPosition(Math.round(state.position)),140);
    },{passive:false});
    stage.addEventListener('keydown',event=>{
      if(event.ctrlKey||event.metaKey||event.altKey)return;
      if(event.key==='ArrowLeft'||event.key==='ArrowRight') {event.preventDefault();choose(state.visible.indexOf(state.activeId || centerId)+(event.key==='ArrowLeft'?-1:1));}
      else if(event.key==='Home'||event.key==='End') {event.preventDefault();choose(event.key==='Home'?0:state.visible.length-1);}
      else if(event.key==='Enter'||event.key===' ') {event.preventDefault();select(state.activeId || centerId);}
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!document.getElementById('works').hidden&&['opening','selected'].includes(state.phase)) {event.preventDefault();retract();}
    });
    global.addEventListener('blur',cancelGesture);document.addEventListener('visibilitychange',()=>{cancelGesture();requestFrame();});
    new ResizeObserver(()=>{lastFrame=0;requestFrame();}).observe(stage);
    new IntersectionObserver(entries=>{viewable=entries[0].isIntersecting;if(!viewable)cancelGesture();else requestFrame();}).observe(stage);
    motion.addEventListener('change',()=>{cancelGesture();controller.cancelMotion();requestFrame();});
    function setFilter(id) {
      if(!['all','nanqing','zanshi'].includes(id))return false;
      cancelGesture();clearTimeout(wheelTimer);pointerIntent=false;hitId=null;
      const visible=albums.filter(album=>id==='all'||album.artistId===id).map(album=>album.id);
      controller.setPosition(visualPosition);
      controller.setVisible(visible);filter=id;visualPosition=state.position;
      entries.forEach((li,key)=>{li.hidden=!visible.includes(key);});
      filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===id)));
      document.getElementById('filter-status').textContent=`显示${id==='all'?'全部':id==='nanqing'?'南青':'赞诗'} ${visible.length} 张作品`;
      lastUIKey='';renderNow();updateUI();return true;
    }
    filters.forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
    updateUI();stage.dataset.renderer='loading';
    try {
      scene=global.createArchiveShelfScene({host,albums,theme:global.archiveTheme?.get() || 'light',onInvalidate:requestFrame,onFailure:fallback});
      global.archiveTheme?.subscribe(theme => scene.setTheme(theme));
      scene.ready.then(()=>{ready=true;stage.dataset.renderer='webgl';lastUIKey='';updateUI();requestFrame();}).catch(()=>fallback('本地纹理加载未完成，请使用专辑列表并检查资源。'));
    } catch(error) {fallback('此设备无法显示 WebGL 唱片架，专辑列表仍可查看下方介绍。');}
    return Object.freeze({setFilter,
      selectAlbum(id){if(!byId.has(id))return false;if(!state.visible.includes(id))setFilter('all');return select(id);},
      getSelectedId:()=>state.detailId,
      getSnapshot:()=>({...controller.snapshot(),centerId,hitId,visualPosition,renderer:stage.dataset.renderer})
    });
  };
}(window));
