'use strict';

(function () {
  var TIMEOUT = 10000;

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        try {
          onLoad(JSON.parse(xhr.responseText));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
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
  };

  var save = function (data, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      onLoad();
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', url);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
