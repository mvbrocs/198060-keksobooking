'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    keyCodes: {
      ESC_KEYCODE: ESC_KEYCODE
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
