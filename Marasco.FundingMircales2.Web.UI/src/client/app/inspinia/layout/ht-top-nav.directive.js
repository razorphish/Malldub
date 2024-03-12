(function () {
    'use strict';

    angular
        .module('mars.inspinia.layout')
        .directive('htTopNav', htTopNav);

    htTopNav.$inject = ['seAuthFactory', '$state', '$log', 'toastr'];

    /* @ngInject */
    function htTopNav(seAuthFactory, $state, $log, toastr) {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'tagline': '=',
                'headertitle': '='
            },
            templateUrl: 'app/inspinia/layout/ht-top-nav.html'
        };

        /* @ngInject */
        function TopNavController() {
            var vm = this;

            vm.authentication = seAuthFactory.authentication;

            vm.logout = function () {
                seAuthFactory.logout().then(function (response) {
                    $state.go('login');
                    toastr.success('Logout Successful...');
                }, function (response) {
                    toastr.error('There was an error logging out.  Please clear your ' +
                     'browser cache (cookies, files, etc) and try again.');
                    $log.error(response);
                });
            };
        }

        return directive;
    }
})();
