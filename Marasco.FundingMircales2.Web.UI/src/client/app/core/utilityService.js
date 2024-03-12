(function () {
    'use strict';

    angular
        .module('ep.axis.core').service('utilityService', function () {
            var service = {};
            service.GetRows = function (obj) {
                var rows = [];
                if (!angular.isArray(obj) && angular.isDefined(obj)) {
                    rows.push(obj);
                }
                else {
                    rows = obj;
                }
                return rows;
            };
            return service;
        });
})();
