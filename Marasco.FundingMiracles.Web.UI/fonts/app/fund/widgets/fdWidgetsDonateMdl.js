var fdWidgetsDonateMdl = [
  '$scope', '$uibModalInstance', '$uibModal', '$filter', 'appUrl', 'mdCoreDataSvc', 'userSvc', 'seAuthSvc', 'orDataSvc', 'wePayConst', 'fund', 'donationAmount',
  function ($scope, $uibModalInstance, $uibModal, $filter, appUrl, mdCoreDataSvc, userSvc, seAuthSvc, orDataSvc, wePayConst, fund, myDonationAmount) {

    //#region === Initialize ===

    'use strict';
    $scope.fund                   = fund;
    $scope.order                  = {
      cardNumber: wePayConst.credit_card_number === undefined ? '' : wePayConst.credit_card_number
    };
    $scope.showValidationMessages = false;
    $scope.buttonNo               = 1;
    $scope.isSaving               = false;
    $scope.isUpdating             = false;
    $scope.hideAmountText         = false;
    $scope.coverFees              = true;
    $scope.payOptions             = mdCoreDataSvc.payOptions;
    $scope.yearOptions            = mdCoreDataSvc.yearOptions();
    $scope.monthOptions           = mdCoreDataSvc.monthOptions;
    $scope.selectedCardMonth      = $scope.monthOptions[0];
    $scope.selectedCardYear       = $scope.yearOptions[0];
    $scope.isDonorReadonly        = false;
    $scope.hideAmountText         = false;
    $scope.donation               = {
      isPrivate: false,
      amount: myDonationAmount
    };
    $scope.dropdownItems          = getItems();

    /* Local field */
    var isPrivate = false;

    //#endregion

    //#region === Events ===
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

    //#endregion

    //#region === Public Methods ===

    $scope.amountToCoverOptions = function () {
      var currentLevel   = $scope.level;
      var items          = getItems();
      var donationAmount = getDonationAmount();
      var amountToCoverF = $filter('number')((donationAmount * mdCoreDataSvc.defaultChargeFee) * 2, 0);
      var amountToCover  = (amountToCoverF === 0) ? 0 : amountToCoverF / 2;

      $scope.coverFees = this.coverFees;
      angular.forEach(items, function (value, key) {

        if ($scope.coverFees) {
          value.levels[currentLevel].percentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = false;
          $scope.iGotThis = true;
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = true;

          $scope.iGotThis = false;
        }
      });
    };

    init();

    $scope.anonymize = function () {
      if ($scope.donation.isPrivateDonorName) {
        $scope.donation.donorName = 'Anonymous';
        $scope.isDonorReadonly = true;
      } else {
        $scope.donation.donorName = '';
        $scope.isDonorReadonly = false;
      }
    };

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.hideAmount = function () {
      $scope.hideAmountText = $scope.donation.isPrivateAmount;
    };

    $scope.modalPaymentBreakdown = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateBreakdownMdl.html',
        controller: donationBreakdownModal,
        backdrop: 'static', //true:false:static(user click on background)
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

    $scope.resetAmount = function () {
      setLevel();
      setFeeAmount(getDonationAmount(), $scope.selectedFee);
      $scope.amountToCoverOptions();
    };

    $scope.totalAmount = function () {
      var donationAmount = getDonationAmount();
      setLevel();

      if (angular.isUndefined($scope.selectedFee)) {
        $scope.selectedFee = $scope.payOptions[2]; // Default
      }

      setFeeAmount(donationAmount, $scope.selectedFee);

      return donationAmount + $scope.selectedFee.iGotThisAmount;
    };
    //#endregion

    //#region === Donation Steps ===

    //Step 1 Save
    $scope.saveDonation = function () {
      $scope.isSaving = true;
      if (this.fundDonationForm.$valid) {
        var search = $scope.order.billingAddressAddress.address1 + ' ' + $scope.order.billingAddressAddress.zipCode;
        $scope.order.cardExpirationMonth = this.fundDonationForm.cardExpirationMonth.$modelValue.value;
        $scope.order.cardExpirationYear = this.fundDonationForm.cardExpirationYear.$modelValue.value;

        mdCoreDataSvc.getGeoData3(search).then(function (data) {
          $scope.order.billingAddressAddress.state = data.stateCode;
          $scope.order.billingAddressAddress.city = data.city;
          $scope.order.billingAddressAddress.zipCode = data.zip;
          
          $scope.saveInfo();
        }, function (response) {
          toastr.error('D\'oh! ' + response.error_message);
          $scope.isSaving = false;
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //Step 2
    $scope.saveInfo = function () {


      $scope.customer = {
        userName: $scope.donation.email,
        firstName: $scope.donation.isPrivateDonorName ? 'Anonymous' : $scope.order.cardName,
        email: $scope.donation.email,
      };

      userSvc.getByUserName($scope.donation.email).then(
        function(promisedUser) {
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
        function(response, headers) {
          // User not found
          if (response.status === 404) {
            seAuthSvc.registerAnonymous($scope.customer).then(
              function(promisedNewUser) {
                $scope.customer.identification = promisedNewUser.identification;
                $scope.savePayment();
              }, function(innerresponse) {
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
    };

    //Step 3
    $scope.savePayment = function () {

      getDonation();
      $scope.order.paymentMethodSystemName     = "Payments.WePay";
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
        function(donation) {
          $scope.isSaving = false;
          $scope.saveThankYou(donation);
        },
        function(response) {
          handleError(response.data);
          $scope.isSaving = false;
        });
    };

    $scope.saveThankYou = function (donation) {
      $uibModalInstance.close(donation);
    };

    //#endregion

    //#region === Private Methods ===

    function setLevel() {
      var donationAmount = getDonationAmount();

      if (donationAmount < 100) {
        $scope.level = 0;
      } else if (donationAmount >= 100 && donationAmount < 200) {
        $scope.level = 1;
      } else {
        $scope.level = 2;
      }
    };

    function getDonation() {
      $scope.donation.beneficiary = angular.isDefined($scope.fund.beneficiary)
        ? $scope.fund.beneficiary.fullName : $scope.fund.originator.fullName;
      $scope.donation.beneficiaryAmount  = $scope.selectedFee.beneficiaryAmount;
      $scope.donation.systemAmount       = $scope.selectedFee.levels[$scope.level].amount;
      $scope.donation.processingFee      = $scope.selectedFee.chargeFeeAmount;
      $scope.donation.donorUserId        = angular.isDefined($scope.customer) ? $scope.customer.identification : 0;
      $scope.donation.feeTypeId          = 'Level0';
      $scope.donation.fundId             = $scope.fund.identification;
      $scope.donation.offlineDonation    = false;
      $scope.donation.isPrivate          = isPrivate;
      $scope.donation.statusId           = 'Active';
      $scope.donation.thankYouNoteSent   = false;
      $scope.donation.costsCovered       = $scope.coverFees;
      $scope.donation.donorName          = $scope.order.cardName;
      $scope.donation.subscriptionTypeId = $scope.donation.contributeMonthly ? 'Monthly' : 'None';
    };

    function getDonationAmount() {
      return parseInt(angular.isUndefined($scope.donation.amount) ? 0 : $scope.donation.amount, 10);
    };

    function getGeo() {
      mdCoreDataSvc.getGeoData2().then(
        function (geo) {
          $scope.order.geo = geo;
        },
        function (response) {
          //Assign/Do Nother
        });
    }

    function getItems() {
      var dropdownOptions = [];
      var donationAmount = getDonationAmount();
      setLevel();

      angular.forEach($scope.payOptions, function (value, key) {
        setFeeAmount(donationAmount, value);
        value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : '');
        dropdownOptions.push(value);
      });

      return dropdownOptions;
    };

    function init() {
      $scope.amountToCoverOptions();
      getGeo();
    }

    function setFeeAmount(donationAmount, feeObject) {

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
    //#endregion
  }];