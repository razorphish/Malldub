fundoloApp.directive('fdControlpanelWidgetsDonationsLgDrctv', [
  '$timeout', '$uibModal', '$filter', 'mdScrollScrollSvc', 'fdDashboardSvc',
function ($timeout, $uibModal, $filter, mdScrollScrollSvc, fdDashboardSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-lg-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $timeout(function () {
        $('li').tooltip();
        $('button').tooltip();
      }, 1000);

      $scope.$watch('donations', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isArray(newValue)) {
          $scope.init();
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
      $scope.itemsPerPage = 16;
      //=============================

      //=============================
      // Initialize Conditional Markup (columns per row)
      $scope.numberColumns      = 2;
      $scope.itemRows           = [];
      $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
      $scope.itemColumns        = [];
      $scope.itemColumns.length = $scope.numberColumns;
      //=============================[$parent.$index * numberColumns + $index]

      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {
        $scope.isLoading  = false;
        $scope.itemList   = $filter('orderBy')($scope.donations, 'dateEntered', true);
        $scope.totalItems = $scope.donations.length;
        setRecordsToDisplay();
      }

      $scope.addDonation = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv-mdl.min.html',
          controller: donationAddMdlCtrl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'sm-med',
          resolve: {
            fundId: function () {
              return $scope.fundId;
            }
          }
        });

        modalInstance.result.then(function (response) {
          $scope.donations.splice(0, 0, response);
          $scope.donations.join();
          $scope.init();
        }, function (responseCode) {

        });
      }

      $scope.hide = function (parentIndex) {
        return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
      };

      $scope.onSelectPage = function () {
        setRecordsToDisplay();
        mdScrollScrollSvc.scrollTo('fundDonationsPage', 20);

      };

      $scope.openThankYou = function (donation) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-thankyou-mdl.min.html',
          controller: donationThankYouMdlCtrl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'sm-med',
          resolve: {
            donation: function() {
               return donation;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {

        }, function () {

        });
      };

      $scope.makeAnonymous = function (donation) {
        $scope.saveDonationxLite(donation);
        $scope.verifyMakeAnonymous(donation, false);
      };

      $scope.saveDonationxLite = function (donation) {
        var dx = {
          identification: donation.identification,
          isPrivateAmount: donation.isPrivateAmount,
          isPrivateDonorName: donation.isPrivateDonorName,
          message: donation.message,
          fundId: $scope.fundId
        }

        fdDashboardSvc.saveDonationxLite(dx).then(
          function (response) {
            toastr.success("Operation completed successfully");
            donation.isUpdating = false;
            return true;
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems remove the update.  Please try again');
            $log.error(response);
            donation.isUpdating = false;
            return false;
          }
        );
      }

      $scope.save = function (donation) {
        donation.isUpdating = true;

        fdDashboardSvc.saveDonation(donation).then(
          function (response) {
            if (donation.statusId === 'Deleted') {
              $scope.fund.donationList.splice($scope.fund.donationList.indexOf(donation), 1);
            }
            toastr.success("Operation completed successfully");
            donation.isUpdating = false;
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems removing the update.  Please try again');
            donation.isUpdating = false;
          }
        );
      };

      $scope.deleteDonation = function (donation) {
        donation.statusId = 'Deleted';
        $scope.save(donation);
        $scope.verifyDeleteDonation(donation, false);
      };
      $scope.verifyDeleteComment = function (donation, isCommentDeleting) {
        donation.isCommentDeleting = isCommentDeleting;
      };

      $scope.verifyMakeAnonymous = function (donation, isMakeAnonymous) {
        donation.isMakeAnonymous = isMakeAnonymous;
      };

      $scope.verifyDeleteDonation = function (donation, isDeleteDonation) {
        donation.isDonationDeleting = isDeleteDonation;
      };

      $scope.deleteComment = function (donation) {
        var message = donation.message;
        donation.message = '';
        if ($scope.saveDonationxLite(donation) === false) {
          donation.message = message;
        }
        $scope.verifyDeleteComment(donation, false);
      };


      $scope.showDelete = function (statusId) {
        return statusId === 'Active';
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

    p.scope = {
      donations: '=',
      fundId: '='
    }

    return p;
  }
]);