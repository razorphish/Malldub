(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .factory('fundraiserFactory', FundraiserFactory);

  FundraiserFactory.inject = [
    '$http', '$resource', '$q', '$log',
    'localStorageService', 'epAxisSettingsVal'];

  function FundraiserFactory(
    $http, $resource, $q, $log,
    localStorageService, epAxisSettingsVal) {

    var service = {
      all: _all,
      save: _save,
      update: _update,
      setFeatured: _setFeatured,
      donations: _donations,
      categories: _categories,
      statuses: _statuses,
      activity: _activity,
      uploads: _uploads
    };

    var resource = $resource(epAxisSettingsVal.adminApiUrl +
      '/api/admin/fund/:fundId/:action/:pageNumber/:itemsPerPage', {
        fundId: '@fundId',
        action: '@action',
        pageNumber: '@pageNumber',
        itemsPerPage: '@itemsPerPage'
      }, {
        'get': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'save': { method: 'POST' },
        'delete': { method: 'DELETE', params: { action: 'LockUnlock' } },
        'setFeatured': { method: 'POST', params: { action: 'setFeatured' } },
        'donations': { method: 'GET', isArray: false, params: { action: 'donations' } },
        'categories': { method: 'GET', isArray: true, params: { action: 'categories' } },
        'statuses': { method: 'GET', isArray: true, params: { action: 'statuses' } },
        'activity': { method: 'GET', isArray: false, params: { action: 'activity' } },
        'uploads': { method: 'GET', isArray: false, params: { action: 'uploads' } }
      });

    return service;

    ////////////////
    function _activity(fundraiserId, pageNumber, itemsPerPage) {

      var deferred = $q.defer();

      var payload = {
        fundId: fundraiserId,
        pageNumber: pageNumber || 0,
        itemsPerPage: itemsPerPage || 0
      };

      resource.activity(payload,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

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

    function _categories() {

      var deferred = $q.defer();

      resource.categories(null,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _donations(fundraiserId, pageNumber, itemsPerPage) {

      var deferred = $q.defer();

      var payload = {
        fundId: fundraiserId,
        pageNumber: pageNumber || 0,
        itemsPerPage: itemsPerPage || 0
      };

      resource.donations(payload,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _save(fund) {

      var deferred = $q.defer();

      resource.save(fund,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _setFeatured(fundFeature) {

      var deferred = $q.defer();

      resource.setFeatured(fundFeature,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _statuses() {

      var deferred = $q.defer();

      resource.statuses(null,
        function (response) {

          deferred.resolve(response);
        },
        function (response) {

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _update(fund) {

      fund.fundId = fund.identification || 0;

      var deferred = $q.defer();

      resource.update(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function _uploads(fundraiserId, pageNumber, itemsPerPage) {

      var deferred = $q.defer();

      var payload = {
        fundId: fundraiserId,
        pageNumber: pageNumber || 0,
        itemsPerPage: itemsPerPage || 0
      };

      resource.uploads(payload,
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
