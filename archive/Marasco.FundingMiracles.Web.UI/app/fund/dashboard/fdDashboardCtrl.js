'use strict';

fundoloApp.controller('fdDashboardCtrl',['$scope', '$stateParams', '$location', '$filter', '$log', 'fdSvc', 'fdDashboardSvc','pgWePaySvc', 'appUrl',
  function fdDashboardCtrl($scope, $stateParams, $location, $filter, $log, fdSvc, fdDashboardSvc,pgWePaySvc, appUrl) {
    

    /*Initialize */
    $scope.isVerifying = true;
    $scope.socials = ['facebook', 'twitter', 'mail'];
    $scope.fund = {
      identification: $stateParams.fundId
    }

    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.files = $scope.fund.item.itemUploadList;
        angular.forEach($scope.files, function(value, key) {
          if (value.isDefault) {
            $scope.mainFundImage = '/azure/' + value.upload.containerName + '/'
            + value.upload.name
            + '?height=150&width=230&mode=crop';
            return;
          }
        });
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        fundToOpenGraph($scope.fund);
        verify();
      },
      function (response) {
        if (response.status === 404) {
          toastr.error('Either this fund does not exist or access to it has been restricted');
          $location.path('/controlpanel/fund/list');
        }
      });

    //TODO: Remove duplicate function [fdDashboardListCtrl]
    function verify() {
      pgWePaySvc.verify().then(
        function (verification) {
          //Check verification
          analyzeVerification(verification);
          $scope.verification = verification;
          $scope.isVerifying = false;
        },
        function (response) {
          $scope.verification = {
            email: response.data.email
          };
          switch (response.status) {
            case 500: //not registered
              $scope.alertType = "warning";
              $scope.message = "Our records show that you have not authorized us on your WePay Account.  See below for instructions.";
              $scope.verification.userState = 'not authorized';
              $scope.authorizeButtonTitle = "Authorize your WePay Account";
              break;
            case 404://not found
              $scope.alertType = "danger";
              $scope.message = "Connect your WePay account with us and get withdrawals instantly! See below for instructions.  YOUR FUNDRAISERS WILL NOT BE AVAILABLE UNTIL THIS STEP IS COMPLETE";
              $scope.verification.userState = 'not connected';
              $scope.authorizeButtonTitle = "Connect your WePay Account";
              break;
          }

          $scope.title = "WePay Authorization";
          $scope.showAlert = true;
          $scope.isVerifying = false;
        });
    }

    function analyzeVerification(verification) {
      switch (verification.userState) {
        case 'pending':
          $scope.alertType = "danger";
          $scope.title = "Account Setup Incomplete";
          $scope.message = "In order to receive funds, you must complete the WePay Account Setup.  Click on the button below to complete this step.";
          $scope.authorizeButtonTitle = "Take me to WePay!";
          $scope.showAlert = true;
          $scope.isPending = true;
          break;
        case 'action_required':
          $scope.alertType = "warning";
          $scope.title = "Almost There!";
          $scope.message = "WePay has indicated that you'll need to complete some small steps in order for you to withdraw funds from your account." +
            " Please log into WePay and complete the following: " + pgWePaySvc.displayActions(account.action_reasons);
          $scope.showAlert = true;
          break;
        default:
          //Everything is OK
          break;
      }
    }

    $scope.gotoBasics = function () {
      $location.path('/account/basics');
    };

    function fundToOpenGraph(fund) {
      var permalink = appUrl.base + '/' + fund.item.permalink;
      var defaultImageUrl = appUrl.base + $scope.mainFundImage;

      $scope.socialData = {
        fund: fund,
        facebookData: {
          method: 'feed',
          link: permalink,
          picture: defaultImageUrl,
          name: fund.item.title,
          caption: 'www.fundingmiracles.com',
          description: fund.item.description
        },
        twitterData: {
          hashtags: '',
          via: 'fundingmiracles',
          related: '//www.fundingmiracles.com',
          text: fund.item.title,
          url: permalink
        }
      };

      $scope.$parent.pageTitle = fund.item.title;
      $scope.$parent.pageDescription = fund.item.description;
      $scope.$parent.og.title = fund.item.title;
      $scope.$parent.og.description = fund.item.description;
      $scope.$parent.og.url = permalink,
     $scope.$parent.og.image = defaultImageUrl;
    }

    /*/Initialize */

    $scope.baseUrl = appUrl.base;
    $scope.fundUpdate = fdDashboardSvc.mockFundUpdate;
    $scope.showWarning = false;

    $scope.viewFund = function() {
      $location.path($scope.fund.item.permalink);
    };
    
    $scope.getTotalDonation = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation($scope.fund.donationList, true);
    };
    
    $scope.getProgressPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return { 'width' : '0%'};
      }
      var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      var percentage = {
        'width': $filter('number')(percentageNumber, 0) + '%'
      };

      return percentage;
    };

  }]);