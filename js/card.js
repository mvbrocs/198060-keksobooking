'use strict';

(function () {
  var houseNameMap = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {
    create: function (advertData) {
      var card = cardTemplate.cloneNode(true);

      var featuresContainer = card.querySelector('.popup__features');
      var features = featuresContainer.querySelectorAll('.popup__feature');
      var advertFeatures = advertData.offer.features;

      var setFeatures = function () {

        for (var i = features.length - 1; i >= 0; i--) {
          var featureIsExist = false;

          for (var j = 0; j < advertFeatures.length; j++) {

            if (features[i].classList.contains('popup__feature--' + advertFeatures[j])) {
              featureIsExist = true;
            }
          }

          if (!featureIsExist) {
            featuresContainer.removeChild(features[i]);
          }
        }
      };

      var photos = card.querySelector('.popup__photos');
      var photo = card.querySelector('.popup__photo');

      var setPhotos = function () {
        photo.src = advertData.offer.photos[0];

        for (var i = 1; i < advertData.offer.photos.length; i++) {
          var clonePhoto = photo.cloneNode();
          clonePhoto.src = advertData.offer.photos[i];
          photos.appendChild(clonePhoto);
        }
      };

      card.querySelector('.popup__title').textContent = advertData.offer.title;
      card.querySelector('.popup__text--address').textContent = advertData.offer.address;
      card.querySelector('.popup__text--price').innerHTML = advertData.offer.price + ' &#x20bd;/ночь';
      card.querySelector('.popup__type').textContent = houseNameMap[advertData.offer.type];
      card.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' для ' + advertData.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ' выезд до ' + advertData.offer.checkout;
      card.querySelector('.popup__description').textContent = advertData.offer.description;
      card.querySelector('.popup__avatar').src = advertData.author.avatar;
      setFeatures();
      setPhotos();

      return card;
    }
  };
})();
