'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var pinTemplate = window.util.getTemplate('.map__pin');

  var Pin = function (body, data) {
    this.body = body;
    this.data = data;
    this.setImage();
    this.setPosition();
    this.onClick();

    return this.body;
  };

  Pin.prototype.WIDTH = 50;
  Pin.prototype.HEIGHT = 70;

  Pin.prototype.setImage = function () {
    this.body.querySelector('img').src = this.data.author.avatar;
  };

  Pin.prototype.setPosition = function () {
    this.body.style.left = (this.data.location.x - this.WIDTH / 2) + 'px';
    this.body.style.top = (this.data.location.y - this.HEIGHT) + 'px';
  };

  Pin.prototype.onClick = function () {
    var pinBody = this.body;
    var pinData = this.data;

    pinBody.addEventListener('click', function () {
      pinBody.classList.add('map__pin--active');
      window.popup.open(pinData);
    });
  };

  window.pins = {
    render: function (data) {
      var pinsFragment = document.createDocumentFragment();

      data.forEach(function (advertData) {
        var myPin = new Pin(pinTemplate.cloneNode(true), advertData);

        pinsFragment.appendChild(myPin);
      });

      pinsContainer.appendChild(pinsFragment);
    },
    deactivate: function () {

      [].forEach.call(pinsContainer.querySelectorAll('.map__pin'), function (pin) {
        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      });
    },
    remove: function () {
      var currentPins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

      [].forEach.call(currentPins, function (pin) {
        pinsContainer.removeChild(pin);
      });
    }
  };
})();
