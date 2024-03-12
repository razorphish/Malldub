fundoloApp.controller('seAuthenticateCtrl',
['$scope', '$location', '$stateParams', '$window', 'seAuthSvc',
  function ($scope, $location, $stateParams, $window, seAuthSvc) {

    //#region Initialize
    'use strict';
    $scope.popup            = false;
    $scope.isAuthenticating = true;
    $scope.role             = seAuthSvc.userRoles.user;
    $scope.user             = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };

    //#endregion

    if ($location.$$hash.length > 0) {
      seAuthSvc.handleAccessTokenRedirect('Facebook', $location.$$hash).then(
        function (token) {
          //Indicates authentication by popup; return token
          $scope.popup = angular.isDefined($stateParams.z) && $stateParams.z === '1';
          if ($scope.popup) {
            window.opener.$davidScope.says = token;
            window.opener.$davidScope.connect = false;
            window.opener.$davidScope.register = false;
          }

          seAuthSvc.getUserInfo().then(function (promisedUser) {
            if (promisedUser.hasRegisteredExternal) {
              if ($scope.popup) {
                window.opener.$davidScope.user = promisedUser;
                window.value = true;
              } else {
                seAuthSvc.setUserExternal(promisedUser, token, 'Facebook');
                $location.path('/controlpanel/fund/list').hash(null);
              }
            } else {
                if (promisedUser.hasRegistered) {
                  if ($scope.popup) {
                    window.opener.$davidScope.user = promisedUser;
                    window.opener.$davidScope.connect = true;
                    window.value = true;
                  } else {
                    $location.path('/connectExternal').search({
                      email: promisedUser.email
                    }).hash(null);
                  }
                } else { 
                  if ($scope.popup) {
                    window.opener.$davidScope.user = promisedUser;
                    window.opener.$davidScope.register = true;
                    window.value = true;
                  } else {
                    $location.path('/registerExternal').search({
                      email: promisedUser.email,
                      firstName: promisedUser.firstName,
                      lastName: promisedUser.lastName,
                      token: token.access_token
                    }).hash(null);
                  }
                }
              }
            },
            function() {

            });
          
        },
        function(response) {
          toastr.error('Provider response: ' + response.error);
          $scope.error = response.error;
          $scope.isAuthenticating = false;
        });
    } else {
      $location.path('/register');
    }

    $scope.goToRegistration = function() {
      $location.path('/register');
    };

    $scope.goToLogin = function() {
      $location.path('/login');
    };
  }
]);