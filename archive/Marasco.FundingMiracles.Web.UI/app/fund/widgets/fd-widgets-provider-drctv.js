fundoloApp.directive('fdWidgetsProviderDrctv', [
  function () {
    "use strict";

    var p = {};

    p.transclude = true;
    p.restrict = 'E';
    p.replace = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-provider-drctv.min.html';;

    p.controller = [
      '$scope',
      function ($scope) {

      }
    ];

    return p;
  }
]);