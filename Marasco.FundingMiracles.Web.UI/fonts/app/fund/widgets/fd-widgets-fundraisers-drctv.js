fundoloApp.directive('fdWidgetsFundraisersDrctv', [
  '$uibModal','fdDashboardSvc',
  function ($uibModal, fdDashboardSvc) {

    'use strict';

    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fundraisers-drctv.min.html';

    p.link = function ($scope, element, attrs, controller) {
      attrs.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;
      $scope.fundraisers = [];

      //#endregion

      //#region === Public Methods

      $scope.init = function (fundId) {
        $scope.fundId = fundId;
        $scope.getFundFundraisers(1);
      }

      $scope.getFundFundraisers = function () {
        $scope.isLoading = true;

        fdDashboardSvc.getFundraisers($scope.fundId, 1, 3).then(
          //BUG: ANGULAR If object has array as property then it requires isArray: true
          function (response) {
            $scope.isLoading = false;
            $scope.fundraisers = response.data;
            angular.forEach($scope.fundraisers, function(value, index) {
              value.fund.aspNetUser = value.aspNetUser;
            });
          },
          function (response) {
            toastr.error('Problem getting fundraisers', 'There was a problem accessing your fundraiser.  Please try again');
            $scope.isLoading = false;
          }
        );
      }

      $scope.viewAll = function() {
        $scope.tabSelect();
      }

      $scope.becomeFundraiser = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fd-widgets-support-mdl.min.html',
          controller: supportFundModal,
          windowClass: 'myclass',
          size: 'sm-med',
          resolve: {
            fund: function () {
              return $scope.fund;
            }
          }
        });

        modalInstance.result.then(function (level) {
          if (level > 0) {
            $scope.level = level; //Supporter
            showThankYou();
          }
        }, function (reason) {
          $scope.level = reason;
        });
        
      }
      //#endregion

      //#region === Private Methods ===


      //#endregion 
    };


    p.controller = [
        '$scope', function ($scope) {

        }
    ];

    p.scope = {
      tabSelect : '&'
    }
    return p;
  }]);
