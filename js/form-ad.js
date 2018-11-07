'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adInputs = adForm.querySelectorAll('input');

  var MinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var formAd = {};

  var addressField = document.querySelector('#address');

  var timeSelects = document.querySelectorAll('.ad-form__element--time select');

  var _setTimeSelect = function (index) {
    [].forEach.call(timeSelects, function (select) {
      select.selectedIndex = index;
    });
  };

  var houseTypeSelect = document.querySelector('#type');
  var housePriceField = document.querySelector('#price');

  [].forEach.call(timeSelects, function (select) {

    select.addEventListener('change', function () {
      _setTimeSelect(select.selectedIndex);
    });
  });

  formAd.enable = function () {
    [].forEach.call(adInputs, function (input) {
      input.removeAttribute('disabled');
    });

    adForm.classList.remove('ad-form--disabled');
  };

  formAd.disable = function () {
    [].forEach.call(adInputs, function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    adForm.classList.add('ad-form--disabled');
  };

  formAd.setAddress = function (x, y) {
    addressField.value = 'x: ' + x + ', y: ' + y;
  };

  var changeMinValuePrice = function (selectedValue) {
    housePriceField.min = MinPrices[selectedValue];
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

  for (var i = 0; i < timeSelects.length; i++) {

    timeSelects[i].addEventListener('change', function (evt) {
      var currentSelect = evt.target;
      _setTimeSelect(currentSelect.selectedIndex);
    });
  }

  changeMinValuePrice(houseTypeSelect.value);

  houseTypeSelect.addEventListener('change', function (evt) {
    var typeSelectTarget = evt.target;
    changeMinValuePrice(typeSelectTarget.value);
  });

  changeOfferCapacity(roomSelect.value);

  roomSelect.addEventListener('change', function (evt) {
    var roomSelectTarget = evt.target;
    changeOfferCapacity(roomSelectTarget.value);
  });

  var _onSuccessUpload = function (response) {

    if (response) {
      window.console.log(response);
    } else {
      adForm.reset();
      window.console.log('Данные успешно отправлены');
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adForm), 'https://js.dump.academy/keksobooking', _onSuccessUpload, window.console.log);
  });

  window.formAd = formAd;
})();
