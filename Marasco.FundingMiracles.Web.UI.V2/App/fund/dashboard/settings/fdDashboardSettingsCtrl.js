'use strict';

fundoloApp.controller('fdDashboardSettingsCtrl', [
  '$scope', '$stateParams', '$window', '$location', '$log', '$timeout', 'fdDashboardSvc',
  function fdDashboardSettingsCtrl ($scope, $stateParams, $window, $location, $log, $timeout,fdDashboardSvc) { 

    //#region Initialize
    var buttonOnTitle = 'Turn On All';
    var buttonOffTitle = 'Turn Off All';

    fdDashboardSvc.summary($stateParams.fundId).then(
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading = false;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      },
      function (response) {
        toastr.error('Problem getting donations', 'There was a problem accessing your donations.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      }
    );

    $scope.showWarning         = false;
    $scope.isLoading           = true;
    $scope.isSavingEmail       = false;
    $scope.isSavingFacebook    = false;
    $scope.isSavingConfig      = false;
    $scope.isSavingStatus      = false;
    $scope.emailTurnOn         = true;
    $scope.facebookTurnOn      = true;
    $scope.configTurnOn        = true;
    $scope.emailButtonTitle    = buttonOnTitle;
    $scope.facebookButtonTitle = buttonOnTitle;
    $scope.configButtonTitle   = buttonOnTitle;
    var timer;
    //#endregion

    //#region === Publicly exposed methods (Scope) ===
    $scope.updateStatus = function (status) {
      $scope.isSavingStatus = true;

      fdDashboardSvc.status($scope.fund.identification, status).then(
      function (response) {
        timer = $timeout(function() {
          $scope.isSavingStatus = false;
        }, 2000);
      }, function (response) {
        toastr.error('Uh oh.  There is a problem changing the status.  Please refresh and try again.');
        $scope.isSavingStatus = false;
      });
    }

    $scope.updateSettings = function (section) {
      sectionSpinner(section, true);
      fdDashboardSvc.saveFundSettings($scope.fund.settings).then(
        function (response) {
          toastr.success('Setting updated successfully');
          timer = $timeout(function() {
            sectionSpinner(section, false);
          }, 2000);     
        },
        function(response) {
          toastr.error('There was an issue saving the settings.  Please refresh and try again');
        });
    }

    $scope.updateSettingsGroup = function (section) {
      switch(section) {
        case 'email':
          $scope.fund.settings.emailReceiveUserDonation        = $scope.emailTurnOn;
          $scope.fund.settings.emailSendSupporter25Raised      = $scope.emailTurnOn;
          $scope.fund.settings.emailReceiveUserSupport         = $scope.emailTurnOn;
          $scope.fund.settings.emailSendSupporter50Raised      = $scope.emailTurnOn;
          $scope.fund.settings.emailReceiveUserFundraiser      = $scope.emailTurnOn;
          $scope.fund.settings.emailSendSupporter75Raised      = $scope.emailTurnOn;
          $scope.fund.settings.emailReceiveUserTeamMember      = $scope.emailTurnOn;
          $scope.fund.settings.emailSendSupporterFriendSupport = $scope.emailTurnOn;
          $scope.emailTurnOn                                   = !$scope.emailTurnOn;
          displayButtonTitle(section, $scope.emailTurnOn);
          break;
        case 'facebook':
          $scope.fund.settings.facebookPostAddVideo       = $scope.facebookTurnOn;
          $scope.fund.settings.facebookPostUserSupport    = $scope.facebookTurnOn;
          $scope.fund.settings.facebookPostAddImage       = $scope.facebookTurnOn;
          $scope.fund.settings.facebookPostUserDonate     = $scope.facebookTurnOn;
          $scope.fund.settings.facebookPostUpdate         = $scope.facebookTurnOn;
          $scope.fund.settings.facebookPostUserFundraiser = $scope.facebookTurnOn;
          $scope.facebookTurnOn                           = !$scope.facebookTurnOn;
          displayButtonTitle(section, $scope.facebookTurnOn);
          break;
        case 'config':
          $scope.fund.settings.allowAnonymousDonors = $scope.configTurnOn;
          $scope.fund.settings.allowCommenting      = $scope.configTurnOn;
          $scope.fund.settings.allowRecuringPayments= $scope.configTurnOn;
          $scope.fund.settings.usePaymentModal      = $scope.configTurnOn;
          $scope.configTurnOn                       = !$scope.configTurnOn;
          displayButtonTitle(section, $scope.configTurnOn);
          break;
        default:
          break;
      }
      
      $scope.updateSettings(section);
    }
    //#endregion

    //#region === Methods ===

    function sectionSpinner(section, isOn) {
      switch (section) {
        case 'email':
          $scope.isSavingEmail = isOn;
          break;
        case 'facebook':
          $scope.isSavingFacebook = isOn;
          break;
        case 'config':
          $scope.isSavingConfig = isOn;
          break;
        default:
          break;
      }
    }

    function displayButtonTitle(section, isOn) {
      switch (section) {
        case 'email':
          $scope.emailButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
          break;
        case 'facebook':
          $scope.facebookButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
          break;
        case 'config':
          $scope.configButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
          break;
        default:
          break;
      }
    }
    //#endregion

    //Kill the timer:good practice
    $scope.$on('destroy', function(event) {
      $timeout.cancel(timer);
    });
    //#endregion

  }
]);