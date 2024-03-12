fundoloApp.controller('seConnectExternalCtrl', [
  '$scope', '$location', '$stateParams', '$log', 'seAuthSvc',
  function ($scope, $location, $stateParams, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isLoggingIn            = false;
    $scope.user                   = {
      statusId: 'Active',
      role: $scope.role,
      userName: $stateParams.email
    };
    $scope.persistent = false;

    $scope.login = function(user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function(response) {
          addExternalLogin();
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };

    function addExternalLogin() {
      seAuthSvc.addExternalLogin().then(
        function(response) {
          $location.path('/controlpanel/fund/list').hash(null);
        },
        function(response) {
          toastr.error(response.error_description);
          $log.error(response);
          $scope.isLoggingIn = false;

        });
    }
  }
]);