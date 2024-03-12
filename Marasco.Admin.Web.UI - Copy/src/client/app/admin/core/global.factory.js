(function () {
  'use strict';

  angular
    .module('mars.admin.core')
    .factory('globalFactory', globalFactory);

  globalFactory.$inject = ['$q', '$resource', 'exception', 'logger', 'config'];
  /* @ngInject */
  function globalFactory($q, $resource, exception, logger, config) {
    var readyPromise;
    var isPrimed = false;
    var primePromise;

    var service = {
      getTabs: getTabs,
      ready: ready
    };

    var resource = $resource('/api/:action/:id', {
      id: '@id',
      action: '@action'
    }, {
        'tabs': { method: 'GET', isArray: true, params: { action: 'tab' } }
      });

    return service;

    function getTabs(tabsetName) {
      var deferred = $q.defer();

      resource.tabs({ id: tabsetName },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      var success = function () {
        isPrimed = true;
      };

      //Uncomment line below to have the service available
      //without getting a promise.  No calls are made
      //primePromise = $q.when(service).then(success);

      //Uncomment line below to pre-fetch data
      primePromise = $q.all([
        getTabs()
      ]);

      isPrimed = true;
      return primePromise;
    }

    function ready(nextPromises) {

      return prime()
        .then(function () {
          return nextPromises ? $q.all(nextPromises) : primePromise;
        })
        .catch(function () {
          exception.catcher('"ready" function failed');
        });
    }
  }
})();
