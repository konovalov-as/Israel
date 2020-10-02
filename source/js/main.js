'use strict';

(function () {
  var callOrderButton = document.querySelector('.page-header__order');
  var orderModal = document.querySelector('.modal--order');

  // open modal
  callOrderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderModal.classList.add('modal--show');
    modalNameInput.focus();
    modalNameInput.value = localStorage.getItem('modalNameInput');
    modalPhoneInput.value = localStorage.getItem('modalPhoneInput');
  });

  // close modal by close button
  var modalCloseButtons = document.querySelectorAll('.modal__close');
  modalCloseButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
      orderModal.classList.remove('modal--show');
      successModal.classList.remove('modal--show');
    });
  });

  // close modal success by OK button
  var closeSuccessButton = document.querySelector('.modal__button');
  closeSuccessButton.addEventListener('click', function () {
    successModal.classList.remove('modal--show');
  });

  // by Esc key
  var modals = document.querySelectorAll('.modal');
  document.addEventListener('keydown', function (evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    modals.forEach(function (modal) {
      modal.classList.remove('modal--show');
    });
  });

  // by click overlay
  modals.forEach(function (modal) {
    modal.addEventListener('click', function (evt) {
      if (evt.target.classList[0] !== 'modal') {
        return;
      }
      modal.classList.remove('modal--show');
    });
  });

  // validate form
  var orderFrom = document.querySelector('.modal__form');
  var modalFiled = orderFrom.querySelector('.modal__fileds');
  var modalNameInput = orderFrom.querySelector('#modal-name');
  var modalPhoneInput = orderFrom.querySelector('#modal-phone');

  var addInvalidClass = function () {
    modalFiled.classList.remove('modal__fileds--valid');
    modalFiled.classList.add('modal__fileds--invalid');
  };

  var addValidClass = function () {
    modalFiled.classList.add('modal__fileds--valid');
    modalFiled.classList.remove('modal__fileds--invalid');
  };

  var validateName = function () {
    if (modalNameInput.validity.valueMissing) {
      modalNameInput.setCustomValidity('Как тебя зовут?');
      addInvalidClass();
      return;
    }
    if (modalNameInput.validity.tooShort) {
      modalNameInput.setCustomValidity('Не меньше ' + modalNameInput.minLength + ' символов');
      addInvalidClass();
      return;
    }
    modalNameInput.setCustomValidity('');
    addValidClass();
    localStorage.setItem('modalNameInput', modalNameInput.value);
  };

  var validatePhone = function () {
    if (modalPhoneInput.validity.valueMissing) {
      modalPhoneInput.setCustomValidity('Укажи номер телефона');
      addInvalidClass();
      return;
    }
    if (modalPhoneInput.validity.patternMismatch) {
      modalPhoneInput.setCustomValidity('Укажи 10 цифр номера телефона без 8 или +7');
      addInvalidClass();
      return;
    }
    modalPhoneInput.setCustomValidity('');
    addValidClass();
    localStorage.setItem('modalPhoneInput', modalPhoneInput.value);
  };

  modalNameInput.addEventListener('invalid', function () {
    validateName();
  });

  modalNameInput.addEventListener('input', function () {
    validateName();
  });

  modalPhoneInput.addEventListener('invalid', function () {
    validatePhone();
  });

  modalPhoneInput.addEventListener('input', function () {
    validatePhone();
  });

  // submit order form
  var successModal = document.querySelector('.modal--success');
  orderFrom.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateName();
    validatePhone();
    orderModal.classList.remove('modal--show');
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
    tabs.forEach(function (tab) {
      tab.classList.add('js-tab--hide');
    });
  }

  var tabButton = document.querySelectorAll('button.js-tab');
  tabButton.forEach(function (button) {
    button.addEventListener('click', showTab);
  });

  window.addEventListener('load', hideTabs);

  // go to tab
  var cards = document.querySelectorAll('.places-visit__link');
  cards.forEach(function (card) {
    card.addEventListener('click', function (evt) {
      hideCurrentTab();
      var tabTargetId = evt.target.closest('.places-visit__link').attributes.href.value.slice(1);
      var targetButton = document.querySelector('.' + tabTargetId);
      targetButton.classList.add('js-tab--active');
      var tatTarget = document.querySelector('#' + tabTargetId);
      tatTarget.classList.add('js-tab--show');
    });
  });

})();
