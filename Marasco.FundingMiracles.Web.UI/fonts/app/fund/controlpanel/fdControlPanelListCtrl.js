
fundoloApp.controller('fdControlPanelListCtrl', ['$scope', '$state', 'fdSvc', 'fdDashboardSvc', 'pgWePaySvc', 'mdCoreDataSvc',
  function ($scope, $state, fdSvc, fdDashboardSvc, pgWePaySvc, mdCoreDataSvc) {

    // #region === Initialize ===

    'use strict';
    $scope.showMessage            = false;
    $scope.isContinuing           = false;
    $scope.showValidationMessages = false;
    $scope.fund                   = {};

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items              = [];
    $scope.numberColumns      = 4;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    $scope.isLoading          = true;
    //=============================[$parent.$index * numberColumns + $index]

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items2              = [];
    $scope.numberColumns2      = 4;
    $scope.itemRows2           = [];
    $scope.itemRows2.length    = Math.ceil($scope.items2.length / $scope.numberColumns2);
    $scope.itemColumns2        = [];
    $scope.itemColumns2.length = $scope.numberColumns2;
    $scope.isLoading2          = true;
    //=============================[$parent.$index * numberColumns + $index]

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items3              = [];
    $scope.numberColumns3      = 4;
    $scope.itemRows3           = [];
    $scope.itemRows3.length    = Math.ceil($scope.items3.length / $scope.numberColumns3);
    $scope.itemColumns3        = [];
    $scope.itemColumns3.length = $scope.numberColumns3;
    $scope.isLoading3 = true;

    (function () {
        getFundCategories();
    })();

    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods ===

    fdDashboardSvc.allByUser().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.isLoading = false;
        } else {
          $scope.isLoading       = false;
          $scope.items           = funds;
          $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
          verify();
        }
      },
      function (response) {
        $scope.isLoading = false;
      });

    fdDashboardSvc.supporting().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.supportedFunds = [];
          $scope.isLoading2     = false;
        } else {
          $scope.isLoading2       = false;
          $scope.items2           = funds;
          $scope.itemRows2.length = Math.ceil($scope.items2.length / $scope.numberColumns2);
        }
      },
      function (response) {

      });

    fdDashboardSvc.teamedUp().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.teamed     = [];
          $scope.isLoading3 = false;
        } else {
          $scope.isLoading3       = false;
          $scope.items3           = funds;
          $scope.itemRows3.length = Math.ceil($scope.items3.length / $scope.numberColumns3);
        }
      },
      function (response) {

      });

    $scope.continue = function() {
      $scope.isContinuing = true;
      if (this.createNewFundForm.$valid) {
        
        fdDashboardSvc.save($scope.fund).then(
          function (response) {
            toastr.success("Fund saved successfully");

            mdCoreDataSvc.reCache(response.item.permalink).then(
              function (resp) {
            
              }, function (resp) {

              });

            $scope.isContinuing = false;
            $state.go('home.permalink', {permalink:  response.item.permalink});
          },
          function () {

            $scope.isContinuing = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isContinuing = false;
      }
    }

    $scope.hide = function (parentIndex, items) {
      return parentIndex === items.length || parentIndex > items.length;
    };

    $scope.gotoBasics = function () {
      $state.go('home.account.withdraw');
    }
    //#endregion

    //#region === Private Methods ===
    function getFundCategories() {
      mdCoreDataSvc.getAllFundCategories().then(
        function (categories) {
          $scope.fundCategoryOptions = categories;
          //$scope.categoryId = $scope.fundCategoryOptions[0].identification;
        },
        function (response) {
    
        });
    }

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


    //TODO: remove duplicate method [fdDashboardCtrl]
    function verify() {
      pgWePaySvc.verify().then(
        function (verification) {
          //Everything OK; nothing to show
          analyzeAccount(verification);
          $scope.verification = verification;
        },
        function (response) {
          $scope.verification = {
            email: response.data.email
          };
          switch (response.status) {
            case 500: //not registered
              $scope.alertType              = "warning";
              $scope.message                = "Our records show that you have not authorized us on your WePay Account.  See below for instructions.";
              $scope.verification.userState = 'not authorized';
              $scope.authorizeButtonTitle   = "Authorize your WePay Account";
              break;
            case 404://not found
              $scope.alertType              = "danger";
              $scope.message                = "Connect your WePay account with us and get withdrawals instantly! See below for instructions";
              $scope.verification.userState = 'not connected';
              $scope.authorizeButtonTitle   = "Connect your WePay Account";
              break;
          }

          $scope.title = "WePay Authorization";
          $scope.showAlert = true;
          $scope.isLoading = false;
        });
    }

    function analyzeAccount(account) {
      var analysis     = pgWePaySvc.analyzeAccount(account);
      $scope.showAlert = analysis.showAlert;
      $scope.alertType = analysis.alertType;
      $scope.title     = analysis.title;
      $scope.message   = analysis.message;
      if (analysis.authorizeButtonTitle) {
        $scope.showBlock = true;
        $scope.buttonTitle = analysis.authorizeButtonTitle;
      }
      $scope.isPending                        = analysis.wePayStatus === 'Pending';
      $scope.isActive                         = analysis.wePayStatus === 'Active' && account.balances[0].balance > 0;
      $scope.$parent.hasWithdrawal            = $scope.isActive;
      $scope.$parent.hasConditionalWithdrawal = analysis.wePayStatus !== 'Active' && account.balances[0].balance > 0;
    }

    //#endregion
  }]);