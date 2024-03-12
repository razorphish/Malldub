fundoloApp.factory('mdGoogleSvc', ['$resource', '$q', '$filter', '$compile', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $filter, $compile, seAuthSvc, appUrl) {
    'use strict';
    var p = {};

    //#region === Resources ===

    var fundoloResource = $resource(appUrl.api + '/api/google/:app/:action/:pageId/:startDate/:endDate',
    {
      id: '@id',
      app: '@app',
      action: '@action',
      startDate: '@startDate',
      itemsPerPageendDate: '@endDate'
    }, {
      'query': {
        method: 'GET',
        params: { app: 'fundolo', action: 'page' },
        headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true
      }
      });



    //#endregion === Resource ===


    //#region === Page Views ===

    p.pageView = function (permalink, startDate, endDate) {
      var deferred = $q.defer();
      if (angular.isUndefined(permalink) || permalink.length === 0 ) {
        deferred.reject({
          error: 'Permalink is invalid',
          error_description: 'Invalid permalink'
        });
      } else {

        fundoloResource.query({ pageId: permalink, startDate: startDate, endDate: endDate},
          function (items) {
            deferred.resolve(items);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
    //#endregion


    return p;
  }]);