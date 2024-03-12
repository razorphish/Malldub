(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .controller('userControllerModal', UserControllerModal);

  UserControllerModal.$inject = [
    '$uibModalInstance', 'items', 'userFactory', 'toastr'];

  function UserControllerModal(
    $uibModalInstance, items, userFactory, toastr) {
    var vm = this;

    vm.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    vm.newUser = {
      firstName: items.firstName,
      lastName: items.lastName,
      email: items.email,
      userName: items.userName,
      userRoles: []
    };

    vm.setTabs = function () {
      vm.tabs = [
        {
          heading: 'Roles',
          active: true,
          template: 'app/admin/account/user/roles/roles.controller.html',
          index: 0
        },
        {
          heading: 'Fundraisers',
          active: false,
          template: 'app/admin/account/user/fundraiser/fundraisers.controller.html',
          index: 1
        },
        {
          heading: 'Donations',
          active: false,
          template: 'app/admin/account/user/donations/donations.controller.html',
          index: 2
        }
      ];
    };

    vm.updateUser = function () {

      if (vm.editForm.$valid) {

        if (vm.newUser.userRoles.length >= 1) {

          userFactory.updateUser(vm.newUser).then(
            function (response) {

              toastr.success('You details have been updated successfully.');
              $uibModalInstance.close(true);
            },
            function (response) {

              if (angular.isDefined(response.data.modelState.error)) {
                toastr.error(response.data.modelState.error);
              } else {
                toastr.error('Error in Updating.  Please try again.');
              }

              vm.isClicked = false;
            }
          );
        }
        else {
          toastr.error('User should have at least one Role. Please try again');
        }
      }
      else {

        if (vm.editForm.firstName.$error.minlength ||
          vm.editForm.lastName.$error.minlength) {
          toastr.warning('Minimum 2 characters are required for First Name/last Name.');
        }
        else {
          toastr.warning('Please fill all the fields.');
          vm.showValidationMessages = true;
        }
      }
    };

    vm.rightAllRoles = function (isright) {
      if (isright === 'true') {
        for (var i = 0; i < vm.Roles.length; i++) {
          vm.newUser.userRoles.push(vm.Roles[i]);
        }
        vm.Roles = [];
      }
      else {
        for (var j = 0; j < vm.newUser.userRoles.length; j++) {
          vm.Roles.push(vm.newUser.userRoles[j]);
        }
        vm.newUser.userRoles = [];
      }
    };

    vm.pushrightselectedroles = function (isrightshift) {
      if (isrightshift === 'true') {
        for (var i = 0; i < vm.leftroleItem.length; i++) {
          vm.newUser.userRoles.push(vm.leftroleItem[i]);
          vm.Roles.splice(vm.Roles.map(function (x) { return x.id; })
            .indexOf(vm.leftroleItem[i].id), 1);
        }
      }
      else {
        for (var j = 0; j < vm.rightroleitems.length; j++) {
          vm.Roles.push(vm.rightroleitems[j]);
          vm.newUser.userRoles.splice(vm.newUser.userRoles
            .map(function (x) { return x.id; })
            .indexOf(vm.rightroleitems[j].id), 1);
        }
      }

      vm.leftroleItem = [];
      vm.rightroleitems = [];
    };

    //////////////////////
    function activate() {
      getRoles();
      getUserRoles();
      vm.isAdd = false;
      vm.setTabs();
    }

    function getRoles() {
      userFactory.getAllRoles().then(
        function (response) {
          vm.Roles = response;
        },
        function (response) {
          toastr.error('Error : ' + response);
        }
      );

    }

    function getUserRoles() {
      userFactory.getUserRoles(vm.newUser.userName).then(
        function (response) {
          vm.newUser.userRoles = response;
          splitRoles();
        },
        function (response) {
          toastr.error('Error : ' + response);
        }
      );
    }

    function splitRoles() {
      for (var j = 0; j <= vm.newUser.userRoles.length - 1; j++) {
        vm.Roles.splice(vm.Roles.map(function (x) {
          return x.id || x.identification;
        })
          .indexOf(vm.newUser.userRoles[j].id), 1);
      }
      vm.rolesCount = vm.Roles ? vm.Roles.length : 0;
    }
    activate();
  }

})();
