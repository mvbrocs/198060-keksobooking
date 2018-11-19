'use strict';

(function () {
  var TIMEOUT = 30000;

  window.backend = {
    download: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {

        if (xhr.status === 200) {
          try {
            onSuccess(JSON.parse(xhr.responseText));
          } catch (err) {
            onError(err);
          }
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
      });

      xhr.open('GET', url);

      xhr.timeout = TIMEOUT;

      xhr.send();
    },
    upload: function (data, url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        onSuccess();
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', url);

      xhr.send(data);
    }
  };
})();
