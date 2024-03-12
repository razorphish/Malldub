fundoloApp.controller('fdDashboardSupportersCtrl', [
  '$scope', '$stateParams', 'fdDashboardSvc',
  function fdDashboardSupportersCtrl($scope, $stateParams, fdDashboardSvc) {

    //#region === Initialize ===
    $scope.showWarning = false;
    $scope.isLoading = true;

    fdDashboardSvc.supporters($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('Problem getting supporters', 'There was a problem accessing your fundraiser.  Please try again');
        $scope.isLoading = false;
      }
    );

    //#endregion

  }
]);
