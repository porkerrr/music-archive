// Compatibility adapter: shelf state continues to use its existing factory names.
// YeVerse-derived geometry is isolated in yeverse-case.js (MIT, EIDDIE).
(function (global) {
  'use strict';
  global.createArchiveCaseResources = global.createYeVerseCaseResources;
  global.createArchiveJewelCase = global.createYeVerseJewelCase;
}(window));
