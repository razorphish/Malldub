fundoloApp.controller('foAccountProfileCtrl',
  ['$scope', '$log', 'mdCoreDataSvc', 'userSvc',
  function ($scope, $log, mdCoreDataSvc, userSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'profile';
    $scope.isLoading           = true;
    $scope.maskingAgent        = "(999) 999-9999";

    mdCoreDataSvc.getAllStates().then(
      function (states) {
        $scope.stateOptions = states;
      },
      function (response) {
        toastr.error('Error getting states.  Please try again');
        $log.error(response);
      });

    userSvc.get().then(
      function (promisedUser) {
        $scope.profile = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was an error retrieving profile information.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      });

    //#endregion

    //#region === Public Methods ===

    $scope.$watch('stateOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedState = $scope.stateOptions[0].identification;
      }
    });

    $scope.$watch('profile', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        if (angular.isDefined($scope.profile.address)) {
          $scope.selectedState = findState($scope.profile.address.state);
        }
      }
    });

    $scope.save = function () {
      $scope.isSaving = true;

      if ($scope.profileForm.$valid) {
        $scope.profile.address.state = $scope.selectedState;
        userSvc.update($scope.profile).then(
          function (response) {
            toastr.success('Profile saved successfully');
            $scope.isSaving = false;
          },
          function (response) {
            toastr.error('There was an error saving this profile.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods

    function findState(stateToFind) {
      var result = $.grep($scope.stateOptions, function (e) {
        return e.identification === stateToFind;
      });

      //should only be one result
      return result[0].identification;
    };

    //#endregion

  }]);