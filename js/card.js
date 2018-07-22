'use strict';

(function () {
  var ADVERT_TYPE_RUS = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  window.card = {
    render: function (advertData) {
      var card = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

      card.querySelector('.popup__title').textContent = advertData.offer.title;
      card.querySelector('.popup__text--address').textContent = advertData.offer.address;
      card.querySelector('.popup__text--price').innerHTML = advertData.offer.price + ' &#x20bd;/ночь';
      card.querySelector('.popup__type').textContent = ADVERT_TYPE_RUS[advertData.offer.type];
      card.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' для ' + advertData.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ' выезд до ' + advertData.offer.checkout;

      var cardFeaturesContainer = card.querySelector('.popup__features');
      var cardFeatures = cardFeaturesContainer.querySelectorAll('.popup__feature');
      var advertFeatures = advertData.offer.features;

      for (var i = cardFeatures.length - 1; i >= 0; i--) {
        var featureIsExist = false;

        for (var j = 0; j < advertFeatures.length; j++) {

          if (cardFeatures[i].classList.contains('popup__feature--' + advertFeatures[j])) {
            featureIsExist = true;
          }
        }

        if (!featureIsExist) {
          cardFeaturesContainer.removeChild(cardFeatures[i]);
        }
      }

      card.querySelector('.popup__description').textContent = advertData.offer.description;
      card.querySelector('.popup__avatar').src = advertData.author.avatar;

      var photos = card.querySelector('.popup__photos');
      var photo = card.querySelector('.popup__photo');
      photo.src = advertData.offer.photos[0];

      for (var k = 1; k < advertData.offer.photos.length; k++) {
        var clonePhoto = photo.cloneNode();
        clonePhoto.src = advertData.offer.photos[k];
        photos.appendChild(clonePhoto);
      }

      return card;
    }
  };
})();
