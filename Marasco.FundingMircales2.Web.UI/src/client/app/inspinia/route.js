// jscs:disable
/* jshint ignore:start */
(function () {
    'use strict';

    angular
        .module('mars.inspinia')
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
                    $state.go('inspinia.index');
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
                state: 'inspinia',
                config: {
                    url: '/',
                    templateUrl: 'app/inspinia/layout/shell.html',
                    controller: 'shellController',
                    abstract: true,
                    access: [access.auth],
                    title: '3',
                    appTitle: 'Inspinia',
                    settings: {
                        icon: 'desktop',
                        headermenu: {
                            type: 'twomenu'
                        }
                    }
                }
            },
            {
                state: 'inspinia.index',
                config: {
                    url: '',
                    templateUrl: 'app/inspinia/home/home.controller.html',
                    controller: 'homeController',
                    access: [access.auth],
                    controllerAs: 'vm',
                    title: 'Homepage',
                    appTitle: 'Inspinia: Home',
                    topLevel: true,
                    settings: {
                        icon: 'dashboard'
                    }
                }
            },
            {
                state: 'inspinia.account',
                config: {
                    abstract: true,
                    url: 'account',
                    template: '<ui-view></ui-view>',
                    access: [access.admin],
                    title: 'Accounts',
                    appTitle: 'Inspinia: My Profile',
                    topLevel: true,
                    settings: {
                        icon: 'users'
                    }
                }
            },
            {
                state: 'inspinia.account.users',
                config: {
                    url: '/users',
                    templateUrl: 'app/inspinia/account/user.controller.html',
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
                state: 'inspinia.account.roles',
                config: {
                    url: '/roles',
                    templateUrl: 'app/inspinia/account/role.controller.html',
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
                state: 'inspinia.account.profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/inspinia/account/profile.controller.html',
                    controller: 'profileController',
                    access: [access.auth],
                    controllerAs: 'vm',
                    title: 'My Profile',
                    appTitle: 'Profile',
                    settings: {
                    }
                }
            },
        ];
    }

})();
