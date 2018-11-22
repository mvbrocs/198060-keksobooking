'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var preview = {};

  preview.init = function (inputFile, onLoad) {

    inputFile.addEventListener('change', function () {
      var file = inputFile.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (value) {
          return fileName.endsWith(value);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            onLoad(reader);
          });

          reader.readAsDataURL(file);
        }
      }
    });
  };

  window.preview = preview;
})();
