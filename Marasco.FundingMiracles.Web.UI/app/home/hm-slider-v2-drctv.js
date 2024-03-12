fundoloApp.directive('hmSliderV2Drctv', [
  function() {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/home/hm-slider-v2-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      //$scope.$watch('myTwoWayBind', function (newValue, oldValue) {
      //  if (angular.isDefined(newValue)) {
      //    // $scope.isLoading = false;
      //  }
      //});
    }

    p.controller = [
      '$scope', '$location',
      function ($scope, $location) {

        //#region === Initialize ===

        RevolutionSlider.initRSfullWidth();

        //#endregion

        //#region === Private Methods ===

        //#endregion

        //#region === Public Methods ===

        $scope.goToEdit = function() {
          $location.path('/controlpanel/fund/list');
        }

        $scope.search = function() {
          $location.path('/fund/search');
        }

        $scope.learn = function() {
          $location.path('/p/learn');
        }

        $scope.join = function () {
          $location.path('/controlpanel/fund/list');
        }

        //#endregion
      }
    ];

    return p;

  }
]);