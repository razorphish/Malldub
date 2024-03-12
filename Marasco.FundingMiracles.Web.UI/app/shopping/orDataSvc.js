fundoloApp.factory('orDataSvc',
[
  '$resource', '$q', 'appUrl',
  function($resource, $q, appUrl) {
    'use strict';
    var p = {};

    var resource = $resource(appUrl.api + '/api/orderdetails/:action/:id', {
      id: '@id',
      action: '@action'
    }, {
      'update': { method: 'PUT', params: { action: 'update' } }
    });

    p.save = function(order) {
      var deferred = $q.defer();

      if (angular.isUndefined(order)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(order.identification) || order.identification < 0) {
          p.create(order).then(function(promisedorder) {
            deferred.resolve(promisedorder);
          }, function(response) {
            deferred.reject(response);
          });
        } else {
          p.update(order).then(function(promisedorder) {
            deferred.resolve(promisedorder);
          }, function(response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.create = function(order) {
      var deferred = $q.defer();

      resource.save(order,
        function(response, status, headers, confi) {
          deferred.resolve(response);
        },
        function(response, status, headers, confi) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.update = function(order) {
      var deferred = $q.defer();

      resource.update(order,
        function(response, status, headers, confi) {
          deferred.resolve(response);
        },
        function(response, status, headers, confi) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return p;
  }
]);