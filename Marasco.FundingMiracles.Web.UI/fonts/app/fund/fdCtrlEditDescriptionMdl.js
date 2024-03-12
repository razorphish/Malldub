var fdCtrlEditDescriptionMdl = [
  '$scope', '$uibModalInstance', '$filter', '$timeout', '$window', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, $timeout, $window, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origDescription           = fund.item.description;
    $scope.description            = fund.item.description;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.showTextEditor         = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditDescriptionForm.$valid) {
        $scope.description = CKEDITOR.instances.funddescription.getData();
        fund.item.description = $scope.description;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.description);
          },
          function () {
            fund.item.description         = origDescription;
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

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        $timeout(function() {
          $window.CKEDITOR.replace('funddescription');
          $scope.showTextEditor = true;
        }, 1000);



        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }

    //#endregion
  }];