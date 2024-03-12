(function () {
  'use strict';

  angular
    .module('mars.admin.layout')
    .controller('Footer', Footer);

  Footer.$inject = ['moment'];

  /* @ngInject */
  function Footer(moment) {
    var vm = this;
    vm.currentYear = moment().year();

    activate();

    function activate() {
    }
  }
})();
