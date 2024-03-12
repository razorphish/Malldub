'use strict';

malldubAdminApp.controller('foloFundsCtrl', [
  '$scope', 'foloFundsSvc', function ($scope, foloFundsSvc) {

    //#region Initialize

    foloFundsSvc.query().then(function (funds) {
      $scope.funds = funds;
    }, function(response) {
      toastr.error(response.error_description);
    });

    $scope.colNames = foloFundsSvc.columnNames;
    $scope.colModel = foloFundsSvc.columnModel;

    //#endregion

  }
]);