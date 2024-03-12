(function () {
    'use strict';

    angular
        .module('mars.inspinia.account')
        .controller('profileController', ProfileController);

    ProfileController.$inject = ['$state', 'seAuthFactory', 'toastr'];

    function ProfileController($state, seAuthFactory, toastr) {
        var vm = this;

        function activate() {
            vm.GetUserInfo();
        }

        vm.showValidationMessages = false;
        vm.isClicked = false;
        vm.showValidationMessages = false;
        vm.regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
        vm.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
        };

        vm.user = {
            confirmPassword: '',
            newPassword: '',
            oldPassword: ''
        };

        vm.GetUserInfo = function () {

            seAuthFactory.getUserInfo().then(
                function (response) {
                    vm.newUser = response;
                },
                function (response) {
                    if (angular.isDefined(response.data.errorDescription)) {
                        toastr.error(response.data.errorDescription);
                    } else {
                        toastr.error('Error in Updating.  Please try again.');
                    }

                    vm.isClicked = false;
                }
            );
        };

        vm.ChangePassword = function () {

            if (vm.changePasswordForm.newPassword.$modelValue !==
                vm.changePasswordForm.confirmPassword.$modelValue) {
                this.changePasswordForm.$setValidity('passwordcompare', false);
            }
            else {
                this.changePasswordForm.$setValidity('passwordcompare', true);
            }

            if (this.changePasswordForm.$valid) {

                seAuthFactory.changePassword(vm.user).then(function (response) {
                    toastr.success('Password Changed successfully');
                    $state.go('inspinia.index');
                },
                    function (response) {
                        if (angular.isDefined(response.data.modelState)) {
                            toastr.error(response.data.modelState.error);
                        } else {
                            toastr.error('Error in changing password.  Please try again.');
                        }

                        vm.isClicked = false;
                    }
                );
            }
            else {

                var noWarning = true;
                if (this.changePasswordForm.$error.required !==
                    undefined && this.changePasswordForm.$error.required.length > 0) {
                    toastr.warning('Please make sure that all fields have been filled');
                    noWarning = false;
                }
                else if (this.changePasswordForm.$error.pattern !== undefined &&
                    this.changePasswordForm.$error.pattern.length > 0) {
                    toastr.warning('Passowrd must be at least 6 characters long and must' +
                        ' contain at least one digit (0-9), one capital letter (A-Z), ' +
                        'one small letter (a-z), and one special character(!@#$%^&).');
                    noWarning = false;
                }
                else if (this.changePasswordForm.$error.passwordcompare !==
                    undefined &&
                    this.changePasswordForm.$error.passwordcompare.length > 0) {
                    toastr.warning('Password does not match the confirm password.');
                    noWarning = false;
                }
                if (noWarning) {
                    toastr.warning('Please make sure that all fields have been filled correctly');
                }

                vm.showValidationMessgae = true;
            }
        };

        vm.EditUser = function () {

            vm.isClicked = true;
            if (this.EditProfile.$valid) {
                var register = seAuthFactory.updateUser(vm.newUser);

                register.then(
                    function (response) {

                        toastr.success('You details have been updated successfully.');
                        vm.isClicked = false;

                        $state.go('inspinia.index');
                    },
                    function (response) {
                        if (angular.isDefined(response.data.errorDescription)) {
                            toastr.error(response.data.errorDescription);
                        } else {
                            toastr.error('Error in Updating.  Please try again.');
                        }

                        vm.isClicked = false;
                    }
                );
            }
            else {
                var noWarning = true;
                if (this.EditProfile.$error.required) {
                    toastr.warning('Please make sure that all fields have been filled.');
                    noWarning = false;
                }
                else if (this.EditProfile.firstName.$error.minlength ||
                    this.EditProfile.lastName.$error.minlength) {
                    toastr.warning('Minimum 2 characters are required for First Name/Last Name.');
                    noWarning = false;
                }
                else if (this.EditProfile.Email.$error.pattern) {
                    toastr.warning('Email address is not in correct format.');
                    noWarning = false;
                }
                if (noWarning) {
                    toastr.warning('Please make sure that all fields have been filled correctly');
                }
                vm.isClicked = false;
                vm.showValidationMessages = true;

            }
        };

        function clearFields() {
            vm.newUser.firstName = '';
            vm.newUser.lastName = '';
            vm.newUser.email = '';
            vm.newUser.userName = '';
        }

        vm.cancel = function () {
            $state.go('inspinia.index');
        };

        activate();
    }
})();
