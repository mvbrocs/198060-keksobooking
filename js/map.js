'use strict';

var ADS_NUM = 8;
var MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var ESC_KEYCODE = 27;

var advertisements = createAds();

var map = document.querySelector('.map');

var createPinsTemplates = function () {
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

var pinsTemplates = createPinsTemplates();
var pinsContainer = document.querySelector('.map__pins');

var renderPins = function () {
  pinsContainer.appendChild(pinsTemplates);
};

var createCardTemplate = function (indexPressedPin) {
  var template = document.querySelector('template');
  var card = template.content.querySelector('.map__card');
  var cloneCard = card.cloneNode(true);
  var ad = advertisements[indexPressedPin];

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

var renderCardTemplate = function (indexPressedPin) {
  map.appendChild(createCardTemplate(indexPressedPin));
};

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapIsActive = false;

var disablePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  for (var i = 0; i < adFormFieldsets.length; i++) {
    var fieldset = adFormFieldsets[i];
    fieldset.setAttribute('disabled', '');
  }
};

disablePage();

var pinMain = map.querySelector('.map__pin--main');

var activateMap = function () {
  mapIsActive = true;

  map.classList.remove('map--faded');

  renderPins();

  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < adFormFieldsets.length; i++) {
    var fieldset = adFormFieldsets[i];
    fieldset.removeAttribute('disabled');
  }

  document.addEventListener('click', onMapPinPress);
};

var openPopup = function (indexPressedPin) {
  renderCardTemplate(indexPressedPin);
  deactivatePins();
  document.addEventListener('click', onPopupBtnClose);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  var popup = map.querySelector('.popup');
  map.removeChild(popup);
  deactivatePins();
  document.removeEventListener('click', onPopupBtnClose);
  document.removeEventListener('keydown', onPopupEscPress);
};

var activateMapPin = function (pressedPin) {
  pressedPin.classList.add('map__pin--active');
};

var deactivatePins = function () {
  var pins = pinsContainer.querySelectorAll('.map__pin');

  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];

    if (pin.classList.contains('map__pin--active')) {
      pin.classList.remove('map__pin--active');
    }
  }
};

var onMapPinPress = function (evt) {
  var pressedPin;

  if (evt.target.parentElement.getAttribute('class') === 'map__pin') {
    pressedPin = evt.target.parentElement;
  } else if (evt.target.getAttribute('class') === 'map__pin') {
    pressedPin = evt.target;
  }


  if (pressedPin) {
    var pins = Array.prototype.slice.call(pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)'));
    var indexPressedPin = pins.indexOf(pressedPin);

    openPopup(indexPressedPin);
    activateMapPin(pressedPin);
  }
};

var onPopupBtnClose = function (evt) {

  if (evt.target.classList.contains('popup__close')) {
    closePopup();
  }
};

var onPopupEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

pinMain.addEventListener('mouseup', function () {

  if (!mapIsActive) {
    activateMap();
  }
});

var timeFormSelects = document.querySelectorAll('.ad-form__element--time select');

var setTimeFormSelects = function (selectedIndex) {
  for (var i = 0; i < timeFormSelects.length; i++) {
    var timeFormSelect = timeFormSelects[i];
    timeFormSelect.selectedIndex = selectedIndex;
  }
};

for (var i = 0; i < timeFormSelects.length; i++) {
  timeFormSelects[i].addEventListener('change', function (evt) {
    setTimeFormSelects(evt.target.selectedIndex);
  });
}

var houseType = document.querySelector('#type');
var formInputPrice = document.querySelector('#price');

var changeMinValuePrice = function (selectedValue) {
  formInputPrice.min = MIN_PRICES[selectedValue];
};

changeMinValuePrice(houseType.value);

houseType.addEventListener('change', function (evt) {
  changeMinValuePrice(evt.target.value);
});

var roomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var changeOfferCapacity = function (selectedValue) {

  if (selectedValue !== '100') {
    capacitySelect.value = selectedValue;
  } else if (selectedValue === '100') {
    capacitySelect.value = '0';
  }
};

changeOfferCapacity(roomSelect.value);

roomSelect.addEventListener('change', function (evt) {
  changeOfferCapacity(evt.target.value);
});

var submitBtn = document.querySelector('.ad-form__submit');

var getIncorrectFields = function () {
  var incorrectFields = [];
  var requiredFields = adForm.querySelectorAll('input[required]');

  for (var j = 0; j < requiredFields.length; j++) {

    if (!requiredFields[j].validity.valid) {
      incorrectFields.push(requiredFields[j]);
    }
  }

  return incorrectFields;
};

var markIncorrectFields = function (fields) {

  for (var j = 0; j < fields.length; j++) {
    var field = fields[j];
    field.style.borderColor = 'red';
  }
};

submitBtn.addEventListener('click', function () {
  markIncorrectFields(getIncorrectFields());
});
