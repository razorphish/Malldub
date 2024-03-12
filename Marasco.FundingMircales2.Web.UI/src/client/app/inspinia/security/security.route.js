(function () {
    'use strict';

    angular
        .module('mars.inspinia.security')
        .run(appRun);

    appRun.$inject = [
        'routerHelper',
        '$http',
        '$timeout',
        'routingConfig'];

    function appRun(
        routerHelper,
        $http,
        $timeout,
        routingConfig) {

        var access = routingConfig.accessLevels;
        routerHelper.configureStates(getStates(access), '/');
    }

    function getStates(access) {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/inspinia/security/login.controller.html',
                    controller: 'loginController',
                    access: [access.anon],
                    controllerAs: 'vm',
                    title: 'Login',
                    appTitle: 'Olca',
                    settings: {
                    }
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/inspinia/security/register.controller.html',
                    controller: 'registerController',
                    access: [access.anon],
                    controllerAs: 'vm',
                    title: 'Register',
                    appTitle: 'Olca',
                    settings: {
                    }
                }
            },
            {
                state: 'forgotPassword',
                config: {
                    url: '/forgotpassword',
                    templateUrl: 'app/inspinia/security/forgotPassword.controller.html',
                    controller: 'forgotPasswordController',
                    access: [access.anon],
                    controllerAs: 'vm',
                    title: 'Forgot Password',
                    appTitle: 'Olca',
                    settings: {
                    }
                }
            },
            {
                state: 'setPassword',
                config: {
                    url: '/setPassword',
                    templateUrl: 'app/inspinia/security/setPassword.controller.html',
                    controller: 'setPasswordController',
                    access: [access.anon],
                    controllerAs: 'vm',
                    title: 'Set Password',
                    appTitle: 'Olca',
                    settings: {
                    }
                }
            }
        ];

    }
})();
