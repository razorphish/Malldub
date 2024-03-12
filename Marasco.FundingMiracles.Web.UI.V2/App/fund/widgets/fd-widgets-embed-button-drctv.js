'use strict';

fundoloApp.directive('fdWidgetsEmbedButtonDrctv', [
  function() {
    var p = {};

    //#region === Initialize ===
    p.templateUrl = '/app/fund/widgets/fd-widgets-embed-button-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.restrict    = 'E';

    p.controller = ['$scope', '$uibModal',
      function ($scope, $uibModal) {

        $scope.embed = function() {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fd-widgets-embed-button-mdl.min.html',
            controller: embedFundModal,
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
      fund : '='
    }
    //#endregion

    return p;
  }
]);

var embedFundModal = ['$scope', '$uibModalInstance', 'appUrl', 'fund',
  function ($scope, $uibModalInstance, appUrl, fund) {
    $scope.fund = fund;

    $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
    $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
    $scope.cardSrc      = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
    $scope.buttonSrc    = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
    $scope.widgetSrc    = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;


    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];