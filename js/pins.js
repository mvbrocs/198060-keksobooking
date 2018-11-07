'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = window.util.getTemplate('.map__pin');

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var _createPin = function (advertData) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = (advertData.location.x - Pin.WIDTH / 2) + 'px';
    pin.style.top = (advertData.location.y - Pin.HEIGHT) + 'px';

    pin.querySelector('img').src = advertData['author']['avatar'];

    return pin;
  };

  window.pins = {
    render: function (data) {

      data.forEach(function (advertData) {
        var pin = _createPin(advertData);

        pin.addEventListener('click', function () {
          pin.classList.add('map__pin--active');
          window.popup.open(advertData);
        });

        pinsContainer.appendChild(pin);
      });
    },
    deactivate: function () {

      [].forEach.call(pinsContainer.querySelectorAll('.map__pin'), function (pin) {
        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      });
    }
  };
})();
