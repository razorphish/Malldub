(function() {
    'use strict';

    angular
        .module('ep.axis.widgets')
        .directive('htWidgetHeader', htWidgetHeader);

    /* @ngInject */
    function htWidgetHeader () {
        var directive = {
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/widget-header.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
