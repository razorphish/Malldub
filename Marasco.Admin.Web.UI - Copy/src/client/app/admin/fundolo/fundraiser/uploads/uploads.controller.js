(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserUploadsController', FundraiserUploadsController);

  FundraiserUploadsController.inject = [
    '$scope', '$uibModal', '$log', 'toastr', 'uiGridConstants', 'commonCtrl',
    'fundraiserUploadsFactory', 'fundraiserFactory'];

  function FundraiserUploadsController(
    $scope, $uibModal, $log, toastr, uiGridConstants, commonCtrl,
    fundraiserUploadsFactory, fundraiserFactory) {
    var vm = this;
    var itemName = 'uploads';
    var gridName = 'fundraiserUploadGridOptions';
    var hasPaging = true;

    function activate() {
      getItems();
    }

    $scope.itemEvents = {
      delete: function (item) {
        vm.delete = function () {

          fundraiserUploadsFactory.delete(item.itemId, item.uploadId).then(
            function (response) {
              getItems();
              toastr.success('Record has been deleted successfully.');
            },
            function (response) {
              toastr.error('Error:, ' +
                'please contact to system administrator.');
            });
        };

        commonCtrl.confirm('Delete Upload?',
          'Are you sure want to delete this item ?', vm.delete);
      },
      save: function (data, isAdd) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/admin/fundolo/fundraiser/' +
          itemName +
          '/' +
          itemName +
          '.controller.modal.html',
          controller: 'fundraiserUploadsControllerModal',
          controllerAs: 'vm',
          windowClass: isAdd ? 'sm' : 'xl',
          resolve: {
            isAdd: function () {
              return isAdd;
            },
            item: function () {
              return data;
            },
            items: function () {
              return $scope[gridName].data;
            },
            fundId: function () {
              return $scope.fund.identification;
            }
          }
        });

        modalInstance.result.then(function (response) {
          if (response) {
            if (response === true) {
              getItems();
            } else {
              $scope[gridName].data = response;
            }
          }
          else {
            toastr.error('Error : ' + response);
          }
        });
      },
      setDefault: function (item) {
        var imageDefault = {
          id: item.identification,
          isDefault: !item.isDefault
        };
        fundraiserUploadsFactory.update(imageDefault).then(
          function (response) {
            toastr.success('Record has been updated successfully.');
          },
          function (response) {
            toastr.error('Error in changing [IsDefault] attribute, ' +
              'please contact to system administrator.');
            $log.error(response);
          });
      }
    };

    var editButton = '<button class="btn btn-primary btn-xs" ' +
      'ng-click="grid.appScope.itemEvents.save(row.entity, false)">' +
      '<span class="glyphicon glyphicon-pencil" style="width:15px;"></span></button>';

    var deleteButton = '<button class="btn btn-danger btn-xs" ' +
      'ng-click="grid.appScope.itemEvents.delete(row.entity, false)">' +
      '<span class="glyphicon glyphicon-remove" style="width:15px;"></span></button>';

    $scope[gridName] = {
      enableSorting: false,
      showGridFooter: true,
      enableFiltering: false,
      enablePaginationControls: false,
      paginationPageSizes: [25, 50, 100],
      paginationPageSize: 25,
      enableHorizontalScrollbar: true,
      rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true">' +
      '<div ' +
      'ng-repeat="(colRenderIndex, col) ' +
      'in colContainer.renderedColumns track by col.colDef.name" ' +
      'class="ui-grid-cell" ' +
      'ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ' +
      'ui-grid-cell>' +
      '</div></div>',
      columnDefs: [
        { field: 'uploadId', displayName: 'Id', width: 80, enableSorting: false },
        {
          field: 'upload.location',
          displayName: 'Media',
          width: 100,
          enableSorting: false,
          cellTemplate:
          '<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>'
        },
        {
          field: 'upload.description',
          displayName: 'Description',
          width: 150,
          enableSorting: false
        },
        {
          field: 'upload.originalFileName',
          displayName: 'FileName',
          width: 100,
          enableSorting: false
        },
        { field: 'upload.categoryId', displayName: 'Category', width: 100, enableSorting: false },
        {
          field: 'sortOrder',
          displayName: 'Order',
          width: 80,
          enableSorting: false,
          //sort: { direction: 'asc', priority: 0 },
        },
        {
          field: 'isDefault',
          displayName: 'Default',
          width: 100,
          cellTemplate: '<div class="text-center">' +
          '<ep-switch' +
          ' model="row.entity.isDefault"' +
          ' ng-true-value="true" ng-false-value="false"' +
          ' callback="grid.appScope.itemEvents.setDefault(row.entity)">' +
          '</ep-switch></div>',
          enableSorting: false
        },
        {
          field: 'upload.containerName',
          displayName: 'Container',
          width: 100,
          enableSorting: false
        },
        {
          field: 'upload.dateUpdated',
          displayName: 'Updated',
          width: 200,
          enableSorting: false,
          //sort: { direction: 'desc', priority: 0 },
          cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"'
        },
        {
          field: 'upload.dateEntered',
          displayName: 'Entered',
          width: 200,
          enableSorting: false,
          //sort: { direction: 'desc', priority: 0 },
          cellFilter: 'date: "MM/dd/yyyy h:mm:ss a"'
        },
        {
          field: 'uploadId',
          displayName: 'Action',
          cellTemplate: '<div style="padding-left:5px;padding-top:2px;">' +
          editButton + ' ' +
          deleteButton +
          ' </div>',
          enableFiltering: false,
          enableSorting: false,
          width: 100,
          cellClass: 'gridActionCell'
        }
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        // Sort changed
        $scope.gridApi.core.on.sortChanged($scope, function (grid, sort) {
          $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        });

        //Dropping event (drag and drop)
        gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
          //$log.info('Dropped', info);
          sortItems(info);
        });
      }
    };

    function sortItems(info) {
      // Update dropped row
      // info.draggedRowEntity
      // info.targetRowEntity
      // into.toIndex, info.fromIndex, info.position
      // Change some values
      // info.draggedRowEntity.sortOrder = info.toIndex;
      // info.targetRowEntity.sortOrder = info.fromIndex;
      // info.draggedRowEntity.sortOrder = info.draggedIndex;
      // info.targetRowEntity.sortOrder = info.targetIndex;

      var promiseDragged = fundraiserUploadsFactory
        .updateSort($scope.fund.identification, $scope[gridName].data)
        .then(function (response) {
          $scope[gridName].data = response;
          toastr.success('Upload sorted successfully');
        }, function (response) {
          toastr.error('There was an error changing the sort order');
        });

    }

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
