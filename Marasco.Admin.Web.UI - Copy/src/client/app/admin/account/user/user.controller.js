(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .controller('userController', UserController);

  UserController.$inject = [
    '$scope', '$log', 'userFactory', 'uiGridConstants', '$uibModal', 'commonCtrl', 'toastr'];

  function UserController(
    $scope, $log, userFactory, uiGridConstants, $uibModal, commonCtrl, toastr) {

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
              toastr.success('Record has been updated successfully.' +
                lockoutEnabled ? 'Unlocked' : 'Locked');
              $log.info(userName + ': ' + lockoutEnabled ? 'Unlock' : 'Lock');
            },
            function (response) {
              toastr.error('Error in changing lock for user, ' +
                'please contact to system administrator.');
              $log.error(response);
            });

        };

        var lockText = lockoutEnabled ? 'Unlock' : 'Lock';

        commonCtrl.confirm(lockText + ' Account',
          'Are you sure want to ' + lockText + ' this account?', vm.lockUnlockUser);
      },
      edit: function (data) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/account/user/user.controller.modal.html',
          controller: 'userControllerModal',
          controllerAs: 'vm',
          windowClass: 'xl',
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
        { field: 'id', width: 300 },
        { field: 'firstName', width: 150, enableSorting: true },
        { field: 'lastName', width: 150 },
        { field: 'userName', width: 200, enableSorting: true },
        { field: 'email', width: 250 },
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
          toastr.error('There was a problem getting users.  Check the console');
          $log.error(response);
        }
      );
    }

    activate();
  }
})();
