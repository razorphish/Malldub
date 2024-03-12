'use strict';

fundoloApp.directive('btSwatchDrctv', [function () {
  var p = {};
  p.restrict = 'E';
  p.transclude = true;
  p.replace = true;
  p.templateUrl = '/app/common/bt-swatch-drctv.min.html';

  p.link = function(scope, element, attrs, controller) {
    scope.$watch('color', function (newValue, oldValue) {
      if (angular.isUndefined(scope.color) || scope.color === 'default') {
        scope.form.inputColor.$setValidity('requiredColor', false);
      } else {
        scope.form.inputColor.$setValidity('requiredColor', true);
      }
    });
  };

  p.controller = ['$scope', function($scope) {
    $scope.changeColor = function(colorDesired) {
      if (colorDesired !== this.color) {
        this.color = colorDesired;
      }
    };

    $scope.getClass = function(colorCheck) {
      if (colorCheck === this.color) {
        return 'fa fa-check icon-white icon-only';
      }
      return '';
    };
  }];

  p.scope = {    
    color: '=',
    form: '='
  };

  return p;
}]);