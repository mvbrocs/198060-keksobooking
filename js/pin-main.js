'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');

  var MainPin = {
    SPIKE_HEIGHT: 16,
    WIDTH: 65,
    HEIGHT: 81
  };

  mainPinElement.addEventListener('mouseup', function () {

    if (!pageIsEnabled) {
      window.page.enable();
    }
  });

  // var limitYCoordinate = function (shift, min, max) {
  //
  //   if (shift.y < min) {
  //     shift.y = min;
  //   }
  //
  //   if (shift.y > max) {
  //     shift.y = max;
  //   }
  // };
  //
  // window.pins.pinMain.node.addEventListener('mousedown', function (evt) {
  //   var startCoordinates = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };
  //
  //   var onMouseMove = function (moveEvt) {
  //     var shift = {
  //       x: window.pins.pinMain.node.offsetLeft + (moveEvt.clientX - startCoordinates.x),
  //       y: window.pins.pinMain.node.offsetTop + (moveEvt.clientY - startCoordinates.y)
  //     };
  //
  //     limitYCoordinate(shift, 100, 500);
  //
  //     startCoordinates = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };
  //
  //     window.pins.pinMain.node.style.left = shift.x + 'px';
  //     window.pins.pinMain.node.style.top = shift.y + 'px';
  //     window.form.setAddress();
  //   };
  //
  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();
  //
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };
  //
  //   evt.preventDefault();
  //
  //   window.form.setAddress();
  //
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

  // addressField.value = 'x: ' + (window.pins.pinMain.node.offsetLeft + (window.pins.pinMain.width / 2)) + ', y: ' + (window.pins.pinMain.node.offsetTop + window.pins.pinMain.height);
})();
