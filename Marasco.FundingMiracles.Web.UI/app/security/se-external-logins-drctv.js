fundoloApp.directive('seExternalLoginsDrctv', ['$stateParams', 'appUrl', 'seAuthSvc',
  function ($stateParams, appUrl, seAuthSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/security/se-external-logins-drctv.min.html';
    p.link        = function(scope, element, attrs, controller) {

    };

    p.controller = [
      '$scope', '$log', '$location',
      function($scope, $log, $location) {
        $scope.isLoading = true;
        $scope.isAuthenticating = false;
        $scope.returnUrl = appUrl.base + '/authenticate';
        seAuthSvc.externalLogins($scope.returnUrl, true).then(
          function(et) {
            angular.forEach(et, function(value, key) {
              value.title = value.name;
              value.icon = value.name;
              value.sortOrder = 1000;
              switch (value.name) {
                case 'Facebook':
                  value.sortOrder = 1;
                  break;
                case 'Google':
                  value.name = 'GooglePlus';
                  value.icon = 'Google-Plus';
                  break;
                case 'Microsoft':
                  value.icon = 'Windows';
                  break;
              }

            });
            $scope.externalLogins = et;
            $scope.isLoading = false;
          },
          function(response) {
            $log.error(response);
            toastr.error(response.error_description);
            $scope.isLoading = false;
          });

        $scope.externalLogin = function(name, url) {
          $scope.isAuthenticating = true;
          window.location = appUrl.api + url;
        };

      }
    ];

    p.scope = {
      title: '@'
    };

    return p;

  }]);