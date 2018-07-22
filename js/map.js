'use strict';

(function () {
  var map = document.querySelector('.map');
  var pageIsEnabled = false;

  var fadeInMap = function () {
    map.classList.remove('map--faded');
  };

  var fadeOutMap = function () {
    map.classList.add('map--faded');
  };

  var disablePage = function () {
    pageIsEnabled = false;
    fadeOutMap();
    window.form.disable();
  };

  var enablePage = function () {
    pageIsEnabled = true;
    fadeInMap();
    window.pins.render(window.data.adverts);
    window.form.enable();
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

  disablePage();

  window.pins.pinMain.node.addEventListener('mouseup', function () {

    if (!pageIsEnabled) {
      enablePage();
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
