'use strict';

fundoloApp.controller('fdDonateCtrl',
  ['$scope', '$location', '$stateParams', '$uibModal', '$log', '$filter', 'seAuthSvc', 'fdSvc', 'userSvc', 'orDataSvc', 'mdCoreDataSvc',
  function fdDonateCtrl($scope, $location, $stateParams, $uibModal, $log, $filter, seAuthSvc, fdSvc, userSvc, orDataSvc, mdCoreDataSvc) {

    //#region Initialize

    fdSvc.basic($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

        $scope.mainFundImage = '/azure/' + $scope.fund.item.itemUploadList.upload.containerName + '/'
        + $scope.fund.item.itemUploadList.upload.name
        + '?height=150&width=230&mode=crop';
      },
      function (response) {
        $log.error(response);
      });

    mdCoreDataSvc.getAllStates().then(
      function(states) {
        $scope.states = states;
      },
      function(response) {
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

      var chargeFee = Math.round((donationAmount * feeObject.levels[$scope.level].chargePercentage) * 2);
      if (chargeFee === 0) {
        chargeFee = .6;
      }
      feeObject.chargeFeeAmount = ((chargeFee === 0) ? 0 : chargeFee / 2) + feeObject.levels[$scope.level].chargeAmount;
      var percentageFee = Math.round((donationAmount * feeObject.levels[$scope.level].percentage) * 2);
      var percentageFeeAmount = (percentageFee === 0) ? 0 : percentageFee / 2;

      feeObject.feeAmount = (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : 0)
        + percentageFeeAmount 
        + feeObject.levels[$scope.level].amount;

      feeObject.beneficiaryAmount = donationAmount - (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : 0);

      //if (donationAmount < 100) {
      //  $scope.iGotThis = true;
      //  $scope.iGotThisChecked = true;
      //  feeObject.iGotThisAmount = percentageFeeAmount;
      //} else {
      //  $scope.iGotThis = false;
      feeObject.iGotThisAmount = percentageFeeAmount
        + feeObject.levels[$scope.level].amount
        + (feeObject.levels[$scope.level].chargeFee ? 0 : feeObject.levels[$scope.level].chargeAmount);
      //}

    };
    //#endregion //Methods

    $scope.items = function () {
      var dropdownOptions = [];
      var donationAmount = getDonationAmount();
      setLevel();

      angular.forEach($scope.payOptions, function (value, key) {
        setFeeAmount(donationAmount, value);
        var formatted = $filter('currency')(value.iGotThisAmount);
        value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : formatted + ' ');
        dropdownOptions.push(value);
      });

      return dropdownOptions;
    };

    $scope.donation = {
      isPrivate : false
    };
    $scope.isSaving               = false;
    $scope.step                   = 1;
    $scope.isUpdating             = false;
    $scope.iGotThis               = true;
    $scope.iGotThisChecked        = false;
    $scope.coverFees              = "yes";
    $scope.yearOptions            = mdCoreDataSvc.yearOptions();
    $scope.monthOptions           = mdCoreDataSvc.monthOptions;
    $scope.selectedCardMonth      = $scope.monthOptions[0].value;
    $scope.selectedCardYear       = $scope.yearOptions[0].value;
    $scope.payOptions             = mdCoreDataSvc.payOptions;
    $scope.showValidationMessages = false;
    $scope.dropdownItems          = $scope.items();

    
    /* Local field */
    var oldNameValue = '';
    var isPrivate = false;

    $scope.amountToCoverOptions = function () {
      var currentLevel = $scope.level;
      var items = $scope.items();
      var donationAmount = getDonationAmount();
      var amountToCoverF = $filter('number')((donationAmount * mdCoreDataSvc.defaultChargeFee) * 2, 0);
      var amountToCover = (amountToCoverF === 0) ? 0 : amountToCoverF / 2;
      
      $scope.coverFees = this.coverFees;
      angular.forEach(items, function (value, key) {
        var formatted;

        if ($scope.coverFees === "yes") {
          value.levels[currentLevel].percentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = false;
          formatted = $filter('currency')(value.levels[currentLevel].amount + amountToCover + value.levels[$scope.level].chargeAmount);
          value.name = value.levels[currentLevel].title.replace('{0}',
            value.levels[currentLevel].percentage === 0 ? '' : formatted + ' ');
          $scope.iGotThis = true;
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = true;
          value.name = value.levels[currentLevel].title.replace('{0}', '');
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

    $scope.totalAmount = function () {
      var donationAmount = getDonationAmount();
      setLevel();
      
      if (angular.isUndefined($scope.selectedFee)) {
        $scope.selectedFee = $scope.payOptions[2]; // Default
      }

      setFeeAmount(donationAmount, $scope.selectedFee);
      
      return donationAmount + $scope.selectedFee.iGotThisAmount;
    };
   

    $scope.makeAnonymous = function() {
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
    
    $scope.saveInfo = function () {
      $scope.isSaving = true;
      if (this.fundDonationDonateForm.$valid) {

        $scope.customer = {
          userName: $scope.donation.email,
          firstName: $scope.donation.donorName,
          lastName: $scope.donation.donorName,
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
              $scope.step = 3;
              $scope.isSaving = false;
              $scope.dropdownItems = $scope.items();
              $scope.amountToCoverOptions();
            }
          },
          function(response, headers) {
            // User not found
            if (response.status === 404) {
              seAuthSvc.registerAnonymous($scope.customer).then(
                function(promisedNewUser) {
                  $scope.customer.identification = promisedNewUser.identification;
                  $scope.step = 3;
                  $scope.isSaving = false;
                  $scope.dropdownItems = $scope.items();
                  $scope.amountToCoverOptions();
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
      } else {
        $scope.isSaving = false;
        $scope.showValidationMessages = true;
      }
    };
    
    //#endregion === Step2 Save Info ===
    
    $scope.savePayment = function () {
      $scope.isSaving = true;
      if (this.fundDonationPaymentForm.$valid) {
        getDonation();
        this.order.paymentMethodSystemName     = "Payments.WePay";
        this.order.billingAddressAddress.state = this.selectedState.identification;
        this.order.cardExpirationMonth         = this.selectedCardMonth;
        this.order.cardExpirationYear          = this.selectedCardYear;
        this.order.orderItemList               = [{
          itemId: $scope.fund.identification,
          price: $scope.donation.amount
        }];
        this.order.statusId        = 'Completed';
        this.order.PaymentStatusId = 'Paid';
        this.order.aspNetUser      = {
          email: $scope.donation.email,
          identification: $scope.customer.identification
        };
        this.order.customerId = $scope.customer.identification;
        this.order.donationList = [
          $scope.donation
        ];

        orDataSvc.save(this.order).then(
          function(promisedOrder) {
            $scope.step = 4;
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error(response.data.error_description);
            $scope.isSaving = false;
          });
      }
    };

    var getDonation = function() {
      $scope.donation.beneficiaryAmount = $scope.selectedFee.beneficiaryAmount;
      $scope.donation.systemAmount      = $scope.iGotThis ? $scope.selectedFee.feeAmount : $scope.selectedFee.levels[$scope.level].amount;
      $scope.donation.processingFee     = $scope.selectedFee.feeAmount;
      $scope.donation.userId            = $scope.customer.identification;
      $scope.donation.feeTypeId         = 'Level0';
      $scope.donation.fundId            = $scope.fund.identification;
      $scope.donation.offlineDonation   = false;
      $scope.donation.isPrivate         = isPrivate;
      $scope.donation.statusId          = 'Active';
      $scope.donation.thankYouNoteSent  = false;
    };
    
    $scope.saveThankYou = function() {
      $location.path('/' + $scope.fund.item.permalink);
    };

    $scope.updateAmount = function() {
      $scope.isUpdating = false;
    };

    $scope.editAmount = function() {
      $scope.isUpdating = true;
    };

    $scope.gotoStep = function(stepNumber) {
      $scope.step = stepNumber;
      $scope.dropdownItems = $scope.items();
      $scope.amountToCoverOptions();
    };

    $scope.modalPaymentUsage = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonatePaymentUsageMdl.html',
        controller: paymentUsageModal,
        resolve: {
          items : function() {
            return 'ok';
          }
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

    $scope.saveDonation = function () {
      $scope.isSaving = true;
      if (this.fundDonationInfoForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.step = 2;
      } else {
        $scope.showValidationMessages = true;
      }

      $scope.isSaving = false;
    };
    
    $scope.open = function () {

      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateProcessingFeeMdl.html',
        controller: ModalInstanceCtrl,
        backdrop: 'true', //true:false:static(user click on background)
        resolve: {
          items: function () {
            return $scope.items();
          },
          selectedFee: function() {
            return $scope.selectedFee;
          },
          iGotThis: function() {
            return $scope.iGotThis;
          },
          currentLevel: function() {
            return $scope.level;
          },
          donationAmount: function() {
            return getDonationAmount();
          },
          amountToCover: function() {
            return mdCoreDataSvc.defaultChargeFee;
          },
          iGotThisChecked: function() {
            return $scope.iGotThisChecked;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selectedFee     = selectedItem;
        $scope.iGotThisChecked = selectedItem.levels[$scope.level].iGotThisChecked;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]);

var ModalInstanceCtrl = [
  '$scope', '$uibModalInstance', '$filter', 'items', 'selectedFee', 'iGotThis', 'iGotThisChecked',
  function($scope, $uibModalInstance, $filter, items, selectedFee, iGotThis, iGotThisChecked,
    currentLevel, donationAmount, amountToCover) {

    $scope.items = items;
    $scope.selectedFee = selectedFee;
    $scope.iGotThis = iGotThis;
    $scope.iGotThisChecked = iGotThisChecked;
    $scope.amountToCoverF = $filter('number')((donationAmount * amountToCover) * 2, 0);
    $scope.amountToCover = ($scope.amountToCoverF === 0) ? 0 : $scope.amountToCoverF / 2;
    $scope.currentLevel = currentLevel;
    $scope.isCustomAmount = angular.isUndefined(selectedFee.isCustomAmount) ? false : selectedFee.isCustomAmount;

    //      var chargeFee = $filter('number')((donationAmount * feeObject.levels[$scope.level].chargePercentage) * 2, 0);
    //var chargeFeeAmount = (chargeFee === 0) ? 0 : chargeFee / 2;

    $scope.amountToCoverOptions = function($event) {
      var checkbox = $event.target;
      angular.forEach(items, function(value, key) {
        var formatted;

        if (checkbox.checked) {
          value.levels[currentLevel].percentage = amountToCover;
          value.levels[currentLevel].chargeFee = false;
          formatted = $filter('currency')(value.levels[currentLevel].amount + $scope.amountToCover);
          value.name = value.levels[currentLevel].title.replace('{0}',
            value.levels[currentLevel].percentage === 0 ? '' : formatted + ' ');
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = amountToCover;
          value.levels[currentLevel].chargeFee = true;
          value.name = value.levels[currentLevel].title.replace('{0}', ' ');
        }
      });
    };

    $scope.ok = function() {
      this.selectedFee.levels[currentLevel].iGotThisChecked = this.iGotThisChecked;
      this.selectedFee.isCustomAmount = this.isCustomAmount;
      $uibModalInstance.close(this.selectedFee);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.onFeeSelect = function($event) {
      if (this.selectedFee.levels[currentLevel].customizableAmount === true) {
        $scope.isCustomAmount = true;
      } else {
        $scope.isCustomAmount = false;
      }
    };
  }
];

var paymentUsageModal = [
  '$scope', '$uibModalInstance', 'items',
  function($scope, $uibModalInstance, items) {
    $scope.items = items;
    $scope.ok = function() {
      $uibModalInstance.close();
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
];
