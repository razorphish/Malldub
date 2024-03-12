(function () {

    'use strict';

    var epAxisSettingsVal = { jsonUrl: '/app/appConstants.json' };

    angular.module('ep.axis', [
        /* Shared modules */
        'ep.axis.core',
        'ep.axis.widgets',
        'ep.authorization',

        /* Mars Inspinia */
        'mars.inspinia',

        /* Third party */
        'ngResource',
        'ui.bootstrap',
        'ui.bootstrap.modal'

    ]).config([function () {

    }]);

    // Bootstrap Axis to get environment variables beforehand
    fetchData();

    function fetchData() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');

        return $http.get('/app/appConstants.json').then(function (response) {
            epAxisSettingsVal.apiUrl = response.data.genericApiUrl;
            epAxisSettingsVal.isDev = response.data.isDev;
            angular.extend(epAxisSettingsVal, response.data);
            angular.module('ep.axis').value('epAxisSettingsVal', epAxisSettingsVal);

            bootstrapApplication();

        }, function (errorResponse) {
            // Handle error case
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['ep.axis']);
        });
    }
})();
