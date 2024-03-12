fundoloApp.controller('fdControlPanelHistoryCtrl', [
  '$scope', '$stateParams','cssInjector', 'fdDashboardSvc', 'mdScrollScrollSvc',
  function ($scope, $stateParams, cssInjector, fdDashboardSvc, mdScrollScrollSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'history';
    $scope.timeLine            = [];
    $scope.isLoading           = true;
    $scope.moreToLoad          = true;
    cssInjector.add("/assets/css/pages/feature_timeline2.css");

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 10;
    //=============================

    //#endregion

    //#region === Public Methods

    $scope.getFundHistory = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdDashboardSvc.history($stateParams.fundId, pageNumber, $scope.itemsPerPage).then(
        function (item) {

          $scope.timeline = item.data;
          $scope.totalItems = item.count;
          $scope.isLoading = false;
          mdScrollScrollSvc.scrollTo('topofPage', 20);

          //setRecordsToDisplay();
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isLoading = false;
        });
    };

    $scope.onSelectPage = function () {
      $scope.getFundHistory($scope.currentPage);

    };

    $scope.getActivityIcon = function (activity) {
      var activityClass = '';

      switch (activity.fundActivityType.identification) {
        case '25PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-dark-blue icon-trophy';
          break;
        case '50PercentFundRaised':
          activityClass = 'icon-custom icon-xs  rounded-x icon-line icon-bg-orange icon-trophy';
          break;
        case '75PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-grey icon-trophy';
          break;
        case '100PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-brown icon-trophy';
          break;
      }

      return activityClass;
    }
    //#endregion

    //#region === Private Methods ===

    $scope.getFundHistory(1);

    //#endregion
  }
]);