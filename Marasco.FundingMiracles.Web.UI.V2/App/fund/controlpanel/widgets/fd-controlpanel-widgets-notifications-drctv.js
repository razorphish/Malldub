fundoloApp.directive('fdControlpanelWidgetsNotificationsDrctv', [
  '$timeout', '$filter', 'fdDashboardSvc',
  function ($timeout, $filter, fdDashboardSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {

      $scope.$watch('notifications', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isArray(newValue.data)) {
          $scope.init();
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {

        var s = $filter('filter')($scope.notifications.data, { typeId: 'Notification', note: { viewed: false}  });
        $scope.$parent.newNotifications = s.length;
        $scope.isLoading = false;
        $timeout(function () {
          $('#notificationScrollbar').perfectScrollbar();
        }, 1000);
          
      }

      $scope.getListClass = function (notification) {
        return fdDashboardSvc.getListClass(notification);
      }

      //#endregion
    }

    p.scope = {
      notifications: '='
    }

    return p;
  }
]);