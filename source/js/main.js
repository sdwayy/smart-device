'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAX_TABLET_WIDTH = 1023;
  var MAX_MOBILE_WIDTH = 767;

  var $ = window.$;
  var aboutCompany = document.querySelector('.about-company');
  var aboutCompanyHiddenParts = aboutCompany.getElementsByTagName('span');
  var siteNav = document.querySelector('.site-nav');
  var siteNavLinksContainer = siteNav.querySelector('.site-nav__links-container');
  var address = document.querySelector('.address');
  var addressContainer = address.querySelector('.address__container');
  var requestCallBtn = document.querySelector('.header__request-call-btn');
  var overlay = document.querySelector('.overlay');
  var closeOverlayBtn = overlay.querySelector('.close-btn');
  var feedbackForm = overlay.querySelector('.feedback-form');
  var feedbackFormUserName = feedbackForm.querySelector('input[name=user-name]');
  var feedbackFormUserPhone = feedbackForm.querySelector('input[name=user-phone]');
  var feedbackFormUserMessage = feedbackForm.querySelector('textarea');
  var promoBtn = document.querySelector('.promo__btn');
  var pageFooter = document.querySelector('.page-footer');
  var copyrightDate = pageFooter.querySelector('.page-footer__copyright-date');
  var footerLogo = pageFooter.querySelector('.page-footer__logo');
  var body = document.querySelector('body');
  var advantagesBlockAnchor = document.querySelector('.promo__scroll-btn');
  var phoneInputs = document.querySelectorAll('input[type="tel"]');

  var onPhoneInputsFocus = function (evt) {
    var inputValue = evt.currentTarget.value;

    if (!inputValue) {
      evt.currentTarget.value = '+7(';
    }
  };

  var onAnchorClick = function (anchor) {
    var block = $(anchor).attr('href');

    $('html, body').animate({scrollTop: $(block).offset().top + 'px'});
    return false;
  };

  var getMaxMediaExpression = function (maxWidth) {
    return ('(max-width: ' + maxWidth + 'px)');
  };

  var saveInStorage = function (name, value) {
    if (value) {
      localStorage.setItem(name, value);
      return true;
    }
    return false;
  };

  var tabletMaxMediaExpression = getMaxMediaExpression(MAX_TABLET_WIDTH);
  var mobileMaxMediaExpression = getMaxMediaExpression(MAX_MOBILE_WIDTH);

  if (overlay) {
    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeOverlay();
      }
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

    var openOverlay = function () {
      document.addEventListener('keydown', onEscPress);
      overlay.classList.remove('visually-hidden');
      feedbackFormUserName.focus();
      closeOverlayBtn.addEventListener('click', closeOverlayBtnClick);
      overlay.addEventListener('click', onOverlayClick);
      body.style.overflow = 'hidden';
    };

    var closeOverlay = function () {
      overlay.classList.add('visually-hidden');
      closeOverlayBtn.removeEventListener('click', closeOverlayBtnClick);
      document.removeEventListener('keydown', onEscPress);
      saveInStorage('user-name', feedbackFormUserName.value);
      saveInStorage('user-tel', feedbackFormUserPhone.value);
      saveInStorage('user-message', feedbackFormUserMessage.value);
      body.style.overflow = 'visible';
    };
  }

  var accordionLogic = function (element, linksContainer) {
    if (element) {
      var listBtn = element.querySelector('.list-btn');

      if (listBtn) {
        listBtn.classList.remove('list-btn--no-js');
      }

      var onElementClick = function (evt) {
        if (evt.currentTarget === element) {
          linksContainer.classList.toggle('visually-hidden');
          listBtn.classList.toggle('list-btn--active');
        }
      };

      element.addEventListener('click', function (evt) {
        onElementClick(evt);
      });
    }
  };

  if (promoBtn) {
    var onConsultationAnchorClick = function () {
      onAnchorClick(promoBtn);
    };

    promoBtn.addEventListener('click', onConsultationAnchorClick);
  }

  if (advantagesBlockAnchor) {
    var onAdvantagesBlockAnchorClick = function () {
      onAnchorClick(advantagesBlockAnchor);
    };

    advantagesBlockAnchor.addEventListener('click', onAdvantagesBlockAnchorClick);
  }

  if (requestCallBtn) {
    requestCallBtn.addEventListener('click', onRequestCallBtnClick);
  }

  if (phoneInputs.length > 0) {
    for (var phoneInputIndex = 0; phoneInputIndex < phoneInputs.length; phoneInputIndex++) {
      var currentInput = phoneInputs[phoneInputIndex];

      $(currentInput).mask('+7(999)999-9999');

      currentInput.addEventListener('focus', function (evt) {
        onPhoneInputsFocus(evt);
      });
    }
  }

  if (window.matchMedia(tabletMaxMediaExpression).matches) {
    if (copyrightDate) {
      var copyRightCopy = copyrightDate.cloneNode(true);

      copyrightDate.remove();
      copyRightCopy.classList.add('page-footer__copyright-date--mobile');
      copyRightCopy.children[0].classList.add('visually-hidden');
      footerLogo.after(copyRightCopy);
    }

    if (requestCallBtn) {
      requestCallBtn.removeEventListener('click', onRequestCallBtnClick);
    }

    if (overlay) {
      overlay.removeEventListener('click', onOverlayClick);
    }

    if (aboutCompanyHiddenParts) {
      for (
        var hiddenPartIndex = 0;
        hiddenPartIndex < aboutCompanyHiddenParts.length;
        hiddenPartIndex++
      ) {
        aboutCompanyHiddenParts[hiddenPartIndex].textContent = '..';
      }
    }
  }

  if (window.matchMedia(mobileMaxMediaExpression).matches) {
    accordionLogic(siteNav, siteNavLinksContainer);
    accordionLogic(address, addressContainer);

    if (siteNavLinksContainer) {
      siteNavLinksContainer.classList.add('visually-hidden');
    }

    if (addressContainer) {
      addressContainer.classList.add('visually-hidden');
    }

    if (promoBtn) {
      promoBtn.textContent = 'Бесплатная консультация';
    }
  }
})();
