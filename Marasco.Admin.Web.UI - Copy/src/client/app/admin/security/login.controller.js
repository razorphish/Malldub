(function () {
  'use strict';

  angular
    .module('mars.admin.security')
    .controller('loginController', LoginController);

  LoginController.$inject = ['$state', 'seAuthFactory', 'app', 'toastr'];

  function LoginController($state, seAuthFactory, App, toastr) {
    var vm = this;

    App.marascoUi.authenticateBasics();

    vm.rememberMe = false;
    vm.rememberUser = {};
    vm.isLoggingIn = false;
    vm.showValidationMessages = false;
    vm.user = {
      userName: '',
      password: ''
    };

    activate();

    ////////////////

    function activate() {

      vm.rememberUser = seAuthFactory.procureUser();

      if (vm.rememberUser.rememberMe) {
        vm.user.userName = vm.rememberUser.userName;
        vm.rememberMe = true;
      }
    }

    vm.login = function () {
      vm.isLoggingIn = true;
      if (vm.loginForm.$valid) {
        seAuthFactory.login(vm.user, vm.rememberMe).then(
          function (response) {
            $state.go('admin.index');
            vm.isLoggingIn = false;
          },
          function (response) {
            if (angular.isDefined(response.data['error_description'])) {
              toastr.error(response.data['error_description']);
            } else {
              toastr.error('Error authenticating user.  Please try again.');
            }

            vm.isLoggingIn = false;
          });
      } else {
        toastr.warning('Please fill all the fields.');
        vm.showValidationMessages = true;
        vm.isLoggingIn = false;
      }
    };

    vm.togglePersistence = function () {
      if (!vm.rememberMe) {
        seAuthFactory.resistUser();
      }
    };
  }
})();
