(function (global) {
  'use strict';

  global.mountArchivePlayer = function (options) {
    var root = options.root;
    var player = options.player;
    var coarse = global.matchMedia('(pointer: coarse)');
    var scrubbing = false;
    var latest;
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', '音乐播放器');
    root.innerHTML = '<img class="player-cover" alt="" hidden>' +
      '<div class="player-info"><p class="player-title">选择一首曲目</p>' +
      '<p class="player-album">私人离线音乐档案</p>' +
      '<p class="player-status" id="player-status" role="status" aria-live="polite" aria-atomic="true"></p></div>' +
      '<div class="player-transport"><div class="player-controls">' +
      '<button type="button" class="player-previous" aria-label="上一首">上一首</button>' +
      '<button type="button" class="player-play" aria-describedby="player-status">播放</button>' +
      '<button type="button" class="player-next" aria-label="下一首">下一首</button></div>' +
      '<div class="player-progress"><span class="time player-elapsed">00:00</span>' +
      '<input class="player-seek" type="range" min="0" max="1" value="0" step="0.1" aria-label="播放进度" disabled>' +
      '<span class="time player-duration">--:--</span></div></div>' +
      '<div class="player-volume"><button type="button" class="player-mute" aria-label="静音">静音</button>' +
      '<input class="player-volume-range" type="range" min="0" max="1" step="0.01" value="1" aria-label="音量">' +
      '<p class="player-system-volume" hidden>请用设备音量键</p></div>';

    function query(selector) { return root.querySelector(selector); }
    var title = query('.player-title');
    var album = query('.player-album');
    var cover = query('.player-cover');
    var status = query('.player-status');
    var previous = query('.player-previous');
    var play = query('.player-play');
    var next = query('.player-next');
    var progress = query('.player-seek');
    var elapsed = query('.player-elapsed');
    var duration = query('.player-duration');
    var mute = query('.player-mute');
    var volume = query('.player-volume-range');
    var systemVolume = query('.player-system-volume');
    var messages = {
      idle: '尚未选择曲目 · 首次打开不会自动播放',
      missing: '尚未导入音频', loading: '正在加载音频，可取消后重试',
      ready: '已准备好，点击播放', playing: '正在播放 · 当前专辑内顺序播放',
      paused: '已暂停', ended: '本专辑播放完毕', error: '播放失败，请重试'
    };
    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return '--:--';
      var whole = Math.floor(Math.max(0, seconds));
      return String(Math.floor(whole / 60)).padStart(2, '0') + ':' + String(whole % 60).padStart(2, '0');
    }
    function render(snapshot) {
      if (latest && latest.trackId !== snapshot.trackId) scrubbing = false;
      latest = snapshot;
      root.dataset.state = snapshot.state;
      title.textContent = snapshot.track ? snapshot.track.title : '选择一首曲目';
      album.textContent = snapshot.album ? snapshot.album.artistNameSource + ' · ' + snapshot.album.displayTitle : '私人离线音乐档案';
      if (snapshot.album && snapshot.album.cover) {
        if (cover.getAttribute('src') !== snapshot.album.cover.path) cover.src = snapshot.album.cover.path;
        cover.hidden = false;
      } else { cover.hidden = true; }
      var message = snapshot.notice || messages[snapshot.state];
      // Do not re-announce the status on timeupdate (or speak every second).
      if (status.textContent !== message) status.textContent = message;
      previous.disabled = !snapshot.canPrevious;
      next.disabled = !snapshot.canNext;
      play.disabled = !snapshot.canPlay;
      play.textContent = snapshot.state === 'playing' ? '暂停' : snapshot.state === 'loading' ? '取消加载' : snapshot.state === 'error' ? '重试播放' : snapshot.state === 'ended' ? '重新播放' : '播放';
      play.setAttribute('aria-label', play.textContent);
      progress.disabled = !snapshot.canSeek;
      progress.max = snapshot.duration || 1;
      duration.textContent = formatTime(snapshot.duration);
      if (!scrubbing) {
        progress.value = snapshot.currentTime;
        elapsed.textContent = formatTime(snapshot.currentTime);
        progress.setAttribute('aria-valuetext', formatTime(snapshot.currentTime) + ' / ' + formatTime(snapshot.duration));
      }
      var systemOnly = coarse.matches || !snapshot.volumeControlSupported;
      volume.hidden = systemOnly;
      mute.hidden = systemOnly;
      systemVolume.hidden = !systemOnly;
      volume.value = snapshot.volume;
      volume.setAttribute('aria-valuetext', Math.round(snapshot.volume * 100) + '%');
      mute.textContent = snapshot.muted ? '取消静音' : '静音';
      mute.setAttribute('aria-label', mute.textContent);
      mute.setAttribute('aria-pressed', String(snapshot.muted));
    }
    previous.addEventListener('click', player.previous);
    play.addEventListener('click', player.toggle);
    next.addEventListener('click', player.next);
    mute.addEventListener('click', player.toggleMute);
    volume.addEventListener('input', function () { player.setVolume(Number(volume.value)); });
    progress.addEventListener('input', function () {
      scrubbing = true;
      elapsed.textContent = formatTime(Number(progress.value));
      progress.setAttribute('aria-valuetext', formatTime(Number(progress.value)) + ' / ' + formatTime(latest.duration));
    });
    progress.addEventListener('change', function () {
      scrubbing = false;
      player.seek(Number(progress.value));
    });
    progress.addEventListener('blur', function () { scrubbing = false; if (latest) render(latest); });
    progress.addEventListener('pointercancel', function () { scrubbing = false; if (latest) render(latest); });
    function updateVolumeMode() { if (latest) render(latest); }
    if (coarse.addEventListener) coarse.addEventListener('change', updateVolumeMode);
    else coarse.addListener(updateVolumeMode);
    var unsubscribe = player.subscribe(render);
    return {
      destroy: function () {
        unsubscribe();
        if (coarse.removeEventListener) coarse.removeEventListener('change', updateVolumeMode);
        else coarse.removeListener(updateVolumeMode);
        root.replaceChildren();
      }
    };
  };
}(window));
