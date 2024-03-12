(function () {
  'use strict';

  angular
    .module('mars.admin.security')
    .controller('forgotPasswordController', ForgotPasswordController);

  ForgotPasswordController.$inject = ['$state', 'seAuthFactory', 'app', 'toastr'];

  function ForgotPasswordController($state, seAuthFactory, App, toastr) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      App.marascoUi.authenticateBasics();
    }

    vm.regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
    vm.user = {
      siteUrl: window.location.host
    };

    vm.SendMail = function () {
      if (this.forgotPasswordForm.$valid) {
        seAuthFactory.forgotPassword(vm.user).then(
          function (response) {
            toastr.success('Reset password link has been sent to you Email id.');
            $state.go('login');
          },
          function (response) {
            toastr.error(response.data.message);
          });
      }
      else {
        toastr.warning('Please fill all the fields.');
        vm.showValidationMessgae = true;
      }
    };
  }
})();
