fundoloApp.controller('fdControlPanelCommentsCtrl', [
  '$scope', '$stateParams', 'fdSvc',
  function fdControlPanelCommentsCtrl($scope, $stateParams, fdSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'comments';
    $scope.isLoading = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 10;
    //=============================

    //#endregion

    //#region === Public Methods

    $scope.getFundComments = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdSvc.comment($stateParams.fundId, pageNumber, $scope.itemsPerPage).then(
        function (item) {
          $scope.comments = item.data;

          $scope.totalItems = item.count;
          $scope.isLoading = false;
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isLoading = false;
        });
    };

    $scope.onSelectPage = function () {
      $scope.getFundComments($scope.currentPage);
    };

    //#endregion

    //#region === Private Methods ===

    $scope.getFundComments(1);

    //#endregion
  }
]);