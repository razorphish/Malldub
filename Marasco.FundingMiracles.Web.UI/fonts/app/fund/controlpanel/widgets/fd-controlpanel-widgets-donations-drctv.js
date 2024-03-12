fundoloApp.directive('fdControlpanelWidgetsDonationsDrctv', [
  '$timeout', '$uibModal', '$state',
  function ($timeout, $uibModal, $state) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('donations', function(newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });

      //#region === Public Methods ===

      $scope.init = function () {
        $timeout(function () {
          $('#donationScrollbar').perfectScrollbar();
        }, 1000);
      }

      $scope.gotoDonations = function () {
        $state.go('^.donations');
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
        }, function (responseCode) {

        });
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

var donationAddMdlCtrl = [
  '$scope', '$uibModalInstance', '$filter', '$location', 'fundId', 'fdDashboardSvc',
  function($scope, $uibModalInstance, $filter, $location, fundId, fdDashboardSvc) {
    $scope.isSaving = false;
    $scope.thankYouMessage = '';
    $scope.showValidationMessages = false;
    $scope.donation = {
      processingFee: 0,
      beneficiaryAmount: 0,
      systemAmount: 0,
      amount: 0,
      offlineDonation: true,
      statusId: 'Active',
      feeTypeId: 'Level0',
      fundId: fundId
    };

    $scope.ok = function() {
      if (this.offlineDonationFormWidget.$valid) {
        $scope.isSaving = true;
        $scope.donation.amount = $scope.donation.beneficiaryAmount;
        fdDashboardSvc.saveDonation($scope.donation).then(
          function(response) {
            toastr.success("Offline donation completed successfully");
            $uibModalInstance.close(response);
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error('Oops!  Problem saving offline donation', 'There were some problems saving the offline donation.  Please try again');
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
];

var donationThankYouMdlCtrl = [
  '$scope', '$uibModalInstance', 'fdDashboardSvc', 'donation',
  function ($scope, $uibModalInstance, fdDashboardSvc, donation) {

    $scope.isSaving = false;
    $scope.donation = donation;
    $scope.donationNote = {
      typeId: 'ThankYou',
      donationId: donation.identification,
      fundId: donation.fundId
    };

    $scope.ok = function () {
      if (this.donationThankYouForm.$valid) {
        $scope.isSaving = true;
        fdDashboardSvc.createDonationNote($scope.donationNote).then(
          function (response) {
            donation.thankYouNoteSent = true;
            toastr.success("Thank you note sent successfully");
            $uibModalInstance.close(response);
            $scope.isSaving = false;
          },
          function (response) {
            toastr.error('Oops!  Problem sending Thank you note', 'There were some problems sending a Thank you note.  Please try again');
            $scope.isSaving = false;
          }
        );
      }

      $uibModalInstance.close(donation);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }];