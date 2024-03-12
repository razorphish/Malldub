(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .factory('roleFactory', roleFactory);

  roleFactory.$inject = [
    '$http', '$resource', '$q', '$log', 'epAxisSettingsVal'];

  function roleFactory(
    $http, $resource, $q, $log, epAxisSettingsVal) {
    var factory = {
      all: _getAllRoles,
      update: _updateRole,
      add: _addRole

    };

    var resource = $resource(epAxisSettingsVal.adminApiUrl + '/api/aspnetrole', {
      action: '@action'
    }, {
        'all': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'add': { method: 'POST' }
      });

    return factory;

    ////////////
    function _getAllRoles() {
      var deferred = $q.defer();

      resource.all({},
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

        resource.update(EditRole,
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
          error: 'Insufficient details.Role Name',
          errorDescription: 'Unable to add role due to missing role name'
        });
      }
      else {

        resource.add(editRole,
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
