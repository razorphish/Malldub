fundoloApp.directive('wiFeatureSummaryDrctv', [
  'wiFeatureSummarySvc',
  function(wiFeatureSummarySvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/widgets/wi-feature-summary-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.scope       = {

    };

    p.link = function(scope, element, attrs, ctrl) {
      scope.featureSummaries = wiFeatureSummarySvc.featureSummaries;
    };

    return p;
  }
]);