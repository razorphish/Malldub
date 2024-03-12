(function () {
    'use strict';

    angular
        .module('mars.inspinia.account')
        .controller('roleController', RoleController);

    RoleController.$inject =  ['$scope', 'roleFactory', 'uiGridConstants', '$modal', 'toastr'];

    function RoleController($scope, roleFactory, uiGridConstants, $modal, toastr) {

        var vm = this;

        function activate() {
            getRoles();
        }

        $scope.roleEvents = {

            addEdit: function (data, isAdd) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/inspinia/account/role.controller.modal.html',
                    controller: 'roleControllerModal',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {

                        isAdd: function () {

                            return isAdd;

                        },
                        items: function () {

                            return data;
                        },
                        isClicked: function () {
                            return false;
                        }

                    }
                });
                modalInstance.result.then(function (response) {
                    if (response) {
                        getRoles();
                    }
                    else {
                        toastr.error('Error : ' + response);
                    }
                });
            }
        };

        var editButton = '<button class="btn btn-primary btn-xs" ' +
            'ng-click="grid.appScope.roleEvents.addEdit(row.entity,false)">' +
            '<span class="glyphicon glyphicon-pencil"></span></button>';

        vm.gridOptions = {
            enablePaginationControls: true,
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            enableHorizontalScrollbar: true,
            columnDefs: [
                { field: 'name', enableSorting: true, width: 1050 },

                {
                    field: 'id',
                    displayName: 'Action',
                    cellTemplate: '<div style="padding-left:5px;padding-top:2px;">' +
                    editButton + '</div>',
                    enableFiltering: false, enableSorting: false, width: 140,
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

        function getRoles() {
            var roles = roleFactory.getAllRoles();

            roles.then(
                function (response) {
                    vm.items = response;
                    vm.gridOptions.data = response;
                },
                function (response) {
                    toastr.error('Error : ' + response);
                }
            );
        }

        activate();
    }
})();
