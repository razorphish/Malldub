var fdCtrlEditCategoryMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'mdCoreDataSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, mdCoreDataSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origCategoryId            = fund.categoryId;
    $scope.categoryId             = fund.categoryId;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    (function() {
      if (seAuthSvc.isLoggedIn()) {
        getFundCategories();
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditCategoryForm.$valid) {
        fund.categoryId = $scope.categoryId;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close(getCategory($scope.categoryId));
          },
          function () {
            fund.categoryId = origCategoryId;
            $scope.isSaving = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function findCategory(categoryToFind) {
      if (angular.isDefined(categoryToFind)) {
        var result = $.grep($scope.fundCategoryOptions, function (e) {
          return e.identification === categoryToFind;
        });

        //should only be one result
        return result[0].identification;
      } else {
        return null;
      }
    };

    function getCategory(categoryToFind) {
      if (angular.isDefined(categoryToFind)) {
        var result = $.grep($scope.fundCategoryOptions, function (e) {
          return e.identification === categoryToFind;
        });

        //should only be one result
        return result[0];
      } else {
        return null;
      }
    };

    function getFundCategories() {
      mdCoreDataSvc.getAllFundCategories().then(
        function (categories) {
          $scope.fundCategoryOptions = categories;
          $scope.categoryId = findCategory(fund.categoryId);
        },
        function (response) {
          $log.error(response);
        });
    }

    //#endregion
  }];