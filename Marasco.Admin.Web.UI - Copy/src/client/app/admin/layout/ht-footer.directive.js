(function () {
  'use strict';

  angular
    .module('mars.admin.layout')
    .directive('htFooter', htFooter);

  /* @ngInject */
  function htFooter() {
    // Opens and closes the footer menu.
    // Usage:
    //  <div ht-footer">
    //  <div ht-footer whenDoneAnimating="vm.sidebarReady()">
    // Creates:
    //  <div ht-footer class="footer">
    var directive = {
      bindToController: true,
      controllerAs: 'vm',
      controller: htFooterController,
      link: link,
      restrict: 'EA',
      scope: {
        'footerTitle': '='
      }
    };

    return directive;
    function htFooterController() {

    }
    function link(scope, element, attrs) {
      element.addClass('footer');
    }
  }
})();
