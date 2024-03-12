'use strict';

fundoloApp.controller('fdDashboardSharingCtrl', [
  '$scope', '$stateParams', '$window', '$location', '$log', 'fdDashboardSvc',
  function ($scope, $stateParams, $window, $location, $log, fdDashboardSvc) {

    //#region Initialize

    fdDashboardSvc.summary($stateParams.fundId).then(
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading = false;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      },
      function (response) {
        toastr.error('Problem getting donations', 'There was a problem accessing your donations.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      }
    );

    $scope.showWarning = false;
    $scope.isLoading = true;

    //#endregion

  }
]);