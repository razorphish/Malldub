fundoloApp.controller('emFundCardCtrl', [
  '$scope', '$stateParams', '$log', '$filter', '$window', 'fdSvc', 'appUrl',
  function($scope, $stateParams, $log, $filter, $window, fdSvc, appUrl) {

    //#region === Initialize ===
    'use strict';
    $scope.isLoading = true;

    fdSvc.byPermalink($stateParams.permalink).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        getFundDonations($scope.fund.identification);

        $scope.fundUrl                 = appUrl.base + '/' + $scope.fund.item.permalink;
        $scope.mainFundImage           = fdSvc.getMainImage($scope.fund.item.itemUploadList, 240, 200);
        $scope.fundLink                = appUrl.base + '/' + $scope.fund.item.permalink + '?fm_src=fundCard';
        $scope.fundExpired             = fdSvc.checkExpiration($scope.fund.item.endDate);
        $scope.isLoading               = false;

        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

      }, function(response) {
        //Show default card for Miracles
      });

    //#endregion

    //#region === Public methods ===
    $scope.donate = function () {
      $window.top.location.href = $scope.fundLink;
    };
    //#endregion

    //#region === Private methods ===

    function getFundDonations(fundId) {
      fdSvc.donations(fundId, 1, 0).then(
        function (items) {
          angular.forEach(items.data, function (value, index) {
            if ($scope.fund.settings.donationHideAmount) {
              value.isPrivateAmount = true;
            }
            if ($scope.fund.settings.donationHideDonorName) {
              value.isPrivateDonorName = true;
            }
          });
          $scope.fund.donationList = items.data;
          $scope.fund.totalDonation = getTotalDonation($scope.fund);
          $scope.fund.progressPercentage = getProgressPercentageWidth($scope.fund);
        },
        function (response) {
          toastr.error('We couldn\'t get the donations! Please refresh and try again');
        });
    }

    var getTotalDonation = function (fund) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation(fund.donationList);
    };

    var getProgressPercentageWidth = function (fund) {
      return fdSvc.getProgressPercentageWidth(fund);
    };

    //#endregion

  }
]);