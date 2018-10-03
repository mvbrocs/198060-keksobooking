'use strict';

(function () {
  var map = document.querySelector('.map');
  var pageIsEnabled = false;
  var advertForm = document.querySelector('.ad-form');

  var fadeInMap = function () {
    map.classList.remove('map--faded');
  };

  var fadeOutMap = function () {
    map.classList.add('map--faded');
  };

  var disablePage = function () {
    pageIsEnabled = false;
    fadeOutMap();
    window.form.disable(advertForm);
  };

  var enablePage = function () {
    pageIsEnabled = true;
    fadeInMap();
    window.backend.load('https://js.dump.academy/keksobooking/data', window.pins.render, window.console.log);
    window.form.enable(advertForm);
  };

  var onPopupBtnClosePress = function (evt) {

    if (evt.target.classList.contains('popup__close')) {
      window.map.closePopup();
    }
  };

  var onPopupEscPress = function (evt) {

    if (evt.keyCode === window.util.keyCodes.ESC_KEYCODE) {
      window.map.closePopup();
    }
  };

  var removePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      map.removeChild(popup);
    }
  };

  var onSaveAdvertForm = function () {
    advertForm.reset();
  };

  disablePage();

  window.pins.pinMain.node.addEventListener('mouseup', function () {

    if (!pageIsEnabled) {
      enablePage();
    }
  });

  advertForm.addEventListener('submit', function (evt) {

    if (window.form.isValid(advertForm)) {
      evt.preventDefault();
      window.backend.save(new FormData(advertForm), 'https://js.dump.academy/keksobooking', onSaveAdvertForm, window.console.log);
    } else {
      evt.preventDefault();
    }
  });

  window.map = {
    openPopup: function (advertData) {
      removePopup();
      map.appendChild(window.card.create(advertData));
      window.pins.deactivate();
      document.addEventListener('click', onPopupBtnClosePress);
      document.addEventListener('keydown', onPopupEscPress);
    },
    closePopup: function () {
      removePopup();
      window.pins.deactivate();
      document.removeEventListener('click', onPopupBtnClosePress);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };
})();
