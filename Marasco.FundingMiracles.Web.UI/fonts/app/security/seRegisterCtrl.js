fundoloApp.controller('seRegisterCtrl',
['$scope', '$location', '$log', 'seAuthSvc', 'mdCoreDataSvc',
  function seRegisterCtrl($scope, $location, $log, seAuthSvc, mdCoreDataSvc) {

    //#region ===Initialise===
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isSaving               = false;
    $scope.readTerms              = true;
    $scope.isLoadingGeo           = true;
    $scope.user = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };

    mdCoreDataSvc.getGeoData2().then(
      function(data) {
        $scope.user.geo = data;
        $scope.isLoadingGeo = false;
      },
      function(response) {
        $log.error(response);
        $scope.isLoadingGeo = false;
      });

    //#endregion 

    //#region Scope methods
    $scope.register = function(user) {
      $scope.isSaving = true;
      if ($scope.registerForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.register(user).then(
          function(response) {
            $scope.login(user);
          },
          function(response) {
            toastr.error(response.error_description);
            $log.error(response);
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
        toastr.error('Oops!  Looks like there are some issues');
      }
    };

    $scope.login = function(user) {
      seAuthSvc.login(user).then(
        function(response) {
          $location.path('/controlpanel/fund/list');
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isSaving = false;
        });
    };
    //#endregion

  }
]);