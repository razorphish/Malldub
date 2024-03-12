(function () {
    'use strict';

    angular
        .module('mars.inspinia.core')
        .config(configure);

    configure.$inject = [
        '$httpProvider',
    ];

    function configure(
        $httpProvider
    ) {

        // /app/inspinia/olca.interceptor.factory.js
        $httpProvider.interceptors.push('authInterceptorFactory');

    }
})();
