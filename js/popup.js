'use strict';

(function () {
  var map = document.querySelector('.map');

  var _onPopupBtnClosePress = function (evt) {

    if (evt.target.classList.contains('popup__close')) {
      _closePopup();
    }
  };

  var _onEscPress = function (evt) {

    if (evt.keyCode === window.util.KeyCode.ESC) {
      _closePopup();
    }
  };

  var _removePopup = function () {
    var popupElement = map.querySelector('.popup');

    if (popupElement) {
      map.removeChild(popupElement);
    }
  };

  var _closePopup = function () {
    _removePopup();
    window.pins.deactivate();
    document.removeEventListener('click', _onPopupBtnClosePress);
    document.removeEventListener('keydown', _onEscPress);
  };

  window.popup = {
    open: function (advertData) {
      _removePopup();
      map.appendChild(window.card.create(advertData));
      window.pins.deactivate();
      document.addEventListener('click', _onPopupBtnClosePress);
      document.addEventListener('keydown', _onEscPress);
    }
  };
})();
