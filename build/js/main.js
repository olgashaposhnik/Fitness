'use strict';

var swiperReviews = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.reviews__slider__control--right',
    prevEl: '.reviews__slider__control--left',
  },
  loop: true,
});

var swiperTtrainers = new Swiper('.swiper-container-trainers', {
  wrapperClass: 'swiper-wrapper-trainers',
  navigation: {
    nextEl: '.trainers__slider__control--right',
    prevEl: '.trainers__slider__control--left',
  },
  loop: true,
  // slidesPerView: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      // spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 40,
    },
  }
});

// плавная прокрутка к якорю

var anchors = document.querySelectorAll('.anchor');

[].forEach.call(anchors, function (item) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();

    var blockID = item.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// реализация табов

var links = document.querySelectorAll(".tabs__link");
var contentItems = document.querySelectorAll(".tabs__pane");

var onLinkClick = function onLinkClick(e) {
  e.preventDefault();
  var activeTab = e.target.dataset.tab;
  [].forEach.call(links, function (item) {
    item.classList["" + (item.dataset.tab === activeTab ? "add" : "remove")]("tabs__link_active");
  });
  [].forEach.call(contentItems, function (item) {
    item.classList["" + (item.dataset.tab === activeTab ? "add" : "remove")]("tabs__pane_show");
  });
};


[].forEach.call(links, function (item) {
  item.addEventListener('click', onLinkClick);
});


// маска для поля с телефоном

var inputPhone = document.getElementById("phone");
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};
var phoneMask = IMask(inputPhone, maskOptions);
