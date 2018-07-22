'use strict';

(function () {
  var MAIN_PIN_SPIKE_HEIGHT = 16;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65 + MAIN_PIN_SPIKE_HEIGHT;

  window.pins.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setAddress(window.pins.pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2), window.pins.pinMain.offsetTop + MAIN_PIN_HEIGHT);

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pins.pinMain.style.top = (window.pins.pinMain.offsetTop + shift.y) + 'px';
      window.pins.pinMain.style.left = (window.pins.pinMain.offsetLeft + shift.x) + 'px';
      window.form.setAddress(window.pins.pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2), window.pins.pinMain.offsetTop + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
