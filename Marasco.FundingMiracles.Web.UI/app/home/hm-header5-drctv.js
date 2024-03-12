fundoloApp.directive('hmHeader5Drctv', [
  function () {
    'use strict';
    var p = {};

    p.transclude   = true;
    p.replace      = true;
    p.restrict     = 'E';
    p.templateUrl  = '/app/home/hm-header5-drctv.min.html';

    p.controller = [
      '$scope', 'seAuthSvc', 
      function ($scope, seAuthSvc) {

        //#region === Public Methods ===

        $scope.user         = seAuthSvc.user;
        $scope.userRoles    = seAuthSvc.userRoles;
        $scope.accessLevels = seAuthSvc.accessLevels;

        $scope.logout = function () {
          seAuthSvc.logout().then(
            function (response) {
              toastr.success('You have been successfully logged out');
              //TODO: HACK FOR NOW Until Service Singleton is figured out
              location.reload();
            },
            function (response) {
              toastr.error('Unable to logout');
            });
        };
        //#endregion === /Public Methods ===
      }
    ];


    return p;
  }])