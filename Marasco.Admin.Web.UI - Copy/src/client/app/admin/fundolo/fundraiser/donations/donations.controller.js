(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserDonationController', FundraiserDonationController);

  FundraiserDonationController.inject = [
    '$scope', '$log', '$filter',
    'fundraiserFactory', 'fundraiserDonationsFactory',
    'uiGridConstants', '$uibModal', 'commonCtrl', 'toastr'];

  function FundraiserDonationController(
    $scope, $log, $filter,
    fundraiserFactory, fundraiserDonationsFactory,
    uiGridConstants, $uibModal, commonCtrl, toastr) {

    var vm = this;
    var itemName = 'donations';
    var gridName = 'fundraiserDonationGridOptions';
    var hasPaging = true;

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      save: function (data, isAdd) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/fundolo/fundraiser/' + itemName +
          '/' + itemName + '.controller.modal.html',
          controller: 'fundraiserDonationsControllerModal',
          controllerAs: 'vm',
          windowClass: 'xl',
          resolve: {
            item: function () {
              return data;
            },
            isAdd: function () {
              return isAdd;
            },
            tabs: function () {
              var tabs = $filter('filter')($scope.$parent.scopeTabs,
                {
                  tabSetName: 'fundraiserDonation'
                },
                function (actual, expected) {
                  return angular.equals(actual, expected);
                });

              return tabs;
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
      },
      update: function (item, action) {

        switch (action) {
          case 'privateAmount':
            item.isPrivateAmount = !item.isPrivateAmount;
            break;
          case 'privateDonorName':
            item.isPrivateDonorName = !item.isPrivateDonorName;
            break;
          default:
            toastr('Invalid update action.  Please try again!');
            return;
        }

        fundraiserDonationsFactory.update(item).then(
          function (response) {
            toastr.success('Record has been updated successfully.');
          },
          function (response) {
            toastr.error('Error in updating ' + itemName + '.  ' +
              'Please contact to system administrator.');
            $log.error(response);
          });
      }
    };

    var editButton = '<button class="btn btn-primary btn-xs" ' +
      'ng-click="grid.appScope.itemEvents.save(row.entity, false)">' +
      '<span class="glyphicon glyphicon-pencil" style="width:15px;"></span></button>';

    $scope[gridName] = {
      enableSorting: true,
      showGridFooter: true,
      enableFiltering: true,
      enablePaginationControls: true,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      columnDefs: [
        { field: 'identification', displayName: 'Id', width: 80, enableSorting: true },
        { field: 'user.firstName', displayName: 'First Name', width: 125, enableSorting: true },
        { field: 'user.lastName', displayName: 'First Name', width: 125, enableSorting: true },
        {
          field: 'isPrivateAmount',
          displayName: 'Private Amt',
          width: 120,
          cellTemplate: '<div class="text-center">' +
          '<ep-switch' +
          ' model="row.entity.isPrivateAmount"' +
          ' ng-true-value="true" ng-false-value="false"' +
          ' callback="grid.appScope.itemEvents.update(row.entity, \'privateAmount\')">' +
          '</ep-switch></div>'
        },
        {
          field: 'isPrivateDonorName',
          displayName: 'Private Name',
          width: 120,
          cellTemplate: '<div class="text-center">' +
          '<ep-switch' +
          ' model="row.entity.isPrivateDonorName"' +
          ' ng-true-value="true" ng-false-value="false"' +
          ' callback="grid.appScope.itemEvents.update(row.entity, \'privateDonorName\')">' +
          '</ep-switch></div>'
        },
        { field: 'amount', width: 120, enableSorting: true, cellFilter: 'currency: $: 0' },
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
          width: 200,
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

      fundraiserFactory[itemName]($scope.fund.identification).then(
        function (response) {
          if (hasPaging) {
            $scope.items = response.data;
            $scope[gridName].data = response.data;
          } else {
            $scope.items = response;
            $scope[gridName].data = response;
          }
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
