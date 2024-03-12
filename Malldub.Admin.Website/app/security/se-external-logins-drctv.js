'use strict';

malldubAdminApp.directive('seExternalLoginsDrctv', function ($routeParams, BASE_URL, seAuthSvc) {
  var p = {};

  p.restrict    = "E";
  p.replace     = true;
  p.transclude  = true;
  p.templateUrl = '/app/security/se-external-logins-drctv.html';
  p.link        = function(scope, element, attrs, controller) {

  };

  p.controller = function ($scope, $log, $location, BASE_API_URL) {
    $scope.isLoading = true;
    $scope.isAuthenticating = false;
    $scope.returnUrl = BASE_URL + '/authenticate';
    seAuthSvc.externalLogins($scope.returnUrl,true).then(
      function (et) {
        angular.forEach(et, function (value, key) {
          value.title = value.name;
          value.icon = value.name;
          value.sortOrder = 1000;
          value.headerClass = "";
          switch (value.name) {
            case 'Facebook':
              value.sortOrder = 1;
              value.headerClass = "btn btn-primary";
              break;
            case 'Google':
              value.name = 'Google-Plus';
              value.icon = 'Google-Plus';
              value.headerClass = "btn btn-danger";
              break;
            case 'Microsoft':
              value.icon = 'Windows';
              value.headerClass = "btn btn-info";
              break;
            case 'Twitter':
              value.sortOrder = 2;
              value.headerClass = "btn btn-info";
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

    $scope.externalLogin = function (name, url) {
      $scope.isAuthenticating = true;
      window.location = BASE_API_URL + url;
    };
    
  };

  p.scope = {    
    
  };

  return p;

});