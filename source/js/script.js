'use strict';

var aboutCompany = document.querySelector('.about-company');
var aboutCompanyHiddenParts = aboutCompany.getElementsByTagName('span');
var siteNavLinksContainer = document.querySelector('.site-nav__links-container');
var addressContainer = document.querySelector('.address__container');
var listBtn = document.querySelector('.page-footer__list-btn');

if (window.matchMedia('(max-width: 1023px)').matches) {
  for (var i = 0; i < aboutCompanyHiddenParts.length; i++) {
    aboutCompanyHiddenParts[i].textContent = '..';
  }
}

if (window.matchMedia('(max-width: 767px)').matches) {
  siteNavLinksContainer.classList.add('visually-hidden');
  addressContainer.classList.add('visually-hidden');
  listBtn.classList.remove('visually-hidden');
}
