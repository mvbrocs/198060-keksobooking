'use strict';

(function () {
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var createCardTemplate = function (indexPressedPin) {
    var template = document.querySelector('template');
    var card = template.content.querySelector('.map__card');
    var cloneCard = card.cloneNode(true);
    var ad = window.data[indexPressedPin];

    var title = cloneCard.querySelector('.popup__title');
    title.textContent = ad.offer.title;

    var address = cloneCard.querySelector('.popup__text--address');
    address.textContent = ad.offer.address;

    var price = cloneCard.querySelector('.popup__text--price');
    price.innerHTML = ad.offer.price + ' &#x20bd;/ночь';


    var type = cloneCard.querySelector('.popup__type');
    var adType = ad.offer.type;

    if (adType === 'flat') {
      adType = 'Квартира';
    } else if (adType === 'house') {
      adType = 'Дом';
    } else if (adType === 'bungalo') {
      adType = 'Бунгало';
    }
    type.textContent = adType;

    var capacity = cloneCard.querySelector('.popup__text--capacity');
    capacity.textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';

    var time = cloneCard.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;

    var cloneFeaturesList = cloneCard.querySelector('.popup__features');
    var cloneFeatures = cloneFeaturesList.children;
    var templateCloneFeature = cloneFeatures[0];

    cloneFeaturesList.innerHTML = '';

    var adFeatures = ad.offer.features;

    for (var i = 0; i < adFeatures.length; i++) {
      var adFeature = adFeatures[i];
      var liClone = templateCloneFeature.cloneNode(true);
      liClone.class = '';
      liClone.classList.add('popup__feature', ('popup__feature--' + adFeature));
      cloneFeaturesList.appendChild(liClone);
    }

    var description = cloneCard.querySelector('.popup__description');
    description.textContent = ad.offer.description;

    var avatar = cloneCard.querySelector('.popup__avatar');
    avatar.src = ad.author.avatar;

    var photos = cloneCard.querySelector('.popup__photos');
    var photo = cloneCard.querySelector('.popup__photo');
    photo.src = ad.offer.photos[0];

    for (var j = 1; j < PHOTOS.length; j++) {
      var photoClone = photo.cloneNode(true);
      photoClone.src = ad.offer.photos[j];
      photos.appendChild(photoClone);
    }

    return cloneCard;
  };

  var map = document.querySelector('.map');

  window.card = {
    render: function (indexPressedPin) {
      map.appendChild(createCardTemplate(indexPressedPin));
    }
  };
})();
