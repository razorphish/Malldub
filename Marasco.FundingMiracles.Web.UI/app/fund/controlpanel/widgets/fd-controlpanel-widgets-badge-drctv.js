fundoloApp.directive('fdControlpanelWidgetsBadgeDrctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict   = 'E';
    p.transclude = true;
    p.replace    = true;
    p.template   = '<div ng-class="badgeClass">{{badgeContent}}</div>';


    p.link = function ($scope, element, attributes, controller) {
      //#region === Initialize ===
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      }, false);
      //#endregion

      //#region === Public Methods ===
      $scope.init = function () {
        if (angular.isDefined($scope.fund)) {

          // easy-bg-v2 (right corner), easy-block-v1-badge (left-top)
          // rgba-aqua, rgba-yellow, rgba-blue, rgba-purple, rgba-red, rgba-default
          $scope.badgeClass   = ['easy-block-v1-badge', 'rgba-aqua'];
          $scope.badgeContent = 'In Progress';

          //Set up new campaigns
          var pastDate    = moment.utc().subtract(30, 'days');
          var startDate   = moment.utc($scope.fund.item.startDate);
          var endDate     = moment.utc($scope.fund.item.endDate);
          var presentDate = moment.utc();

          if (startDate > pastDate) {
            $scope.badgeContent = "New!";
            $scope.badgeClass = ['easy-bg-v2', 'rgba-default'];
            return;
          }

          if (presentDate > endDate) {
            $scope.badgeContent = "Ended";
            $scope.badgeClass = ['easy-block-v1-badge', 'rgba-red'];
            return;
          }

          var total = 0;
          angular.forEach($scope.fund.donationList, function (item, key) {
            total += item.beneficiaryAmount;
          });
          if (total > $scope.fund.goalAmount) {
            $scope.badgeContent = "Goal Reached!";
            $scope.badgeClass = ['easy-block-v1-badge', 'rgba-purple'];
            return;
          }
        }
      }

      //#endregion

      //#region === Private Methods ===

      //#endregion
    }

    p.scope = {
      fund: '='
    }
    return p;
  }
]);