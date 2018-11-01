'use strict';

(function () {
  var filter = {};

  filter.type = document.querySelector('#housing-type').value;
  filter.price = document.querySelector('#housing-price').value;
  filter.rooms = document.querySelector('#housing-rooms').value;
  filter.guests = document.querySelector('#housing-rooms').value;
  filter.features = {};
  filter.features.wifi = document.querySelector('#filter-wifi').checked;
  filter.features.dishwasher = document.querySelector('#filter-dishwasher').checked;
  filter.features.parking = document.querySelector('#filter-parking').checked;
  filter.features.washer = document.querySelector('#filter-washer').checked;
  filter.features.elevator = document.querySelector('#filter-elevator').checked;
  filter.features.conditioner = document.querySelector('#filter-elevator').checked;


  // var filter = {
  //   'type': 'any',
  //   'price': 'any',
  //   'rooms': 'any',
  //   'guests': 'any',
  //   'features': {
  //     'wifi': true,
  //     'dishwasher': true,
  //     'parking': true,
  //     'washer': true,
  //     'elevator': true,
  //     'conditioner': true
  //   }
  // };
})();
