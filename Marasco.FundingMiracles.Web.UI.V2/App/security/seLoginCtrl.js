fundoloApp.controller('seLoginCtrl',
['$scope', '$location', '$log', 'seAuthSvc',
  function seLoginCtrl($scope, $location, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isLoggingIn            = false;
    $scope.user                   = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };
    $scope.persistent = false;

    $scope.login = function(user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function(response) {
          $location.path('/controlpanel/fund/list');
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };

  }
]);