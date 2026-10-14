(function(global){
  'use strict';
  const events=(global.MUSIC_EVENTS||[]).filter(event=>event.type==='event');
  const timeline=document.getElementById('timeline-content');
  if(!timeline||!events.length)return;
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
  const dialog=make('dialog','event-gallery');dialog.id='event-gallery';dialog.setAttribute('aria-labelledby','gallery-title');
  const panel=make('div','gallery-panel'),header=make('header','gallery-header'),title=make('h2','','演出海报');title.id='gallery-title';
  const close=make('button','','关闭');close.type='button';close.setAttribute('aria-label','关闭海报图集');
  const viewport=make('div','gallery-viewport');viewport.tabIndex=0;viewport.setAttribute('aria-label','海报，可放大后滚动阅读');
  const controls=make('div','gallery-controls'),prev=make('button','','←'),next=make('button','','→'),zoom=make('button','','放大');
  for(const button of [prev,next,zoom])button.type='button';
  prev.setAttribute('aria-label','上一张海报');next.setAttribute('aria-label','下一张海报');zoom.setAttribute('aria-pressed','false');
  const count=make('span','gallery-count');count.setAttribute('role','status');count.setAttribute('aria-live','polite');
  const error=make('p','gallery-error');error.setAttribute('role','alert');error.hidden=true;
  header.append(title,close);controls.append(prev,count,next,zoom);panel.append(header,viewport,error,controls);dialog.append(panel);document.body.append(dialog);
  let event=null,index=0,expanded=false,origin=null,saved=null,gesture=null;
  const loaded=new Map();
  function setZoom(value){
    expanded=value;viewport.classList.toggle('is-zoomed',value);zoom.textContent=value?'适合窗口':'放大';zoom.setAttribute('aria-pressed',String(value));viewport.scrollTo(0,0);
  }
  function show(nextIndex){
    index=Math.max(0,Math.min(event.gallery.length-1,nextIndex));gesture=null;setZoom(false);error.hidden=true;
    const item=event.gallery[index];title.textContent=`${event.title} · ${item.label}`;count.textContent=`${index+1} / ${event.gallery.length}`;
    prev.disabled=index===0;next.disabled=index===event.gallery.length-1;
    let image=loaded.get(item.src);
    if(!image){
      image=make('img','gallery-image');image.alt=item.alt;image.width=item.width;image.height=item.height;image.decoding='async';image.draggable=false;
      image.addEventListener('error',()=>{image.dataset.failed='true';if(viewport.contains(image)){error.textContent='海报未能加载，请检查本地图片文件。';error.hidden=false;}});
      // Only the displayed image receives a source. No hidden five-image preload.
      image.src=item.src;loaded.set(item.src,image);
    }
    viewport.replaceChildren(image);
    if(image.dataset.failed){error.textContent='海报未能加载，请检查本地图片文件。';error.hidden=false;}
  }
  function open(item,button){
    if(dialog.open)return;
    event=item;origin=button;const gap=innerWidth-document.documentElement.clientWidth;
    saved={x:scrollX,y:scrollY,style:document.body.style.cssText};
    document.body.style.position='fixed';document.body.style.top=`-${saved.y}px`;document.body.style.left=`-${saved.x}px`;document.body.style.width='100%';
    if(gap)document.body.style.paddingRight=`${gap}px`;
    show(0);dialog.showModal();close.focus({preventScroll:true});
  }
  function dismiss(){if(dialog.open){dialog.close();restore();}}
  function restore(){
    gesture=null;viewport.replaceChildren();if(!saved)return;
    document.body.style.cssText=saved.style;global.scrollTo({left:saved.x,top:saved.y,behavior:'instant'});
    if(origin?.isConnected)origin.focus({preventScroll:true});saved=null;
  }
  dialog.addEventListener('close',()=>{if(!dialog.open)restore();});
  close.addEventListener('click',dismiss);
  dialog.addEventListener('cancel',e=>{e.preventDefault();dismiss();});
  prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));zoom.addEventListener('click',()=>setZoom(!expanded));
  dialog.addEventListener('keydown',e=>{
    e.stopPropagation();
    if(e.key==='Escape'){e.preventDefault();dismiss();return;}
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowLeft'?-1:1));return;}
    if(e.key==='Tab'){
      const focusable=[...dialog.querySelectorAll('button:not(:disabled),[tabindex="0"]')];
      const first=focusable[0],last=focusable.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  // Modal top layer makes the page inert; stop bubbling as an additional boundary.
  for(const name of ['click','pointerdown','pointerup','pointermove','wheel'])dialog.addEventListener(name,e=>e.stopPropagation());
  viewport.addEventListener('pointerdown',e=>{
    if(expanded||!e.isPrimary||e.button!==0){gesture=null;return;}
    gesture={id:e.pointerId,x:e.clientX,y:e.clientY};viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointerup',e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture=null;
    if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);
    if(!expanded&&Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)show(index+(dx<0?1:-1));
  });
  viewport.addEventListener('pointercancel',()=>{gesture=null;});viewport.addEventListener('lostpointercapture',()=>{gesture=null;});
  for(const item of events){
    const article=make('article','timeline-entry timeline-event');article.dataset.type='event';article.dataset.event=item.id;
    const node=make('div','timeline-node'),date=make('time','timeline-date',item.date.replaceAll('-','.'));date.dateTime=item.date;
    const badge=make('p','event-status',item.statusLabel);
    const button=make('button','timeline-event-open');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','event-gallery');button.setAttribute('aria-label',`${item.title}，查看五张演出海报`);
    const image=make('img','event-preview');image.src=item.preview;image.alt=item.title+' · 山水日出主视觉';image.width=item.previewWidth;image.height=item.previewHeight;image.loading='lazy';image.decoding='async';
    button.append(image,make('h2','',item.title));button.addEventListener('click',()=>open(item,button));
    node.append(date,badge,button,make('p','event-subtitle',item.subtitle),make('p','event-location',`${item.time} · ${item.venue}`));article.append(node);timeline.append(article);
  }
}(window));
