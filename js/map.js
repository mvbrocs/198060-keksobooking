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

var getRandomInt = function (min, max) {
  var res = Math.floor(Math.random() * (max - min)) + min;
  return res;
};


// 1. Create data
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


// 2.
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// 3. Create templates
var createMarkersTemplates = function () {
  var template = document.querySelector('template');
  var pin = template.content.querySelector('.map__pin');
};

createMarkersTemplates();
