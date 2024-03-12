(function () {
  'use strict';

  angular
    .module('mars.admin.layout')
    .controller('shellController', Shell);

  Shell.$inject = ['$timeout', 'logger', 'app'];
  /* @ngInject */
  function Shell($timeout, logger, App) {
    var vm = this;

    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    vm.showSplash = true;
    vm.tagline = {
      text: 'Created by WE2.0 team',
      link: 'http://www.webenrollment.aspenrms.com'
    };

    vm.headerMenu = true;

    activate();

    function activate() {
      //logger.success(config.appTitle + ' loaded!', null);
      hideSplash();
      App.marascoUi.basics();
      App.marascoUi.handleScrollbars();
      App.marascoUi.navbarHelpers();
      App.marascoUi.scrollTopBtn();
      $timeout(function () {
        initAceSettings();
      }, 1000);
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function () {
        vm.showSplash = false;
      }, 1000);
    }
  }
})();
