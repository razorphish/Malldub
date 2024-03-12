fundoloApp.controller('seResetPasswordCtrl',
  ['$scope', '$location', '$log', 'seAuthSvc',
  function ($scope, $location, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.isResetting = false;

    $scope.resetPassword = function () {
      if ($scope.resetPasswordForm.$valid) {
        $scope.isResetting = true;
        seAuthSvc.resetPassword({
          email: $scope.emailAddress
        }).then(function() {
          toastr.success('Found you!  We sent an email to you with what to do next');
          $scope.emailAddress = '';
          $location.path('\login');
          $scope.isResetting = false;
        }, function(response) {
          $log.error(response);
          toastr.error('Whoa! We tried but couldn\'t find you in our system.  Try it again!');
          $scope.isResetting = false;
        });
        $scope.isResetting = false;
      } else {
        $scope.showValidationMessages = true;
        $scope.isResetting = false;
        toastr.error('Oops!  Looks like some things are missing');
      }
    };

  }]);