'use strict';

//#region Profile
fundoloApp.controller('acProfileCtrl', ['$scope', '$log','mdCoreDataSvc', 'userSvc',
  function acProfileCtrl($scope, $log, mdCoreDataSvc, userSvc) {
    $scope.isLoading = true;

    $scope.maskingAgent = "(999) 999-9999";

    mdCoreDataSvc.getAllStates().then(
      function (states) {
        $scope.stateOptions = states;
      },
      function (response) {
        toastr.error('Error getting states.  Please try again');
        $log.error(response);
      });

    userSvc.get().then(
      function(promisedUser) {
        $scope.profile       = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was an error retrieving profile information.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      });

    function findState(stateToFind) {
     var result = $.grep($scope.stateOptions, function(e) {
       return e.identification === stateToFind;
     });

      //should only be one result
      return result[0].identification;
    };

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

    $scope.save = function() {
      $scope.isSaving = true;

      if ($scope.profileForm.$valid) {
        $scope.profile.address.state = $scope.selectedState;
        userSvc.update($scope.profile).then(
          function(response) {
            toastr.success('Profile saved successfully');
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error('There was an error saving this profile.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

  }]);
//#endregion

//#region Withdraw
fundoloApp.controller('acWithdrawCtrl', [
  '$scope', '$log', '$window', '$location', 'pgWePaySvc',
  function acWithdrawCtrl($scope, $log, $window, $location, pgWePaySvc) {
    $scope.isLoading = true;
    $scope.isPending = false;
    $scope.isActive = false;
    $scope.isReadyForWithdrawal = false;

    //Initialize
    verifyWePay();

    function verifyWePay() {
      pgWePaySvc.verify().then(
        function(account) {
          $scope.account = account;
          analyzeAccount(account);
          $scope.isLoading = false;
        },
        function(response) {
          analyzeAccount(response.data);
          $scope.isLoading = false;
        });
    }

    function analyzeAccount(account) {
      var analysis = pgWePaySvc.analyzeAccount(account);
      $scope.showAlert = analysis.showAlert;
      $scope.alertType = analysis.alertType;
      $scope.title = analysis.title;
      $scope.message = analysis.message;
      if (analysis.authorizeButtonTitle) {
        $scope.showBlock = true;
        $scope.buttonTitle = analysis.authorizeButtonTitle;
      }
      $scope.isPending = analysis.wePayStatus === 'Pending';
      $scope.isActive = analysis.wePayStatus === 'Active' && account.balances[0].balance > 0;
    }

    $scope.resendWePayRegistration = function() {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function(response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function(response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };

    $scope.withdraw = function() {
      $scope.isWithdrawing = true;
      pgWePaySvc.withdraw().then(
        function(withdrawal) {
          toastr.success('Mo\' Money! Your account is now ready for withdrawal');
          $scope.isReadyForWithdrawal = true;
          $scope.isWithdrawing = false;
          $scope.withdrawal = withdrawal;
          $scope.isActive = false;
        },
        function(response) {
          toastr.error('Looks like WePay withdrawals are MIA.  Please try again later.');
          $scope.isWithdrawing = false;
        });
    };

    $scope.confirmWithdrawal = function() {
      $window.location.href = $scope.withdrawal.withdrawal_uri;
    };

    $scope.gotoBasics = function() {
      $location.path('/account/basics');
    };
  }
]);
//#endregion
//#region Password
fundoloApp.controller('acPasswordCtrl', ['$scope', '$log', 'seAuthSvc', 'userSvc',
  function acPasswordCtrl($scope, $log, seAuthSvc, userSvc) {
    $scope.isSaving = false;
    $scope.showValidationMessages = false;
    $scope.password = {};
    $scope.user = seAuthSvc.user;
    $scope.isSetPassword = angular.isUndefined($scope.user.statusId) || $scope.user.statusId === 'Pending';

    $scope.save = function () {
      $scope.isSaving = true;
      if ($scope.passwordForm.$valid) {
        if ($scope.isSetPassword) {
          $scope.setPassword(function() {
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
        function(response) {
          if (angular.isFunction(callback)) {
            callback();
          } else {
            toastr.success('Password saved successfully');
            $scope.isSaving = false;
          };
      },
        function(response) {
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
  }
]);
//#endregion

//#region Donations
fundoloApp.controller('acDonationsCtrl', ['$scope', '$log', 'userSvc',
  function acDonationsCtrl($scope, $log, userSvc) {
    $scope.isLoading = true;
    $scope.title     = 'Error';
    $scope.alertType = 'danger'; //warning, success, info
    $scope.message   = '';
    $scope.showAlert = false;

    userSvc.getDonations().then(
      function (donations) {
        $scope.donations = donations;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was a problem loading donations.  Please try again.');
        $log.error(response);
        $scope.isLoading = false;
      });
  }
]);
//#endregion

//#region Basics
fundoloApp.controller('acBasicsCtrl', ['$scope', '$log', 'userSvc', 'seAuthSvc', 'pgWePaySvc',
  function acBasicsCtrl($scope, $log, userSvc, seAuthSvc, pgWePaySvc) {
    $scope.isLoading              = true;
    $scope.isSaving               = false; // Is Saving information
    $scope.user                   = userSvc.user;
    $scope.isLoading              = false; // Is loading page
    $scope.showValidationMessages = false;
    $scope.isVerifying            = true;  // Verifying WePay account
    $scope.isAuthorized           = false; // WePay account is authorized
    $scope.isPending              = false; // WePay account pending
    $scope.isSending              = false; // Resending WePay confirmation

    pgWePaySvc.verify().then(
      function (verification) {
        analyzeVerification(verification);
        $scope.verification = verification;
        $scope.isVerifying = false;
        $scope.isAuthorized = true;
      },
      function (response) {
        $scope.verification = {
          email: response.data.email
        };
        switch(response.status) {
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
          function(promisedUser) {
            toastr.success('Successfully saved this user.');
            seAuthSvc.extendUser($scope.user);
            $scope.isSaving = false;
          },
          function(response) {
            $log.error(response);
            toastr.error('There was an error saving this user.  Please try again.');
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.wePay = function() {
      pgWePaySvc.authenticate();
    };

    $scope.resendWePayRegistration = function () {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function(response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function(response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };
  }
]);
//#endregion

//#region Social
fundoloApp.controller('acSocialCtrl', [ '$scope', '$log', 'seAuthSvc',
  function acSocialCtrl($scope, $log, seAuthSvc) {
    $scope.isLoading  = true;
    $scope.isRemoving = false;

    seAuthSvc.manageInfo().then(
      function(manageList) {
        $scope.manageList = manageList;
        $scope.isLoading = false;
      },
      function(response) {
        toastr.error('There was a problem getting your connections.' + response.error_description);
        $log.error(response);
        $scope.isLoading = false;
      });

    $scope.removeConnection = function(loginProvider, providerKey) {
      $scope.isRemoving = true;

      seAuthSvc.removeLogin({
        loginProvider: loginProvider,
        providerKey: providerKey
      }).then(
        function(response) {
          toastr.success('Successfully removed ' + connection + ' connection');
          $scope.isRemoving = false;
        }, function(response) {
          toastr.error('There was an error removing the connection: ' + response.error_description);
          $log.error(response);
        $scope.isRemovig = false;
      });
    };
  }
]);
//#endregion

//#region Notifications
fundoloApp.controller('acNotificationsCtrl', [
  '$scope', '$log',
  function acNotificationsCtrl($scope, $log) {

  }
]);
//#endregion

//#region Status
fundoloApp.controller('acStatusCtrl', ['$scope', '$location', 'seAuthSvc', 'pgWePaySvc',
  function acStatusCtrl($scope, $location, $seAuthSvc, pgWePaySvc) {
    $scope.isLoadingWePay = true;
    $scope.facebookStatus = 'Active';
    
    $scope.user = $seAuthSvc.user;
    $scope.status = angular.isUndefined($scope.user.statusId) ? 'Pending' : $scope.user.statusId;
    $scope.gotoChangePassword = function() {
      $location.path('/account/password');
    };

    //Initialize
    verifyWePay();

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
      $scope.message     = analysis.message;
    }

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
//#endregion

//#region Close Account
fundoloApp.controller('acCloseCtrl', [
  '$scope', '$log',
  function acCloseCtrl($scope, $log) {

  }
]);
//#endregion
