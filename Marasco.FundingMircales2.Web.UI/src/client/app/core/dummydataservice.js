(function () {
    'use strict';

    angular
        .module('ep.axis.core')
        .factory('dummyDataService', dummyDataService);

    dummyDataService.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'config'];

    function dummyDataService($http, $location, $q, exception, logger, config) {
        var service = {
            getDummyData: getDummyData
        };

        return service;

        ////////////////
        function getDummyData(entityName) {

            return $http.post('/api/getDummyData', {
                    entity: entityName
                })
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for dummyCustomers')(message);
                    $location.url('/');
                });

        }
    }
})();
