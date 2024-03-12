(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .controller('roleControllerModal', RoleControllerModal);

  RoleControllerModal.$inject = ['$uibModalInstance', 'items', 'roleFactory', 'isAdd', 'toastr'];

  function RoleControllerModal($uibModalInstance, items, roleFactory, isAdd, toastr) {
    var vm = this;

    function activate() {

    }

    vm.isAdd = isAdd;

    vm.newRole = {
      name: items.name,
      identification: items.identification
    };

    vm.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    vm.UpdateRole = function () {
      if (this.editForm.$valid) {
        vm.isClicked = true;
        var updateUser = roleFactory.update(vm.newRole);
        updateUser.then(function (response) {
          $uibModalInstance.close(true);
          toastr.success('You details have been updated successfully.');

        },
          function (response) {
            if (angular.isDefined(response.data.errorDescription)) {
              toastr.error(response.data.errorDescription);
              vm.isClicked = false;
            } else if (response.status === 400 || response.status === 404) {
              vm.isClicked = false;
              toastr.error('Role name already exists.');
            } else {
              vm.isClicked = false;
              toastr.error('Error in Updating.  Please try again.');

            }

          }
        );

      }
      else {
        toastr.warning('Please fill all the fields.');
        vm.showValidationMessages = true;
      }
    };

    vm.addRole = function () {
      if (this.editForm.$valid) {
        vm.isClicked = true;
        var updateUser = roleFactory.add(vm.newRole);
        updateUser.then(function (response) {
          $uibModalInstance.close(true);
          toastr.success('You details have been updated successfully.');

        },
          function (response) {
            if (angular.isDefined(response.data.errorDescription)) {
              toastr.error(response.data.errorDescription);
              vm.isClicked = false;
            } else if (response.status === 404) {
              vm.isClicked = false;
              toastr.error('Role name already exists');
            } else {
              vm.isClicked = false;
              toastr.error('Error in Updating.  Please try again.');

            }

          }
        );

      }
      else {
        toastr.warning('Please fill all the fields.');
        vm.showValidationMessages = true;
      }
    };

    activate();
  }
})();
