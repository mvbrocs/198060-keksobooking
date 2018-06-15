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
var OFFER_TYPES = [
  'flat',
  'house',
  'bungalo'
];
var OFFER_CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var getRandomInt = function (min, max) {
  var res = Math.floor(Math.random() * (max - min)) + min;
  return res;
};


// 1. Create advertisements data
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

    ad.offer = {};
    ad.offer.title = OFFER_TITLES[i];
    ad.offer.address = location.x + ', ' + location.y;
    ad.offer.price = getRandomInt(1000, 1000000);
    ad.offer.type = OFFER_TYPES[getRandomInt(0, OFFER_TYPES.length)];
    ad.offer.rooms = getRandomInt(1, 6);
    ad.offer.guests = getRandomInt(1, 11);
    ad.offer.checkin = OFFER_CHECK_TIMES[getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.checkout = OFFER_CHECK_TIMES[getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.features = features;
    ad.offer.description = '';
    ad.offer.photos = [];

    ad.location = {};
    ad.location.x = getRandomInt(300, 901);
    ad.location.y = getRandomInt(100, 501);
    ads.push(ad);
  }

  return ads;
};

var advertisements = createAds();


// 2. Show map
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// 3. Create pins templates
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


// 4. Render pins
var renderMarkers = function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(markersTemplates);
};

renderMarkers();


// 5. Create card template
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
  price.textContent = ad.offer.price + '&#x20bd;/ночь';

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

  // Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
  var time = cloneCard.querySelector('.popup__text--time');
  // time.textContent = 'Заезд после'
};
