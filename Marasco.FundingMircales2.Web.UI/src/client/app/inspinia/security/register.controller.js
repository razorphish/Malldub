(function () {
    'use strict';

    angular
        .module('mars.inspinia.security')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['app', '$state', 'seAuthFactory', 'commonCtrl', 'toastr'];
    function RegisterController(app, $state, seAuthFactory, commonCtrl, toastr) {
        var vm = this;

        vm.isClicked = false;
        vm.showValidationMessages = false;
        vm.regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
        vm.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: ''
        };

        activate();

        ////////////////

        function activate() {
            app.inspiniaUi.authenticateBasics();
        }

        vm.register = function () {
            if (vm.registerForm.Password.$modelValue !==
                vm.registerForm.ConfirmPassword.$modelValue) {
                vm.registerForm.Password.$setValidity('passwordcompare', false);
            }
            else {
                vm.registerForm.Password.$setValidity('passwordcompare', true);
            }

            vm.isClicked = true;
            if (vm.registerForm.$valid) {

                var register = seAuthFactory.register(vm.newUser);
                register.then(
                    function (response) {
                        clearFields();
                        vm.isClicked = false;
                        var AdminUser = response;
                        commonCtrl.confirm('Account Locked',
                            'You have been registered successfully and your account is locked. ' +
                            'Please contact the Administrator (Email :' + AdminUser.email + ' )',
                            vm.redirectToLogin, 'md', true);
                    },
                    function (response) {
                        if (angular.isDefined(response.data.modelState.error)) {
                            toastr.error(response.data.modelState.error);
                        }
                        else {
                            toastr.error('Error in registering user.  Please try again.');
                        }

                        vm.isClicked = false;
                    }
                );
            }

            else {
                if (vm.registerForm.Password.$error.pattern !== undefined) {
                    toastr.warning('Password must be at least 6 characters long and ' +
                        'must contain at least one digit (0-9), one capital letter (A-Z), ' +
                        'one small letter (a-z), and one special character(!@#$%^&).');
                }
                else if (vm.registerForm.Password.$error.passwordcompare !== undefined) {
                    toastr.warning('Password does not match the confirm password.');
                }
                else if (vm.registerForm.firstName.$error.minlength ||
                    vm.registerForm.lastName.$error.minlength) {
                    toastr.warning('Minimum 2 characters are required for First Name/last Name.');
                }
                vm.showValidationMessages = true;
                vm.isClicked = false;
            }
        };

        vm.redirectToLogin = function () {
            $state.go('login');
        };

        function clearFields() {
            vm.newUser.firstName = '';
            vm.newUser.lastName = '';
            vm.newUser.email = '';
            vm.newUser.userName = '';
            vm.newUser.password = '';
            vm.newUser.confirmPassword = '';
        }

        vm.reset = function () {
            clearFields();
            vm.showValidationMessages = false;
        };
    }
})();
