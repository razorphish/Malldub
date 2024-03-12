fundoloApp.directive('fdWidgetsUpdatesDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-updates-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    $scope.$watch('updates', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {

      }
    });
  };

  //Performs DOM transformation befire link function runs
  p.compile = function (elem, attrs) {

  }

  p.controller = ['$scope', 'cssInjector',
    function ($scope, cssInjector) {

      //#region === Initialize ===
      cssInjector.add("/assets/css/pages/profile.css", true);
      //#endregion


      //#region === Public Methods ===


      //#endregion

      //#region === Private Methods ===


      //#endregion

    }];

  p.scope = {
    updates: '=',
  }

  return p;
}]);
