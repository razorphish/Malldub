(function () {
  'use strict';

  angular
    .module('mars.admin.layout')
    .directive('htSidebar', htSidebar);

  /* @ngInject */
  function htSidebar() {
    // Opens and closes the sidebar menu.
    // Usage:
    //  <div ht-sidebar">
    //  <div ht-sidebar whenDoneAnimating="vm.sidebarReady()">
    // Creates:
    //  <div ht-sidebar class="sidebar">
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
      element.attr('id', 'sidebar');
    }
  }
})();
