(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .controller('userDonationsController', UserDonationsController);

  UserDonationsController.inject = [
    '$scope', '$log', 'userFactory', 'uiGridConstants', '$uibModal', 'commonCtrl', 'toastr'];
  function UserDonationsController(
    $scope, $log, userFactory, uiGridConstants, $uibModal, commonCtrl, toastr) {
    var vm = this;
    var itemName = 'donation';

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      setFeatured: function (item) {
        var fundFeatured = {
          fundId: item.identification,
          featured: !item.featured
        };
        userFactory.setFeatured(fundFeatured).then(
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
          templateUrl: 'app/admin/account/user/donations.controller.modal.html',
          controller: 'userDonationsControllerModal',
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

    $scope.userDonationsGridOptions = {
      enableSorting: true,
      showGridFooter: true,
      enableFiltering: true,
      enablePaginationControls: true,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      columnDefs: [
        { field: 'identification', displayName: 'Id', width: 80, enableSorting: true },
        { field: 'title', displayName: 'Fundraiser', width: 270, enableSorting: true },
        { field: 'amount', width: 120, enableSorting: true, cellFilter: 'currency: $' },
        {
          field: 'processingFee',
          displayName: 'Processing',
          width: 120, enableSorting: true, cellFilter: 'currency: $'
        },
        {
          field: 'beneficiaryAmount',
          displayName: 'Bene', width: 120,
          enableSorting: true, cellFilter: 'currency: $'
        },
        {
          field: 'systemAmount', width: 120, enableSorting: true,
          cellFilter: 'currency: $'
        },
        {
          field: 'dateEntered',
          width: 270,
          enableSorting: true, cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"'
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

      userFactory.donations($scope.vm.newUser.userName).then(
        function (response) {
          $scope.items = response;
          $scope.userDonationsGridOptions.data = response;
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
