'use strict';

fundoloApp.factory('permalinkData', ['$resource', '$q', 'appUrl',
  function ($resource, $q, appUrl) {
  var resource = $resource(appUrl.api + '/api/permalinks/:permalink', { permalink: '@permlaink' },
    {
      
    });
  var p = {};

  p.exists = function(permalink) {
    var deferred = $q.defer();

    if (angular.isUndefined(permalink) || permalink.length < 1) {
      deferred.reject(false);
    } else {
      resource.get({ permalink: permalink },
        function(response) {
          deferred.resolve(response.exists);
        },
        function(response) {
          deferred.reject(false);
        });
    }

    return deferred.promise;
  };

  return p;
}]);