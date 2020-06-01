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

const anchors = document.querySelectorAll('.anchor')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// реализация табов

var $tabs = function (target) {
  var
    _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
    _eventTabsShow,
    _showTab = function (tabsLinkTarget) {
      var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
      tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
      tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
      tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
      // если следующая вкладка равна активной, то завершаем работу
      if (tabsLinkTarget === tabsLinkActive) {
        return;
      }
      // удаляем классы у текущих активных элементов
      if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove('tabs__link_active');
      }
      if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove('tabs__pane_show');
      }
      // добавляем классы к элементам (в завимости от выбранной вкладки)
      tabsLinkTarget.classList.add('tabs__link_active');
      tabsPaneTarget.classList.add('tabs__pane_show');
      document.dispatchEvent(_eventTabsShow);
    },
    _switchTabTo = function (tabsLinkIndex) {
      var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
      if (tabsLinks.length > 0) {
        if (tabsLinkIndex > tabsLinks.length) {
          tabsLinkIndex = tabsLinks.length;
        } else if (tabsLinkIndex < 1) {
          tabsLinkIndex = 1;
        }
        _showTab(tabsLinks[tabsLinkIndex - 1]);
      }
    };

  _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

  _elemTabs.addEventListener('click', function (e) {
    var tabsLinkTarget = e.target;
    // завершаем выполнение функции, если кликнули не по ссылке
    if (!tabsLinkTarget.classList.contains('tabs__link')) {
      return;
    }
    // отменяем стандартное действие
    e.preventDefault();
    _showTab(tabsLinkTarget);
  });

  return {
    showTab: function (target) {
      _showTab(target);
    },
    switchTabTo: function (index) {
      _switchTabTo(index);
    }
  }

};

$tabs('.tabs');

var listTabs = document.querySelectorAll('.tabs');
for (var i = 0, length = listTabs.length; i < length; i++) {
  $tabs(listTabs[i]);
}

// маска для поля с телефоном

var inputPhone = document.getElementById("phone");
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};
var phoneMask = IMask(inputPhone, maskOptions);
