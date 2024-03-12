fundoloApp.directive('fdWidgetsSupportersDrctv', [
  'cssInjector', 'fdDashboardSvc',
  function (cssInjector, fdDashboardSvc) {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-supporters-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (angular.element.isNumeric(newValue) && newValue > 0) {
        $scope.initSupporters(newValue);
      }
    });

    //#region === Initialize ===

    $scope.items       = [];
    $scope.itemList    = [];
    $scope.showWarning = false;
    $scope.isLoading   = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 20;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 4;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.initSupporters = function (fundId) {
      $scope.fundId = fundId;
      $scope.getFundSupporters(1);
    }

    $scope.initPagination = function (fundsCount) {

      $scope.totalItems = fundsCount;
    }

    $scope.getFundSupporters = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdDashboardSvc.supporters($scope.fundId, pageNumber, $scope.itemsPerPage).then(
        //BUG: ANGULAR If object has array as property then it requires isArray: true
        function (supporters) {
          $scope.isLoading = false;
          $scope.itemList = supporters.data;
          $scope.initPagination(supporters.count);
          $scope.supportersLength = supporters.count;
          
          setRecordsToDisplay();
        },
        function (response) {
          toastr.error('Problem getting supporters', 'There was a problem accessing your fundraiser.  Please try again');
          $scope.isLoading = false;
        }
      );
    }

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
  };


  p.controller = [
      '$scope', function ($scope) {
        $scope.supportersLength = 0;
      }
  ];

  return p;
}]);
