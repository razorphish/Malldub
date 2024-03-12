'use strict';

fundoloApp.directive('mdSpinnerBarDrctv', [function() {
  var p = {};
  
  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-spinner-bar-drctv.min.html';

  p.link = function($scope, element, attr, ctrlr) {
    $scope.$watch('spinnerType', function(newValue, oldValue) {
      if (newValue === undefined) {
        $scope.spinnerType = 'squareLarge';
      }
    });

    $scope.$watch('spinnerSize', function (newValue, oldValue) {
      if (newValue === undefined) {
        $scope.spinnerSize = 'med';
      }
    });
  }

  p.scope = {
    spinnerType: '@',
    spinnerSize: '@'
  }

  return p;
}]);