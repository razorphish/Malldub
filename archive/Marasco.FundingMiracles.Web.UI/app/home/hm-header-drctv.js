fundoloApp.directive('hmHeaderDrctv', [
  '$window', 'seAuthSvc', 'pgWePaySvc',
  function ($window, seAuthSvc, pgWePaySvc) {
    'use strict';
    var p = {};

    p.transclude   = true;
    p.replace      = true;
    p.restrict     = 'E';
    p.templateUrl  = '/app/home/hm-header-drctv.min.html';

    p.link = function($scope, element, attribrutes, controller) {

      //#region === Public Methods ===

      $window.App.init();
      $window.StyleSwitcher.initStyleSwitcher();
      $window.App.mallDub.initToastr();

      $scope.hasWithdrawal            = false;
      $scope.hasConditionalWithdrawal = false;
      $scope.user                     = seAuthSvc.user;
      $scope.userRoles                = seAuthSvc.userRoles;
      $scope.accessLevels             = seAuthSvc.accessLevels;

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



    return p;
  }])