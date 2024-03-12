(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .factory('commonCtrl', commonCtrl);

  commonCtrl.$inject = ['$uibModal'];

  function commonCtrl($uibModal) {
    var factory = {
      confirm: _confirm
    };

    return factory;

    function _confirm(title, message, callback, size, hideCancel, isWarning) {
      if (size === undefined || size === '') {
        size = 'sm';
      }
      if (hideCancel === undefined || hideCancel === '') {
        hideCancel = false;
      }
      if (isWarning === undefined || isWarning === '') {
        isWarning = false;
      }
      var modalInstance = $uibModal.open({
        templateUrl: 'app/core/modal/confirmation.controller.html',
        controller: 'confirmationControllerModal',
        controllerAs: 'vm',
        size: size,
        resolve: {
          title: function () { return title; },
          message: function () { return message; },
          hideCancel: function () { return hideCancel; },
          isWarning: function () { return isWarning; }
        }

      });

      modalInstance.result.then(function (response) {
        callback();
      }, function (response) {

      });
    }
  }
})();
