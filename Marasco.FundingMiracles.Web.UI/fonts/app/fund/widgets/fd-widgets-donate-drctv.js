fundoloApp.directive('fdWidgetsDonateDrctv', [
  function() {
    var p = {};

    p.restrict    = "A";

    p.link = function($scope, element, attributes, controller) {
      //Add a click
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue.identification)) {
          element.bind('click', function () {
            $scope.initDonate();
          });
        }
      });
      
    }

    p.controller = [
      '$scope', '$uibModal', '$location', '$analytics', '$state',
      function ($scope, $uibModal, $location, $analytics, $state) {

        //#region === Public Methods ===

        $scope.initDonate = function () {
          $analytics.pageTrack('/' + $scope.fund.item.permalink);
          $analytics.eventTrack('donateOpen');
          $scope.$apply(function() {
            if ($scope.fund.settings.usePaymentModal) {
              byModal();
              //modalThankYou();
            } else {
              if (angular.isDefined($scope.donationAmount) && $scope.donationAmount > 0) {
                $location.path('/fund/donate/' + $scope.fund.identification).search('a', $scope.donationAmount);
              } else {
                $location.path('/fund/donate/' + $scope.fund.identification);
              }
            }
          });

        };

        //#endregion 

        //#region === Private Methods ===

        function byModal() {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fdWidgetsDonateMdl.min.html',
            controller: fdWidgetsDonateMdl,
            resolve: {
              fund: function () {
                return $scope.fund;
              },
              donationAmount: function () {
                var donationAmount = angular.isUndefined($scope.donationAmount) || $scope.donationAmount === 0 ? 35 : $scope.donationAmount;
                return donationAmount;
              }
            },
            size: 'med',
            backdrop: true,
            keyboard: true
          });

          modalInstance.result.then(function (donation) {
            //Add new donation to donation list
            $scope.fund.donationList.push(donation);
            modalThankYou(donation);
          }, function () {
            //Do nothing on cancel
          });
        }

        function modalThankYou(promisedOrder) {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fdWidgetsDonateThankYouMdl.min.html',
            controller: fdWidgetsDonateThankYouMdl,
            size: 'med',
            resolve: {
              fund: function () {
                return $scope.fund;
              },
              order: function() {
                return promisedOrder;
              }
            }
          });

          modalInstance.result.then(function () {
            //Do nothing on close
          }, function () {
            //Do nothing on cancel
          });
        }
        //#endregion
      }
    ];

    p.scope = {
      fund: '=',
      donationAmount: '='
    }
    return p;
  }
]);