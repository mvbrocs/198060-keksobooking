'use strict';

(function () {
  window.util = {
    getMaxValue: function (nums) {
      var max = nums[0];

      for (var i = 1; i < nums.length; i++) {

        if (nums[i] > max) {
          max = nums[i];
        }
      }

      return max;
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
