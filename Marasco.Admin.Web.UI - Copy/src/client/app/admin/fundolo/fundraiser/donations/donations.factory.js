(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .factory('fundraiserDonationsFactory', FundraiserDonationsFactory);

  FundraiserDonationsFactory.inject = [
    '$http', '$resource', '$q', '$log',
    'localStorageService', 'epAxisSettingsVal'];

  function FundraiserDonationsFactory(
    $http, $resource, $q, $log,
    localStorageService, epAxisSettingsVal) {

    var service = {
      all: _all,
      // save: _save,
      update: _update,
      // updateSort: _updateSort,
      // delete: _delete
      order: _order,
      comments: _comments,
      notes: _notes
    };

    var resource = $resource(epAxisSettingsVal.adminApiUrl +
      '/api/admin/item/:fundId/donation/:identification/:action/:childId/:pageNumber/:itemsPerPage',
      {
        fundId: '@fundId', //itemId
        identification: '@identification',
        action: '@action',
        pageNumber: '@pageNumber',
        itemsPerPage: '@itemsPerPage',
        childId: '@childId'
      }, {
        'get': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'updateSort': { method: 'PUT', isArray: true },
        'save': { method: 'POST' },
        'delete': { method: 'DELETE' },
        'order': { method: 'GET', isArray: false, params: { action: 'order' } },
        'comments': { method: 'GET', isArray: false, params: { action: 'comments' } },
        'notes': { method: 'GET', isArray: false, params: { action: 'notes' } }
      });

    return service;

    ////////////////
    function _all() {
      var deferred = $q.defer();

      resource.get({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _comments(fundId, donationId) {
      var payload = {
        fundId: fundId,
        identification: donationId
      };

      var deferred = $q.defer();

      resource.comments(payload,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _notes(fundId, donationId) {
      var payload = {
        fundId: fundId,
        identification: donationId
      };

      var deferred = $q.defer();

      resource.notes(payload,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _order(fundId, donationId, orderId) {
      var payload = {
        fundId: fundId,
        identification: donationId,
        childId: orderId
      };

      var deferred = $q.defer();

      resource.order(payload,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _update(item) {

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
  }
})();
