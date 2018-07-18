'use strict';

(function () {
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

  var ads = [];

  for (var i = 0; i < ADS_NUM; i++) {
    var avatarNum = i + 1;

    if (avatarNum <= 9) {
      avatarNum = '0' + avatarNum;
    }

    var ad = {};

    var features = FEATURES.slice();
    features.length = window.util.getRandomInt(0, FEATURES.length);

    ad.author = {};
    ad.author.avatar = AVATAR_PATH + avatarNum + '.png';

    ad.location = {};
    ad.location.x = window.util.getRandomInt(300, 901);
    ad.location.y = window.util.getRandomInt(100, 501);

    ad.offer = {};
    ad.offer.title = OFFER_TITLES[i];
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    ad.offer.price = window.util.getRandomInt(1000, 1000000);
    ad.offer.type = OFFER_TYPES[window.util.getRandomInt(0, OFFER_TYPES.length)];
    ad.offer.rooms = window.util.getRandomInt(1, 6);
    ad.offer.guests = window.util.getRandomInt(1, 11);
    ad.offer.checkin = OFFER_CHECK_TIMES[window.util.getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.checkout = OFFER_CHECK_TIMES[window.util.getRandomInt(0, OFFER_CHECK_TIMES.length)];
    ad.offer.features = features;
    ad.offer.description = '';
    ad.offer.photos = PHOTOS.slice();


    ads.push(ad);
  }

  window.data = ads;
})();
