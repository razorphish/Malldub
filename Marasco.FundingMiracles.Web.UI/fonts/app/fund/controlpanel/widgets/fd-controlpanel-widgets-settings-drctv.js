fundoloApp.directive('fdControlpanelWidgetsSettingsDrctv', ['$timeout', 'fdDashboardSvc',
  function ($timeout, fdDashboardSvc) {

    //#region === Initialization ===

    'use strict';
    var p         = {};
    p.transclude  = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-settings-drctv.min.html';
    p.replace     = true;

    //#endregion

    //#region === Directives ====

    p.link = function ($scope, element, attributes, controller) {

      //#region === Initialize ===
      var buttonOnTitle          = 'Turn On All';
      var buttonOffTitle         = 'Turn Off All';

      $scope.showWarning         = false;
      $scope.isLoading           = true;
      $scope.isSavingEmail       = false;
      $scope.isSavingFacebook    = false;
      $scope.isSavingConfig      = false;
      $scope.isSavingStatus      = false;
      $scope.isSavingDonation    = false;
      $scope.emailTurnOn         = true;
      $scope.facebookTurnOn      = true;
      $scope.configTurnOn        = true;
      $scope.donationTurnOn      = true;
      $scope.emailButtonTitle    = buttonOnTitle;
      $scope.facebookButtonTitle = buttonOnTitle;
      $scope.configButtonTitle   = buttonOnTitle;
      $scope.donationButtonTitle = buttonOnTitle;
      $scope.tabActives          = {
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false
      };
      var timer;

      if (angular.isDefined($scope.activeTab)) {

        switch ($scope.activeTab) {
          case '2':
            $scope.tabActives.tab2 = true;
            break;
          case '3':
            $scope.tabActives.tab3 = true;
            break;
          case '4':
            $scope.tabActives.tab4 = true;
            break;
          case '5':
            $scope.tabActives.tab5 = true;
            break;
          case '1':
          default:
            $scope.tabActives.tab1 = true;
            break;
        }
      } else {
        $scope.tabActives.tab1 = true;
      }
      //#endregion

      //#region === Public Methods

      $scope.updateStatus = function (status) {
        $scope.isSavingStatus = true;

        fdDashboardSvc.status($scope.fund.identification, status).then(
        function (response) {
          timer = $timeout(function () {
            toastr.success('Setting updated successfully');
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
            timer = $timeout(function () {
              sectionSpinner(section, false);
            }, 2000);
          },
          function (response) {
            toastr.error('There was an issue saving the settings.  Please refresh and try again');
          });
      }

      $scope.updateSettingsGroup = function (section) {
        switch (section) {
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
            $scope.fund.settings.allowAnonymousDonors  = $scope.configTurnOn;
            $scope.fund.settings.allowCommenting       = $scope.configTurnOn;
            $scope.fund.settings.allowRecuringPayments = $scope.configTurnOn;
            $scope.fund.settings.usePaymentModal       = $scope.configTurnOn;
            $scope.configTurnOn                        = !$scope.configTurnOn;
            displayButtonTitle(section, $scope.configTurnOn);
            break;
          case 'donation':
            $scope.fund.settings.donationHideAmount    = $scope.donationTurnOn;
            $scope.fund.settings.donationHideDonorName = $scope.donationTurnOn;
            $scope.donationTurnOn                      = !$scope.donationTurnOn;
            displayButtonTitle(section, $scope.donationTurnOn);
            break;
          default:
            break;
        }

        $scope.updateSettings(section);
      }

      //#endregion

      //#region === Private Methods ===

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
          case 'donation':
            $scope.isSavingDonation = isOn;
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
          case 'donation':
            $scope.donationButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
            break;
          default:
            break;
        }
      }

      //Kill the timer:good practice
      $scope.$on('destroy', function (event) {
        $timeout.cancel(timer);
      });
      //#endregion
    }

    p.scope = {
      fund: '=',
      activeTab : '@'
    }

    //#endregion
    return p;
  }
]);