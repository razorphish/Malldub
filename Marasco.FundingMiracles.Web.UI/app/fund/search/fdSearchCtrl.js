fundoloApp.controller('fdSearchCtrl', ['$scope', '$location', '$log', '$stateParams', '$state', '$filter', 'fdSvc', 'mdCoreDataSvc', 'mdScrollScrollSvc',
  function ($scope, $location, $log, $stateParams, $state, $filter, fdSvc, mdCoreDataSvc, mdScrollScrollSvc) {

    //#region === Initialize ===
    'use strict';
    $scope.searchText   = $stateParams.searchText;
    $scope.items          = [];
    $scope.totalItems     = 0;
    $scope.isLoading      = false;
    $scope.sortCriteria   = 'default';
    $scope.sortTitle      = 'Popularity';
    $scope.searchSelected = '';
    $scope.resultType     = 'grid';

    if (angular.isUndefined($stateParams.category)) {
      $scope.category = ['All'];
    } else {
      $scope.category = [$stateParams.category];
    }

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 9;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 3;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    
    $scope.onSelectPage = function() {
      $scope.search($scope.currentPage);
      mdScrollScrollSvc.scrollTo('topofPage', 20);
    };

    //=============================
    //#endregion

    //#region === Public Methods ===
    $scope.checkDefault = function () {
      var found = false;
      angular.forEach($scope.categories, function (value, key) {
        if (angular.isDefined(value.selected) && value.selected === true) {
          found = true;
        }
      });

      if (found) return;

      angular.forEach($scope.categories, function (value, key) {
        if (value.identification === 'All') {
          value.selected = true;
          return;
        }
      });
    }

    $scope.checkInput = function(inputText) {
      if (inputText.length === 0 || angular.isUndefined(inputText)) {
        $scope.search(1, 'All');
      }
    }

    $scope.getCategories = function() {
      mdCoreDataSvc.getAllFundCategories().then(function (categories) {

        angular.forEach(categories, function(value, index) {
          value.selected = false;
        });

          $scope.categories = categories;
        },
      function(response) {
        $log.error(response);
        toastr.error('Can\'t find the categories!  Let\'s try again');
      });
    }

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.init = function(fundsCount) {  
      $scope.isLoading       = false;
      $scope.items           = $scope.funds;
      $scope.totalItems      = fundsCount;
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    $scope.onCategorySelect = function(item, model, label) {
      var arrItem = item.split(',');
      $scope.search(1, arrItem[0]);
    }

    $scope.reset = function() {
      angular.forEach($scope.categories, function(item, key) {
        item.selected = false;
      });
      $scope.searchText = undefined;
      $scope.category = ['All'];
      $scope.searchSelected = '';
      $scope.search(1);
    }

    $scope.search = function (pageNumber, searchText) {
      $scope.isLoading = true;

      if (angular.isUndefined(searchText) && angular.isUndefined($scope.searchText)) {
        $scope.searchText = 'All';
        searchText = $scope.searchText;
      } else if (angular.isUndefined(searchText)) {
        searchText = $scope.searchText;
      } else {
        $scope.searchText = searchText;
      }


      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      } 

      return fdSvc.search(
        $scope.category,
        searchText,
        pageNumber,
        $scope.itemsPerPage,
        $scope.sortCriteria).then(
        function (funds) {

          $scope.funds       = funds.data;
          $scope.init(funds.count);
          var mapping = $scope.funds.map(function (fund) {
            var searchLabel = fund.item.title + ', For ';

            if (angular.isDefined(fund.beneficiary)) {
              searchLabel += fund.beneficiary.fullName;
            } else {
              searchLabel += fund.originator.fullName;
            }
            return searchLabel;
          });
          return mapping;
        },
        function (response) {
          toastr.error(response.error_description);
          $log.info(response);
          $scope.isLoading = false;
        });

    };

    $scope.setCategory = function (categoryId) {

      var category = $filter('findById')($scope.categories, categoryId);
      category.selected = !category.selected;

      $scope.checkDefault();

      $scope.category.length = 0;

      angular.forEach($scope.categories, function (value, key) {
        if (angular.isDefined(value.selected)) {
          if (value.selected) {
            $scope.category.push(value.identification);
          }
        } 
      });

      if ($scope.category.length === 0) {
        $scope.category.push('All');
      }

      $scope.search(1);
    }

    $scope.show = function (showPage) {
      $scope.itemsPerPage = showPage;
      $scope.search(1);
    };

    $scope.sort = function(criteria, title) {
      $scope.sortCriteria = criteria;
      $scope.sortTitle    = title;
      $scope.search(1);
    }
    //#endregion

    //#region === Private Methods ===


    //#endregion

    $scope.getCategories();
    $scope.search(1);

  }])
.filter('findById', function() {
  return function (input, id) {
    var i = 0, len = input.length;
    for (i; i < len; i++) {
      if (input[i].identification === id) {
        return input[i];
      }
    }
    return undefined;
  }
});
