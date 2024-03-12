'use strict';

malldubAdminApp.controller('foloFundCtrl', [
  '$scope', '$stateParams', 'foloFundSvc', function ($scope, $stateParams, foloFundSvc) {

    // #region ===Initialize===
    $scope.isLoading = true;

    foloFundSvc.get($stateParams.fundId).then(function(fund) {
      $scope.fund = fund;
      $scope.donations = fund.donations;
      $scope.isLoading = false;
    }, function (response) {
      toastr.error('There was an error getting the fund [' + $stateParams.fundId + ']');
      $scope.isLoading = false;
    });

    // #endregion
    
    // #region === Public methods

    $scope.save = function() {
      if (fundForm.$isValid) {

      } else {
        
      }
    }

    // #endregion
  }
]);