fundoloApp.directive('fdWidgetsDonationsDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-donations-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (angular.element.isNumeric(newValue) && newValue > 0) {
        $scope.initDonations(newValue);
      }
    });

    $scope.$watch('donations', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        $scope.initDonations();
      }
    }, true);
  };

  p.controller = ['$scope', 'fdSvc', 'mdScrollScrollSvc',
    function ($scope, fdSvc, mdScrollScrollSvc) {

      //#region === Initialize ===

      $scope.isLoading = true;
      $scope.included = false;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 3;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 10;
      //=============================

      //#endregion

      //#region === Public Methods ===

      $scope.getFundDonations = function(pageNumber) {
        $scope.isLoading = true;

        if (angular.isUndefined(pageNumber) || pageNumber === 0) {
          pageNumber = 1;
        }

        if ($scope.included) {
          setRecordsToDisplay();
          $scope.isLoading = false;
        } else {
          fdSvc.donations($scope.fundId, pageNumber, $scope.itemsPerPage).then(
            function(items) {
              $scope.itemList = items.data;
              $scope.initDonationPagination(items.count);
              $scope.isLoading = false;
            },
            function(response) {
              toastr.error(response.error_description);
              $scope.isLoading = false;
            });
        }
      };

      $scope.initDonations = function () {
        if (angular.isUndefined($scope.donations)) {
          $scope.getFundDonations(1);
        } else {
          $scope.included = true;
          $scope.initDonationsPaginate();
        }

      }

      $scope.initDonationsPaginate = function () {
        $scope.itemList   = $scope.donations;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
        $scope.isLoading = false;
      }

      $scope.initDonationPagination = function (fundsCount) {
        $scope.totalItems = fundsCount;
      }

      $scope.onSelectPage = function () {
        $scope.getFundDonations($scope.currentPage);
        mdScrollScrollSvc.scrollTo($scope.scrollId, 20);
      };

      //#endregion

      //#region === Private Methods ===

      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.itemList[i].user.forceDefault = $scope.itemList[i].offlineDonation;
            $scope.items.push($scope.itemList[i]);
          }
        }
      }

      //#endregion

    }];

  p.scope = {
    donations: '=',
    scrollId: '@'
  }

  return p;
}]);
