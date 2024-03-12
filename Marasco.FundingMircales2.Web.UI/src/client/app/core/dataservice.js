(function () {
    'use strict';

    angular
        .module('ep.axis.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'config'];
    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger, config) {
        var readyPromise;

        var service = {
            getCustomer: getCustomer,
            ready: ready
        };

        return service;

        function getCustomer(id) {
            return $http.get('/api/customer/' + id)
                .then(getCustomerComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCustomer')(message);
                    $location.url('/');
                });

            function getCustomerComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
