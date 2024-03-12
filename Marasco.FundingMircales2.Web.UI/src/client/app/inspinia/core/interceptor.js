(function () {
    'use strict';

    angular
        .module('mars.inspinia.core')
        .factory('authInterceptorFactory', authInterceptorFactory);

    authInterceptorFactory.$inject = [
        '$q',
        '$injector',
        '$location',
        '$log',
        'localStorageService',
        '$window',
        'toastr'];

    function authInterceptorFactory(
        $q, $injector, $location, $log, localStorageService, $window, toastr) {

        var factory = {
            response: _response,
            request: _request,
            responseError: _responseError
        };

        function _response(response) {
            return response;
        }

        function _request(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token['access_token'];
            }

            return config;
        }

        function _responseError(rejection) {
            if (rejection.status === 401) {

                var authService = $injector.get('seAuthFactory');
                var authData = localStorageService.get('authorizationData');

                if (authData) {
                    if (authData.useRefreshTokens) {
                        $location.path('/refresh');
                        return $q.reject(rejection);
                    }
                }

                authService.logout().then(function (response) {
                    toastr.warning('Session has been expired, please relogin & try again.');
                    $window.location.assign('/login');
                }, function (response) {
                    toastr.warning('Session has been expired, please relogin & try again.');
                    $window.location.assign('/login');
                    $log.error(response);
                });

            }

            return $q.reject(rejection);
        }

        return factory;
    }
})();
