(function () {
    'use strict';

    angular
        .module('mars.inspinia.account')
        .controller('userController', UserController);

    UserController.$inject = [
        '$scope', 'userFactory', 'uiGridConstants', '$modal', 'commonCtrl', 'toastr'];

    function UserController(
        $scope, userFactory, uiGridConstants, $modal, commonCtrl, toastr) {

        var vm = this;

        function activate() {
            getUsers();
        }

        $scope.userEvents = {
            lockUnlock: function (userName, lockoutEnabled) {
                vm.lockUnlockUser = function () {

                    userFactory.lockUnlockUser(userName).then(
                        function (response) {
                            getUsers();
                            toastr.success('Record has been updated successfully.');
                        },
                        function (response) {
                            toastr.error('Error in process, ' +
                                'please contact to system administrator.');
                        });

                };

                commonCtrl.confirm('Manage Record',
                    'Are you sure want to process the record ?', vm.lockUnlockUser);
            },
            edit: function (data) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/inspinia/account/user.controller.modal.html',
                    controller: 'userControllerModal',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });

                modalInstance.result.then(function (response) {
                    if (response) {
                        getUsers();
                    }
                    else {
                        toastr.error('Error : ' + response);
                    }
                });
            }
        };

        var editButton = '<button class="btn btn-primary btn-xs" ' +
            'ng-click="grid.appScope.userEvents.edit(row.entity)">' +
            '<span class="glyphicon glyphicon-pencil" style="width:15px;"></span></button>';
        var deleteButton = '<button class="btn btn-danger btn-xs" ' +
            'title="{{row.entity.lockoutEnabled?\'Unlock User\':\'Lock User\'}}" ' +
            'ng-click="grid.appScope.userEvents.lockUnlock(row.entity.userName,' +
            'row.entity.lockoutEnabled)"><span style="width:15px;" ' +
            'ng-class="{\'fa fa-unlock\':row.entity.lockoutEnabled==true, ' +
            '\'fa fa-lock\':row.entity.lockoutEnabled==false}"></span></button>';

        vm.gridOptions = {
            enableSorting: true,
            showGridFooter: true,
            enableFiltering: true,
            enablePaginationControls: true,
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            enableHorizontalScrollbar: true,
            columnDefs: [
                { field: 'firstName', width: 270, enableSorting: true },
                { field: 'lastName', width: 270 },
                { field: 'userName', width: 250, enableSorting: true },
                { field: 'email', width: 300 },
                {
                    field: 'email',
                    displayName: 'Action',
                    cellTemplate: '<div style="padding-left:5px;padding-top:2px;">' +
                    editButton + ' ' +
                    deleteButton + '</div>',
                    enableFiltering: false,
                    enableSorting: false,
                    width: 100,
                    cellClass: 'gridActionCell'
                }
            ],
            data: vm.items,
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, function (grid, sort) {
                    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                });

            }
        };

        function getUsers() {

            userFactory.getAllUsers().then(
                function (response) {
                    vm.items = response;
                    vm.gridOptions.data = response;
                },
                function (response) {
                    toastr.error('Error in get user');
                }
            );
        }

        activate();
    }
})();
