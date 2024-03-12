(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserController', FundraiserController);

  FundraiserController.inject = [
    '$scope', '$log', '$filter',
    'fundraiserFactory', 'uiGridConstants', '$uibModal', 'toastr', 'ready'];

  function FundraiserController(
    $scope, $log, $filter,
    fundraiserFactory, uiGridConstants, $uibModal, toastr, ready) {
    var vm = this;

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      setFeatured: function (item) {
        var fundFeatured = {
          id: item.identification,
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
      addEdit: function (data, isAdd) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/fundolo/fundraiser/fundraiser.controller.modal.html',
          controller: 'fundraiserControllerModal',
          controllerAs: 'vm',
          windowClass: 'xl',
          resolve: {
            isAdd: function () {
              return isAdd;
            },
            items: function () {
              return data;
            },
            isClicked: function () {
              return false;
            },
            fundraiserTabs: function () {
              return ready[0];
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
      'ng-click="grid.appScope.itemEvents.addEdit(row.entity,false)">' +
      '<span class="glyphicon glyphicon-pencil"></span></button>';

    vm.gridOptions = {
      enableSorting: true,
      showGridFooter: true,
      enableFiltering: true,
      enablePaginationControls: true,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      columnDefs: [
        { field: 'identification', displayName: 'Id', enableSorting: true, width: 100 },
        { field: 'item.title', displayName: 'Title', enableSorting: true, width: 250 },
        { field: 'categoryId', displayName: 'Category', enableSorting: true, width: 150 },
        {
          field: 'goalAmount',
          displayName: 'Goal',
          enableSorting: true,
          cellFilter: 'currency: $: 0',
          width: 100
        },
        {
          field: 'item.permalink',
          displayName: 'Permalink', enableSorting: true, width: 125
        },
        {
          field: 'item.endDate',
          displayName: 'End Date',
          enableSorting: true,
          cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"',
          width: 250
        },
        { field: 'item.statusId', displayName: 'Status', enableSorting: true, width: 100 },
        {
          field: 'item.featured',
          displayName: 'Featured',
          width: 100,
          cellTemplate: '<div class="text-center">' +
          '<ep-switch' +
          ' model="row.entity.item.featured"' +
          ' ng-true-value="true" ng-false-value="false"' +
          ' callback="grid.appScope.itemEvents.setFeatured(row.entity)">' +
          '</ep-switch></div>'
        },
        {
          field: 'identification',
          displayName: 'Action',
          cellTemplate: '<div style="padding-left:5px;padding-top:2px;">' +
          editButton + '</div>',
          enableFiltering: false,
          enableSorting: false,
          width: 100,
          cellClass: 'grid-align'
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

    function getItems() {
      var items = fundraiserFactory.all();

      items.then(
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
