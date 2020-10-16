'use strict';

(function () {
  var bodyPage = document.querySelector('.body');
  var callOrderButton = document.querySelector('.page-header__order');
  var orderModal = document.querySelector('.modal--order');

  // open modal
  callOrderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderModal.classList.add('modal--show');
    modalConsentCheckbox.focus();
    modalNameInput.value = localStorage.getItem('nameInput');
    modalPhoneInput.value = localStorage.getItem('phoneInput');
    bodyPage.classList.add('modal--open');
  });

  // close modal by close button
  var modalCloseButtons = document.querySelectorAll('.modal__close');
  for (var closeButton = 0; closeButton < modalCloseButtons.length; closeButton++) {
    modalCloseButtons[closeButton].addEventListener('click', function () {
      orderModal.classList.remove('modal--show');
      successModal.classList.remove('modal--show');
      bodyPage.classList.remove('modal--open');
    });
  }

  // close modal success by OK button
  var closeSuccessButton = document.querySelector('.modal__button');
  closeSuccessButton.addEventListener('click', function () {
    successModal.classList.remove('modal--show');
    bodyPage.classList.remove('modal--open');
  });

  // by Esc key
  var modals = document.querySelectorAll('.modal');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== 27) { // fix IE11
      return;
    }
    // if (evt.key !== 'Escape') {
    //   return;
    // }
    for (var modalIndex = 0; modalIndex < modals.length; modalIndex++) {
      modals[modalIndex].classList.remove('modal--show');
    }
    bodyPage.classList.remove('modal--open');
  });

  // by click overlay
  [].map.call(modals, function (modal) {
    modal.addEventListener('click', function (evt) {
      if (evt.target.classList[0] !== 'modal') {
        return;
      }
      modal.classList.remove('modal--show');
      bodyPage.classList.remove('modal--open');
    });
  });

  // validate modal form
  var orderFrom = document.querySelector('.modal__form');
  var modalFiled = orderFrom.querySelector('.modal__fileds');
  var modalNameInput = orderFrom.querySelector('#modal-name');
  var modalPhoneInput = orderFrom.querySelector('#modal-phone');
  var modalConsentCheckbox = orderFrom.querySelector('#modal-consent');

  var addInvalidClass = function (formBlock) {
    formBlock.classList.remove('modal__fileds--valid');
    formBlock.classList.add('modal__fileds--invalid');
  };

  var addValidClass = function (formBlock) {
    formBlock.classList.add('modal__fileds--valid');
    formBlock.classList.remove('modal__fileds--invalid');
  };

  var validateName = function (name, formBlock) {
    if (name.validity.valueMissing) {
      name.setCustomValidity('Как тебя зовут?');
      addInvalidClass(formBlock);
      return;
    }
    if (name.validity.tooShort) {
      name.setCustomValidity('Не меньше ' + modalNameInput.minLength + ' символов');
      addInvalidClass(formBlock);
      return;
    }
    name.setCustomValidity('');
    addValidClass(formBlock);
    localStorage.setItem('nameInput', name.value);
  };

  var validatePhone = function (phone, formBlock) {
    if (phone.validity.valueMissing) {
      phone.setCustomValidity('Укажи номер телефона');
      addInvalidClass(formBlock);
      return;
    }

    phone.setCustomValidity('');
    addValidClass(formBlock);
    localStorage.setItem('phoneInput', phone.value);
  };

  var validateConsent = function (consentCheckbox) {
    if (consentCheckbox.validity.customError) {
      consentCheckbox.setCustomValidity('Подтвердите обработку персональных данных');
      return;
    }
    consentCheckbox.setCustomValidity('');
  };

  modalNameInput.addEventListener('invalid', function () {
    validateName(modalNameInput, modalFiled);
  });

  modalNameInput.addEventListener('input', function () {
    validateName(modalNameInput, modalFiled);
  });

  modalPhoneInput.addEventListener('invalid', function () {
    validatePhone(modalPhoneInput, modalFiled);
  });

  modalPhoneInput.addEventListener('input', function () {
    validatePhone(modalPhoneInput, modalFiled);
  });

  // submit order form
  var successModal = document.querySelector('.modal--success');
  var successButton = successModal.querySelector('.modal__button');
  orderFrom.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateName(modalNameInput, modalFiled);
    validatePhone(modalPhoneInput, modalFiled);
    validateConsent(modalConsentCheckbox);
    orderModal.classList.remove('modal--show');
    successModal.classList.add('modal--show');
    successButton.focus();
  });

  // validate phone into want to go block
  var wantGoForm = document.querySelector('.want-to-go__form');
  var goPhoneInput = wantGoForm.querySelector('#go-phone');
  goPhoneInput.value = localStorage.getItem('phoneInput');

  goPhoneInput.addEventListener('invalid', function () {
    validatePhone(goPhoneInput, wantGoForm);
  });

  goPhoneInput.addEventListener('input', function () {
    validatePhone(goPhoneInput, wantGoForm);
  });

  wantGoForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validatePhone(goPhoneInput, wantGoForm);
    successModal.classList.add('modal--show');
  });

  // switch tabs - programs
  function hideCurrentTab() {
    document.querySelector('.js-tab--show').classList.remove('js-tab--show');
    document.querySelector('.js-tab--active').classList.remove('js-tab--active');
  }

  function showTab(evt) {
    hideCurrentTab();
    var evtButton = evt.target;
    evtButton.classList.add('js-tab--active');
    var buttonClass = evt.target.classList[1];
    var content = document.querySelectorAll('.' + buttonClass)[1];
    content.classList.add('js-tab--show');
  }

  function hideTabs() {
    var tabs = document.querySelectorAll('.js-tab--content');
    for (var tab = 0; tab < tabs.length; tab++) {
      tabs[tab].classList.add('js-tab--hide');
    }
  }

  var tabButtons = document.querySelectorAll('button.js-tab');
  for (var tabButtonIndex = 0; tabButtonIndex < tabButtons.length; tabButtonIndex++) {
    tabButtons[tabButtonIndex].addEventListener('click', showTab);
  }

  window.addEventListener('load', hideTabs);

  // go to tab
  var cards = document.querySelectorAll('.places-visit__link');
  for (var card; card < cards.length; card++) {
    cards[card].addEventListener('click', function (evt) {
      hideCurrentTab();
      var tabTargetId = evt.target.closest('.places-visit__link').attributes.href.value.slice(1);
      var targetButton = document.querySelector('.' + tabTargetId);
      targetButton.classList.add('js-tab--active');
      var tatTarget = document.querySelector('#' + tabTargetId);
      tatTarget.classList.add('js-tab--show');
    });
  }

  // faq accordion
  var faqToggleButtons = document.querySelectorAll('.faq__arrow-link');
  [].map.call(faqToggleButtons, function (faqButton) {
    faqButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      faqButton.parentNode.querySelector('.faq__answer').classList.toggle('faq__answer--hidden');
      faqButton.classList.toggle('faq__arrow-link--opened');
    });
  });

  // validate form in section contacts
  var contactForm = document.querySelector('.contacts__form');
  var contactNameInput = contactForm.querySelector('#contact-name');
  var contactPhoneInput = contactForm.querySelector('#contact-phone');

  contactNameInput.value = localStorage.getItem('nameInput');
  contactPhoneInput.value = localStorage.getItem('phoneInput');

  contactNameInput.addEventListener('invalid', function () {
    validateName(contactNameInput, contactForm);
  });

  contactNameInput.addEventListener('input', function () {
    validateName(contactNameInput, contactForm);
  });

  contactPhoneInput.addEventListener('invalid', function () {
    validatePhone(contactPhoneInput, contactForm);
  });

  contactPhoneInput.addEventListener('input', function () {
    validatePhone(contactPhoneInput, contactForm);
  });

  // submit contact form
  contactForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateName(contactNameInput, contactForm);
    validatePhone(contactPhoneInput, contactForm);
    successModal.classList.add('modal--show');
  });

  // slider reviews
  var $slider = $('.reviews__list');
  if ($slider.length) {
    var currentSlide;
    var slidesCount;
    var sliderCounter = document.createElement('div');
    sliderCounter.classList.add('slider__counter');

    var updateSliderCounter = function (slick) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = slick.slideCount;
      $(sliderCounter).text(currentSlide + '/' + slidesCount);
    };

    $slider.on('init', function (event, slick) {
      $slider.append(sliderCounter);
      updateSliderCounter(slick);
    });

    $slider.on('afterChange', function (event, slick, affterCurrentSlide) {
      updateSliderCounter(slick, affterCurrentSlide);
    });
    $slider.slick();
  }

  // slider live in Israel
  var startIsraelSlider = function () {
    $('.live-in-israel__image-block').slick({
      dots: true,
      infinite: false,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 9999,
          settings: 'unslick',
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        },
      ]
    });
  };

  $(window).on('load resize', function () {
    var withWindow = window.innerWidth;
    if (withWindow < 767) {
      startIsraelSlider();
    }
  });

  // jQuery Mask Plugin
  $('#contact-phone').mask('+7 (000) 000 00 00');
  $('#go-phone').mask('+7 (000) 000 00 00');
  $('#modal-phone').mask('+7 (000) 000 00 00');

})();
