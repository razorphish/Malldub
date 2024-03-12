(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserControllerModal', FundraiserControllerModal);

  FundraiserControllerModal.inject = [
    '$scope', '$uibModalInstance', '$log', '$filter',
    'items', 'isAdd', 'fundraiserFactory',
    'fundraiserTabs',
    'toastr', 'moment'];

  function FundraiserControllerModal(
    $scope, $uibModalInstance, $log, $filter,
    items, isAdd, fundraiserTabs,
    fundraiserFactory,
    toastr, moment) {

    var vm = this;
    var itemName = 'Fund';
    var fundDirty = false;
    var daysToAdd = 1;

    vm.isSaving = false;

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.editorOptions = {
      language: 'ru',
      uiColor: '#000000',
      height: 300
    };

    vm.change1 = function () {
      $scope.dateOptions2.minDate = moment($scope.fund.item.startDate).add(daysToAdd, 'days');

      //Compare dates to make it easier
      var changeDate = !moment($scope.fund.item.endDate)
        .isAfter($scope.dateOptions2.minDate, 'day');

      if (changeDate) {
        $scope.fund.item.endDate = $scope.dateOptions2.minDate.toDate();
      }
    };

    vm.open1 = function () {
      $scope.popup1.opened = true;
    };

    vm.open2 = function () {
      $scope.popup2.opened = true;
    };

    vm.close = function (reason) {
      if (fundDirty) {
        $uibModalInstance.close(true);
      }
      $uibModalInstance.dismiss(reason);
    };

    vm.saveFundraiser = function () {
      vm.isSaving = true;
      if (vm.editForm.$valid) {
        fundraiserFactory.update($scope.fund).then(
          function (response) {
            toastr.success('Fund saved successfully');
            $scope.fund.item.dateUpdated = response.item.dateUpdated;
            fundDirty = true;
            vm.isSaving = false;
          },
          function (response) {
            var msg = response.data ? response.data.message || '' : '';
            toastr.error('Error in saving ' + itemName + '. ' + msg);
            vm.isSaving = false;
            fundDirty = false;
          }
        );
      } else {
        vm.showValidationMessages = true;
        vm.isSaving = false;
      }
    };

    function setTabs() {
      //Set scope tabs for child controllers
      $scope.scopeTabs = fundraiserTabs;
      var tabs = $filter('filter')(fundraiserTabs, { tabSetName: 'fundraiser' },
        function (actual, expected) {
          return angular.equals(actual, expected);
        });
      vm.tabs = tabs;
    }

    function getCategoryList() {

      fundraiserFactory.categories().then(
        function (response) {
          $scope.categoryList = response;

          vm.isCategoryLoading = false;
        },
        function (response) {
          toastr.error('Error in getting categories');
        }
      );
    }

    function getStatusList() {

      fundraiserFactory.statuses().then(
        function (response) {
          $scope.statusList = response;

          vm.isStatusLoading = false;
        },
        function (response) {
          toastr.error('Error in getting statuses');
        }
      );
    }

    function getPageColorList() {
      $scope.pageColorList = [
        {
          friendlyName: 'Green',
          identification: 'Green'
        }, {
          friendlyName: 'Blue',
          identification: 'Blue'
        }, {
          friendlyName: 'Orange',
          identification: 'Orange'
        }, {
          friendlyName: 'Red',
          identification: 'Red'
        }, {
          friendlyName: 'Light',
          identification: 'Light'
        }, {
          friendlyName: 'Purple',
          identification: 'Purple'
        }, {
          friendlyName: 'Aqua',
          identification: 'Aqua'
        }, {
          friendlyName: 'Brown',
          identification: 'Brown'
        }, {
          friendlyName: 'Dark Blue',
          identification: 'Dark-Blue'
        }, {
          friendlyName: 'Light Green',
          identification: 'Light-Green'
        }, {
          friendlyName: 'Dark Red',
          identification: 'Dark-Red'
        }, {
          friendlyName: 'Teal',
          identification: 'Teal'
        }
      ];
    }

    function getPageSkinList() {
      $scope.pageSkinList = [
        {
          friendlyName: 'Light',
          identification: 'Light'
        }, {
          friendlyName: 'Dark',
          identification: 'Dark'
        }
      ];
    }

    function getPageLayoutList() {
      $scope.pageLayoutList = [
        {
          friendlyName: 'Wide',
          identification: 'Wide'
        }, {
          friendlyName: 'Boxed',
          identification: 'Boxed'
        }
      ];
    }

    function setDateOptions() {
      $scope.dateOptions1 = {
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
      };

      $scope.dateOptions2 = {
        formatYear: 'yy',
        minDate: moment($scope.fund.item.startDate).add(daysToAdd, 'days'),
        startingDay: 1
      };
    }

    function setDates() {
      $scope.fund.item.startDate =
        new Date(moment($scope.fund.item.startDate).format('MM/DD/YYYY'));
      $scope.fund.item.endDate =
        new Date(moment($scope.fund.item.endDate).format('MM/DD/YYYY'));
    }
    ////////////////

    function activate() {

      $scope.fund = angular.copy(items);

      setDates();
      setTabs();
      getCategoryList();
      getStatusList();
      getPageColorList();
      getPageSkinList();
      getPageLayoutList();
      setDateOptions();

      vm.showValidationMessages = false;
      vm.isAdd = isAdd;
    }

    activate();
  }
})();
