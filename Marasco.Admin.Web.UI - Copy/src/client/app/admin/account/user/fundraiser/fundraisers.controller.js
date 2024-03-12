(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .controller('userFundraisersController', UserFundraisersController);

  UserFundraisersController.inject = [
    '$scope', '$log', 'userFactory', 'fundraiserFactory',
    'uiGridConstants', '$uibModal', 'commonCtrl', 'toastr'];
  function UserFundraisersController(
    $scope, $log, userFactory, fundraiserFactory,
    uiGridConstants, $uibModal, commonCtrl, toastr) {
    var vm = this;
    var itemName = 'fundraiser';

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      setFeatured: function (item) {
        var fundFeatured = {
          fundId: item.identification,
          featured: !item.featured
        };

        fundraiserFactory.setFeatured(fundFeatured).then(
          function (response) {
            toastr.success('Record feature has been updated successfully.');
          },
          function (response) {
            toastr.error('Error in changing [IsFeatured] attribute, ' +
              'please contact to system administrator.');
            $log.error(response);
          });
      },
      edit: function (data) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/account/user/fundraisers.controller.modal.html',
          controller: 'userFundraisersControllerModal',
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
            getItems();
          }
          else {
            toastr.error('Error : ' + response);
          }
        });
      }
    };

    var editButton = '<button class="btn btn-primary btn-xs" ' +
      'ng-click="grid.appScope.itemEvents.edit(row.entity)">' +
      '<span class="glyphicon glyphicon-pencil" style="width:15px;"></span></button>';

    $scope.userFundraiserGridOptions = {
      enableSorting: true,
      showGridFooter: true,
      enableFiltering: true,
      enablePaginationControls: true,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      columnDefs: [
        { field: 'identification', displayName: 'Id', width: 80, enableSorting: true },
        { field: 'title', width: 270, enableSorting: true },
        { field: 'permalink', width: 120, enableSorting: true },
        {
          field: 'featured',
          width: 100,
          cellTemplate: '<div class="text-center">' +
          '<ep-switch' +
          ' model="row.entity.featured"' +
          ' ng-true-value="true" ng-false-value="false"' +
          ' callback="grid.appScope.itemEvents.setFeatured(row.entity)">' +
          '</ep-switch></div>'
        },
        {
          field: 'startDate',
          width: 270,
          enableSorting: true,
          cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"'
        },
        {
          field: 'endDate',
          width: 270,
          enableSorting: true,
          cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"'
        },
        {
          field: 'identification',
          displayName: 'Action',
          cellTemplate: '<div style="padding-left:5px;padding-top:2px;">' +
          editButton + ' </div>',
          enableFiltering: false,
          enableSorting: false,
          width: 100,
          cellClass: 'gridActionCell'
        }
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        $scope.gridApi.core.on.sortChanged($scope, function (grid, sort) {
          $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        });
      }
    };

    function getItems() {

      userFactory.fundraisers($scope.vm.newUser.userName).then(
        function (response) {
          $scope.items = response;
          $scope.userFundraiserGridOptions.data = response;
        },
        function (response) {
          toastr.error('There was a problem getting ' +
            itemName + '.  Check the console');
          $log.error(response);
        }
      );
    }

    activate();
  }
})();
