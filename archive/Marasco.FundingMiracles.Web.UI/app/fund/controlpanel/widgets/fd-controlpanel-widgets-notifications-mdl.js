var fdControlpanelWidgetsNotificationsMdl = ['$scope', '$uibModalInstance', '$uibModal', 'fdDashboardSvc', 'appUrl', 'rowItem',
  function ($scope, $uibModalInstance, $uibModal, fdDashboardSvc, appUrl, rowItem) {

    //#region ===Initialize===
    $scope.sender = {
      fundNote: {
        respondNoteId: rowItem.identification,
        fundId: rowItem.fundId,
        typeId: 'Response'
      },

      firstName: rowItem.note.firstName,
      lastName: rowItem.note.lastName,
      email: rowItem.note.email,
      comments: '',
      isPrivate: 'true'

    }

    $scope.showValidationMessages = false;
    $scope.isResponding           = false;
    $scope.record                 = rowItem;

    //#endregion

    $scope.respond = function () {
      $scope.isResponding = true;
      if (this.fundNotificationResponseForm.$valid) {
        fdDashboardSvc.respondFundNote($scope.sender).then(function (response) {
          toastr.success('Response sent successfully');
          $uibModalInstance.close($scope.sender);
        }, function (response) {
          toastr.error('Our gnomes are having trouble delivering this message.  Please refresh and try again');
        });
      } else {
        $scope.showValidationMessages = true;
      }
      $scope.isResponding = false;

    };

    $scope.cancel = function (reason) {

      if ($scope.record.note.viewed === false) {
        fdDashboardSvc.updateFundNoteView($scope.record.fundId, $scope.record.note.identification)
          .then(function () {
            $uibModalInstance.dismiss('closeSuccess');
          }, function () {
            $uibModalInstance.dismiss('closeFail');
          });
      } else {
        $uibModalInstance.dismiss(reason);
      }

    };
  }];