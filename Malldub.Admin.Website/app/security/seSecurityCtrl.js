'use strict';

malldubAdminApp.controller('seLoginCtrl',
  ['$scope', '$location', '$log', 'seAuthSvc', function seLoginCtrl($scope, $location, $log, seAuthSvc) {
    $scope.showValidationMessages = false;
    $scope.role = seAuthSvc.userRoles.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.isLoggingIn = false;
    $scope.user = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };
    $scope.persistent = false;
    

    $scope.login = function (user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function (response) {
          $location.path('/admin/home');
        },
        function (response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };

  }])

.controller('seRegisterCtrl',
  ['$scope', '$location', '$log', 'seAuthSvc', function seRegisterCtrl($scope, $location, $log, seAuthSvc) {
    $scope.showValidationMessages = false;
    $scope.role = seAuthSvc.userRoles.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.isSaving = false;
    $scope.readTerms = true;
    $scope.user = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };

    $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {
      $scope.user.geo = data;
      $scope.user.geo.originalDevice = navigator.userAgent;
    });

    $scope.register = function (user) {
      $scope.isSaving = true;
      if ($scope.registerForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.register(user).then(
          function (response) {
            $scope.login(user);
          },
          function (response) {
            toastr.error(response.error_description);
            $log.error(response);
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
        toastr.error('Oops!  Looks like there are some issues');
      }
    };

    $scope.login = function(user) {
      seAuthSvc.login(user).then(
        function(response) {
          $location.path('/fund/list');
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isSaving = false;
        });
    };
  }])

.controller('NavCtrl',
  ['$scope', '$location', 'seAuthSvc', function ($scope, $location, seAuthSvc) {
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
      function(response) {
        toastr.error('Unable to logout');
      });
  };
  }])

.controller('seAuthenticateCtrl',
['$scope', '$location', 'seAuthSvc', function ($scope, $location, seAuthSvc) {
  $scope.isAuthenticating = true;
  $scope.role = seAuthSvc.userRoles.user;
  $scope.user = {
    statusId: 'Active',
    role: $scope.role,
    userName: ''
  };

  if ($location.$$hash.length > 0) {
    seAuthSvc.handleAccessTokenRedirect('Facebook', $location.$$hash).then(
      function (token) {
        seAuthSvc.getUserInfo().then(function(promisedUser) {
          if (promisedUser.hasRegisteredExternal) {
            seAuthSvc.setUserExternal(promisedUser, token);
            $location.path('/admin/home').hash(null);
          } else {
            if (promisedUser.hasRegistered) {
              $location.path('/connectExternal').search({
                email: promisedUser.email
              }).hash(null);
            } else {
              $location.path('/registerExternal').search({
                email: promisedUser.email,
                firstName: promisedUser.firstName,
                lastName: promisedUser.lastName,
                token: token.access_token
              }).hash(null);
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
  
  $scope.goToRegistration = function () {
    $location.path('/register');
  };

  $scope.goToLogin = function () {
    $location.path('/login');
  };
}])
.controller('seRegisterExternalCtrl',
['$scope', '$location', '$routeParams', '$log', 'seAuthSvc', function($scope, $location, $routeParams, $log, seAuthSvc) {
  $scope.user = {
    email: $routeParams.email,
    firstName: $routeParams.firstName,
    lastName: $routeParams.lastName,
    confirmEmail: $routeParams.email,
    token: $routeParams.token,
    statusId: 'Active'
  };

  $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {
    $scope.user.geo = data;
    $scope.user.geo.originalDevice = navigator.userAgent;
  });

  $scope.showValidationMessages = false;
  $scope.role                   = seAuthSvc.userRoles.user;
  $scope.userRoles              = seAuthSvc.userRoles;
  $scope.isSaving               = false;

  $scope.register = function (user) {
    $scope.isSaving = true;
    if ($scope.registerForm.$valid) {
      $scope.showValidationMessages = false;
      $scope.user.userName = $scope.user.email;
      seAuthSvc.registerExternal(user).then(
        function (response) {
          $scope.login($scope.user);
          $scope.isSaving = false;
        },
        function (response) {
          toastr.error(response.error_description);
          $log.error(response);
          $scope.isSaving = false;
        }
      );
    } else {
      $scope.showValidationMessages = true;
      $scope.isSaving = false;
      toastr.error('Oops!  Looks like there are some issues');
    }
  };

  $scope.login = function (user) {
    seAuthSvc.login(user).then(
      function (response) {
        $location.path('/fund/list').hash(null);
      },
      function (response) {
        toastr.error('Error authenticating user.  Please try again.');
        $scope.isSaving = false;
      });
  };
}])
.controller('seConnectExternalCtrl', ['$scope', '$location', '$routeParams', '$log', 'seAuthSvc',
  function ($scope, $location, $routeParams, $log, seAuthSvc) {
    $scope.showValidationMessages = false;
    $scope.role = seAuthSvc.userRoles.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.isLoggingIn = false;
    $scope.user = {
      statusId: 'Active',
      role: $scope.role,
      userName: $routeParams.email
    };
    $scope.persistent = false;
    
    $scope.login = function (user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function (response) {
          addExternalLogin();
        },
        function (response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };
    
    function addExternalLogin() {
      seAuthSvc.addExternalLogin().then(
        function (response) {
          $location.path('/fund/list').hash(null);
        },
        function (response) {
          toastr.error(response.error_description);
          $log.error(response);
          $scope.isLoggingIn = false;

        });
    }
  }
])
.controller('seResetPasswordCtrl', ['$scope', '$location', '$log', 'seAuthSvc',
  function($scope, $location, $log, seAuthSvc) {
    $scope.showValidationMessages = false;
    $scope.isResetting = false;

    $scope.resetPassword = function () {
      if ($scope.resetPasswordForm.$valid) {
        $scope.isResetting = true;
        seAuthSvc.resetPassword({
          email: $scope.emailAddress
          }).then(function() {
            toastr.success('Found you!  We sent an email to you with what to do next');
            $scope.emailAddress = '';
            $location.path('\login');
            $scope.isResetting = false;
          }, function(response) {
            $log.error(response);
            toastr.error('Whoa! We tried but couldn\'t find you in our system.  Try it again!');
            $scope.isResetting = false;
          });
        $scope.isResetting = false;
      } else {
        $scope.showValidationMessages = true;
        $scope.isResetting = false;
        toastr.error('Oops!  Looks like some things are missing');
      }
    };

  }]);

