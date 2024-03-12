(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .directive('epSwitch', EpSwitch);

  function EpSwitch() {
    var directive = {
      restrict: 'E',
      scope: {
        model: '=',
        disabled: '@',
        name: '=',
        ngFalseValue: '@',
        ngTrueValue: '@',
        actualSwitchModel: '@',
        callback: '&'
      },
      template: '<span><switch ng-model="actualSwitchModel" ' +
      'disabled="disabled" ng-change="changeCallback">' +
      '</switch></span>',
      controller: 'epSwtichController'
    };

    return directive;
  }
})();
