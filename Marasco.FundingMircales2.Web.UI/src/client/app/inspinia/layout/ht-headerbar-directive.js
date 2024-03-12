(function () {
    'use strict';

    angular
        .module('mars.inspinia.layout')
        .directive('htHeaderbar', htSidebar);

    /* @ngInject */
    function htSidebar() {
        var directive = {
            bindToController: true,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
                whenDoneAnimating: '&?'
            }
        };

        return directive;

        function link(scope, element, attrs) {
            element.addClass('responsive');
            element.attr('id', 'headerbar');
        }
    }
})();
