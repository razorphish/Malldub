fundoloApp.directive('acDashboardWidgetsHeaderDrctv', function () {
  'use strict';
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/account/widgets/ac-dashboard-widgets-header-drctv.min.html';
  p.transclude  = true;

  p.controller = ['$scope', function ($scope) {
    $scope.moreTab = function (currentTab) {
      var isActive = false;
      switch (currentTab) {
        case 'Social':
        case 'Notifications':
        case 'Status':
        case 'Close':
          isActive = true;
          break;
      };
      return isActive;
    };
  }];

  p.scope = {
    headline: '@',
    activeTab: '@'
  };
  
  return p;
});