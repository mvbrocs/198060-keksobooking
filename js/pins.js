'use strict';

(function () {
  var Pin = {
    MAIN_SPIKE_HEIGHT: 16,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 81,
    HEIGHT: 70,
    WIDTH: 50
  };

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var _createMapPin = function (advertData) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = (advertData.location.x - (Pin.WIDTH / 2)) + 'px';
    pin.style.top = (advertData.location.y - Pin.HEIGHT) + 'px';

    pin.querySelector('img').src = advertData.author.avatar;

    return pin;
  };

  var _activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var _onPinClick = function (pin, advertData) {

    pin.addEventListener('click', function () {
      _activatePin(pin);
      window.map.openPopup(advertData);
    });
  };

  var pinsContainer = document.querySelector('.map__pins');

  window.pins = {
    pinMain: {
      node: document.querySelector('.map__pin--main'),
      width: Pin.MAIN_WIDTH,
      height: Pin.MAIN_HEIGHT
    },
    render: function (advertsData) {

      for (var i = 0; i < advertsData.length; i++) {
        var pin = _createMapPin(advertsData[i]);
        _onPinClick(pin, advertsData[i]);
        pinsContainer.appendChild(pin);
      }
    },
    deactivate: function () {
      var pins = document.querySelectorAll('.map__pin');

      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];

        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      }
    }
  };
})();
