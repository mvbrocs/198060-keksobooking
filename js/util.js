'use strict';

(function () {

  window.util = {
    KeyCode: {
      ESC: 27
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
