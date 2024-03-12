'use strict';

malldubAdminApp.controller('usrUsersCtrl', [
  '$scope', 'usrUserSvc', function ($scope, usrUserSvc) {

    //#region Initialize

    usrUserSvc.query().then(function (users) {
      $scope.users = users;
    }, function (response) {
      toastr.error(response.error_description);
    });

    $scope.colNames = usrUserSvc.columnNames;
    $scope.colModel = usrUserSvc.columnModel;

    //#endregion

  }
]);