fundoloApp.directive('fdControlpanelWidgetsSupportersDrctv', [
  '$timeout', '$state',
  function ($timeout, $state) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-supporters-drctv.min.html';


    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('supporters', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });

      //#region === Private methods ===


      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {
        $timeout(function () {
          $('#supporterScrollbar').perfectScrollbar();
        }, 1000);

        //findPlayers();
      }

      $scope.viewAll = function () {
        $state.go('^.supporters');
      }

      // #endregion
    }

    p.scope = {
      supporters : '='
    }

    return p;
  }])