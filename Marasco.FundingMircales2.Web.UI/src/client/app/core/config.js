(function() {
    'use strict';

    var core = angular.module('ep.axis.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-top-full-width';
    }

    var config = {
        appErrorPrefix: '[Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Epsilon',
        imageBasePath: '/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg',
        appFooterTitle: 'Epsilon',
        apiUrl: 'http://localhost:5000/campaignadmin'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
                         'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
                         routerHelperProvider, exceptionHandlerProvider) {
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {
            var resolveAlways = {
                ready: ready
            };

            //ready.$inject = ['dataservice'];
            function ready(dataservice) {
                //return dataservice.ready();
            }

            routerHelperProvider.configure({
                docTitle: '',
                resolveAlways: resolveAlways
            });
        }
    }
})();
