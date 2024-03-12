fundoloApp.controller('foAccountWithdrawCtrl', [
  '$scope', '$log', '$window', '$location', 'pgWePaySvc',
  function ($scope, $log, $window, $location, pgWePaySvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve  = 'withdraw';
    $scope.isLoading            = true;
    $scope.isPending            = false;
    $scope.isActive             = false;
    $scope.isReadyForWithdrawal = false;

    //Initialize
    verifyWePay();

    //#endregion

    //#region === Public Methods ===

    $scope.confirmWithdrawal = function () {
      $window.location.href = $scope.withdrawal.withdrawal_uri;
    };

    $scope.gotoBasics = function () {
      $location.path('/account/basics');
    };

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

    $scope.withdraw = function () {
      $scope.isWithdrawing = true;
      pgWePaySvc.withdraw().then(
        function (withdrawal) {
          toastr.success('Mo\' Money! Your account is now ready for withdrawal');
          $scope.isReadyForWithdrawal = true;
          $scope.isWithdrawing = false;
          $scope.withdrawal = withdrawal;
          $scope.isActive = false;
        },
        function (response) {
          toastr.error('Looks like WePay withdrawals are MIA.  Please try again later.');
          $scope.isWithdrawing = false;
        });
    };

    //#endregion

    //#region === Private Methods ===

    function verifyWePay() {
      pgWePaySvc.verify().then(
        function (account) {
          $scope.account = account;
          analyzeAccount(account);
          $scope.isLoading = false;
        },
        function (response) {
          analyzeAccount(response.data);
          $scope.isLoading = false;
        });
    }

    function analyzeAccount(account) {
      var verification = pgWePaySvc.analyzeAccount(account);

      $scope.showAlert = verification.showAlert;
      $scope.alertType = verification.alertType;
      $scope.title     = verification.title;
      $scope.message   = verification.message;

      if (verification.authorizeButtonTitle) {
        $scope.showBlock = true;
        $scope.buttonTitle = verification.authorizeButtonTitle;
      }
      $scope.isPending   = verification.wePayStatus === 'Pending';
      $scope.isActive    = verification.wePayStatus === 'Active' && account.balances[0].balance > 0;
      $scope.wePayAction = verification.callback;
    }

    //#endregion

  }
]);