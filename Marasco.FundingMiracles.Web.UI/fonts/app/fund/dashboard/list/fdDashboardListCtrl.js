'use strict';

fundoloApp.controller('fdDashboardListCtrl', ['$scope', '$location', 'fdSvc', 'fdDashboardSvc', 'pgWePaySvc',
  function fdDashboardListCtrl($scope, $location, fdSvc, fdDashboardSvc, pgWePaySvc) {
    
    // #region Initialize */
    $scope.isLoading = true;
    

    fdDashboardSvc.allByUser().then(
      function (fund) {
        if (fund.length == 0) {
          $location.path('/fund/edit/wizard');
        } else {
          $scope.funds = fund;
          $scope.isLoading = false;
          verify();
        }
      },
      function (response) {
        $scope.isLoading = false;
      });

    fdDashboardSvc.supporting().then(
      function(fund) {
        if (fund.length == 0) {
          $scope.supportedFunds = [];
        } else {
          $scope.supportedFunds = fund;
        }
      },
      function(response) {

      });

    fdDashboardSvc.teamedUp().then(
      function(fund) {
        if (fund.length == 0) {
          $scope.teamed = [];
        } else {
          $scope.teamed = fund;
        } 
      },
      function(response) {

      });

    //TODO: remove duplicate method [fdDashboardCtrl]
    function verify() {
      pgWePaySvc.verify().then(
        function (verification) {
          //Everything OK; nothing to show
          $scope.verification = verification;
        },
        function (response) {
          $scope.verification = {
            email: response.data.email
          };
          switch (response.status) {
            case 500: //not registered
              $scope.alertType = "warning";
              $scope.message = "Our records show that you have not authorized us on your WePay Account.  See below for instructions.";
              $scope.verification.userState = 'not authorized';
              $scope.authorizeButtonTitle = "Authorize your WePay Account";
              break;
            case 404://not found
              $scope.alertType = "danger";
              $scope.message = "Connect your WePay account with us and get withdrawals instantly! See below for instructions";
              $scope.verification.userState = 'not connected';
              $scope.authorizeButtonTitle = "Connect your WePay Account";
              break;
          }

          $scope.title = "WePay Authorization";
          $scope.showAlert = true;
          $scope.isLoading = false;
      });
    }

    //#endregion

    /* Publicly exposed properties*/
    $scope.showMessage = false;

    /* Publicly exposed methods*/
    $scope.FilterFund = function(criteria) {

    };

    $scope.getDefaultImage = function(itemUploads) {
      var imageUrl = '';
      angular.forEach(itemUploads, function (value, key) {
        if (value.isDefault) {
          imageUrl = '/azure/' + value.upload.containerName + '/'
            + value.upload.name
            + '?height=150&width=230&mode=crop';
          return;
        }
      });

      return imageUrl;
    };

    $scope.getTotalDonation = function (fund) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation(fund.donationList, true);
    };

    $scope.getProgressPercentageWidth = function(fund) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      return fdSvc.getProgressPercentageWidth(fund);
    }

    $scope.gotoBasics = function() {
      $location.path('/account/basics');
    };

    $scope.cutText = function(description) {
      return description.substring(0, 20) + '...';
    };


  }]);