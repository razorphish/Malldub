fundoloApp.controller('seNavigationCtrl',
['$scope', '$location', 'seAuthSvc',
  function ($scope, $location, seAuthSvc) {
    'use strict';
    $scope.user = seAuthSvc.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.accessLevels = seAuthSvc.accessLevels;

    $scope.logout = function() {
      seAuthSvc.logout().then(
        function(response) {
          toastr.success('You have been successfully logged out');
          //TODO: HACK FOR NOW Until Service Singleton is figured out
          location.reload();
        },
        function(response) {
          toastr.error('Unable to logout');
        });
    };
  }
]);