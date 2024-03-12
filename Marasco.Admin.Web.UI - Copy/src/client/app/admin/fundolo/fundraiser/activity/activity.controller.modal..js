(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserActivityControllerModal', UserControllerModal);

  UserControllerModal.$inject = [
    '$uibModalInstance', 'items', 'toastr'];

  function UserControllerModal(
    $uibModalInstance, items, toastr) {
    var vm = this;

    vm.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //////////////////////
    function activate() {

    }

    activate();
  }

})();
