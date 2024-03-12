'use strict';

fundoloApp.controller('fdDashboardDonationsCtrl',['$modal', '$scope', '$stateParams', '$window', '$location', '$log', 'fdDashboardSvc',
  function fdDashboardDonationsCtrl($modal, $scope, $stateParams, $window, $location, $log, fdDashboardSvc) {
    //Initialize
    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading = false;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      },
      function (response) {
        toastr.error('Problem getting donations', 'There was a problem accessing your donations.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      }
    );

    //\Initialize
    $scope.showWarning = false;
    $scope.isLoading = true;

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
          $log.error(response);
          donation.isUpdating = false;
        }
      );
    };

    $scope.saveDonationxLite = function(donation) {
      var dx = {
        identification: donation.identification,
        isPrivateAmount: donation.isPrivateAmount,
        isPrivateDonorName: donation.isPrivateDonorName,
        message: donation.message
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

    $scope.makeAnonymous = function(donation) {
      $scope.saveDonationxLite(donation);
      $scope.verifyMakeAnonymous(donation, false);
    };

    $scope.deleteComment = function (donation) {
      var message = donation.message;
      donation.message = '';
      if ($scope.saveDonationxLite(donation) === false) {
        donation.message = message;
      }
      $scope.verifyDeleteComment(donation, false);
    };

    $scope.deleteDonation = function(donation) {
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

    $scope.showDelete = function(statusId) {
      return statusId === 'Active';
    };

    $scope.openCreateDonation = function(donation) {
      var modalInstance = $modal.open({
        templateUrl: '/app/fund/dashboard/donations/fdDashboardDonationsCreateOfflineMdl.min.html',
        controller: ModalCreateOfflineDonationCtlr,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          fund: function () { return $scope.fund; }
        }
      });

      modalInstance.result.then(function (createdDonation) {
        $scope.fund.donationList.push(createdDonation);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.openThankYou = function(donation) {
      var modalInstance = $modal.open({
        templateUrl: '/app/fund/dashboard/donations/fdDashboardDonationsThankYouMdl.min.html',
        controller: ModalSendThankYouCtlr,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          donation: function () { return donation; },
          fund: function () { return $scope.fund; }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]);

var ModalSendThankYouCtlr = ['$scope', '$modalInstance', '$filter', 'fdDashboardSvc', 'fund', 'donation',
  function ($scope, $modalInstance, $filter, fdDashboardSvc, fund, donation) {
  
  $scope.isSaving = false;
  $scope.donation = donation;
  $scope.fund = fund;
  $scope.donationNote = {    
    typeId: 'ThankYou',
    donationId: donation.identification,
    fundId: fund.identification
  };
  
  $scope.ok = function () {
    if (this.donationThankYouForm.$valid) {
      $scope.isSaving = true;
      fdDashboardSvc.createDonationNote($scope.donationNote).then(
        function (response) {
          donation.thankYouNoteSent = true;
          toastr.success("Thank you note sent successfully");
          $modalInstance.close(response);
          $scope.isSaving = false;
        },
        function (response) {
          toastr.error('Oops!  Problem sending Thank you note', 'There were some problems sending a Thank you note.  Please try again');
          $scope.isSaving = false;
        }
      );
    }
    
    $modalInstance.close(donation);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}];

var ModalCreateOfflineDonationCtlr = ['$scope', '$modalInstance', '$filter', 'fund', 'fdDashboardSvc',
  function ($scope, $modalInstance, $filter, fund, fdDashboardSvc) {
  $scope.isSaving = false;
  $scope.fund            = fund;
  $scope.thankYouMessage = '';
  $scope.donation        = {
    processingFee : 0,
    beneficiaryAmount: 0,
    systemAmount: 0,
    amount: 0,
    offlineDonation: true,
    statusId: 'Active',
    feeTypeId: 'Level0',
    fundId : fund.identification
  };
  
  $scope.ok = function () {
    if (this.offlineDonationForm.$valid) {
      $scope.isSaving = true;
      $scope.donation.amount = $scope.donation.beneficiaryAmount;
      fdDashboardSvc.saveDonation($scope.donation).then(
        function (response) {
          toastr.success("Offline donation completed successfully");
          $modalInstance.close(response);
          $scope.isSaving = false;
        },
        function (response) {
          toastr.error('Oops!  Problem saving offline donation', 'There were some problems saving the offline donation.  Please try again');
          $scope.isSaving = false;
        }
      );
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}];