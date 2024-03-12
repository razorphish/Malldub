fundoloApp.directive('seLoginPopupDrctv', [
  'seAuthSvc', function (seAuthSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/security/se-login-popup-drctv.min.html';
    p.link        = function ($scope, element, attrs, controller) {

    };

    p.controller = ['$scope', '$location', '$uibModal', 'fdSvc',
      function ($scope, $location, $uibModal, fdSvc) {
        $scope.user = seAuthSvc.user;

        function setUser (token) {
          seAuthSvc.setUser($scope.user,
            token,
            true);

        }

        $scope.login = function() { 
          var modalInstance = $uibModal.open({
            templateUrl: '/app/security/se-login-popup-mdl.min.html',
            controller: loginModal,
            size: 'sm-med',
            resolve: {

            }
          });

          modalInstance.result.then(function (token) {
            $scope.user.token = token;
            setUser(token);
            $scope.loginCallback();
          }, function (reason) {
            switch (reason) {
              case 'resetPassword':
                $scope.registerCallback();
                $location.path('/resetPassword');
                break;
              case 'register':
                $scope.registerCallback();
                $location.path('/register');
                break;
              default:
                break;
            }
          });
        }
      }];

    p.scope = {
      linkTitle : '@',
      registerCallback: '&',
      loginCallback: '&'
    };

    return p;
  }
]);

var loginModal = ['$scope', '$uibModalInstance', '$location', '$window', '$interval','Facebook', 'appUrl','seAuthSvc', 'mdCoreDataSvc',
  function ($scope, $uibModalInstance, $location, $window, $interval, Facebook, appUrl, seAuthSvc, mdCoreDataSvc) {

    //#region                     === Initialize ===
    $scope.viewModal              = 1;
    $scope.isExternalRegister     = false;
    $scope.isLoggingIn            = false;
    $scope.isFacebookLoggingIn    = false;
    $scope.facebookLoading        = true;
    $scope.returnUrl              = appUrl.base + '/authenticate?z=1';
    $scope.facebookUrl            = 'NA';
    $window.$davidScope           = {};
    $scope.token                  = {};
    $scope.showValidationMessages = false;
    $scope.isExternalLogin        = false;
    $scope.showConnectMessage     = false;
    $scope.user                   = {
                                      statusId: 'Active',
                                      role: seAuthSvc.userRoles.user,
                                      userName: '',
                                      confirmEmail: '',
                                      token: {},
                                      isAuthenticated: false
                                    };

    (function() {
      seAuthSvc.singleExternalLogin('Facebook', $scope.returnUrl, true).then(
        function(response) {
          $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
          $scope.facebookLoading = false;
        }, function(response) {
          toastr.error('Unable to get Facebook login url.  Please refresh and try again');
        });

      mdCoreDataSvc.getGeoData2().then(
        function(data) {
          $scope.user.geo = data;
          $scope.isLoadingGeo = false;
        },
        function(response) {
          toastr.error('Unable to get Geo data.  Please see administrator');
          $log.error(response);
          $scope.isLoadingGeo = false;
        });

    })();

    //#endregion

    //#region Standard Login
    $scope.login = function (user, persistent) {
      $scope.isLoggingIn = true;
      if (this.popupLoginForm.$valid) {
        seAuthSvc.login(user, persistent).then(
          function (response) {
            var facebookToken = {
              access_token: response.access_token,
              expires_in: response.expires_in,
              state: response.state,
              token_type: response.token_type
            }

            if ($scope.isExternalLogin) {
              addExternalLogin($scope.close, facebookToken);
            } else{
              $uibModalInstance.close(facebookToken);
            }
          },
          function(response) {
            toastr.error('Error authenticating user.  Please try again.');
            $scope.isLoggingIn = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isLoggingIn = false;
      }
    };

    //#region Register External Process
    $scope.loginExternal = function (user) {
      seAuthSvc.login(user).then(
        function (response) {
          $scope.close({
            access_token: response.access_token,
            expires_in: response.expires_in,
            state: response.state,
            token_type: response.token_type
          });
        },
        function (response) {
          toastr.error('Error authenticating user.  Please try again.');
        });
    };

    $scope.registerExternal = function () {
      //$scope.isExternalRegister = true;
      //if (this.popupRegisterForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.registerExternal($scope.user).then(
          function (response) {
            $scope.loginExternal($scope.user);
            $scope.isExternalRegister = false;

          },
          function (response) {
            toastr.error(response.error_description);
            $scope.isExternalRegister = false;
          }
        );
      //} else {
      //  $scope.showValidationMessages = true;
      //  $scope.isExternalRegister = false;
      //  toastr.error('Oops!  Looks like there are some issues');
     // }
    }
    //#endregion

    //#endregion

    //#region Facebook
    $scope.facebookLogin = function() {
      $scope.isFacebookLoggingIn = true;

      var left = screen.width / 2 - 200;
      var top = screen.height / 2 - 250;
      var popup = $window.open(appUrl.facebook.signInUrl + $scope.facebookUrl, '', "top=" + top + ",left=" + left + ",width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0");
      var interval = 1000;

      // create an ever increasing interval to check a certain global value getting assigned in the popup
      var i = $interval(function () {
        interval += 250;
        try {

          if (popup.value) {
            angular.extend($scope.user, $davidScope.user);
            if ($davidScope.connect) {
              $scope.isExternalLogin = true;
              $scope.showConnectMessage = true;
            } else if ($davidScope.register) {
              //$scope.viewModal = 2;
              $scope.viewModal = 3;
              $scope.showValidationMessages = false;
              $scope.user.confirmEmail = $scope.user.email;
              $scope.user.token = $davidScope.says.access_token;
              $scope.user.password = 'fundingmiracles';
              $scope.user.disableWePay = true;
              seAuthSvc.setUserExternalToken({
                access_token: $davidScope.says.access_token,
                expires_in: $davidScope.says.expires_in,
                state: $davidScope.says.state,
                token_type: $davidScope.says.token_type
              });
              $scope.registerExternal();
            } else {
              $scope.token = {
                access_token: $davidScope.says.access_token,
                expires_in: $davidScope.says.expires_in,
                state: $davidScope.says.state,
                token_type: $davidScope.says.token_type
              };
              $uibModalInstance.close($scope.token);
            }
            $interval.cancel(i);
            popup.close();
          }
        } catch (e) {
          console.error(e);
        }
      }, interval);
      
      $scope.isFacebookLoggingIn = false;
    }
    //#endregion


    $scope.close = function (result) {
      $uibModalInstance.close(result);
    };

    $scope.dismiss = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //#region Private methods
    function addExternalLogin(callback, token) {
      seAuthSvc.addExternalLogin(token).then(
        function(response) {
          callback(token);
        },
        function(response) {
          toastr.error(response.error_description);
        });
    }

//#endregion
  }];