'use strict';

fundoloApp.factory('pgWePaySvc', [
  '$resource', '$q', '$log', '$window', 'seAuthSvc', 'wePayConst', 'appUrl',
  function ($resource, $q, $log, $window, seAuthSvc, wePayConst, appUrl) {
    var p = {};

    //#region === Resources ===
    var resource = $resource(appUrl.api + '/api/wepay/:action', {}, {
      'authorize': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'authorize' } },
      'verify':    { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'verify' } },
      'resendConfirmation': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'resendConfirmation' } },
      'getAccount': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'account' }, isArray: false },
      'withdraw': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'withdraw' } }
    });
    //#endregion === Resources ===

    //#region === Utility Functions ===

    //#endregion === Utility Functions

    //#region Publicly exposed Methods
   // https://www.wepay.com/v2/oauth2/authorize?redirect_uri=https://www.fundingmiracles.com/wepay/authenticate&user_email=antonio@antoniomarasco.com&client_id=135196&scope=manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments,manage_subscriptions
    p.authenticate = function() {
      var params = $.param({
        user_email: seAuthSvc.user.userName,
        client_id: wePayConst.client_id,
        redirect_uri: wePayConst.redirect_uri,
        scope: wePayConst.scope
      });

      $window.location.href = wePayConst.authUrl + "?" + params;
    };

    p.verify = function() {
      var deferred = $q.defer();

      resource.verify({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.authorize = function (requestToken) {
      var deferred = $q.defer();

      if (angular.isUndefined(requestToken.code)) {
        deferred.reject({
          error: 'We Pay Authorize',
          error_description: 'Invalid or missing code from Wepay'
        });
      } else {
        requestToken.redirect_uri = wePayConst.redirect_uri;
        requestToken.callback_uri = wePayConst.callback_uri;
        resource.authorize(requestToken,
          function(accessToken) {
            deferred.resolve(accessToken);
          },
          function(response) {
            deferred.reject(response.data);
          });
      }

      return deferred.promise;
    };

    p.resendConfirmation = function () {
      var deferred = $q.defer();

      resource.resendConfirmation({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getAccount = function() {
      var deferred = $q.defer();

      resource.getAccount({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.withdraw = function() {
      var deferred = $q.defer();

      resource.withdraw({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    function displayActions(reasons) {
      var ulList = "";
      angular.forEach(reasons, function (value, key) {
        switch (value) {
          case "kyc":
            ulList = ulList + " [User verification]";
            break;
          case "bank_account":
            ulList = ulList + " [Bank account setup]";
            break;
        }
      });
      return ulList;
    }

    //This is waiting for a verify object [account]
    p.analyzeAccount = function (account, callback) {
      var model = {showAlert:true};
      if (account.userState !== 'registered') {
        switch (account.userState) {
          case 'pending':
            model.alertType   = 'danger';
            model.wePayStatus = 'Pending';
            model.title       = "Account Setup Incomplete!";
            model.message     = "In order to receive funds, you must complete the WePay Account Setup.  Click on the button below to complete this step.";
            break;
          case 'deleted':
            model.title       = 'Account Deleted';
            model.alertType   = 'danger';
            model.wePayStatus = 'Deleted';
            model.message     = '';
            break;
          case 'not registered':
            model.callback             = p.authenticate();
            model.title                = 'Connect with WePay!';
            model.alertType            = 'danger';
            model.wePayStatus          = 'Not Registered';
            model.message              = 'Connect your WePay account with us and get withdrawals instantly!';
            model.authorizeButtonTitle = "Connect your WePay Account";
            break;
          default: // 'registered' should never get here
            model.alertType   = 'success';
            model.wePayStatus = 'Registered';
            model.title       = "Successful registration";
            model.message     = "You have successfully registered with WePay";
            break;
        }
      } else {
        switch (account.accountState) {
          case 'pending':
            model.wePayStatus = 'Pending';
            model.alertType   = 'warning';
            model.title       = 'WePay Account Pending!';
            model.message     = 'Your WePay account is awaiting Activation.  Please log in to WePay to confirm your account.';
            break;
          case 'action_required':
            model.callback    = completeAccountSetup;
            model.alertType   = 'warning';
            model.wePayStatus = 'Action Required';
            model.title       = 'Action Required';
            model.message     = "WePay has indicated that you'll need to complete some small steps in order for you to withdraw funds from your account." +
              " Please log into WePay and complete the following: " + displayActions(account.actionReasons);
            model.authorizeButtonTitle = "Complete account Setup";

            break;
          case 'disabled':
            model.alertType   = 'danger';
            model.wePayStatus = 'Disabled';
            model.title       = 'Account Disabled';
            model.message     = 'Your WePay account has been disabled and you can no longer accept payments';
            break;
          case 'deleted':
            model.alertType   = 'danger';
            model.wePayStatus = 'Deleted';
            model.title       = 'Account Deleted';
            model.message     = 'Your WePay account has been deleted.  Please contact WePay Administrator for support.';
            break;
          default: // Active
            model.alertType   = 'success';
            model.wePayStatus = 'Active';
            model.title       = 'Account Active';
            model.message     = '';
            model.showAlert   = false;
            break;
        }
      }
      return model;
    }
    //#endregion

    //#region === Private Methods ===
    var completeAccountSetup = function() {
      $window.location.href = wePayConst.webUrl;
    }

    //#endregion

    return p;
  }
]);