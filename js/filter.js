'use strict';

(function () {
  var _getType = function (value) {
    return value;
  };

  var _getPrice = function (value) {
    var resPrice;

    if (value < 10000) {
      resPrice = 'low';
    } else if (value >= 10000 && value < 50000) {
      resPrice = 'middle';
    } else if (value >= 50000) {
      resPrice = 'high';
    }

    return resPrice;
  };

  var _getRooms = function (value) {
    return value.toString();
  };

  var _getGuests = function (value) {
    return value.toString();
  };

  var filterMap = {
    'type': _getType,
    'price': _getPrice,
    'rooms': _getRooms,
    'guests': _getGuests
  };

  var _checkFilterIsMatch = function (filterKey, filterValue, element) {
    var filterChecks = filterValue;
    var elementChecks = element.offer[filterKey];

    for (var i = 0; i < filterChecks.length; i++) {
      var filterCheck = filterChecks[i];

      if (!elementChecks.includes(filterCheck)) {
        return false;
      }
    }

    return true;
  };

  var _selectFilterIsMatch = function (filterKey, filterValue, element) {
    var filterFunction = filterMap[filterKey];
    var transformedElementValue = filterFunction(element.offer[filterKey]);

    return filterValue === transformedElementValue;
  };

  var _applyFilter = function (data) {
    return data.filter(function (element) {

      for (var filterKey in filter) {

        if (filter.hasOwnProperty(filterKey)) {
          var filterValue = filter[filterKey];

          if (filterValue === 'any' || (Array.isArray(filterValue) && filterValue.length === 0)) {
            continue;
          }

          if (Array.isArray(filterValue)) {

            if (!_checkFilterIsMatch(filterKey, filterValue, element)) {
              return false;
            }
          } else {
            if (!_selectFilterIsMatch(filterKey, filterValue, element)) {
              return false;
            }
          }
        }
      }

      return true;
    });
  };

  var filter = {};

  // Init filter selects
  var selects = document.querySelectorAll('.map__filter');

  var _updateFilterSelect = function (filterName, value) {
    filter[filterName] = value;
  };

  [].forEach.call(selects, function (select) {
    var selectName = select.getAttribute('name');
    var filterName = selectName.split('-')[1];

    _updateFilterSelect(filterName, select.value);

    select.addEventListener('change', function () {
      _updateFilterSelect(filterName, select.value);
      window.debounce(_updatePins)();
    });
  });


  // Init filter checks
  var checks = document.querySelectorAll('.map__filters .map__checkbox');

  var _addFilterCheck = function (value) {
    filter.features.push(value);
  };

  var _removeFilterCheck = function (value) {
    var elementIndex = filter.features.indexOf(value);

    if (elementIndex > -1) {
      filter.features.splice(elementIndex, 1);
    }
  };

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

      window.debounce(_updatePins)();
    });
  });


  var pins = [];

  var _updatePins = function () {
    window.pins.remove();
    window.pins.render(_applyFilter(pins));
  };

  window.filter = {
    init: function (data) {
      pins = data;
      _updatePins();
    }
  };
})();
