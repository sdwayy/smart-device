'use strict';

var ESC_KEYCODE = 27;

var aboutCompany = document.querySelector('.about-company');
var aboutCompanyHiddenParts = aboutCompany.getElementsByTagName('span');
var siteNav = document.querySelector('.site-nav');
var siteNavLinksContainer = siteNav.querySelector('.site-nav__links-container');
var address = document.querySelector('.address');
var addressContainer = address.querySelector('.address__container');
var listBtns = document.querySelectorAll('.page-footer_list-btn');
var requestCallBtn = document.querySelector('.contacts__request-call-btn');
var overlay = document.querySelector('.overlay');
var closeOverlayBtn = overlay.querySelector('.close-btn');
var feedbackForm = overlay.querySelector('.feedback-form');
var feedbackFormUserName = feedbackForm.querySelector('input[name=user-name]');
var feedbackFormUserPhone = feedbackForm.querySelector('input[name=user-tel]');
var feedbackFormUserMessage = feedbackForm.querySelector('textarea');
var promoBtn = document.querySelector('.promo__btn');

var closeOverlay = function () {
  overlay.classList.add('visually-hidden');
  closeOverlayBtn.removeEventListener('click', closeOverlayBtnClick);
  document.removeEventListener('keydown', onEscPress);
  localStorage.setItem('user-name', feedbackFormUserName.value);
  localStorage.setItem('user-tel', feedbackFormUserPhone.value);
  localStorage.setItem('user-message', feedbackFormUserMessage.value);
};

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var openOverlay = function () {
  document.addEventListener('keydown', onEscPress);
  overlay.classList.remove('visually-hidden');
  closeOverlayBtn.addEventListener('click', closeOverlayBtnClick);
};

var onOverlayClick = function (evt) {
  if (evt.currentTarget === overlay) {
    closeOverlay();
  }
};

var closeOverlayBtnClick = function () {
  closeOverlay();
};

var onRequestCallBtnClick = function () {
  openOverlay();
};

var onListBtnClick = function (listBtn) {
  listBtn.classList.toggle('list-btn--active');

  if (listBtn.parentElement === siteNav) {
    siteNavLinksContainer.classList.toggle('visually-hidden');
  }

  if (listBtn.parentElement === address) {
    addressContainer.classList.toggle('visually-hidden');
  }
};

requestCallBtn.addEventListener('click', onRequestCallBtnClick);
overlay.addEventListener('click', onOverlayClick);

if (window.matchMedia('(max-width: 1023px)').matches) {
  requestCallBtn.removeEventListener('click', onRequestCallBtnClick);
  overlay.removeEventListener('click', onOverlayClick);

  for (
    var hiddenPartIndex = 0;
    hiddenPartIndex < aboutCompanyHiddenParts.length;
    hiddenPartIndex++
  ) {
    aboutCompanyHiddenParts[hiddenPartIndex].textContent = '..';
  }
}

if (window.matchMedia('(max-width: 767px)').matches) {
  siteNavLinksContainer.classList.add('visually-hidden');
  addressContainer.classList.add('visually-hidden');
  promoBtn.textContent = 'Бесплатная консультация';

  for (
    var listBtnIndex = 0;
    listBtnIndex < listBtns.length;
    listBtnIndex++
  ) {
    var currentBtn = listBtns[listBtnIndex];

    currentBtn.classList.remove('list-btn--no-js');
    currentBtn.classList.add('list-btn--js');
    currentBtn.addEventListener('click', function (evt) {
      onListBtnClick(evt.currentTarget);
    });
  }
}
