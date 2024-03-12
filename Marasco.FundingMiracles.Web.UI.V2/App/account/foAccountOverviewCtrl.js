fundoloApp.controller('foAccountOverviewCtrl', [
  '$scope', '$log', 'userSvc', 'pgWePaySvc', 'seAuthSvc',
  function ($scope, $log, userSvc, pgWePaySvc, seAuthSvc) {
    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve    = 'overview';
    $scope.isLoading              = true;
    $scope.isSaving               = false; // Is Saving information
    $scope.user                   = userSvc.user;
    $scope.isLoading              = false; // Is loading page
    $scope.showValidationMessages = false;
    $scope.isVerifying            = true;  // Verifying WePay account
    $scope.isAuthorized           = false; // WePay account is authorized
    $scope.isPending              = false; // WePay account pending
    $scope.isSending              = false; // Resending WePay confirmation
    $scope.showAlert              = false;
    //#endregion 

    pgWePaySvc.verify().then(
      function (verification) {
        analyzeVerification(verification);
        $scope.verification = verification;
        $scope.isVerifying  = false;
        $scope.isAuthorized = true;
      },
      function (response) {
        $scope.verification = {
          email: response.data.email
        };
        switch (response.status) {
          case 500: //not registered
            $scope.alertType = "warning";
            $scope.message = "Our records show that you have not authorized us on your WePay Account.  Please see below for instructions";
            $scope.verification.userState = 'not authorized';
            $scope.authorizeButtonTitle = "Authorize your WePay Account";
            break;
          case 404://not found
            $scope.alertType = "danger";
            $scope.message = "Click 'Connect your WePay Account' below and get withdrawals instantly!";
            $scope.verification.userState = 'not connected';
            $scope.authorizeButtonTitle = "Connect your WePay Account";
            break;
        }
        $scope.title = "WePay Authorization";
        $scope.showAlert = true;
        $scope.isVerifying = false;
      });

    function analyzeVerification(verification) {
      var analysis = pgWePaySvc.analyzeAccount(verification);
      switch (verification.userState) {
        case 'pending':
          $scope.alertType   = "danger";
          $scope.title       = "You're Almost Done";
          $scope.message     = "You will be receiving an email from us to set up you WePay account.  Once you've set up WePay, you'll be able to receive donations.";
          $scope.wePayStatus = analysis.wePayStatus;
          break;
        default:
          $scope.alertType            = analysis.alertType;
          $scope.title                = analysis.title;
          $scope.message              = analysis.message;
          $scope.wePayStatus          = analysis.wePayStatus;
          $scope.authorizeButtonTitle = "Authorize your WePay Account";
      }
      $scope.showAlert = analysis.showAlert;
      $scope.isPending = analysis.wePayStatus === 'Pending';
    }

    $scope.saveUser = function () {
      $scope.isSaving = true;
      if ($scope.accountBasicsForm.$valid) {
        userSvc.updateBasics($scope.user).then(
          function (promisedUser) {
            toastr.success('Successfully saved this user.');
            seAuthSvc.extendUser($scope.user);
            $scope.isSaving = false;
          },
          function (response) {
            $log.error(response);
            toastr.error('There was an error saving this user.  Please try again.');
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.wePay = function () {
      pgWePaySvc.authenticate();
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
  }
]);