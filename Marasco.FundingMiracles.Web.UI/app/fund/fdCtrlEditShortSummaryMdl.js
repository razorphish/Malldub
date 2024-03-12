var fdCtrlEditShortSummaryMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origShortSummary          = fund.item.shortSummary;
    $scope.shortSummary           = fund.item.shortSummary;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditShortSummaryForm.$valid) {
        fund.item.shortSummary = $scope.shortSummary;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.shortSummary);
          },
          function () {
            fund.item.shortSummary = origShortSummary;
            $scope.isSaving = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        var length = this.fundEditShortSummaryForm.shortSummary.$viewValue.length;
        if (length > 140) {
          toastr.error('You are only allowed to add 140 characters to the short summary.  You are currently at ' + length);
        }
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }

    //#endregion
  }];