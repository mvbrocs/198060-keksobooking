'use strict';

(function () {
  // Selecting time check in and out
  var selectsTime = document.querySelectorAll('.ad-form__element--time select');

  var _setTimeSelect = function (index) {
    [].forEach.call(selectsTime, function (select) {
      select.selectedIndex = index;
    });
  };

  [].forEach.call(selectsTime, function (select) {

    select.addEventListener('change', function () {
      _setTimeSelect(select.selectedIndex);
    });
  });


  // Changing minimum price, depending house type
  var MinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var selectHouseType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');

  var _changeMinPrice = function (index) {
    fieldPrice.min = MinPrices[index];
  };

  _changeMinPrice(selectHouseType.value);

  selectHouseType.addEventListener('change', function () {
    _changeMinPrice(selectHouseType.value);
  });


  // Selecting guests capacity, depending rooms capacity
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');

  var _changeGuestsCapacity = function (val) {
    selectGuests.value = val === '100' ? '0' : val;
  };

  _changeGuestsCapacity(selectRooms.value);

  selectRooms.addEventListener('change', function () {
    _changeGuestsCapacity(selectRooms.value);
  });


  // Submit form data
  var formElement = document.querySelector('.ad-form');

  var _onSuccessUpload = function (response) {

    if (response) {
      window.console.log(response);
    } else {
      formElement.reset();
      window.console.log('Данные успешно отправлены');
    }
  };

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(formElement), 'https://js.dump.academy/keksobooking', _onSuccessUpload, window.console.log);
  });


  // Disable/enable form, fill field address
  var formInputs = formElement.querySelectorAll('input');
  var formSelects = formElement.querySelectorAll('select');
  var fieldAddress = document.querySelector('#address');

  window.form = {
    enable: function () {
      [].forEach.call(formInputs, function (input) {
        input.removeAttribute('disabled');
      });

      [].forEach.call(formSelects, function (select) {
        select.removeAttribute('disabled');
      });

      formElement.classList.remove('ad-form--disabled');
    },
    disable: function () {
      [].forEach.call(formInputs, function (input) {
        input.setAttribute('disabled', 'disabled');
      });

      [].forEach.call(formSelects, function (select) {
        select.setAttribute('disabled', 'disabled');
      });

      formElement.classList.add('ad-form--disabled');
    },
    setAddress: function (x, y) {
      fieldAddress.value = 'x: ' + x + ', y: ' + y;
    }
  };
})();
