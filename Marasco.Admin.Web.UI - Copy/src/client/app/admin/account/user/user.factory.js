(function () {
  'use strict';

  angular
    .module('mars.admin.account')
    .factory('userFactory', userFactory);

  userFactory.$inject = [
    '$http', '$resource', '$q', '$log',
    'localStorageService', 'epAxisSettingsVal'];

  function userFactory(
    $http, $resource, $q, $log,
    localStorageService, epAxisSettingsVal) {
    var factory = {
      getAllUsers: _getAllUsers,
      updateUser: _updateUser,
      lockUnlockUser: _lockUnlockUser,
      getAllRoles: _getAllRoles,
      getUserRoles: _getUserRoles,
      fundraisers: _getUserFundraisers,
      donations: _getUserDonations
    };

    var resource = $resource(epAxisSettingsVal.adminApiUrl + '/api/user/:id/:action', {
      id: '@id',
      action: '@action'
    }, {
        'getAllUsers': { method: 'GET', isArray: true },
        'getAllRoles': { method: 'GET', params: { action: 'GetAllRoles' }, isArray: true },
        'getUserRoles': { method: 'POST', params: { action: 'roles' }, isArray: true },
        'lockUnlockUser': { method: 'POST', params: { action: 'LockUnlock' } },
        'UpdateUserByUserName': {
          method: 'POST', params: { action: 'UpdateUserByUserName' }
        },
        'donations': {
          method: 'GET', params: { action: 'donations' }, isArray: true
        },
        'fundraisers': {
          method: 'GET', params: { action: 'fundraisers' }, isArray: true
        },
        'setFeatured': {
          method: 'POST', params: { action: 'setFeatured' }
        }
      });

    return factory;

    function _getAllUsers() {
      var deferred = $q.defer();

      resource.getAllUsers({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _updateUser(editUser) {

      var deferred = $q.defer();
      if (angular.isUndefined(editUser.firstName) ||
        angular.isUndefined(editUser.lastName) ||
        angular.isUndefined(editUser.email) ||
        angular.isUndefined(editUser.userName)) {
        deferred.reject({
          error: 'Insufficient details.',
          errorDescription: 'Insufficient details.'
        });
      }
      else {

        resource.UpdateUserByUserName(editUser,
          function (response) {
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

    function _getUserInfo() {

      var deferred = $q.defer();

      resource.GetUserDetails(
        function (response) {
          //simple 200 will suffice
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
          $log.warn(response);
        }
      );
      return deferred.promise;
    }

    function _lockUnlockUser(userName) {
      var deferred = $q.defer();

      resource.lockUnlockUser('"' + userName + '"',
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

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

    function _getUserFundraisers(username) {

      var deferred = $q.defer();

      resource.fundraisers({ id: username },
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _getUserDonations(username) {

      var deferred = $q.defer();

      resource.donations({ id: username },
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _getUserRoles(username) {

      var deferred = $q.defer();

      resource.getUserRoles('\'' + username + '\'',
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }
  }

})();
