(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserActivityController', FundraiserActivityController);

  FundraiserActivityController.inject = [
    '$scope', '$uibModal', '$log', 'toastr', 'uiGridConstants', 'fundraiserFactory'];

  function FundraiserActivityController(
    $scope, $uibModal, $log, toastr, uiGridConstants, fundraiserFactory) {
    var vm = this;
    var itemName = 'activity';
    var hasPaging = true;

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      edit: function (data) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/fundolo/fundraiser/activity/activity.controller.modal.html',
          controller: 'fundraiserActivityControllerModal',
          controllerAs: 'vm',
          windowClass: 'sm',
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

    $scope.fundraiserActivityGridOptions = {
      enableSorting: true,
      showGridFooter: true,
      enableFiltering: true,
      enablePaginationControls: true,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      columnDefs: [
        { field: 'identification', displayName: 'Id', width: 80, enableSorting: true },
        { field: 'activity.memo', displayName: 'Memo', width: 450, enableSorting: true },
        { field: 'activity.typeId', displayName: 'Type', width: 100, enableSorting: true },
        {
          field: 'fundActivityType.friendlyName',
          displayName: 'Fund Type',
          width: 250,
          enableSorting: true
        },
        { field: 'activity.isPrivate', displayName: 'Private?', width: 100, enableSorting: true },
        {
          field: 'activity.dateEntered',
          displayName: 'Date Entered',
          width: 200,
          enableSorting: true,
          sort: { direction: 'desc', priority: 0 },
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

      fundraiserFactory.activity($scope.fund.identification).then(
        function (response) {
          if (hasPaging) {
            $scope.items = response.data;
            $scope.fundraiserActivityGridOptions.data = response.data;
          } else {
            $scope.items = response;
            $scope.fundraiserActivityGridOptions.data = response;
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
