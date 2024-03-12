(function() {
    'use strict';

    angular
        .module('ep.axis.core', [
            /* Angular modules */
            'ngAnimate',
            'ngSanitize',
            /* Cross-app modules */
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            /* 3rd-party modules */
            'ui.router',
            'ngplus',
            'ngPrint',
            'ui.mask',
            'ep.authorization'
        ]);

})();
