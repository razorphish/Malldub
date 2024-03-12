fundoloApp.directive('fdWidgetsFeaturedDrctv', ['$log', '$filter', 'fdSvc',
  function ($log, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/fund/widgets/fd-widgets-featured-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.link        = function(scope, element, attrs, controller) {

      fdSvc.featured(4).then(function(funds) {
        scope.funds = funds;
      }, function(response) {
        $log.error(response);
      });
    };

    p.controller = function ($scope) {

      //#region === Public Methods ===
      $scope.leftString = function(content, stringLength) {
        if (!angular.isNumber(stringLength)) {
          return content;
        } else {
          var parsedString = content.substring(0, stringLength);
          return parsedString;
        }
      };


      $scope.getTotalDonation = function(fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      $scope.getProgressPercentageWidth = function(fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      $scope.getProgressPercentage = function(fund) {
        return fdSvc.getProgressPercentage(fund);
      }

      //#endregion /=== Public Methods ===
    };

    return p;
  }])