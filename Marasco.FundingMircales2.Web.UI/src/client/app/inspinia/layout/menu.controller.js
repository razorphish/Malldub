(function () {
    'use strict';

    angular
        .module('mars.inspinia.layout')
        .controller('Menu', Menu);

    Menu.$inject = ['$location', '$state', 'routerHelper', 'app', '$timeout'];
    /* @ngInject */
    function Menu($location, $state, routerHelper, App, $timeout) {
        var vm = this;
        var states = routerHelper.getStates();

        // for later development
        vm.headerMenu = false;

        vm.topMostState = states.filter(function (r) {
            return r.abstract && r.name !== '' &&
                $state.includes(r.name) && r.name.indexOf('.') === -1;
        })[0];

        vm.getChildStates = function (stateName) {
            var childStates = states.filter(function (r) {
                return r.title && r.name.indexOf(stateName) === 0 &&
                    stateName.split('.').length + 1 === r.name.split('.').length;
            });
            return childStates;
        };

        vm.go = function (state) {
            if (!state.abstract)
            { $state.go(state.name); }
        };
        vm.getParents = function () {
            vm.parents = states.filter(function (r) {
                if (r.abstract && r.title && $state.includes(r.name)) {
                    r.states = states.filter(function (c) {
                        return c.name.indexOf(r.name) === 0 &&
                            c.name.split('.') > r.name.split('.') &&
                            !c.abstract &&
                            c.title;
                    });

                    vm.miniStates = r.states.filter(function (c) {
                        return c.settings && c.settings.mini;
                    });
                    return true;
                }
                return false;
            });
            return vm.parents;
        };

        vm.getIconClass = function (isBtn, suffix) {
            suffix = angular.isDefined(suffix) ? suffix : 'caret-right';
            return (isBtn ? 'btn-' : 'fa-') + suffix;
        };

        vm.setMenuHeaderActive = function (sectionLocation) {

            var page = $state.includes(sectionLocation);
            if (page) {
                return 'active open';
            } else {
                return '';
            }
        };

        vm.setMenuHeaderInactiveStyle = function (sectionLocation) {

            var page = $state.includes(sectionLocation);
            if (page) {
                return '';
            } else {
                return { 'display': 'none' };
            }
        };

        vm.setMenuActive = function (state) {
            var page = $state.includes(state.name);
            if (page && state.abstract) {
                return 'active open';
            } else if (page) {
                return 'active';
            } else {
                return '';
            }
        };

        activate();

        function activate() {
            initiateApp();
            //vm.getParents();
            //getMiniStates();
        }

        function initiateApp() {
            $timeout(function () {
                App.inspiniaUi.enableSidebar();
                App.inspiniaUi.sidebarTooltips();
                console.log('done initializing menu');
            }, 1);

        }

        function getMiniStates() {
            vm.miniStates = states.filter(function (r) {
                return r.settings && r.settings.mini;
            });
        }

    }
})();
