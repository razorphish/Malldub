'use strict';

fundoloApp.directive('fdDashboardWidgetsTopicsDrctv', function() {
  var p = {};

  p.restrict = 'E';
  p.replace = true;
  p.templateUrl = '/app/fund/dashboard/widgets/fd-dashboard-widgets-topics-drctv.min.html';
  p.transclude = true;

  return p;
});