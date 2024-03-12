fundoloApp.directive('fdControlpanelWidgetsUpdatesDrctv', [
  '$timeout', 'fdDashboardSvc', '$uibModal',
  function ($timeout, fdDashboardSvc, $uibModal) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv.min.html';

    p.link = function($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 5;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 5;
      //=============================


      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        $scope.fundId = fundId;
        $scope.getFundUpdates();
      }

      $scope.getFundUpdates = function () {
        $scope.isLoading = true;


        fdDashboardSvc.allUpdatesByFundIdStatusId($scope.fundId).then(
          function(fundUpdates) {
            $scope.updates = fundUpdates;
            $timeout(function() {
              $('#updateScrollbar').perfectScrollbar();
            }, 1000);
            initDataTable();
          },
          function(response) {
            toastr.error('Unable to get updates.  Please try again');
            $scope.isLoading = false;
          }
        );
      }

      $scope.updateFundUpdate = function (fundUpdate) {
        fundUpdate.isUpdating = true;
        fundUpdate.statusId = 'Deleted';

        fdDashboardSvc.saveUpdate(fundUpdate).then(
          function (response) {
            $scope.updates.splice($scope.updates.indexOf(fundUpdate), 1);
            toastr.success("Post updated successfully");
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems remove the update.  Please try again');
            fundUpdate.isUpdating = false;
          }
        );
      };

      $scope.verifyDelete = function (update, isDeleting) {
        update.isDeleting = isDeleting;
      };

      $scope.postUpdate = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv-mdl.min.html',
          controller: fdControlPanelWidgetsUpdatesMdl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'med',
          resolve: {
            fundId: function () {
              return $scope.fundId;
            }
          }
        });

        modalInstance.result.then(function (response) {
          $scope.updates.splice(0, 0, response);
          $scope.updates.join();
        }, function (responseCode) {

        });
      }

      //#endregion

      //#region === Methods ===
      function initDataTable() {
        $scope.isLoading = false;
        $scope.itemList = $scope.updates;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
      }

      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.items.push($scope.itemList[i]);
          }
        }
      }

      //#endregion

      //#region === Events ===
      $scope.onSelectPage = function () {
        setRecordsToDisplay();
      };
      //#endregion
    }

    p.scope = {}

    return p;
  }
]);