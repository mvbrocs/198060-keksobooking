'use strict';

var ADS_NUM = 8;
var AVATAR_PATH = 'img/avatars/user';
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var getRandomInt = function (min, max) {
  var res = Math.floor(Math.random() * (max - min)) + min;
  return res;
};

var createAds = function () {
  var ads = [];

  for (var i = 0; i < ADS_NUM; i++) {
    var avatarNum = i + 1;

    if (avatarNum <= 9) {
      avatarNum = '0' + avatarNum;
    }

    var ad = {};

    var features = FEATURES.slice();
    features.length = getRandomInt(0, FEATURES.length);

    ad.author = {};
    ad.author.avatar = AVATAR_PATH + avatarNum + '.png';

    ad.location = {};
    ad.location.x = getRandomInt(300, 901);
    ad.location.y = getRandomInt(100, 501);

    ad.offer = {};
    ad.offer.title = OFFER_TITLES[i];
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    ad.offer.price = getRandomInt(1000, 1000000);
    ad.offer.type = OFFER_TYPES[getRandomInt(0, OFFER_TYPES.length)];
    ad.offer.rooms = getRandomInt(1, 6);
    ad.offer.guests = getRandomInt(1, 11);
    ad.offer.checkin = OFFER_CHECK_TIMES[getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.checkout = OFFER_CHECK_TIMES[getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.features = features;
    ad.offer.description = '';
    ad.offer.photos = PHOTOS.slice();


    ads.push(ad);
  }

  return ads;
};

var advertisements = createAds();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createMarkersTemplates = function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('template');
  var pin = template.content.querySelector('.map__pin');

  for (var i = 0; i < ADS_NUM; i++) {
    var clonePin = pin.cloneNode(true);
    var cloneAvatar = clonePin.querySelector('img');
    var ad = advertisements[i];

    clonePin.style.left = (ad.location.x - (PIN_WIDTH / 2)) + 'px';
    clonePin.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
    cloneAvatar.src = ad.author.avatar;

    fragment.appendChild(clonePin);
  }

  return fragment;
};

var markersTemplates = createMarkersTemplates();

var renderMarkers = function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(markersTemplates);
};

renderMarkers();

var createCardTemplate = function () {
  var template = document.querySelector('template');
  var card = template.content.querySelector('.map__card');
  var cloneCard = card.cloneNode(true);
  var ad = advertisements[0];

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

var cardTemplate = createCardTemplate();

var renderCardTemplate = function () {
  map.appendChild(cardTemplate);
};

renderCardTemplate();
