(function () {
    'use strict';

    angular
        .module('mars.inspinia.account')
        .factory('roleFactory', roleFactory);

    roleFactory.$inject = [
        '$http', '$resource', '$q', '$log', 'epAxisSettingsVal'];

    function roleFactory(
        $http, $resource, $q, $log, epAxisSettingsVal) {
        var factory = {
            getAllRoles: _getAllRoles,
            updateRole: _updateRole,
            addRole: _addRole

        };

        var resource = $resource(epAxisSettingsVal.olcaApiUrl + '/api/account/:action', {
            action: '@action'
        }, {
                'getAllRoles': { method: 'GET', params: { action: 'getAllRoles' }, isArray: true },
                'UpdateRole': { method: 'POST', params: { action: 'UpdateRole' } },
                'addRole': { method: 'POST', params: { action: 'addRole' } }
            });

        return factory;

        ////////////
        function _getAllRoles() {
            var deferred = $q.defer();

            resource.getAllRoles({},
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function _updateRole(EditRole) {
            var deferred = $q.defer();
            if (angular.isUndefined(EditRole.name)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    errorDescription: 'Insufficient details.'
                });
            }
            else {

                resource.UpdateRole(EditRole,
                    function (response) {
                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }

                );

            }

            return deferred.promise;
        }

        function _addRole(editRole) {
            var deferred = $q.defer();
            if (angular.isUndefined(editRole.name)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    errorDescription: 'Insufficient details.'
                });
            }
            else {

                resource.addRole(editRole,
                    function (response) {
                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }

                );
            }

            return deferred.promise;
        }
    }

})();
