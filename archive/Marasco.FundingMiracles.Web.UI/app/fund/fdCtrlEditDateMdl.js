var fdCtrlEditDateMdl = [
  '$scope', '$uibModalInstance', '$filter', '$timeout', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, $timeout, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origEndDate               = fund.item.endDate;
    $scope.endDate                = fund.item.endDate;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    //init
    (function() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditDateForm.$valid) {
        fund.item.endDate = $filter('date')($scope.endDate, 'M/dd/yyyy');;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.endDate);
          },
          function () {
            fund.item.endDate             = origEndDate;
            $scope.isSaving               = false;
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

    //#region === Date Functions ===
    (function() {
      $scope.dt = new Date();
      $scope.minDate = ($scope.minDate) ? null : new Date();
    })();


    $scope.showWeeks = false;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    // date-disabled="disabled(date, mode)"
    $scope.disabled = function (date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };


    $scope.open = function () {
      $timeout(function () {
        $scope.opened = true;
      });
    };

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
    };

    //#endregion
  }];