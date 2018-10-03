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

  var enableForm = function (form) {
    form.classList.remove('ad-form--disabled');
  };

  var disableForm = function (form) {
    form.classList.add('ad-form--disabled');
  };

  var enableFormFieldsets = function (form) {
    var fieldsets = form.querySelectorAll('fieldset');

    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].removeAttribute('disabled');
    }
  };

  var disableFormFieldsets = function (form) {
    var fieldsets = form.querySelectorAll('fieldset');

    for (var k = 0; k < fieldsets.length; k++) {
      fieldsets[k].setAttribute('disabled', '');
    }
  };

  var addressField = document.querySelector('#address');

  var markErrorField = function (field) {
    field.style.borderColor = 'red';
  };

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

  window.form = {
    enable: function (form) {
      enableForm(form);
      enableFormFieldsets(form);
    },
    disable: function (form) {
      disableForm(form);
      disableFormFieldsets(form);
    },
    isValid: function (form) {
      var formIsValid = true;
      var requiredFields = form.querySelectorAll('[required]');

      for (var j = 0; j < requiredFields.length; j++) {
        var field = requiredFields[j];

        if (!field.validity.valid) {
          formIsValid = false;
          markErrorField(field);
        }
      }

      return formIsValid;
    },
    setAddress: function () {
      addressField.value = 'x: ' + (window.pins.pinMain.node.offsetLeft + (window.pins.pinMain.width / 2)) + ', y: ' + (window.pins.pinMain.node.offsetTop + window.pins.pinMain.height);
    }
  };
})();
