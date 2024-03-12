fundoloApp.directive('fdControlpanelWidgetsActivityDrctv', [
  '$timeout', '$state', 'fdDashboardSvc',
  function ($timeout, $state, fdDashboardSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-activity-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        fdDashboardSvc.history(fundId, 1, 10).then(
          function(items) {
            $scope.activities = items.data;
            $scope.isLoading = false;
            $timeout(function () {
              $('#activityScrollbar').perfectScrollbar();
            }, 1000);
          },
          function(response) {
            toastr.error(response.error_description);
            $scope.isLoading = false;
          });
      }

      $scope.getActivityIcon = function (activity) {
        var activityClass = '';

        switch (activity.typeId) {
          case '25PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-dark-blue icon-trophy';
            break;
          case '50PercentFundRaised':
            activityClass = 'icon-custom icon-xs  rounded-x icon-line icon-bg-orange icon-trophy';
            break;
          case '75PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-grey icon-trophy';
            break;
          case '100PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-brown icon-trophy';
            break;
        }

        return activityClass;
      }

      $scope.gotoActivity = function () {
        $state.go('^.history');
      }
      //#endregion
    }

    p.scope = {
      
    }

    return p;
  }
]);