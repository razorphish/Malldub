var fdCtrlEditTitleMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origTitle                 = fund.item.title;
    $scope.title                  = fund.item.title;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    // Init modal
    (function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    //#endregion

    //#region === Public Methods ===

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function() {
      $scope.isSaving = true;
      if (this.fundEditTitleForm.$valid) {
        fund.item.title = $scope.title;
        fdDashboardSvc.save(fund).then(
          function() {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.title);
          },
          function() {
            fund.item.title = origTitle;
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


    //#endregion
  }];