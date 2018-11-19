'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  window.debounce = function (fun) {
    var args = arguments;

    return function () {

      if (lastTimeout) {
        window.clearInterval(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
