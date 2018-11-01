'use strict';

(function () {
  var map = document.querySelector('.map');

  var page = {};

  page.isEnabled = false;

  page.enable = function () {
    page.isEnabled = true;
    map.classList.remove('map--faded');
    [].forEach.call(document.querySelectorAll())
  };

  page.disable = function () {
    page.isEnabled = false;
    map.classList.add('map--faded');

  };

  page.disable();

  page.dataIsReady = false;

  window.backend.load('https://js.dump.academy/keksobooking/data', window.pins.render, window.console.log);

  window.page = page;
})();
