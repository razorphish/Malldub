fundoloApp.directive('fdControlpanelWidgetsEmbedDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-embed-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.isLoading = false;
          $scope.init();
        }
      });
    };

    p.controller = [
      '$scope', 'appUrl',
      function ($scope, appUrl) {
        $scope.showWarning = false;


        //#region === Public Methods ===
        $scope.init = function() {
          $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
          $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
          $scope.cardSrc = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
          $scope.buttonSrc = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
          $scope.widgetSrc = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;
        }


        //#endregion === /Public Methods ===
      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])