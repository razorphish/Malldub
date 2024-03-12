'use strict';

fundoloApp.controller('fdDashboardUpdatesCtrl', ['$modal', '$scope', '$log', '$stateParams', '$window', '$location', 'fdDashboardSvc',
  function fdDashboardUpdatesCtrl($modal, $scope, $log, $stateParams, $window, $location, fdDashboardSvc) {
    //Initialize
    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      },
      function (response) {
        toastr('Error loading fund.  Please try again');
        $log.error(response);
      }
    );
    
    //\Initialize
    
    $scope.showWarning = false;
    
    $scope.updateFundUpdate = function (fundUpdate) {
      fundUpdate.isUpdating = true;
      fundUpdate.statusId = 'Deleted';

      fdDashboardSvc.saveUpdate(fundUpdate).then(
        function (response) {
          $scope.fundUpdates.splice($scope.fundUpdates.indexOf(fundUpdate), 1);
          toastr.success("Connection feed updated successfully");
        },
        function (response) {
          var msgbox = $modal.messageBox('Oops!  Problem creating update', 'There were some problems creating the update.  Please try again',
              [{ label: 'Ok', result: 'Ok', cssClass: 'btn-u btn-u-blue' }]);

          msgbox.open().then(function () { });
          fundUpdate.isUpdating = false;
        }
      );
    };
    
    $scope.saveFundUpdate = function (fundUpdate) {
      $scope.isSaving = true;
      if (this.updateForm.$valid) {
        fundUpdate.fundId = $scope.fund.identification;
        fdDashboardSvc.saveUpdate(fundUpdate).then(
          function (response) {
            $scope.fundUpdates.push(response);
            clearbaseUpdate();
            $scope.isSaving = false;
            toastr.success("Updated added successfully");
          },
          function (response) {
            var msgbox = $modal.messageBox('Oops!  Problem creating update', 'There were some problems creating the update.  Please try again',
              [{ label: 'Ok', result: 'Ok', cssClass: 'btn-u btn-u-blue' }]);

            msgbox.open().then(function () { });
            $scope.isSaving = false;
          });
      } else {
        var msgbox = $modal.messageBox('Oops!  Description is required', 'Description is required.  Please fill it in.',
          [{ label: 'Ok', result: 'Ok', cssClass: 'btn-u btn-u-blue' }]);

        msgbox.open().then(function () { });
        $scope.isSaving = false;
      }

    };

    function clearbaseUpdate() {
      $scope.fundUpdate.content = '';
      $scope.isDeleting = false;
    }
  }]);