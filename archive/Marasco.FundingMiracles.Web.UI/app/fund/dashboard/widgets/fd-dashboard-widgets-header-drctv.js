'use strict';

fundoloApp.directive('fdDashboardWidgetsHeaderDrctv', function() {
  var p = {};

  p.restrict = 'E';
  p.replace = true;
  p.templateUrl = '/app/fund/dashboard/widgets/fd-dashboard-widgets-header-drctv.min.html';
  p.transclude = true;
  p.controller = [
    '$scope',
    function ($scope) {
      $scope.title = 'Waiting...';
      $scope.$watch('fund', function(newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isDefined(newValue.item)) {
          if (angular.isDefined(newValue.item.title)) {
            $scope.title = newValue.item.title;
          }
        } else {
          $scope.title = 'My Fundraisers';
        }
      });
    }
  ];
  p.scope = {    
    fund: '=',
    showEditMenu: '=',
    showGlobalMenu: '='
  };

  return p;
});