'use strict';

(function () {
  var selects = document.querySelectorAll('.map__filter');
  var checks = document.querySelectorAll('.map__filters .map__checkbox');
  var filter = {};
  filter.features = [];

  var _setFilter = function (type, filterName, value) {

    if (type === 'select') {
      filter[filterName] = value;
    } else if (type === 'check') {

    }
  };

  // Init filter selects
  [].forEach.call(selects, function (select) {
    var selectName = select.getAttribute('name');
    var filterName = selectName.split('-')[1];

    _setFilter('select', filterName, select.value);

    select.addEventListener('change', function () {
      _setFilter('select', filterName, select.value);
    });
  });

  // Init filter checks
  [].forEach.call(checks, function (check) {

  });

  console.log(filter);

  // var selectType = document.querySelector('#housing-type');
  // var selectPrice = document.querySelector('#housing-price');
  // var selectRooms = document.querySelector('#housing-rooms');
  // var selectGuests = document.querySelector('#housing-guests');
  //
  // var checkWifi = document.querySelector('#filter-wifi');
  // var checkDishwasher = document.querySelector('#filter-dishwasher');
  // var checkParking = document.querySelector('#filter-parking');
  // var checkWasher = document.querySelector('#filter-washer');

  //
  // filter.type = document.querySelector('#housing-type').value;
  // filter.price = document.querySelector('#housing-price').value;
  // filter.rooms = document.querySelector('#housing-rooms').value;
  // filter.guests = document.querySelector('#housing-guests').value;
  // filter.features = {};
  // filter.features.wifi = document.querySelector('#filter-wifi').checked;
  // filter.features.dishwasher = document.querySelector('#filter-dishwasher').checked;
  // filter.features.parking = document.querySelector('#filter-parking').checked;
  // filter.features.washer = document.querySelector('#filter-washer').checked;
  // filter.features.elevator = document.querySelector('#filter-elevator').checked;
  // filter.features.conditioner = document.querySelector('#filter-elevator').checked;
  //
  // var filterSelects = document.querySelectorAll('.map__filter');
  //
  // [].forEach.call(filterSelects, function (select) {
  //
  //   select.addEventListener('change', function () {
  //     var filterName = select.name.split()
  //   });
  // });

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
