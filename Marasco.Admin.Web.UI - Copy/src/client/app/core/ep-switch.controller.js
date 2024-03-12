(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .controller('epSwtichController', epSwtichController);

  epSwtichController.$inject = ['$scope'];

  function epSwtichController($scope) {
    $scope.actualSwitchModel = false;
    if (angular.isUndefined($scope.ngTrueValue)) {
      $scope.ngTrueValue = true;
    }
    if (angular.isUndefined($scope.ngFalseValue)) {
      $scope.ngFalseValue = false;
    }
    if (!angular.isUndefined($scope.model) && $scope.model !== null &&
      $scope.model.toString() === $scope.ngTrueValue.toString()) {
      $scope.actualSwitchModel = true;
    } else {
      $scope.actualSwitchModel = false;
    }
    $scope.changeCallback = function () {
      if ($scope.actualSwitchModel) {
        $scope.model = $scope.ngTrueValue;
      } else {
        $scope.model = $scope.ngFalseValue;
      }
      $scope.callback();
    };
    $scope.$watch('model', function (newVal, oldVal) {
      if (!angular.equals(newVal, oldVal)) {
        if (!angular.isUndefined($scope.model) &&
          $scope.model !== null &&
          $scope.model.toString() === $scope.ngTrueValue.toString()) {
          $scope.actualSwitchModel = true;
        } else {
          $scope.actualSwitchModel = false;
        }
      }
    });
  }
})();
