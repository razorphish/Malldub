(function() {
    'use strict';

    angular
        .module('ep.axis.core')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'routingConfig'];
    /* @ngInject */
    function appRun(routerHelper, routingConfig) {
        routerHelper.configureStates(getStates(routingConfig.accessLevels), '/');
    }

    function getStates(access) {
        return [
            {
                state: '404',
                config: {
                    abstract: true,
                    template: '<ui-view></ui-view>',
                    url: '/404',
                    settings: {
                        icon: 'compass'
                    },
                    appTitle: 'axis',
                    access: [access.anon]
                }
            },
            {
                state: '404.PageNotFound',
                config: {
                    url: '/PageNotFound',
                    templateUrl: 'app/core/ep404NotFound.html',
                    access: [access.anon]
                }
            }
        ];
    }
})();
