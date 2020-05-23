'use strict';

// Реализация слайдера
var multiItemSlider = (function () {
  return function (selector) {
    var mainElement = document.querySelector(selector); // основный элемент блока
    var sliderWrapper = mainElement.querySelector('.slider__wrapper'); // обертка для .slider-item
    var sliderItems = mainElement.querySelectorAll('.slider__item'); // элементы (.slider-item)
    var sliderControls = mainElement.querySelectorAll('.slider__control'); // элементы управления
    // var sliderControlLeft = mainElement.querySelector('.slider__control--left'); // кнопка "LEFT"
    // var sliderControlRight = mainElement.querySelector('.slider__control--right'); // кнопка "RIGHT"
    var wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width); // ширина обёртки
    var itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    var positionLeftItem = 0; // позиция левого активного элемента
    var transform = 0; // значение транфсофрмации .sliderwrapper
    var step = itemWidth * 4 / wrapperWidth * 100; // величина шага (для трансформации)
    var items = []; // массив элементов
    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({item: item, position: index, transform: 0});
    });

    // var position = {
    //   getMin: 0,
    //   getMax: items.length - 1
    // };

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    };

    var transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform -= step;
      }
      if (direction === 'left') {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    };

    // var transformItem = function (direction) {
    //   if (direction === 'right') {
    //     if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
    //       return;
    //     }
    //     if (!sliderControlLeft.classList.contains('slider__control--show')) {
    //       sliderControlLeft.classList.add('slider__control--show');
    //     }
    //     if (sliderControlRight.classList.contains('slider__control--show') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
    //       sliderControlRight.classList.remove('slider__control--show');
    //     }
    //     positionLeftItem++;
    //     transform -= step;
    //   }
    //   if (direction === 'left') {
    //     if (positionLeftItem <= position.getMin) {
    //       return;
    //     }
    //     if (!sliderControlRight.classList.contains('slider__control--show')) {
    //       sliderControlRight.classList.add('slider__control--show');
    //     }
    //     if (sliderControlLeft.classList.contains('slider__control--show') && positionLeftItem - 1 <= position.getMin) {
    //       sliderControlLeft.classList.remove('slider__control--show');
    //     }
    //     positionLeftItem--;
    //     transform += step;
    //   }
    //   sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    // };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control--right') ? 'right' : 'left';
        transformItem(direction);
      }
    };

    // // обработчик события click для кнопок "назад" и "вперед"
    // var controlClick = function (e) {
    //   if (e.target.classList.contains('slider__control')) {
    //     e.preventDefault();
    //     var direction = e.target.classList.contains('slider__control--right') ? 'right' : 'left';
    //     transformItem(direction);
    //   }
    // };

    var setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    };

    // var setUpListeners = function () {
    //   // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
    //   sliderControls.forEach(function (item) {
    //     item.addEventListener('click', controlClick);
    //   });
    // };

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    };

    // return {
    //   right: function () { // метод right
    //     transformItem('right');
    //   },
    //   left: function () { // метод left
    //     transformItem('left');
    //   }
    // };
  };
}());

var slider = multiItemSlider('.slider');


