'use strict';

var aboutCompany = document.querySelector('.about-company');
var aboutCompanyHiddenParts = aboutCompany.getElementsByTagName('span');

if (window.matchMedia('(max-width: 768px)').matches) {
  for (var i = 0; i < aboutCompanyHiddenParts.length; i++) {
    aboutCompanyHiddenParts[i].textContent = '..';
  }
}
