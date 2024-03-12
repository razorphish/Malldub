fundoloApp.directive('fdWidgetsContactDrctv', [
  function () {
    'use strict';
    var p = {};

    //#region === Initialize ===
    p.templateUrl = '/app/fund/widgets/fd-widgets-contact-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.restrict    = 'E';

    p.controller = ['$scope', '$uibModal',
      function ($scope, $uibModal) {

        $scope.contact = function () {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fd-widgets-contact-mdl.min.html',
            controller: contactFundModal,
            resolve: {
              fund: function () {
                return $scope.fund;
              }
            }
          });

          modalInstance.result.then(function (sender) {
            //Do nothing on close
          }, function () {
            //Do nothing on cancel
          });
        }
      }
    ];

    p.scope = {
      fund: '='
    }
    //#endregion

    return p;
  }
]);

var contactFundModal = ['$scope', '$uibModalInstance', 'fdSvc', 'fund',
  function ($scope, $uibModalInstance, fdSvc, fund) { 
    //#region === Initialize ===
    $scope.fund = fund;
    $scope.sender = {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }
    $scope.showValidationMessages = false;
    $scope.isSending = false; 
    //#endregion

    $scope.sendEmail = function () {
      if (this.sendMailContactForm.$valid) {
        $scope.isSending = true;
        fdSvc.createFundNote({
          fundNote: {
            fundId: $scope.fund.identification, 
            fundUserId: $scope.fund.originator.identification,
            typeId: 'Notification'
          },

          email: $scope.sender.email,
          firstName: $scope.sender.firstName,
          lastName: $scope.sender.lastName,
          comments: $scope.sender.message
        }).then(function(response) {
          toastr.success('Awesome!  You have successfully contacted ' + $scope.fund.originator.firstName);
          $uibModalInstance.close('Success');
          $scope.isSending = false;
        }, function(response) {
          toastr.error('It seems that we cannot make contact. Please refresh and try again');
          $scope.isSending = false;
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSending = false;
      }
    }

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];