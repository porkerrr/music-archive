(function (global) {
  'use strict';

  // This milestone accepts local files only. Platform page URLs are metadata,
  // never playable sources. JSON is converted to a classic script at build time.
  global.createArchiveSource = function (config) {
    var entries = config || {};

    function resolve(trackId) {
      var entry = Object.prototype.hasOwnProperty.call(entries, trackId) ? entries[trackId] : null;
      if (!entry || entry.status === 'missing' || !entry.path) {
        return { status: 'missing', path: '', mimeType: '', reason: '尚未导入音频' };
      }
      if (entry.status !== 'available' || typeof entry.path !== 'string') {
        return { status: 'invalid', path: '', mimeType: '', reason: '音源配置无效，请检查本地音源配置。' };
      }
      var path = entry.path;
      var segments = path.split('/');
      var unsafe = /[\\:%?#\u0000-\u001f\u007f]/.test(path) || path !== path.trim();
      var confined = segments.length > 2 && segments[0] === 'assets' && segments[1] === 'audio';
      var cleanSegments = segments.every(function (part) {
        return part !== '' && part !== '.' && part !== '..' && part === part.trim();
      });
      var audioExtension = /\.(mp3|m4a|aac|wav|ogg|oga|opus|flac|webm|mp4)$/i.test(path);
      if (unsafe || !confined || !cleanSegments || !audioExtension) {
        return { status: 'invalid', path: '', mimeType: '', reason: '音源须为 assets/audio 内的音频文件相对路径，不接受网页或网络链接。' };
      }
      var mime = typeof entry.mimeType === 'string' ? entry.mimeType : '';
      if (mime && !/^audio\/[a-z0-9.+-]+$/i.test(mime)) {
        return { status: 'invalid', path: '', mimeType: '', reason: '音频格式配置无效，请检查 mimeType。' };
      }
      return { status: 'available', path: path, mimeType: mime, reason: '' };
    }

    return Object.freeze({ resolve: resolve });
  };
}(window));
