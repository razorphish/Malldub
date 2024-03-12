(function () {
    'use strict';

    angular
        .module('app')
        .provider('provider1', provider1Provider);

    function provider1Provider() {
        var configValue = false;

        this.setConfigValue = function (value) {
            configValue = value;
        };

        this.$get = provider1Factory;

        provider1Factory.$inject = ['$http'];
        function provider1Factory($http) {
            var service = {
                getData: getData
            };

            return service;
            

            function getData() {                
                return configValue;
            }
        }
    }
})();