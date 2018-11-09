'use strict';

(function () {
  var houseNameMap = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = window.util.getTemplate('.map__card');

  window.card = {
    create: function (advertData) {
      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = advertData.offer.title;
      card.querySelector('.popup__text--address').textContent = advertData.offer.address;
      card.querySelector('.popup__text--price').innerHTML = advertData.offer.price + ' &#x20bd;/ночь';
      card.querySelector('.popup__type').textContent = houseNameMap[advertData.offer.type];
      card.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' для ' + advertData.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ' выезд до ' + advertData.offer.checkout;
      card.querySelector('.popup__description').textContent = advertData.offer.description;
      card.querySelector('.popup__avatar').src = advertData.author.avatar;


      // Create features
      var dataFeatures = advertData.offer.features;
      var featuresContainer = card.querySelector('.popup__features');

      if (!dataFeatures.length) {
        featuresContainer.style.display = 'none';
      } else {
        featuresContainer.innerHTML = '';
        var featuresFragment = document.createDocumentFragment();

        dataFeatures.forEach(function (feature) {
          var element = document.createElement('li');
          element.classList.add('popup__feature');
          element.classList.add('popup__feature--' + feature);
          featuresFragment.appendChild(element);
        });

        featuresContainer.appendChild(featuresFragment);
      }


      // Create photos
      var dataPhotos = advertData.offer.photos;
      var photosContainer = card.querySelector('.popup__photos');
      var photoElement = card.querySelector('.popup__photo');

      if (!dataPhotos.length) {
        photosContainer.style.display = 'none';
      } else {
        photosContainer.innerHTML = '';
        var photosFragment = document.createDocumentFragment();

        dataPhotos.forEach(function (dataPhoto) {
          var newPhoto = photoElement.cloneNode(true);
          newPhoto.src = dataPhoto;
          photosFragment.appendChild(newPhoto);
        });

        photosContainer.appendChild(photosFragment);
      }

      return card;
    }
  };
})();
