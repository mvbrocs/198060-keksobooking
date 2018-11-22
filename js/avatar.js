'use strict';

(function () {
  var inputFile = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  var onLoad = function (reader) {
    preview.src = reader.result;
  };

  window.preview.init(inputFile, onLoad);
})();
