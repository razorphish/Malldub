var fdWidgetsSocialEmbedMdl = ['$scope', '$uibModalInstance', 'appUrl', 'fund',
  function ($scope, $uibModalInstance, appUrl, fund) {
    'use strict';
    $scope.fund = fund;

    $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
    $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
    $scope.cardSrc      = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
    $scope.buttonSrc    = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
    $scope.widgetSrc    = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;


    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];