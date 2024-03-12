'use strict';

fundoloApp.controller('fdDashboardWidgetsCtrl',['$scope', '$stateParams', 'fdDashboardSvc', 'appUrl',
  function fdDashboardWidgetsCtrl($scope, $stateParams, fdDashboardSvc, appUrl) {
    //Initialize
    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

        $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
        $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
        $scope.cardSrc      = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
        $scope.buttonSrc    = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
        $scope.widgetSrc    = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;
        $scope.isLoading    = false;
      },
      function (response) {
        toastr.error('Problem getting donations', 'There was a problem accessing your donations.  Please try again');
        $scope.isLoading = false;
      }
    );

    //\Initialize
    $scope.showWarning = false;
    $scope.isLoading = true;
  }]);