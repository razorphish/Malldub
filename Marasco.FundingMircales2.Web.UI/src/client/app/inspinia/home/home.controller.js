(function () {
    'use strict';

    angular
        .module('mars.inspinia.home')
        .controller('homeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;

        vm.title = 'Home';

        activate();

        function activate() {
        }

    }
})();
