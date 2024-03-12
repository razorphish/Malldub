(function () {
  'use strict';

  angular
    .module('mars.admin')
    .config(configure);

  configure.$inject = ['routerHelperProvider'];

  function configure(routerHelperProvider) {

    configureStateHelper();

    function configureStateHelper() {
      var resolveAlways = {
        ready: ready
      };

      ready.$inject = ['globalFactory'];

      function ready(globalFactory) {
        // var returnArray = globalFactory.ready(
        //   [
        //     globalFactory.getTabs('fundraiser')
        //   ]
        // );

        var returnArray = globalFactory.ready();

        return returnArray;
      }

      routerHelperProvider.configure({
        docTitle: 'Admin: ',
        resolveAlways: resolveAlways
      });
    }
  }
})();
