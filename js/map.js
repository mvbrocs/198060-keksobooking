var ADS_NUM = 8;
var AVATAR_PATH = 'img/avatars/user';


// Create data
var createAds = function () {
  var ads = [];

  for (var i = 1; i <= ADS_NUM; i++) {
    var avatarNum = '';

    if (i > 9) {
      avatarNum += i;
    } else {
      avatarNum += '0' + i;
    }

    var ad = {};
    ad.author = {};
    ad.author.avatar = AVATAR_PATH + avatarNum + '.png';
  }
};

createAds();
