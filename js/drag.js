'use strict';

(function () {

  window.pins.pinMain.node.addEventListener('mousedown', function (evt) {
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

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
        x: window.pins.pinMain.node.offsetLeft + (moveEvt.clientX - startCoordinates.x),
        y: window.pins.pinMain.node.offsetTop + (moveEvt.clientY - startCoordinates.y)
      };

      limitYCoordinate(shift, 100, 500);

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pins.pinMain.node.style.left = shift.x + 'px';
      window.pins.pinMain.node.style.top = shift.y + 'px';
      window.form.setAddress(window.pins.pinMain.node.offsetLeft + (window.pins.pinMain.width / 2), window.pins.pinMain.node.offsetTop + window.pins.pinMain.height);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    evt.preventDefault();

    window.form.setAddress(window.pins.pinMain.node.offsetLeft + (window.pins.pinMain.width / 2), window.pins.pinMain.node.offsetTop + window.pins.pinMain.height);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
