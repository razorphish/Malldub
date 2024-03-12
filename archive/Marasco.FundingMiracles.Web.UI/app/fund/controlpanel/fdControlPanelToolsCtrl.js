fundoloApp.controller('fdControlPanelToolsCtrl', [
  '$scope','$stateParams', 'fdDashboardSvc',
function fdControlPanelToolsCtrl($scope, $stateParams, fdDashboardSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'tools';

    //#endregion

    //#region === Public Methods ===
  fdDashboardSvc.summary($stateParams.fundId).then(
    //BUG: ANGULAR If object has array as property then it requires isArray: true
    function(fund) {
      $scope.fund = angular.isArray(fund) ? fund[0] : fund;
    },
    function(response) {
      $scope.isLoading = false;
      if (response.status === 404) {
        toastr.error('Either this fund does not exist or access to it has been restricted');
        $location.path('/controlpanel/fund/list');
      }
    });
  //#endregion

  //#region === Private Methods ===


  //#endregion
}
]);