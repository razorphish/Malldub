// jscs:disable
/* jshint ignore:start */
(function () {
  'use strict';

  angular
    .module('mars.admin')
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'routerHelper', 'routingConfig', 'seAuthFactory'];
  /* @ngInject */
  function appRun($rootScope, $state, routerHelper, routingConfig, seAuthFactory) {
    routerHelper.configureStates(getStates(routingConfig.accessLevels), '/');

    //Intercept the state change and handle accordingly
    $rootScope.$on('$stateChangeStart', function (event, next, current) {

      $rootScope.error = null;
      if (!seAuthFactory.authorize(next.access)) {

        if (seAuthFactory.isLoggedIn()) {
          event.preventDefault();
          $state.go('admin.index');
        } else {
          event.preventDefault();
          $state.go('login');
        }
      }

      if (angular.isUndefined(next.color)) {
        //Change UI color
        var s = 'color';
      }
    });

    //Initialize the Auth Data
    seAuthFactory.fillAuthData();
  }

  function getStates(access) {

    return [
      {
        state: 'admin',
        config: {
          url: '/',
          templateUrl: 'app/admin/layout/shell.html',
          controller: 'shellController',
          abstract: true,
          access: [access.auth],
          title: '3',
          appTitle: 'admin',
          settings: {
            icon: 'desktop',
            headermenu: {
              type: 'twomenu'
            }
          }
        }
      },
      {
        state: 'admin.index',
        config: {
          url: '',
          templateUrl: 'app/admin/home/home.controller.html',
          controller: 'homeController',
          access: [access.auth],
          controllerAs: 'vm',
          title: 'Homepage',
          appTitle: 'admin: Home',
          topLevel: true,
          settings: {
            icon: 'dashboard'
          }
        }
      },
      ,
      {
        state: 'admin.fundolo',
        config: {
          abstract: true,
          url: 'account',
          template: '<ui-view></ui-view>',
          access: [access.admin],
          title: 'Fundolo',
          appTitle: 'admin: Fundolo',
          topLevel: true,
          settings: {
            icon: 'heart'
          }
        }
      },
      {
        state: 'admin.fundolo.fundraisers',
        config: {
          url: '/fundraisers',
          templateUrl: 'app/admin/fundolo/fundraiser/fundraiser.controller.html',
          controller: 'fundraiserController',
          access: [access.admin],
          controllerAs: 'vm',
          title: 'Fundraisers',
          appTitle: 'Fund App Title',
          settings: {
            mini: {
              icon: 'heart',
              buttonColor: 'danger'
            }
          }
        }
      },
      {
        state: 'admin.account',
        config: {
          abstract: true,
          url: 'account',
          template: '<ui-view></ui-view>',
          access: [access.admin],
          title: 'Accounts',
          appTitle: 'admin: My Profile',
          topLevel: true,
          settings: {
            icon: 'users'
          }
        }
      },
      {
        state: 'admin.account.users',
        config: {
          url: '/users',
          templateUrl: 'app/admin/account/user/user.controller.html',
          controller: 'userController',
          access: [access.admin],
          controllerAs: 'vm',
          title: 'Users',
          appTitle: 'Users',
          settings: {
            mini: {
              icon: 'users',
              buttonColor: 'purple'
            }
          }
        }
      },
      {
        state: 'admin.account.roles',
        config: {
          url: '/roles',
          templateUrl: 'app/admin/account/role/controller.html',
          controller: 'roleController',
          access: [access.admin],
          controllerAs: 'vm',
          title: 'Roles',
          appTitle: 'Roles',
          settings: {
          }
        }
      },
      {
        state: 'admin.account.profile',
        config: {
          url: '/profile',
          templateUrl: 'app/admin/account/profile.controller.html',
          controller: 'profileController',
          access: [access.auth],
          controllerAs: 'vm',
          title: 'My Profile',
          appTitle: 'Profile',
          settings: {
          }
        }
      }
    ];
  }

})();
