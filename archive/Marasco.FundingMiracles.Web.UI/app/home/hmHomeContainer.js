fundoloApp.controller('hmHomeContainer', ['$scope', '$log',
function hmHomeContainer($scope, $log) {
  'use strict';
  $scope.getCurrentYear = function() {
    return moment().format('YYYY');
  }
}]);;