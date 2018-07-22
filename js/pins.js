'use strict';

(function () {
  var PIN_MAIN_SPIKE_HEIGHT = 16;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65 + PIN_MAIN_SPIKE_HEIGHT;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var createMapPin = function (advertData) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = (advertData.location.x - (PIN_WIDTH / 2)) + 'px';
    pin.style.top = (advertData.location.y - PIN_HEIGHT) + 'px';

    pin.querySelector('img').src = advertData.author.avatar;

    return pin;
  };

  var activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var pinHandler = function (pin, advertData) {

    pin.addEventListener('click', function () {
      activatePin(pin);
      window.map.openPopup(advertData);
    });
  };

  var pinsContainer = document.querySelector('.map__pins');

  window.pins = {
    pinMain: {
      node: document.querySelector('.map__pin--main'),
      width: PIN_MAIN_WIDTH,
      height: PIN_MAIN_HEIGHT
    },
    render: function (advertsData) {

      for (var i = 0; i < advertsData.length; i++) {
        var pin = createMapPin(advertsData[i]);
        pinHandler(pin, advertsData[i]);
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
