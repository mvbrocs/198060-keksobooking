'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 50;

  var createPinsTemplates = function () {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('template');
    var pin = template.content.querySelector('.map__pin');

    for (var i = 0; i < window.data.length; i++) {
      var clonePin = pin.cloneNode(true);
      var cloneAvatar = clonePin.querySelector('img');
      var ad = window.data[i];

      clonePin.style.left = (ad.location.x - (MAP_PIN_WIDTH / 2)) + 'px';
      clonePin.style.top = (ad.location.y - MAP_PIN_HEIGHT) + 'px';
      cloneAvatar.src = ad.author.avatar;

      mapPinHandler(clonePin, i);

      fragment.appendChild(clonePin);
    }

    return fragment;
  };

  var mapPinHandler = function (mapPin, i) {

    mapPin.addEventListener('click', function () {
      window.map.openPopup(i);
      activateMapPin(mapPin);
    });
  };

  var activateMapPin = function (pressedPin) {
    pressedPin.classList.add('map__pin--active');
  };

  var pinsTemplates = createPinsTemplates();
  var pinsContainer = document.querySelector('.map__pins');

  window.pin = {
    render: function () {
      pinsContainer.appendChild(pinsTemplates);
    },
    deactivate: function () {
      var pins = pinsContainer.querySelectorAll('.map__pin');

      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];

        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      }
    }
  };
})();
