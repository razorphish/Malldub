fundoloApp.controller('foAccountDonationsCtrl', ['$scope', '$log', 'userSvc', 'fdSvc',
  function ($scope, $log, userSvc, fdSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'donations';
    $scope.isLoading = true;

    //#endregion

    //#region === Public Methods ===

    userSvc.getDonations().then(
      function (donations) {
        $scope.donations = donations;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was a problem loading donations.  Please try again.');
        $log.error(response);
        $scope.isLoading = false;
      });


    $scope.getImageFile = function(files) {
      return fdSvc.getMainImage(files, 263, 148);
    }
    //#endregion 
  }
]);