var fdWidgetsSocialPostMdl = ['$scope', '$uibModalInstance', '$uibModal', 'fdSvc', 'appUrl', 'user', 'fund',
  function ($scope, $uibModalInstance, $uibModal, fdSvc, appUrl, user, fund) {

    //#region ===Initialize===

    'use strict';
    $scope.showValidationMessages = false;
    $scope.fund                   = fund;
    $scope.isSending              = false;
    $scope.sender                 = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipients: '',
      emails: []
    }

    //#endregion

    $scope.sendEmail = function () {
      if (this.sendMailForm.$valid) {
        $scope.isSending = true;
        var emailString = $scope.sender.recipients.split(',');
        var count = 0;
        var toEmails = [];

        angular.forEach(emailString, function (value, key) {
          //Check emails;
          if (App.validateEmail(value.trim())) {
            $scope.sender.emails.push(value.trim());
            toEmails.push({
              email: value.trim(),
              name: value.trim(),
            });
            count++;
          }
        });

        if (count === 0) {
          toastr.warning('Please add at least one email recipient.');
          $scope.sender.recipients = $scope.sender.emails.join();
          $scope.isSending = false;
        } else {
          fdSvc.share({
            firstName: $scope.sender.firstName,
            lastName: $scope.sender.lastName,
            fundTitle: $scope.fund.item.title,
            fundId: $scope.fund.item.identification,
            fundDescription: $scope.fund.item.description,
            fundDonateUrl: appUrl.base + '/fund/donate/' + $scope.fund.item.identification,
            fundUrl: $scope.fund.url,
            fundImageUrl: appUrl.base + $scope.fund.defaultImage,
            fromEmail: $scope.sender.email,
            toEmails: toEmails
          }).then(function (response) {
            $uibModalInstance.close($scope.sender);
            $scope.isSending = false;
          }, function (response) {
            toastr.error('Unable to share campaign.  Please refresh and try again');
            $scope.isSending = false;
          });

        }
      } else {
        $scope.showValidationMessages = true;
      }
    };

    $scope.preview = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/common/mdPostMailPreviewMdl.min.html',
        controller: fdWidgetsSocialMailPreviewMdl,
        size: 'sm',
        resolve: {}
      });

      modalInstance.result.then(function () {
        //do nothing on close 
      }, function () {
        //do nothing on dismiss(cancel)
      });
    }

    $scope.cancel = function (reason) {
      $uibModalInstance.dismiss(reason);
    };
  }];