'use strict';

(function () {
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var timeSelects = document.querySelectorAll('.ad-form__element--time select');

  var setTimeSelects = function (selectedIndex) {

    for (var j = 0; j < timeSelects.length; j++) {
      timeSelects[j].selectedIndex = selectedIndex;
    }
  };

  var typeSelect = document.querySelector('#type');
  var priceField = document.querySelector('#price');

  var changeMinValuePrice = function (selectedValue) {
    priceField.min = MIN_PRICES[selectedValue];
  };

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var changeOfferCapacity = function (selectedValue) {

    if (selectedValue !== '100') {
      capacitySelect.value = selectedValue;
    } else if (selectedValue === '100') {
      capacitySelect.value = '0';
    }
  };

  var advertForm = document.querySelector('.ad-form');
  var advertFormGroups = advertForm.querySelectorAll('fieldset');

  var enableForm = function () {
    advertForm.classList.remove('ad-form--disabled');
  };

  var disableForm = function () {
    advertForm.classList.add('ad-form--disabled');
  };

  var enableFormFieldsets = function () {
    for (var k = 0; k < advertFormGroups.length; k++) {
      advertFormGroups[k].removeAttribute('disabled');
    }
  };

  var disableFormFieldsets = function () {
    for (var k = 0; k < advertFormGroups.length; k++) {
      advertFormGroups[k].setAttribute('disabled', '');
    }
  };

  var addressField = document.querySelector('#address');

  for (var i = 0; i < timeSelects.length; i++) {

    timeSelects[i].addEventListener('change', function (evt) {
      var currentSelect = evt.target;
      setTimeSelects(currentSelect.selectedIndex);
    });
  }

  changeMinValuePrice(typeSelect.value);

  typeSelect.addEventListener('change', function (evt) {
    var typeSelectTarget = evt.target;
    changeMinValuePrice(typeSelectTarget.value);
  });

  changeOfferCapacity(roomSelect.value);

  roomSelect.addEventListener('change', function (evt) {
    var roomSelectTarget = evt.target;
    changeOfferCapacity(roomSelectTarget.value);
  });

  window.validation.validate(advertForm);

  window.form = {
    enable: function () {
      enableForm();
      enableFormFieldsets();
    },
    disable: function () {
      disableForm();
      disableFormFieldsets();
    },
    setAddress: function (xCoordinate, yCoordinate) {
      addressField.value = 'x: ' + xCoordinate + ', y: ' + yCoordinate;
    }
  };
})();
