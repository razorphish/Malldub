fundoloApp.directive('fdControlpanelWidgetsCommentsDrctv', [
  '$timeout', '$state', 'fdSvc',
  function ($timeout, $state, fdSvc) {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-comments-drctv.min.html';

    p.link = function($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        fdSvc.comment(fundId, 1, 10).then(
          function(items) {
            $scope.comments = items.data;

            $scope.isLoading = false;

            $timeout(function () {
              $('#commentScrollbar').perfectScrollbar();
            }, 1000);
          },
          function(response) {
            toastr.error(response.error_description);
           $scope.isLoading = false;
          });

      }

      $scope.viewAll = function () {
        $state.go('^.comments');
      }

      //#endregion === /Public Methods ===
    };

    //Interpolate scope: bastardize
    p.scope = {}

    return p;
  }])