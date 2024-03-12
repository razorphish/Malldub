'use strict';

malldubAdminApp.controller('usrUserCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.id = $stateParams.userId;

}])