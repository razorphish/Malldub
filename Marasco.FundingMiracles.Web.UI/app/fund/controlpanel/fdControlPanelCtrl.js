fundoloApp.controller('fdControlPanelCtrl', [
  '$scope', '$stateParams', '$location', '$filter', '$log', '$window', 'appUrl', 'fdSvc','fdDashboardSvc','pgWePaySvc', 'cssInjector',
  function ($scope, $stateParams, $location, $filter, $log, $window, appUrl, fdSvc, fdDashboardSvc, pgWePaySvc, cssInjector) {

    //#region === Initialize ===
    'use strict';
    $scope.notifications    = true;
    $scope.isLoading        = true;
    $scope.pageResolve      = 'overview';
    $scope.isVerifying      = true;
    $scope.socials          = ['facebook', 'twitter', 'mail'];
    $scope.fund             = {
      identification: $stateParams.fundId
    }
    cssInjector.add("/assets/css/pages/profile.css", true);

    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {

        $scope.fund          = angular.isArray(fund) ? fund[0] : fund;
        $scope.files         = $scope.fund.item.itemUploadList;
        $scope.mainFundImage = fdSvc.getMainImage($scope.files, 263, 148);

        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        fundToOpenGraph($scope.fund); 
        $scope.isLoading = false;
        getFundDonations();
        getFundNotes();
        setUpImages();
      },
      function (response) {
        $scope.isLoading = false;
        if (response.status === 404) {
          toastr.error('Either this fund does not exist or access to it has been restricted');
          $location.path('/controlpanel/fund/list');
        }
      });

    //#endregion

    //#region === Public Methods
    $scope.goToEdit = function() {
      $location.path('/' + $scope.fund.item.permalink);
    }

    $scope.getTotalDonation = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation($scope.fund.donationList, true);
    };

    $scope.getTotalDonationsFromDate = function (daysFrom) {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonationDateFrom($scope.fund.donationList, daysFrom, true);
    }

    $scope.getTotalDonationMonthToMonth = function() {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }

      var sum = fdSvc.getTotalDonationMonthToMonth($scope.fund.donationList, true, $scope.fund.goalAmount);
      var isMore = sum > 0;
      var msg = Math.abs(Math.floor(sum)) + '%';
      msg += isMore ? " more " : " less";
      return msg;
    }
    $scope.getProgressBarPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return { 'width': '0%' };
      }
      var percentageNumber = $scope.getProgressPercentage();
      var percentage = {
        'width': percentageNumber + '%'
      };

      return percentage;
    };

    $scope.getProgressPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      var percentage = $filter('number')(percentageNumber, 0);

      return percentage;
    };

    //#endregion

    //#region === Private Methods ===

    function getFundDonations() {
      fdSvc.donations($scope.fund.identification, 0, 0).then(
        function (items) {
          $scope.donationCount = items.count;
          $scope.fund.donationList = items.data;
        },
        function(response) {
          toastr.error(response.error_description);
        });
    }

    function getFundNotes() {
      fdDashboardSvc.fundNoteByFundId($scope.fund.identification, 1, 0).then(
        function(item) {
          $scope.fund.fundNoteList = item;
        },
        function(response) {
          toastr.error('The notifications have gone missing.  Please refresh and try again');
        });
    }

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

      $scope.$parent.pageTitle       = fund.item.title;
      $scope.$parent.pageDescription = fund.item.description;
      $scope.$parent.og.title        = fund.item.title;
      $scope.$parent.og.description  = fund.item.description;
      $scope.$parent.og.url          = permalink,
      $scope.$parent.og.image         = defaultImageUrl;
    }

    function setUpImages() {
      $scope.fund.item.itemUploadList = $filter('orderBy')($scope.fund.item.itemUploadList, 'sortOrder');
      var i = 0;
      angular.forEach($scope.fund.item.itemUploadList, function (value, key) {
        var imgUrl = value.upload.location;
        var thumbUrl = value.upload.location;
        if (value.upload.typeId == 'web.Image') {
          //imgUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=560&width=550&mode=crop&scale=both';

          //thumbUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=180&width=180&mode=crop&scale=both';

          imgUrl = value.upload.location
            + '?height=560&width=550&mode=crop&scale=both';

          thumbUrl = value.upload.location
            + '?height=180&width=180&mode=crop&scale=both';
        }

        if (value.isDefault || i === 0) {
          switch (value.upload.typeId) {
            case 'web.Video.Vimeo':
            case 'web.Video.YouTube':
              $scope.fund.defaultImage = value.upload.name;
              $scope.fund.defaultImageThumb = value.upload.name;
              break;
            default:
              $scope.fund.defaultImage = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=200&width=310&mode=crop&scale=both';

              $scope.fund.defaultImageThumb = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=75&width=75&mode=crop&scale=both';
              break;
          }


        }
        value.imgUrl = imgUrl;
        value.thumbUrl = thumbUrl;
        i++;
      });
    }
    //#endregion
  }
]);