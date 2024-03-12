var fdCtrlEditSettingsMdl = [
  '$scope', '$uibModalInstance', 'fund', 'activeTab',
  function ($scope, $uibModalInstance, fund, activeTab) {

    //#region === Initialize ===

    'use strict';
    $scope.fund = fund;
    $scope.activeTab = activeTab;

    //#endregion

    //#region === Public Methods ===

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //#endregion

  }];