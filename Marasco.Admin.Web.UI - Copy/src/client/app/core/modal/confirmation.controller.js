(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .controller('confirmationControllerModal', CommonCtrl);

  CommonCtrl.$inject = ['$uibModalInstance', 'message',
    'title', '$sce', 'hideCancel', 'isWarning'];

  function CommonCtrl($uibModalInstance, message,
    title, $sce, hideCancel, isWarning) {
    var vm = this;

    activate();

    vm.message = message;
    vm.title = title;
    vm.hideCancel = hideCancel;
    vm.isWarning = isWarning;

    vm.messageHtml = function () {
      return $sce.trustAsHtml(vm.message);
    };

    vm.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    vm.ok = function () {

      $uibModalInstance.close(true);

    };

    function activate() { }
  }
})();
