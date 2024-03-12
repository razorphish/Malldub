fundoloApp.controller('foAccountStatusCtrl', ['$scope', '$location', 'seAuthSvc', 'pgWePaySvc',
  function ($scope, $location, $seAuthSvc, pgWePaySvc) {

    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'status';
    $scope.isLoadingWePay      = true;
    $scope.facebookStatus      = 'Active';
    $scope.user                = $seAuthSvc.user;
    $scope.status              = angular.isUndefined($scope.user.statusId) ? 'Pending' : $scope.user.statusId;

    $scope.gotoChangePassword = function () {
      $location.path('/account/password');
    };

    verifyWePay();

    //#endregion

    //#region === Public Methods ===

    $scope.resendWePayRegistration = function () {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function (response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function (response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };

    //#endregion

    //#region === Private Methods

    function verifyWePay() {
      pgWePaySvc.verify().then(
      function (response) {
        analyzeAccount(response);
        $scope.isLoadingWePay = false;
      },
      function (response) {
        toastr.error('Oops!  Account information went out to lunch.  Please check again soon!');
        $scope.isLoading = false;
      });
    }

    function analyzeAccount(account) {
      var analysis = pgWePaySvc.analyzeAccount(account);

      $scope.wePayStatus = analysis.wePayStatus;
      $scope.message = analysis.message;
    }

    //#endregion
  }
]);