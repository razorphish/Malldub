fundoloApp.controller('foAccountPasswordCtrl',
  ['$scope', '$log', 'seAuthSvc', 'userSvc',
  function ($scope, $log, seAuthSvc, userSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve    = 'password';
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.password               = {};
    $scope.user                   = seAuthSvc.user;
    $scope.isSetPassword          = angular.isUndefined($scope.user.statusId) || $scope.user.statusId === 'Pending';

    //#endregion

    //#region === Public Methods ===

    $scope.save = function () {
      $scope.isSaving = true;
      if ($scope.passwordForm.$valid) {
        if ($scope.isSetPassword) {
          $scope.setPassword(function () {
            $scope.saveUserStatus('Active');
          });
        } else {
          $scope.changePassword();
        }
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.saveUserStatus = function (status) {

      userSvc.updateStatus(status).then(
        function (promisedUser) {
          $scope.user.statusId = status;
          seAuthSvc.extendUser($scope.user);
          toastr.success('Password saved successfully');
          $scope.isSetPassword = false;
          $scope.isSaving = false;
        },
        function (response) {
          $log.error(response);
          toastr.error('There was an error saving password.  Please try again.');
          $scope.isSaving = false;
        });

    };

    $scope.setPassword = function (callback) {
      $scope.isSaving = true;
      seAuthSvc.setPassword($scope.password).then(
        function (response) {
          if (angular.isFunction(callback)) {
            callback();
          } else {
            toastr.success('Password saved successfully');
            $scope.isSaving = false;
          };
        },
        function (response) {
          $log.error(response);
          toastr.error('Oops! We could not save your password.  Please try again.');
          $scope.isSaving = false;
        });
    };

    $scope.changePassword = function () {
      seAuthSvc.changePassword($scope.password).then(
        function (response) {
          toastr.success('Password saved successfully');
          $scope.isSaving = false;
        },
        function (response) {
          $log.error(response);
          toastr.error('Oops! We could not save your password.' + response.error_description);
          $scope.isSaving = false;
        });
    };

    //#endregion
  }
]);