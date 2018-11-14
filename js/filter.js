'use strict';

(function () {
  var pins = [];

  var selects = document.querySelectorAll('.map__filter');
  var checks = document.querySelectorAll('.map__filters .map__checkbox');

  var options = {};

  var _updateOptionSelect = function (filterName, value) {
    options[filterName] = value;
  };

  var _addOptionCheck = function (value) {
    options.features.push(value);
  };

  var _removeOptionCheck = function (value) {
    var elementIndex = options.features.indexOf(value);

    if (elementIndex) {
      options.features.splice(elementIndex, 1);
    }
  };

  var _filterData = function (data) {
    return data.filter(function (element) {

      for (var optionKey in options) {

        if (options.hasOwnProperty(optionKey)) {

          if (options[optionKey].length !== 0) {

            if (options[optionKey] !== 'any') {
              console.log(element.offer[optionKey]);
              if (options[optionKey] !== element.offer[optionKey]) {
                return false;
              }
            }
          }
        }
      }

      return true;
    });
  };

  var _updateFilter = function () {
    window.pins.remove();
    window.pins.render(_filterData(pins));
  };

  options.features = [];

  // Init filter selects
  [].forEach.call(selects, function (select) {
    var selectName = select.getAttribute('name');
    var filterName = selectName.split('-')[1];

    _updateOptionSelect(filterName, select.value);

    select.addEventListener('change', function () {
      _updateOptionSelect(filterName, select.value);
      _updateFilter();
    });
  });

  // Init filter checks
  [].forEach.call(checks, function (check) {

    if (check.checked) {
      _addOptionCheck(check.value);
    }

    check.addEventListener('change', function () {

      if (check.checked) {
        _addOptionCheck(check.value);
      } else {
        _removeOptionCheck(check.value);
      }
    });
  });

  window.filter = {
    init: function (data) {
      pins = data;
      _updateFilter();
    }
  };
})();
