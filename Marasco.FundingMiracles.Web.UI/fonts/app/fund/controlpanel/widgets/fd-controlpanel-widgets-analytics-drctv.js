fundoloApp.directive('fdControlpanelWidgetsAnalyticsDrctv', [
  '$timeout', '$state', 'mdGoogleSvc',
  function ($timeout, $state, mdGoogleSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-analytics-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {
      attributes.$observe('permalink', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && newValue.length > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.lastWeekLoading  = true;
      $scope.lastMonthLoading = true;
      $scope.allTimeLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (permalink) {
        lastWeek(permalink);
        lastMonth(permalink);
        allTime(permalink);
      }

      //#endregion

      //#region === Private ====
      function lastWeek(permalink) {
        var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function(items) {
            $scope.lastWeekData = items[0];
            $scope.lastWeekLoading = false;
          },
          function(response) {
            $scope.lastWeekData = {
              pageviews: 'N/A'
            }
            $scope.lastWeekLoading = false;
          });
      }

      function lastMonth(permalink) {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function (items) {
            $scope.lastMonthData = items[0];
            $scope.lastMonthLoading = false;
          },
          function (response) {
            $scope.lastMonthData = {
              pageviews: 'N/A'
            }
            $scope.lastMonthLoading = false;
          });
      }

      function allTime(permalink) {
        var startDate = '2014-01-01';
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function (items) {
            $scope.allTimeData = items[0];
            $scope.allTimeLoading = false;
          },
          function (response) {
            $scope.allTimeData = {
              pageviews: 'N/A'
            }
            $scope.allTimeLoading = false;
          });
      }
      //#endregion
    }

    p.scope = {

    }

    return p;
  }
]);