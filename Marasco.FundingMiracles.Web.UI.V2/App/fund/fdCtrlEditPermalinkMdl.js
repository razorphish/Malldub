var fdCtrlEditPermalinkMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origPermalink             = fund.item.permalink;
    $scope.permalink              = fund.item.permalink;
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
      if (this.fundEditPermalinkForm.$valid) {
        fund.item.permalink = $scope.permalink;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close(fund.item.permalink);
          },
          function () {
            fund.item.permalink           = origPermalink;
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
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }
    //#endregion

  }];