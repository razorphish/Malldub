fundoloApp.controller('fdDonateCtrl', ['$scope', '$location', '$stateParams', '$uibModal', '$log', '$filter', 'seAuthSvc', 'fdSvc', 'userSvc', 'orDataSvc', 'mdCoreDataSvc', 'wePayConst',
  function fdDonateCtrl($scope, $location, $stateParams, $uibModal, $log, $filter, seAuthSvc, fdSvc, userSvc, orDataSvc, mdCoreDataSvc, wePayConst) {
    'use strict';
    //#region Initialize
    var a = Number($stateParams["a"]);
    $scope.displayAmount = angular.element.isNumeric(a);

    fdSvc.basic($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

        $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 230, 150);
      },
      function (response) {
        $log.error(response);
      });

    mdCoreDataSvc.getAllStates().then(
      function (states) {
        $scope.stateOptions = states;
      },
      function (response) {
        toastr.error('Error getting states.  Please try again');
        $log.error(response);
      });

    //#endregion 

    //#region Methods
    var getDonationAmount = function () {
      return angular.isUndefined($scope.donation.amount) ? 0 : $scope.donation.amount;
    };

    var setLevel = function () {
      var donationAmount = getDonationAmount();

      if (donationAmount < 100) {
        $scope.level = 0;
      } else if (donationAmount >= 100 && donationAmount < 200) {
        $scope.level = 1;
      } else {
        $scope.level = 2;
      }
    };

    var setFeeAmount = function (donationAmount, feeObject) {

      var chargeFee = ((donationAmount + feeObject.levels[$scope.level].amount) * feeObject.levels[$scope.level].chargePercentage) * 2;
      if (chargeFee === 0) {
        chargeFee = .6;
      }
      feeObject.chargeFeeAmount = ((chargeFee === 0) ? 0 : chargeFee / 2) + feeObject.levels[$scope.level].chargeAmount;
      var percentageFee = (donationAmount * feeObject.levels[$scope.level].percentage) * 2;
      var percentageFeeAmount = (percentageFee === 0) ? 0 : percentageFee / 2;

      feeObject.feeAmount = (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : feeObject.levels[$scope.level].chargeAmount)
        + percentageFeeAmount
        + feeObject.levels[$scope.level].amount;

      feeObject.beneficiaryAmount = donationAmount - (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : 0);

      feeObject.iGotThisAmount = (feeObject.levels[$scope.level].chargeFee ? 0 : feeObject.chargeFeeAmount)
        + feeObject.levels[$scope.level].amount;

    };
    //#endregion //Methods

    //#region Publicly Exposed Methods
    $scope.items = function () {
      var dropdownOptions = [];
      var donationAmount = getDonationAmount();
      setLevel();

      angular.forEach($scope.payOptions, function (value, key) {
        setFeeAmount(donationAmount, value);
        var formatted = $filter('currency')(value.iGotThisAmount);
        //value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : formatted + ' ');
        value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : '');
        dropdownOptions.push(value);
      });

      return dropdownOptions;
    };

    $scope.donation = {
      isPrivate: false
    };

    $scope.order                  = {
      cardNumber: wePayConst.credit_card_number === undefined ? '' : wePayConst.credit_card_number
    };
    $scope.donation.amount        = angular.element.isNumeric(a) ? a : 100;
    $scope.buttonNo               = 1;
    $scope.isSaving               = false;
    $scope.isUpdating             = false;
    $scope.iGotThis               = true;
    $scope.coverFees              = true;
    $scope.yearOptions            = mdCoreDataSvc.yearOptions();
    $scope.monthOptions           = mdCoreDataSvc.monthOptions;
    $scope.selectedCardMonth      = $scope.monthOptions[0];
    $scope.selectedCardYear       = $scope.yearOptions[0];
    $scope.payOptions             = mdCoreDataSvc.payOptions;
    $scope.showValidationMessages = false;
    $scope.dropdownItems          = $scope.items();
    $scope.isDonorReadonly        = false;
    $scope.hideAmountText         = false;
    /* Local field */
    var oldNameValue = '';
    var isPrivate = false;

    $scope.$watch('stateOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedState = $scope.stateOptions[0];
      }
    });

    $scope.anonymize = function() {
      if ($scope.donation.isPrivateDonorName) {
        $scope.donation.donorName = 'Anonymous';
        $scope.isDonorReadonly = true;
      } else {
        $scope.donation.donorName = '';
        $scope.isDonorReadonly = false;
      }
    };

    $scope.hideAmount = function() {
      $scope.hideAmountText = $scope.donation.isPrivateAmount;
    };
    
    $scope.setDonationAmount = function (buttonNumber, amount) {
      $scope.buttonNo = buttonNumber;
      $scope.donation.amount = amount;
      $scope.resetAmount();
    };

    $scope.amountToCoverOptions = function () {
      var currentLevel = $scope.level;
      var items = $scope.items();
      var donationAmount = getDonationAmount();
      var amountToCoverF = $filter('number')((donationAmount * mdCoreDataSvc.defaultChargeFee) * 2, 0);
      var amountToCover = (amountToCoverF === 0) ? 0 : amountToCoverF / 2;

      $scope.coverFees = this.coverFees;
      angular.forEach(items, function (value, key) {
        var formatted;

        if ($scope.coverFees) {
          value.levels[currentLevel].percentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = false;
          //formatted = $filter('currency')(value.levels[currentLevel].amount + amountToCover + value.levels[$scope.level].chargeAmount);
          //value.name = value.levels[currentLevel].title.replace('{0}',
          //  value.levels[currentLevel].percentage === 0 ? '' : formatted + ' ');
          $scope.iGotThis = true;
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = true;
          //value.name = value.levels[currentLevel].title.replace('{0}', '');
          $scope.iGotThis = false;
        }
      });
    };

    $scope.amountToCoverOptions();

    $scope.onFeeSelect = function ($event) {
      $scope.selectedFee = this.selectedFee;
      if (this.selectedFee.levels[$scope.level].customizableAmount === true) {
        $scope.isCustomAmount = true;
      } else {
        $scope.isCustomAmount = false;
      }
    };

    $scope.$watch('selectedFee.levels[level].customAmount', function (newValue, oldValue) {

      if (angular.isUndefined(newValue)) {
        if (angular.isDefined($scope.selectedFee)) {
          $scope.selectedFee.levels[$scope.level].amount = 0;
        }
      } else {
        $scope.selectedFee.levels[$scope.level].amount = newValue;
      }
    });

    $scope.totalAmount = function () {
      var donationAmount = getDonationAmount();
      setLevel();

      if (angular.isUndefined($scope.selectedFee)) {
        $scope.selectedFee = $scope.payOptions[2]; // Default
      }

      setFeeAmount(donationAmount, $scope.selectedFee);

      return donationAmount + $scope.selectedFee.iGotThisAmount;
    };


    $scope.makeAnonymous = function () {
      if ($scope.donation.isPrivate) {
        oldNameValue = $scope.donation.donorName;
        $scope.donation.donorName = 'Anonymous';
        isPrivate = true;
      } else {
        $scope.donation.donorName = oldNameValue;
        oldNameValue = '';
        isPrivate = false;
      }
    };

    //#region === Step1 Save Info ===
    //Step 2
    $scope.saveInfo = function () {

      if (this.fundDonationForm.$valid) {

        $scope.customer = {
          userName: $scope.donation.email,
          firstName: $scope.donation.donorName,
          lastName: $scope.donation.donorName,
          email: $scope.donation.email,
        };

        userSvc.getByUserName($scope.donation.email).then(
          function (promisedUser) {
            var user = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;

            // User found
            if (angular.isUndefined(user)) {
              toastr.error('There was a problem retrieving user information.  Please try again');
              $scope.isSaving = false;
            } else {
              $scope.customer.identification = user.identification;
              $scope.savePayment();
            }
          },
          function (response, headers) {
            // User not found
            if (response.status === 404) {
              seAuthSvc.registerAnonymous($scope.customer).then(
                function (promisedNewUser) {
                  $scope.customer.identification = promisedNewUser.identification;
                  $scope.savePayment();
                }, function (innerresponse) {
                  toastr.error('There was a problem saving user info.  Please try again');
                  $log.error(innerresponse);
                  $scope.isSaving = false;
                });
            } else {
              toastr.error('There was a problem saving donation info. Please try again');
              $log.error(response);
              $scope.isSaving = false;
            }
          });
      } else {
        $scope.isSaving = false;
        $scope.showValidationMessages = true;
      }
    };

    //#endregion === Step2 Save Info ===

    $scope.savePayment = function () {
      if ($scope.fundDonationForm.$valid) {
        getDonation();
        $scope.order.paymentMethodSystemName = "Payments.WePay";
        $scope.order.billingAddressAddress.state = $scope.fundDonationForm.billingState.$modelValue.identification;
        $scope.order.cardExpirationMonth = $scope.fundDonationForm.cardExpirationMonth.$modelValue.value;
        $scope.order.cardExpirationYear = $scope.fundDonationForm.cardExpirationYear.$modelValue.value;
        $scope.order.orderItemList = [{
          itemId: $scope.fund.identification,
          price: $scope.donation.amount
        }];
        $scope.order.statusId = 'Completed';
        $scope.order.PaymentStatusId = 'Paid';
        $scope.order.aspNetUser = {
          email: $scope.donation.email,
          identification: $scope.customer.identification
        };
        $scope.order.customerId = $scope.customer.identification;
        $scope.order.donationList = [
          $scope.donation
        ];

        orDataSvc.save($scope.order).then(
          function (promisedOrder) {
            $scope.isSaving = false;
            $scope.saveThankYou();
          },
          function (response) {
            handleError(response.data);
            $scope.isSaving = false;
          });
      }
    };

    var getDonation = function () {
      $scope.donation.beneficiaryAmount = $scope.selectedFee.beneficiaryAmount;
      $scope.donation.systemAmount      = $scope.selectedFee.levels[$scope.level].amount;
      $scope.donation.processingFee     = $scope.selectedFee.chargeFeeAmount;
      $scope.donation.donorUserId       = angular.isDefined($scope.customer) ? $scope.customer.identification: 0;
      $scope.donation.feeTypeId         = 'Level0';
      $scope.donation.fundId            = $scope.fund.identification;
      $scope.donation.offlineDonation   = false;
      $scope.donation.isPrivate         = isPrivate;
      $scope.donation.statusId          = 'Active';
      $scope.donation.thankYouNoteSent  = false;
      $scope.donation.costsCovered      = $scope.coverFees;
      $scope.donation.beneficiary       = 'Beneficiary';
    };

    $scope.saveThankYou = function () {
      toastr.success('You are awesome!  Thank you for your generosity');
      $location.path('/' + $scope.fund.item.permalink);
    };

    $scope.updateAmount = function () {
      $scope.isUpdating = false;
    };

    $scope.editAmount = function () {
      $scope.isUpdating = true;
    };


    $scope.modalPaymentUsage = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonatePaymentUsageMdl.min.html',
        controller: paymentUsageModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalProcessingFee = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateProcessingFeeMdl.html',
        controller: processingFeeModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalPaymentBreakdown = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateBreakdownMdl.html',
        controller: donationBreakdownModal,
        backdrop: 'true', //true:false:static(user click on background)
        resolve: {
          donation: function () {
            getDonation();
            return $scope.donation;
          },
          totalAmount: function () { return $scope.totalAmount(); }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.resetAmount = function () {
      setLevel();
      setFeeAmount(getDonationAmount(), $scope.selectedFee);
      $scope.amountToCoverOptions();
    };

    //Step 1 Save
    $scope.saveDonation = function () {
      $scope.isSaving = true;
      if (this.fundDonationForm.$valid) {
        $scope.saveInfo();
      } else {
        toastr.error('Oops.  You have some missing or invalid data!');
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    function handleError(data) {
      var msg;
      switch (data.error_description) {
        case 'App fee can not be greater than 20% of the amount':
          msg = 'Your donation to Funding Miracles cannot exceed more than 20% of the your total donation.';
          toastr.error(msg);
          $scope.title = 'Thank you! But, ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
        default:
          msg = data.error_description;
          toastr.error(msg);
          $scope.title = 'Ooops! ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
      }
    }
  }]);

var paymentUsageModal = ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];

var processingFeeModal = ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];

var donationBreakdownModal = ['$scope', '$uibModalInstance', 'donation', 'totalAmount',
  function ($scope, $uibModalInstance, donation, totalAmount) {
  $scope.donation = donation;
  $scope.totalAmount = totalAmount;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];