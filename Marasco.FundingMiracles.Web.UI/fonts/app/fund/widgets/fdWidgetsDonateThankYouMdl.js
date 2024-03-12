var fdWidgetsDonateThankYouMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl','fdSvc', 'fund', 'order',
  function ($scope, $uibModalInstance, $filter, appUrl, fdSvc, fund, order) {

    //#region === Initialize ===

    'use strict';
    $scope.fund = fund;
    $scope.order = order;
    //#endregion


    //#region === Public Methods ===
    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.thankYou = function () {
      $uibModalInstance.close();
    };

    $scope.getTotalDonation = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation($scope.fund.donationList, true);
    };


    $scope.getProgressPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      var percentage = {
        'width': $filter('number')(percentageNumber, 0) + '%'
      };

      return percentage;
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      var defaultImageUrl = appUrl.base + $scope.fund.defaultImage;

      $scope.socialData = {
        fund: fund,
        facebookData: {
          method: 'feed',
          link: fund.url,
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
          url: fund.url
        }
      };
    }
    //#endregion
  }];