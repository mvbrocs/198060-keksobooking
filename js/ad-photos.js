'use strict';

(function () {
  var inputFile = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photos = document.querySelectorAll('.ad-form__photo');

  var onLoad = function (reader) {
    var lastPhoto = photos[photos.length - 1];
    var clone = lastPhoto.cloneNode(true);
    var img = document.createElement('img');

    img.src = reader.result;
    img.style.maxWidth = '100%';
    lastPhoto.appendChild(img);
    photoContainer.appendChild(clone);
  };

  window.preview.init(inputFile, onLoad);
})();
