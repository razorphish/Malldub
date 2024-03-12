fundoloApp.controller('emFundButtonCtrl', [
  '$scope', '$stateParams', '$window', 'fdSvc', 'appUrl',
  function ($scope, $stateParams, $window, fdSvc, appUrl) {

    //#region === Initialize ===
    'use strict';
    $scope.isLoading = true;

    fdSvc.byPermalink($stateParams.permalink).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {

        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.fundLink = appUrl.base + '/' + $scope.fund.item.permalink;
        $scope.isLoading = false;
        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      }, function(response) {
        //Show default card for Miracles
      });

    //#endregion

    //#region === Publicly Exposed Methods ===

    $scope.donate = function () {
      $window.top.location.href = $scope.fundLink;
    };

    //#endregion
  }
]);