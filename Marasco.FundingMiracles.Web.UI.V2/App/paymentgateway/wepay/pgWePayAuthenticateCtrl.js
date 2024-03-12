'use strict';

fundoloApp.controller('pgWePayAuthenticateCtrl', ['$scope', '$stateParams', '$log', '$location', 'pgWePaySvc',
  function ($scope, $stateParams, $log, $location, pgWePaySvc) {
    //Authenticate the wepay client
    $scope.title = "Connecting and Authorizing WePay...";
    $scope.subTitle = "Please wait a moment as we connect with WePay";
    $scope.requestToken = {
      code: $stateParams.code
    };

    $scope.authorize = function () {
      if (angular.isUndefined($scope.requestToken.code)) {
        $scope.title         = "WePay Authorization";
        $scope.subTitle      = "Allow WePay to connect with Us!";
        $scope.error         = "missing Wepay code.  This usually indicates that you are already registered with WePay.  Please contact us @ support@fundingmiracles.com";
        $scope.isAuthorizing = false;
        toastr.error('The request has responded with ' + response.error_description + '.  Please try again');
      } else {
        $scope.isAuthorizing = true;
        pgWePaySvc.authorize($scope.requestToken).then(
          function(promisedToken) {
            $location.path("/account/overview");
            $scope.isAuthorizing = false;
          },
          function(response) {
            $scope.title         = "WePay Authorization";
            $scope.subTitle      = "Allow WePay to connect with Us!";
            $scope.error         = response.error_description;
            $scope.isAuthorizing = false;
            toastr.error('The request has responded with ' + response.error_description + '.  Please try again');
            $log.error(response);
          });
      }
    };

    //Initialize
    $scope.authorize();
  }
]);