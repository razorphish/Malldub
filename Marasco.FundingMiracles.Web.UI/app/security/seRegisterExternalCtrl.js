fundoloApp.controller('seRegisterExternalCtrl',
['$scope', '$location', '$stateParams', '$log', 'seAuthSvc', 'mdCoreDataSvc',
  function ($scope, $location, $stateParams, $log, seAuthSvc, mdCoreDataSvc) {
    //#region Initialise
    'use strict';
    $scope.user = {
      email: $stateParams.email,
      firstName: $stateParams.firstName,
      lastName: $stateParams.lastName,
      confirmEmail: $stateParams.email,
      token: $stateParams.token,
      statusId: 'Active'
    };

    $scope.showValidationMessages = false;
    $scope.role = seAuthSvc.userRoles.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.isSaving = false;

    mdCoreDataSvc.getGeoData2().then(
      function(data) {
        $scope.user.geo = data;
        $scope.isLoadingGeo = false;
      },
      function(response) {
        toastr.error('Unable to get Geo data.  Please see administrator');
        $log.error(response);
        $scope.isLoadingGeo = false;
      });

    //#endregion

    // #region Scope Methods

    $scope.register = function(user) {
      $scope.isSaving = true;
      if ($scope.registerForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.registerExternal(user).then(
          function(response) {
            $scope.login($scope.user);
            $scope.isSaving = false;
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
          $location.path('/controlpanel/fund/list').hash(null);
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isSaving = false;
        });
    };

    // #endregion

  }
]);