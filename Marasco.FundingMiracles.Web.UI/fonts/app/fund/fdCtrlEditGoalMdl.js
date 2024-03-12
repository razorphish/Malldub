var fdCtrlEditGoalMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origGoal                  = fund.goalAmount;
    $scope.goalAmount             = fund.goalAmount;
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
      if (this.fundEditAmountForm.$valid) {
        fund.goalAmount = $scope.goalAmount;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.goalAmount);
          },
          function () {
            fund.goalAmount               = origGoal;
            $scope.isSaving               = false;
            $scope.showValidationMessages = true;
            toastr.error('There was a problem saving the amount.  Please try again');
          });
      } else {
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