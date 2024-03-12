fundoloApp.directive('fdControlpanelWidgetsShareDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-share-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.fundToOpenGraph(newValue);
        }
      });
    };

    p.controller = [
      '$scope', '$state', 'appUrl', 'fdSvc',
      function ($scope, $state, appUrl, fdSvc) {

        //#region === Initialize ===

        $scope.showWarning = false;
        $scope.isLoading   = true;
        $scope.socials     = ['facebook', 'twitter', 'mail'];
        $scope.baseUrl     = appUrl.base;
        var permalink      = '';
        var url            = '';
        //#endregion

        //#region === Public Methods ===

        $scope.fundToOpenGraph = function (fund) {
          permalink            = fund.item.permalink;
          url                  = appUrl.base + '/' + permalink;
          $scope.mainFundImage = fdSvc.getMainImage(fund.item.itemUploadList, 230, 150);
          var defaultImageUrl  = appUrl.base + $scope.mainFundImage;
          $scope.socialData    = {
            fund: fund,
            facebookData: {
              method: 'feed',
              link: url,
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
              url: url
            }
          };
        }

        $scope.viewFund = function() {
          $state.go('home.permalink', {'permalink': permalink});
        }

        //#endregion

      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])