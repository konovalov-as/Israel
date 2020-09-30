'use strict';

(function () {
  var callOrderButton = document.querySelector('.page-header__order');
  var orderModal = document.querySelector('.modal--order');

  // var modalPhone = modal.querySelector('input[name=modal-phone]');
  // var modalEmail = modal.querySelector('input[name=modal-email]');

  // open modal
  callOrderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderModal.classList.add('modal--show');
  });
  // modalOpenButtons.forEach(function (button) {
  //   button.addEventListener('click', function (evt) {
  //     evt.preventDefault();
  //     modal.classList.add('modal--show');
  //     modalPhone.focus();
  //     modalPhone.value = localStorage.getItem('modalPhone');
  //     modalEmail.value = localStorage.getItem('modalEmail');
  //   });
  // });

  // close modal by close button
  var modalCloseButtons = document.querySelectorAll('.modal__close');
  modalCloseButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
      orderModal.classList.remove('modal--show');
      successModal.classList.remove('modal--show');
    });
  });

  // submit order form
  var orderFrom = document.querySelector('.modal__form');
  var successModal = document.querySelector('.modal--success');
  orderFrom.addEventListener('submit', function (evt) {
    evt.preventDefault();
    orderModal.classList.remove('modal--show');
    successModal.classList.add('modal--show');
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

})();
