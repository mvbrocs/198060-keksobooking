'use strict';

(function () {
  var MAIN_PIN_SPIKE_HEIGHT = 16;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65 + MAIN_PIN_SPIKE_HEIGHT;

  window.pins.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setAddress(window.pins.pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2), window.pins.pinMain.offsetTop + MAIN_PIN_HEIGHT);

    var limitYCoordinate = function (shift, min, max) {

      if (shift.y < min) {
        shift.y = min;
      }

      if (shift.y > max) {
        shift.y = max;
      }
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: window.pins.pinMain.offsetLeft + (moveEvt.clientX - startCoordinates.x),
        y: window.pins.pinMain.offsetTop + (moveEvt.clientY - startCoordinates.y)
      };

      limitYCoordinate(shift, 100, 500);

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pins.pinMain.style.left = shift.x + 'px';
      window.pins.pinMain.style.top = shift.y + 'px';
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
