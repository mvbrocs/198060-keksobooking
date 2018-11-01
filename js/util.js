'use strict';

(function () {
  var template = document.querySelector('template');

  window.util = {
    KeyCode: {
      ESC: 27
    },
    getTemplate: function (selector) {

      if (template.children.length) { // IE 11
        return template.querySelector(selector);
      }

      return template.content.querySelector(selector);
    }
  };
})();
