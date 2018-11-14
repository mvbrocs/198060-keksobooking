'use strict';

(function () {
  var map = document.querySelector('.map');

  var page = {};

  page.isEnabled = false;

  page.enable = function () {
    page.isEnabled = true;
    map.classList.remove('map--faded');
    window.form.enable();
    window.backend.download('https://js.dump.academy/keksobooking/data', window.filter.init, window.console.log);
  };

  page.disable = function () {
    page.isEnabled = false;
    map.classList.add('map--faded');
    window.form.disable();
  };

  page.disable();

  window.page = page;
})();
