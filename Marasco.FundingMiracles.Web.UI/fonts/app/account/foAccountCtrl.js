fundoloApp.controller('foAccountCtrl', [
  '$scope', '$stateParams', '$location', '$filter', '$log', 'cssInjector',
  function($scope, $stateParams, $location, $filter, $log, cssInjector) {

    //#region === Initialize ===
    'use strict';
    cssInjector.add("/assets/css/pages/profile.css", true);

    $scope.pageResolve = 'overview';
    $scope.mainImage = '';
    $scope.text = '';
    //#endregion

    //#region === Public Methods


    //#endregion

    //#region === Private Methods ===

    //TODO: Remove duplicate function [fdDashboardListCtrl]

    //#endregion
  }
]);