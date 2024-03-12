(function () {
  'use strict';

  angular.module('mars.admin', [
    'mars.axis.core',
    'mars.axis.widgets',

    /* Feature areas */
    'mars.authorization',
    'mars.admin.layout',
    'mars.admin.core',
    'mars.admin.account',
    'mars.admin.security',
    'mars.admin.home',
    'mars.admin.fundolo',

    /** Third Party libraries */
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.resizeColumns',
    'ui.grid.draggable-rows',
    'uiSwitch',
    'angular.chosen',
    'ngMessages',
    'ngCkeditor',
    'ngFileUpload'
  ]);
})();
