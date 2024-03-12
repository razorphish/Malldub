fundoloApp.controller('fdControlPanelSupportersCtrl', [
  '$scope', '$stateParams', 'fdDashboardSvc',
  function fdControlPanelSupportersCtrl($scope, $stateParams, fdDashboardSvc) {

    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'supporters';
    $scope.items               = [];
    $scope.itemList            = [];
    $scope.showWarning         = false;
    $scope.isLoading           = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 4; 
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 2;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    // Initialize items
    fdDashboardSvc.supporters($stateParams.fundId, 1, 0).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading     = false;
        $scope.itemList      = fund.data;
        $scope.totalItems    = fund.count;
        setRecordsToDisplay();
      },
      function(response) {
        toastr.error('Problem getting supporters', 'There was a problem accessing your fundraiser.  Please try again');
        $scope.isLoading = false;
      }
    );

    //

    //#endregion

    //#region === Public Methods

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.onSelectPage = function () {
      setRecordsToDisplay();

    };
    //#endregion

    //#region === Private Methods ===
    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    //#endregion
  }
]);