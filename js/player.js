(function (global) {
  'use strict';

  global.createArchivePlayer = function (options) {
    var audio = options.audio;
    var source = options.source;
    var albums = options.catalog.albums;
    if (!audio || !source || !Array.isArray(albums)) throw new Error('播放器缺少音频实例、目录或音源配置。');

    var listeners = new Set();
    var handlers = [];
    var album = null;
    var track = null;
    var trackIndex = -1;
    var activeSource = null;
    var sourceAttached = false;
    var expectedSrc = '';
    var generation = 0;
    var playRequest = 0;
    var wantsPlay = false;
    var transitioning = false;
    var state = 'idle';
    var duration = null;
    var currentTime = 0;
    var notice = '';
    var errorCode = '';
    var volumeControlSupported = true;
    audio.loop = false;
    audio.autoplay = false;

    function hasSource() { return !!activeSource && activeSource.status === 'available'; }
    function getSnapshot() {
      return Object.freeze({
        state: state,
        albumId: album ? album.id : null,
        trackId: track ? track.id : null,
        album: album,
        track: track,
        queue: album ? album.tracks.map(function (item) { return item.id; }) : [],
        queueIndex: trackIndex,
        currentTime: currentTime,
        duration: duration,
        volume: audio.volume,
        muted: audio.muted,
        volumeControlSupported: volumeControlSupported,
        notice: notice,
        errorCode: errorCode,
        canPlay: hasSource(),
        canPrevious: !!album && trackIndex > 0,
        canNext: !!album && trackIndex < album.tracks.length - 1,
        canSeek: sourceAttached && duration !== null && duration > 0 && state !== 'error',
        sourceStatus: activeSource ? activeSource.status : 'missing'
      });
    }
    function emit() {
      var snapshot = getSnapshot();
      listeners.forEach(function (listener) { listener(snapshot); });
    }
    function subscribe(listener) {
      listeners.add(listener);
      listener(getSnapshot());
      return function () { listeners.delete(listener); };
    }
    function mediaMatches() {
      // load() aborts the prior resource. Also reject callbacks while switching,
      // and resource events still reporting the previous currentSrc.
      return !transitioning && sourceAttached && hasSource() &&
        (audio.currentSrc || audio.src) === expectedSrc;
    }
    function readTime() {
      if (Number.isFinite(audio.duration) && audio.duration > 0 && audio.readyState >= 1) duration = audio.duration;
      if (Number.isFinite(audio.currentTime) && audio.currentTime >= 0) {
        currentTime = duration === null ? 0 : Math.min(audio.currentTime, duration);
      }
    }
    function clearResource() {
      transitioning = true;
      generation += 1;
      playRequest += 1;
      wantsPlay = false;
      sourceAttached = false;
      expectedSrc = '';
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      transitioning = false;
    }
    function failure(code, message) {
      wantsPlay = false;
      playRequest += 1;
      audio.pause();
      state = 'error';
      errorCode = code;
      notice = message;
      emit();
    }
    function playFailure(error, selection, request) {
      if (selection !== generation || request !== playRequest) return;
      if (error && error.name === 'NotAllowedError') {
        failure('play-blocked', '浏览器阻止了播放，请点击“重试播放”继续。');
      } else if (error && error.name === 'NotSupportedError') {
        failure('unsupported', '无法播放此文件：格式不支持、文件损坏或路径无效。请核对文件后重试。');
      } else if (error && error.name === 'AbortError') {
        wantsPlay = false;
        state = 'paused';
        notice = '播放已取消，可重新播放。';
        emit();
      } else {
        failure('play-failed', '播放失败，请确认本地音频文件仍可访问后重试。');
      }
    }
    function requestPlay() {
      if (!sourceAttached || !hasSource()) return;
      var selection = generation;
      var request = ++playRequest;
      wantsPlay = true;
      notice = '';
      errorCode = '';
      state = 'loading';
      emit();
      var promise;
      try { promise = audio.play(); } catch (error) { playFailure(error, selection, request); return; }
      if (promise && typeof promise.then === 'function') {
        promise.then(function () {
          if (selection !== generation || request !== playRequest || !wantsPlay || !mediaMatches()) return;
          if (!audio.paused) {
            readTime();
            state = 'playing';
            emit();
          }
        }, function (error) { playFailure(error, selection, request); });
      }
    }
    function choose(nextAlbum, index, autoplay, preserveOnUnavailable) {
      var nextTrack = nextAlbum.tracks[index];
      var nextSource = source.resolve(nextTrack.id);
      if (nextSource.status !== 'available' && preserveOnUnavailable && hasSource()) {
        notice = '《' + nextTrack.title + '》' + nextSource.reason + '；保留当前曲目。';
        emit();
        return false;
      }
      if (album === nextAlbum && track === nextTrack && nextSource.status === 'available' &&
          sourceAttached && activeSource.path === nextSource.path &&
          activeSource.mimeType === nextSource.mimeType && state !== 'error' && state !== 'ended') {
        if (autoplay && state !== 'playing' && state !== 'loading') requestPlay();
        return true;
      }
      clearResource();
      album = nextAlbum;
      track = nextTrack;
      trackIndex = index;
      activeSource = nextSource;
      duration = null;
      currentTime = 0;
      notice = '';
      errorCode = '';
      if (nextSource.status !== 'available') {
        state = nextSource.status === 'missing' ? 'missing' : 'error';
        notice = nextSource.reason;
        errorCode = nextSource.status === 'missing' ? 'missing' : 'invalid-source';
        emit();
        return false;
      }
      if (nextSource.mimeType && typeof audio.canPlayType === 'function' && !audio.canPlayType(nextSource.mimeType)) {
        failure('unsupported', '当前浏览器不支持该音频格式，请提供支持的音频文件。');
        return false;
      }
      transitioning = true;
      audio.src = nextSource.path;
      expectedSrc = audio.src;
      sourceAttached = true;
      state = 'loading';
      audio.load();
      transitioning = false;
      emit();
      if (autoplay) requestPlay();
      return true;
    }
    function select(albumId, trackId, settings) {
      var nextAlbum = albums.find(function (item) { return item.id === albumId; });
      var index = nextAlbum ? nextAlbum.tracks.findIndex(function (item) { return item.id === trackId; }) : -1;
      if (!nextAlbum || index === -1) {
        notice = '未找到这首曲目，请重新打开专辑。';
        emit();
        return false;
      }
      return choose(nextAlbum, index, !settings || settings.autoplay !== false, true);
    }
    function cancelLoading() {
      clearResource();
      duration = null;
      currentTime = 0;
      state = 'paused';
      errorCode = '';
      notice = '已取消加载，可重新播放。';
      emit();
    }
    function toggle() {
      if (!hasSource()) return false;
      if (state === 'loading') { cancelLoading(); return true; }
      if (state === 'playing') {
        wantsPlay = false;
        playRequest += 1;
        audio.pause();
        readTime();
        state = 'paused';
        notice = '';
        emit();
        return true;
      }
      if (!sourceAttached || state === 'error' || state === 'ended') return choose(album, trackIndex, true, false);
      requestPlay();
      return true;
    }
    function previous() {
      if (!album || trackIndex <= 0) return false;
      return choose(album, trackIndex - 1, true, false);
    }
    function next() {
      if (!album || trackIndex >= album.tracks.length - 1) return false;
      return choose(album, trackIndex + 1, true, false);
    }
    function seek(seconds) {
      if (!getSnapshot().canSeek || !Number.isFinite(seconds)) return false;
      try {
        audio.currentTime = Math.max(0, Math.min(seconds, duration));
        currentTime = audio.currentTime;
        if (state === 'ended' && currentTime < duration) {
          state = 'paused';
          notice = '已调整进度，点击播放继续。';
        }
        emit();
        return true;
      } catch (error) {
        notice = '当前无法调整进度，请等待音频加载后重试。';
        emit();
        return false;
      }
    }
    function setVolume(value) {
      if (!Number.isFinite(value)) return false;
      var nextVolume = Math.max(0, Math.min(1, value));
      try {
        audio.volume = nextVolume;
        volumeControlSupported = Math.abs(audio.volume - nextVolume) < 0.01;
      } catch (error) { volumeControlSupported = false; }
      if (!volumeControlSupported) notice = '请用设备音量键调整音量。';
      emit();
      return volumeControlSupported;
    }
    function toggleMute() { audio.muted = !audio.muted; emit(); }
    function on(name, handler) {
      audio.addEventListener(name, handler);
      handlers.push([name, handler]);
    }
    on('loadedmetadata', function () {
      if (!mediaMatches() || audio.readyState < 1) return;
      readTime();
      if (!wantsPlay && state === 'loading') state = 'ready';
      emit();
    });
    on('durationchange', function () { if (mediaMatches() && audio.readyState >= 1) { readTime(); emit(); } });
    on('timeupdate', function () { if (mediaMatches() && audio.readyState >= 1) { readTime(); emit(); } });
    on('playing', function () {
      if (!mediaMatches() || !wantsPlay || audio.paused || audio.readyState < 2) return;
      state = 'playing';
      notice = '';
      errorCode = '';
      readTime();
      emit();
    });
    on('waiting', function () {
      if (mediaMatches() && wantsPlay && !audio.paused && audio.readyState < 3) { state = 'loading'; emit(); }
    });
    on('pause', function () {
      if (!mediaMatches() || !audio.paused || audio.ended || state === 'error' || state === 'loading') return;
      if (state === 'playing') {
        wantsPlay = false;
        playRequest += 1;
        readTime();
        state = 'paused';
        emit();
      }
    });
    on('ended', function () {
      if (!mediaMatches() || !audio.ended || !wantsPlay) return;
      readTime();
      if (trackIndex < album.tracks.length - 1) {
        choose(album, trackIndex + 1, true, false);
      } else {
        wantsPlay = false;
        playRequest += 1;
        state = 'ended';
        notice = '本专辑播放完毕。';
        emit();
      }
    });
    on('error', function () {
      if (!mediaMatches() || !audio.error) return;
      var code = audio.error.code;
      if (code === 1) {
        cancelLoading();
      } else if (code === 2) {
        failure('file-unavailable', '无法读取音频文件，请检查 assets/audio 中的文件与音源路径后重试。');
      } else if (code === 3) {
        failure('decode-failed', '音频解码失败，文件可能损坏或格式不受支持。请更换可播放文件后重试。');
      } else {
        failure('unsupported', '无法播放此文件：格式不支持、文件损坏或路径无效。请核对文件后重试。');
      }
    });
    on('volumechange', emit);

    return Object.freeze({
      select: select, toggle: toggle, previous: previous, next: next,
      seek: seek, setVolume: setVolume, toggleMute: toggleMute,
      subscribe: subscribe, getSnapshot: getSnapshot,
      destroy: function () {
        handlers.forEach(function (item) { audio.removeEventListener(item[0], item[1]); });
        listeners.clear();
        clearResource();
      }
    });
  };
}(window));
