(function () {
    'use strict';

    angular.module('mars.inspinia', [
        'ep.axis.core',
        'ep.axis.widgets',

        /* Feature areas */
        'ep.authorization',
        'mars.inspinia.layout',
        'mars.inspinia.core',
        'mars.inspinia.account',
        'mars.inspinia.security',
        'mars.inspinia.home',

        /** Third Party libraries */
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.autoResize',
        'ui.grid.pagination',
        'ui.grid.edit',
        'ui.grid.rowEdit',
        'ui.grid.cellNav',
        'ui.grid.resizeColumns',
        'uiSwitch',
        'angular.chosen',
        'ngMessages'
    ]);
})();
