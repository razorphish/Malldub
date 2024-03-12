(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserDonationsControllerModal', FundraiserDonationsControllerModal);

  FundraiserDonationsControllerModal.inject = [
    '$scope', '$uibModalInstance', '$log',
    'items', 'isAdd', 'tabs',
    'fundraiserDonationsFactory',
    'toastr', 'moment', 'epAxisSettingsVal'
  ];

  function FundraiserDonationsControllerModal(
    $scope, $uibModalInstance, $log,
    item, isAdd, tabs,
    fundraiserDonationsFactory,
    toastr, moment, epAxisSettingsVal
  ) {

    var vm = this;
    vm.itemName = 'donation';
    var itemDirty = false;

    vm.close = function (reason) {
      if (itemDirty) {
        $uibModalInstance.close(true);
      }
      $uibModalInstance.dismiss(reason);
    };

    activate();

    ////////////////

    function activate() {
      $scope[vm.itemName] = angular.copy(item);
      vm.showValidationMessages = false;
      vm.isAdd = isAdd;

      setTabs();
      getDonationOrder(
        $scope[vm.itemName].fundId,
        $scope[vm.itemName].identification,
        $scope[vm.itemName].orderId);
    }

    function setTabs() {
      vm.tabs = tabs;
    }

    function getDonationOrder(fundId, donationId, orderId) {
      fundraiserDonationsFactory.order(fundId, donationId, orderId).then(
        function (response) {
          $scope.donationOrder = response;
        }, function (responseError) {
          toastr.error('There was an error getting ' + vm.itemName);
          $log.error(responseError);
        }
      );
    }
  }
})();
