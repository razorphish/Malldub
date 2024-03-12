(function () {
  'use strict';

  angular
    .module('mars.admin.home')
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
