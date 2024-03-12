(function () {
    'use strict';

    angular
        .module('mars.inspinia.account')
        .controller('roleControllerModal', RoleControllerModal);

    RoleControllerModal.$inject = ['$modalInstance', 'items', 'roleFactory', 'isAdd', 'toastr'];

    function RoleControllerModal($modalInstance, items, roleFactory, isAdd, toastr) {
        var vm = this;

        function activate() {

        }

        vm.isAdd = isAdd;

        vm.newRole = {
            name: items.name,
            id: items.id
        };

        vm.close = function (reason) {
            $modalInstance.dismiss(reason);
        };

        vm.UpdateRole = function () {
            if (this.editForm.$valid) {
                vm.isClicked = true;
                var updateUser = roleFactory.updateRole(vm.newRole);
                updateUser.then(function (response) {
                    $modalInstance.close(true);
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
                var updateUser = roleFactory.addRole(vm.newRole);
                updateUser.then(function (response) {
                    $modalInstance.close(true);
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
