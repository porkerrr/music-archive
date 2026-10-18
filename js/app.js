(function () {
  'use strict';
  const catalog=window.MUSIC_CATALOG, content=window.MUSIC_CONTENT, view=window.archiveVisitorView;
  const playback=window.ARCHIVE_FEATURES.playback;
  const albums=view.order(catalog.albums),byId=new Map(catalog.albums.map(a=>[a.id,a]));
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  let currentDetailId=null, navigation, player=null;
  // The internal beta creates no audio, player UI, source adapter or listeners.
  // Existing playback implementation remains available behind one feature flag.
  if(playback){
    document.body.classList.add('playback-enabled');
    const root=document.createElement('section');root.id='player';root.className='player';root.setAttribute('aria-label','音乐播放器');
    const audio=document.createElement('audio');audio.id='archive-audio';audio.preload='none';document.body.append(root,audio);
    player=window.createArchivePlayer({audio,catalog,source:window.createArchiveSource(window.AUDIO_SOURCES)});
    window.mountArchivePlayer({root,player});
    new ResizeObserver(()=>document.documentElement.style.setProperty('--player-height',`${Math.ceil(root.getBoundingClientRect().height)}px`)).observe(root);
  }
  const detail=document.getElementById('album-detail');
  function openDetail(id){
    if(!byId.has(id))return false;if(id===currentDetailId)return true;
    currentDetailId=id;detail.dataset.album=id;
    const album=byId.get(id),copy=content.albums.find(a=>a.albumId===id),background=view.background(copy);
    const credits=copy.albumCredits,entries=credits?.status==='verified'?[...(credits.performers||[]),...(credits.production||[])]:[];
    detail.innerHTML=`<div class="album-intro detail-header"><div class="detail-art"><img class="detail-cover" src="${escape(album.cover.path)}" alt="${escape(album.displayTitle)}封面" width="116" height="116"></div><div><h2 id="album-title">${escape(album.displayTitle)}</h2><p class="album-meta">${escape(album.artistNameSource)} · ${escape(album.releaseType)} · ${album.trackCount} 首<br><time datetime="${escape(album.platformReleaseDate)}">${escape(album.platformReleaseDate)}</time></p></div></div>
      <div class="detail-body">${background?`<p class="album-background">${escape(background)}</p>`:''}
      <div class="track-heading"><h3>曲目</h3><span>${album.trackCount} 首</span></div><ol class="track-list">${album.tracks.map(track=>`<li class="track-row" data-track-row="${escape(track.id)}"><span class="track-order">${String(track.order).padStart(2,'0')}</span>${playback?`<button class="track-select" data-track="${escape(track.id)}">${escape(track.title)}</button>`:`<span class="track-name">${escape(track.title)}</span>`}<span class="track-duration">${view.duration(track.durationSecondsSource)}</span></li>`).join('')}</ol>
      ${entries.length?`<section class="album-credits"><h3>专辑制作署名</h3><dl class="credits-grid">${entries.map(e=>`<div><dt>${escape(e.role)}</dt><dd>${escape(e.name)}</dd></div>`).join('')}</dl></section>`:''}</div>`;
    detail.hidden=false;return true;
  }
  if(player)detail.addEventListener('click',event=>{const button=event.target.closest('[data-track]');if(button)player.select(currentDetailId,button.dataset.track,{autoplay:true});});
  const presentation=window.createArchiveDetail({root:detail,render:openDetail});
  const shelf=window.createArchiveShelf({albums,onSelect:openDetail,onPhase:presentation.update,onNavigate:id=>shelf.selectAlbum(id)});
  document.getElementById('about-content').innerHTML=content.artists.map(artist=>`<article class="bio"><h2>${escape(artist.displayName)}</h2><div class="bio-copy">${artist.bio?.text?`<p>${escape(artist.bio.text)}</p>`:''}${artist.entityType==='band'?`<button class="text-link" data-band="${escape(artist.artistId)}">浏览${escape(artist.displayName)}作品 →</button>`:''}</div></article>`).join('');
  document.querySelectorAll('[data-band]').forEach(button=>button.addEventListener('click',()=>{
    navigation.go('works');shelf.setFilter(button.dataset.band);document.getElementById('collection').scrollIntoView();document.querySelector(`[data-filter="${button.dataset.band}"]`).focus({preventScroll:true});
  }));
  const timeline=document.getElementById('timeline-content');
  const sources=new Map(content.sources.map(source=>[source.sourceId,source]));
  function sourceLink(event){
    const source=sources.get(event.sourceIds?.[0]);
    return source && /^https:\/\//.test(source.url)?`<a class="timeline-source" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(event.title)}：出处">出处</a>`:'';
  }
  // Only release nodes join the album catalog. Unknown types never dereference it.
  timeline.innerHTML=[...content.releaseTimeline].sort((a,b)=>a.sortOrder-b.sortOrder).map(event=>{
    if(!['release','story'].includes(event.type))return '';
    const album=event.type==='release'?byId.get(event.albumId):null;
    if(event.type==='release'&&!album)return '';
    const date=event.type==='release'?event.date:event.eventDate;
    const dateHtml=date?`<time class="timeline-date" datetime="${escape(date)}">${escape(event.displayDate)}</time>`:`<span class="timeline-date">${escape(event.displayDate)}</span>`;
    const picture=album?album.cover:event.image;
    const image=picture?`<img class="timeline-image" src="${escape(picture.path)}" alt="${album?'':escape(picture.alt||'')}" width="112" height="112" loading="lazy">`:'';
    // Cover remains clickable; the adjacent title is the single keyboard/AT target.
    const media=album?`<button class="timeline-media timeline-cover" data-timeline-album="${escape(album.id)}" tabindex="-1" aria-hidden="true">${image}</button>`:image;
    const heading=album?`<button class="timeline-album" data-timeline-album="${escape(album.id)}" aria-label="查看《${escape(event.title)}》专辑">${escape(event.title)}</button>`:escape(event.title);
    const stories=event.stories||[];
    const copy=`<div class="timeline-copy"><h2>${heading}</h2><p>${album?`${escape(album.artistNameSource)} · `:''}${escape(event.description)}</p>${stories.map(story=>`<section class="timeline-background" aria-labelledby="${escape(story.eventId)}"><h3 id="${escape(story.eventId)}">${escape(story.title)}</h3><p>${escape(story.description)}</p></section>`).join('')}${sourceLink(stories[0]||event)}</div>`;
    return `<article class="timeline-entry" data-type="${escape(event.type)}" data-event="${escape(event.eventId)}"><div class="timeline-node${picture?'':' timeline-text-only'}">${dateHtml}${media}${copy}</div></article>`;
  }).join('');
  timeline.addEventListener('click',event=>{const button=event.target.closest('[data-timeline-album]');if(button)navigation.openAlbum(button.dataset.timelineAlbum);});
  navigation=window.createArchiveNavigation({onOpenAlbum:id=>shelf.selectAlbum(id)});
  document.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement){event.target.classList.add('image-missing');event.target.alt+='（封面文件缺失或损坏）';}},true);
}());
