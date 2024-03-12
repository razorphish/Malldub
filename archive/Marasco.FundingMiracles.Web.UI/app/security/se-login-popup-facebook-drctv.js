fundoloApp.directive('seLoginPopupFacebookDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'A';
  p.replace     = false;
  p.transclude  = false;
  p.link        = function ($scope, element, attributes, controller) {
    //Add a click
    element.bind('click', function () {
      $scope.bindFacebookClick();
    });
  }

  p.controller = ['$scope', '$window', '$interval', 'cssInjector', 'appUrl', 'fdSvc', 'seAuthSvc',
    function ($scope, $window, $interval, cssInjector, appUrl, fdSvc, seAuthSvc) {

      //#region === Initialize ===

      $window.$davidScope = {};
      $scope.user         = seAuthSvc.user;
      $scope.returnUrl    = appUrl.base + '/authenticate?z=1';
      $scope.user         = {
        statusId: 'Active',
        role: seAuthSvc.userRoles.user,
        userName: '',
        confirmEmail: '',
        token: {},
        isAuthenticated: false
      };

      //#endregion

      //#region === Public Methods ===

      $scope.bindFacebookClick = function () {
        initFacebook(bindFacebook);
      }

      //#endregion

      //#region === Private Methods ===

      function initFacebook(bindCallBack) {
        seAuthSvc.singleExternalLogin('Facebook', $scope.returnUrl, true).then(
          function(response) {
            $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
            $scope.facebookLoading = false;
            bindCallBack();
          }, function(response) {
            toastr.error('Unable to get Facebook login url.  Please refresh and try again');
          });
      }

      function bindFacebook() {
        seAuthSvc.facebookLogin($scope.user, $scope.facebookUrl).then(
          function () {
            $scope.facebookCallback();
          },
          function (response) {
            toastr.error('This is embarassing.  Please refresh and try again');
            $scope.isSupporting = false;
          });
      }
      //#endregion

    }];

  p.scope = {
    facebookCallback : '&'
  }

  return p;
}]);



