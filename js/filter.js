'use strict';

(function () {
  var pins = [];

  var _getType = function (value) {
    return value;
  };

  var _getPrice = function (value) {

  };

  var _getRooms = function () {

  };

  var _getGuests = function () {

  };

  var _getFeatures = function () {

  };

  var filterMap = {
    'type': _getType,
    'price': _getPrice,
    'rooms': _getRooms,
    'guests': _getGuests,
    'features': _getFeatures
  };

  // var priceMap = {
  //   'any': '*',
  //   'low': '<10000',
  //   'middle': '10000 - 50000',
  //   'high': '>50000'
  // };

  var selects = document.querySelectorAll('.map__filter');
  var checks = document.querySelectorAll('.map__filters .map__checkbox');

  var filter = {};

  var _updateFilterSelect = function (filterName, value) {
    filter[filterName] = value;
  };

  var _addFilterCheck = function (value) {
    filter.features.push(value);
  };

  var _removeFilterCheck = function (value) {
    var elementIndex = filter.features.indexOf(value);

    if (elementIndex) {
      filter.features.splice(elementIndex, 1);
    }
  };

  var _applyFilter = function (data) {
    return data.filter(function (element) {

      for (var filterKey in filter) {

        if (filter.hasOwnProperty(filterKey)) {
          var filterValue = filter[filterKey];

          if (filterValue === 'any' || (Array.isArray(filterValue) && filterValue.length === 0)) {
            continue;
          }

          var filterFunction = filterMap[filterKey];
          var elementValue = filterFunction(element);

          if (filterValue !== elementValue) {
            return false;
          }
        }
      }

      return true;
    });
  };

  var _updatePins = function () {
    window.pins.remove();
    window.pins.render(_applyFilter(pins));
  };


  // Init filter selects
  [].forEach.call(selects, function (select) {
    var selectName = select.getAttribute('name');
    var filterName = selectName.split('-')[1];

    _updateFilterSelect(filterName, select.value);

    select.addEventListener('change', function () {
      _updateFilterSelect(filterName, select.value);
      _updatePins();
    });
  });


  // Init filter checks
  filter.features = [];

  [].forEach.call(checks, function (check) {

    if (check.checked) {
      _addFilterCheck(check.value);
    }

    check.addEventListener('change', function () {

      if (check.checked) {
        _addFilterCheck(check.value);
      } else {
        _removeFilterCheck(check.value);
      }

      _updatePins();
    });
  });

  window.filter = {
    init: function (data) {
      pins = data;
      _updatePins();
    }
  };
})();
