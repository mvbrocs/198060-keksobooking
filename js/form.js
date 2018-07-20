'use strict';

(function () {
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var timeFormSelects = document.querySelectorAll('.ad-form__element--time select');

  var setTimeFormSelects = function (selectedIndex) {

    for (var i = 0; i < timeFormSelects.length; i++) {
      timeFormSelects[i].selectedIndex = selectedIndex;
    }
  };

  for (var i = 0; i < timeFormSelects.length; i++) {

    timeFormSelects[i].addEventListener('change', function (evt) {
      var currentSelect = evt.target;
      setTimeFormSelects(currentSelect.selectedIndex);
    });
  }

  var houseType = document.querySelector('#type');
  var formInputPrice = document.querySelector('#price');

  var changeMinValuePrice = function (selectedValue) {
    formInputPrice.min = MIN_PRICES[selectedValue];
  };

  changeMinValuePrice(houseType.value);

  houseType.addEventListener('change', function (evt) {
    changeMinValuePrice(evt.target.value);
  });

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var changeOfferCapacity = function (selectedValue) {

    if (selectedValue !== '100') {
      capacitySelect.value = selectedValue;
    } else if (selectedValue === '100') {
      capacitySelect.value = '0';
    }
  };

  changeOfferCapacity(roomSelect.value);

  roomSelect.addEventListener('change', function (evt) {
    changeOfferCapacity(evt.target.value);
  });

  var submitBtn = document.querySelector('.ad-form__submit');
  var adForm = document.querySelector('.ad-form');

  var getIncorrectFields = function () {
    var incorrectFields = [];
    var requiredFields = adForm.querySelectorAll('input[required]');

    for (var j = 0; j < requiredFields.length; j++) {

      if (!requiredFields[j].validity.valid) {
        incorrectFields.push(requiredFields[j]);
      }
    }

    return incorrectFields;
  };

  var markIncorrectFields = function (fields) {

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      field.style.borderColor = 'red';
    }
  };

  submitBtn.addEventListener('click', function () {
    markIncorrectFields(getIncorrectFields());
  });
})();
