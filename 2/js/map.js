'use strict';

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValueFromArray = function (array) {
  return array[getRandomValue(0, array.length - 1)];
};

var getUniqueValueFromArray = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1).toString();
};

var getRandomArray = function (array) {
  var sourceArray = array.slice().sort();
  var randomArray = [];
  var randomLength = getRandomValue(1, (array.length - 1));
  for (var i = 0; i <= randomLength; i++) {
    randomArray[i] = getUniqueValueFromArray(sourceArray);
  }
  return randomArray;
};

var ADVERTS_NUMBER = 8;
var IMAGES = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES_LIST = ['flat', 'house', 'bungalo'];
var TIMES_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var generateAdvert = function () {
  var locationX = getRandomValue(300, 900);
  var locationY = getRandomValue(130, 630);
  var advert = {
    author: {
      avatar: 'img/avatars/user' + getUniqueValueFromArray(IMAGES) + '.png'
    },
    offer: {
      title: getUniqueValueFromArray(TITLES_LIST),
      address: locationX + ', ' + locationY,
      price: getRandomValue(1000, 1000000),
      type: getRandomValueFromArray(TYPES_LIST),
      rooms: getRandomValue(1, 5),
      guests: (Math.floor(Math.random() * 10) + 1),
      checkin: getRandomValueFromArray(TIMES_LIST),
      checkout: getRandomValueFromArray(TIMES_LIST),
      features: getRandomArray(FEATURES_LIST),
      description: '',
      photos: PHOTOS_LIST
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advert;
};

var generateAdvertsArray = function (advertsNumber) {
  var adverts = [];
  for (var i = 0; i < advertsNumber; i++) {
    adverts.push(generateAdvert());
  }
  return adverts;
};

var adverts = generateAdvertsArray(ADVERTS_NUMBER);

var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

showMap();

var renderMapNode = function (offerData) {
  var mapPin = document.createElement('div');
  mapPin.className = 'map__pin';
  mapPin.style.left = offerData.location.x - 30 + 'px';
  mapPin.style.top = offerData.location.y - 87 + 'px';
  var mapPinImg = document.createElement('img');
  mapPinImg.src = offerData.author.avatar;
  mapPinImg.alt = offerData.offer.title;
  mapPinImg.width = '40';
  mapPinImg.height = '40';
  mapPinImg.dragable = 'false';
  mapPin.appendChild(mapPinImg);
  return mapPin;
};

var drawMapPins = function (pinsNumber) {
  var mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < pinsNumber; i++) {
    mapPins.appendChild(renderMapNode(adverts[i]));
  }
};

drawMapPins(ADVERTS_NUMBER);

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var switchOfferType = function (typeOfOffer) {
  if (typeOfOffer === 'flat') {
    return 'Квартира';
  } else if (typeOfOffer === 'bungalo') {
    return 'Бунгало';
  } else {
    return 'Дом';
  }
};

var renderAdvertCard = function (offerData) {
  var renderedCard = mapCardTemplate.cloneNode(true);
  renderedCard.querySelector('.popup__title').textContent = offerData.offer.title;
  renderedCard.querySelector('.popup__text--address').textContent = offerData.offer.address;
  renderedCard.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
  renderedCard.querySelector('.popup__type').textContent = switchOfferType(offerData.offer.type);
  renderedCard.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
  renderedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до' + offerData.offer.checkout;
  renderedCard.querySelector('.popup__description').textContent = offerData.offer.description;

  var popupFeatures = renderedCard.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  for (var t = 0; t < offerData.offer.features.length; t++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + offerData.offer.features[t];
    popupFeatures.appendChild(featureItem);
  }

  var popupPhotos = renderedCard.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  for (var j = 0; j < offerData.offer.photos.length; j++) {
    var photoImage = document.createElement('img');
    photoImage.className = 'popup__photo';
    photoImage.width = '40';
    photoImage.height = '40';
    photoImage.dragable = 'false';
    photoImage.src = offerData.offer.photos[j];
    popupPhotos.appendChild(photoImage);
  }
  return renderedCard;
};

var insertCard = function () {
  document.querySelector('.map').insertBefore(renderAdvertCard(adverts[0]), document.querySelector('.map__filters-container'));
};

renderAdvertCard(adverts[0]);
insertCard();
