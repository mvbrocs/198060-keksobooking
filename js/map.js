'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormGroups = adForm.querySelectorAll('fieldset');

  var map = document.querySelector('.map');

  var disablePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var i = 0; i < adFormGroups.length; i++) {
      adFormGroups[i].setAttribute('disabled', '');
    }
  };

  disablePage();

  var pinMain = map.querySelector('.map__pin--main');

  var removePopupNode = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      map.removeChild(popup);
    }
  };

  var onPopupBtnClose = function (evt) {

    if (evt.target.classList.contains('popup__close')) {
      window.map.closePopup();
    }
  };

  var onPopupEscPress = function (evt) {

    if (evt.keyCode === window.util.keyCodes.ESC_KEYCODE) {
      window.map.closePopup();
    }
  };

  pinMain.addEventListener('mouseup', function () {

    if (!window.map.isActive) {
      window.map.activateMap();
    }
  });

  window.map = {

    isActive: false,
    activateMap: function () {
      this.isActive = true;
      map.classList.remove('map--faded');
      window.pin.render();
      adForm.classList.remove('ad-form--disabled');

      for (var i = 0; i < adFormGroups.length; i++) {
        var fieldset = adFormGroups[i];
        fieldset.removeAttribute('disabled');
      }
    },
    openPopup: function (indexPressedPin) {
      removePopupNode();
      window.card.render(indexPressedPin);
      window.pin.deactivate();
      document.addEventListener('click', onPopupBtnClose);
      document.addEventListener('keydown', onPopupEscPress);
    },
    closePopup: function () {
      removePopupNode();
      window.pin.deactivate();
      document.removeEventListener('click', onPopupBtnClose);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };
})();
