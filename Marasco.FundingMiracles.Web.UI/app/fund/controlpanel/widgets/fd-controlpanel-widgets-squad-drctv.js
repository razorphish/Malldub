fundoloApp.directive('fdControlpanelWidgetsSquadDrctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-squad-drctv.min.html';

    p.controller = [
      '$scope', '$location',
      function($scope, $location) {

        //#region === Private methods ===

        function findPlayers() {
          angular.forEach($scope.supporters, function(value, key) {
            switch(value.userTypeId) {
              case 'Originator':
                $scope.originator = value;
                break;
              case 'Beneficiary':
                $scope.beneficiary = value;
                break;
            }
          });

          if (angular.isUndefined($scope.beneficiary)) {
            $scope.beneficiary = $scope.originator;
          }

          findPhotoUrl($scope.beneficiary);
          findPhotoUrl($scope.originator);
        }

        function findPhotoUrl(user) {
          if (angular.isDefined(user.facebook)) {
            user.photoUrl = 'https://graph.facebook.com/' + user.facebook.providerKey + '/picture?width=54&height=54';
          } else {
            user.photoUrl = user.avatarUploadTempLocation;
          }
        }

        //#endregion

        //#region === Public Methods ===

        $scope.init = function() {
          findPlayers();
        }

        $scope.viewAll = function() {
          
        }

        $scope.sendEmail = function(user) {
          
        }
        // #endregion

      }
    ];

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('supporters', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });
    }

    p.scope = {
      supporters : '='
    }
    return p;
  }])