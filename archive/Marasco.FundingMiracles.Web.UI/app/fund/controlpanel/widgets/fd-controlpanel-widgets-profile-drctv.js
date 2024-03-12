fundoloApp.directive('fdControlpanelWidgetsProfileDrctv', ['appUrl', 'fdSvc',
  function (appUrl, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-profile-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isDefined(newValue.item)) {
          $scope.fundUrl       = appUrl.base + '/' + $scope.fund.item.permalink;
          $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 240, 200);
        }
      });
    }

    p.scope = {
      fund: '='
    }
    return p;
  }])