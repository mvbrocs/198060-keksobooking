'use strict';

(function () {

  var markErrorField = function (field) {
    field.style.borderColor = 'red';
  };

  window.validation = {
    validate: function (form) {

      form.addEventListener('submit', function (evt) {
        var formIsValid = true;
        var requiredFields = form.querySelectorAll('[required]');

        for (var i = 0; i < requiredFields.length; i++) {
          var field = requiredFields[i];

          if (!field.validity.valid) {
            formIsValid = false;
            markErrorField(field);
          }
        }

        if (!formIsValid) {
          evt.preventDefault();
        }
      });
    }
  };
})();
