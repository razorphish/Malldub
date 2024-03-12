'use strict';

fundoloApp.controller('fdDashboardCommentsCtrl',
  ['$scope', '$stateParams', 'fdDashboardSvc', function fdDashboardCommentsCtrl($scope, $stateParams, fdDashboardSvc) {
    //Initialize
    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading = false;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
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