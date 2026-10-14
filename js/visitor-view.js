(function(global){
  'use strict';
  global.ARCHIVE_FEATURES = Object.freeze({ playback: false });
  const rank = {nanqing:0,zanshi:1};
  const compare = (a,b) => a < b ? -1 : a > b ? 1 : 0;
  // Presentation order only. Source catalog and chronological timeline stay intact.
  function order(albums){return [...albums].sort((a,b)=>(rank[a.artistId]??2)-(rank[b.artistId]??2)||compare(a.platformReleaseDate,b.platformReleaseDate)||compare(a.id,b.id));}
  const backgrounds = {
    zanshi_shennong_vol1:'乐队在2023年街声采访中谈及《神农尝百草》长期计划，设想以多卷作品探索不同声音。',
    nanqing_i_wish_you_do_too_live:'《I wish you do,too》是南青乐队的现场版专辑，共23首。',
    zanshi_shennong_vol2:'《神农尝百草·卷二》是赞诗的录音室版专辑，共8首。'
  };
  function background(copy){return Object.hasOwn(backgrounds,copy.albumId)?backgrounds[copy.albumId]:(copy.background?.text||'');}
  function duration(seconds){if(typeof seconds!=='number'||!Number.isFinite(seconds)||seconds<=0)return '';const n=Math.floor(seconds);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;}
  global.archiveVisitorView=Object.freeze({order,background,duration});
}(window));
