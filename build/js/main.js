'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAX_TABLET_WIDTH = 1023;
  var MAX_MOBILE_WIDTH = 767;

  var aboutCompany = document.querySelector('.about-company');
  var aboutCompanyHiddenParts = aboutCompany.getElementsByTagName('span');
  var siteNav = document.querySelector('.site-nav');
  var siteNavLinksContainer = siteNav.querySelector('.site-nav__links-container');
  var address = document.querySelector('.address');
  var addressContainer = address.querySelector('.address__container');
  var listBtns = document.querySelectorAll('.page-footer_list-btn');
  var requestCallBtn = document.querySelector('.header__request-call-btn');
  var overlay = document.querySelector('.overlay');
  var closeOverlayBtn = overlay.querySelector('.close-btn');
  var feedbackForm = overlay.querySelector('.feedback-form');
  var feedbackFormUserName = feedbackForm.querySelector('input[name=user-name]');
  var feedbackFormUserPhone = feedbackForm.querySelector('input[name=user-phone]');
  var feedbackFormUserMessage = feedbackForm.querySelector('textarea');
  var promoBtn = document.querySelector('.promo__btn');
  var pageFooter = document.querySelector('.page-footer');
  var copyRightDate = pageFooter.querySelector('.page-footer__copyright-date');
  var footerLogo = pageFooter.querySelector('.page-footer__logo');
  var body = document.querySelector('body');

  var getMaxMediaExpression = function (maxWidth) {
    return ('(max-width: ' + maxWidth + 'px)');
  };

  var saveInStorage = function (name, value) {
    if (value) {
      localStorage.setItem('name', value);
      return true;
    }
    return false;
  };

  var tabletMaxMediaExpression = getMaxMediaExpression(MAX_TABLET_WIDTH);
  var mobileMaxMediaExpression = getMaxMediaExpression(MAX_MOBILE_WIDTH);

  var closeOverlay = function () {
    overlay.classList.add('visually-hidden');
    closeOverlayBtn.removeEventListener('click', closeOverlayBtnClick);
    document.removeEventListener('keydown', onEscPress);
    saveInStorage('user-name', feedbackFormUserName.value);
    saveInStorage('user-tel', feedbackFormUserPhone.value);
    saveInStorage('user-message', feedbackFormUserMessage.value);
    body.style.overflow = 'visible';
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOverlay();
    }
  };

  var openOverlay = function () {
    document.addEventListener('keydown', onEscPress);
    overlay.classList.remove('visually-hidden');
    feedbackFormUserName.focus();
    closeOverlayBtn.addEventListener('click', closeOverlayBtnClick);
    overlay.addEventListener('click', onOverlayClick);
    body.style.overflow = 'hidden';
  };

  var onOverlayClick = function (evt) {
    if (evt.target === overlay) {
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

  if (window.matchMedia(tabletMaxMediaExpression).matches) {
    var copyRightCopy = copyRightDate.cloneNode(true);

    copyRightDate.remove();
    copyRightCopy.classList.add('page-footer__copyright-date--mobile');
    copyRightCopy.children[0].classList.add('visually-hidden');
    footerLogo.after(copyRightCopy);

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

  if (window.matchMedia(mobileMaxMediaExpression).matches) {
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
})();
