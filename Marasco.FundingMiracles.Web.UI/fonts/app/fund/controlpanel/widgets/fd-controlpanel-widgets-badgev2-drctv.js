fundoloApp.directive('fdControlpanelWidgetsBadgev2Drctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict   = 'E';
    p.transclude = false;
    p.replace    = true;
    p.template   = '<div ng-class="badgeClass"><i ng-class="iconClass"></i> {{badgeContent}}</div>';


    p.link = function ($scope, element, attributes, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fund) {
        if (angular.isDefined(fund)) {
          //Start with Default
          // easy-bg-v2 (right corner), easy-block-v1-badge (left-top)
          // rgba-aqua, rgba-yellow, rgba-blue, rgba-purple, rgba-red, rgba-default
          $scope.badgeClass    = [];
          $scope.badgeContent  = '';
          $scope.iconClass     = [];
          $scope.bannerVersion = $scope.bannerVersion || 'rgba-banner';

          ////Set up new campaigns
          var pastDate    = moment.utc().subtract(10, 'days');
          var startDate   = moment.utc(fund.item.startDate);
          var endDate     = moment.utc(fund.item.endDate);
          var warningDate = moment.utc(fund.item.endDate).subtract(7, 'days');
          var presentDate = moment.utc();

          if (moment(startDate).isAfter(pastDate)) {
            $scope.badgeContent = "New!";
            $scope.badgeClass = ['shop-rgba-red', $scope.bannerVersion];
            return;
          }

          if (moment(presentDate).isAfter(endDate)) {
            // Check if goal reached
            var total = 0;

            angular.forEach(fund.donationList, function (item, key) {
              total += item.beneficiaryAmount;
            });

            if (total >= fund.goalAmount) {
              $scope.iconClass = ['fa', 'fa-trophy'];
              $scope.badgeContent = "Goal Reached!";
              $scope.badgeClass = ['shop-rgba-purple', $scope.bannerVersion];
              return;
            }

            $scope.badgeContent = "Ended";
            $scope.badgeClass = ['shop-rgba-dark', $scope.bannerVersion];
            return;
          }

          if (moment(presentDate).isAfter(warningDate)) {
            $scope.badgeContent = "Ending Soon!";
            $scope.badgeClass = ['shop-rgba-yellow', $scope.bannerVersion];
            return;
          }
        }
      }

      //#endregion

      //#region === Private Methods ===

      //#endregion
    }

    p.scope = {
      fund: '=',
      bannerVersion: '@'
    }
    return p;
  }
]);