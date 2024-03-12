(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .factory('fundraiserUploadsFactory', FundraiserUploadsFactory);

  FundraiserUploadsFactory.inject = [
    '$http', '$resource', '$q', '$log',
    'localStorageService', 'epAxisSettingsVal'];

  function FundraiserUploadsFactory(
    $http, $resource, $q, $log,
    localStorageService, epAxisSettingsVal) {

    var service = {
      all: _all,
      save: _save,
      update: _update,
      updateSort: _updateSort,
      delete: _delete
    };

    var resource = $resource(epAxisSettingsVal.adminApiUrl +
      '/api/admin/item/:fundId/:action/upload/:uploadId/:pageNumber/:itemsPerPage', {
        fundId: '@fundId',
        uploadId: '@uploadId',
        action: '@action',
        pageNumber: '@pageNumber',
        itemsPerPage: '@itemsPerPage'
      }, {
        'get': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'updateSort': { method: 'PUT', isArray: true },
        'save': { method: 'POST' },
        'delete': { method: 'DELETE' }
      });

    return service;

    ////////////////
    function _all() {
      var deferred = $q.defer();

      // var payload = {
      //   fundId: fundraiserId,
      //   pageNumber: pageNumber || 0,
      //   itemsPerPage: itemsPerPage || 0
      // };

      resource.get({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _delete(itemId, uploadId) {

      var deferred = $q.defer();
      var params = {
        fundId: itemId,
        uploadId: uploadId
      };

      resource.delete(params,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _save(fundId, item) {

      var deferred = $q.defer();
      var params = {
        fundId: fundId,
        uploadId: item.uploadId === 0 ? null : item.uploadId
      };

      resource.save(params, item,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _update(item) {

      item.fundId = item.identification || 0;

      var deferred = $q.defer();

      resource.update(item,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _updateSort(fundId, itemList) {

      var deferred = $q.defer();
      var restParams = {
        fundId: fundId
      };

      resource.updateSort(restParams, itemList,
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
