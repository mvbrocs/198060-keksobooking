'use strict';

(function () {
  var PinMain = {
    WIDTH: 62,
    HEIGHT: 84
  };

  var pinMainElement = document.querySelector('.map__pin--main');

  var _getXCoordinateMax = function () {
    var map = document.querySelector('.map');

    return map.clientWidth - PinMain.WIDTH;
  };

  var _limitCoordinate = function (coordinate, shift, min, max) {

    if (shift[coordinate] < min) {
      shift[coordinate] = min;
    }

    if (shift[coordinate] > max) {
      shift[coordinate] = max;
    }
  };

  pinMainElement.addEventListener('mouseup', function () {

    if (!window.page.isEnabled) {
      window.page.enable();
    }
  });

  pinMainElement.addEventListener('mousedown', function (evt) {
    var xCoordinateMax = _getXCoordinateMax();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var _onMouseMove = function (moveEvt) {
      var shift = {
        x: pinMainElement.offsetLeft + (moveEvt.clientX - startCoordinates.x),
        y: pinMainElement.offsetTop + (moveEvt.clientY - startCoordinates.y)
      };

      _limitCoordinate('x', shift, 0, xCoordinateMax);
      _limitCoordinate('y', shift, 130, 630);

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainElement.style.left = shift.x + 'px';
      pinMainElement.style.top = shift.y + 'px';

      window.form.setAddress(shift.x + PinMain.WIDTH / 2, shift.y + PinMain.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', _onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    evt.preventDefault();
    document.addEventListener('mousemove', _onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
