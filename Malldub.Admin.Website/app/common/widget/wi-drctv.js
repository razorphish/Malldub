'use strict';
malldubAdminApp.directive('wiNavbarDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-navbar-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiNavigationDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-navigation-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiMessagesDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-messages-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiLoginDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-login-drctv.html';
    p.priority = 1000;

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiAlertsDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-alerts-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function ($scope, mdAdminSvc) {
      //#region Initialize
      $scope.total = 0;

      mdAdminSvc.notesByApplications().then(
        function(notes) {
          $scope.notes = notes;
          angular.forEach($scope.notes, function(note, key) {
            $scope.total += note.quantity;
          });
        },
        function(response) {

        });


      //#endregion

      $scope.getIcon = function (applicationId) {
        var icon = 'icon-question';

        switch(applicationId) {
          case 'Fundolo':
            icon = 'icon-heart';
            break;
          default:
            break;
        }

        return icon;
      }
    };

    p.scope = {

    };

    return p;
  })
  .directive('wiTasksDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-tasks-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiSidebarDrctv', function($timeout) {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-sidebar-drctv.html';

    p.link = function(scope, element, attrs, controller) {
      $timeout(function() {
        ace.handle_side_menu_sidebar(jQuery);
      }, 1);
    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiSidebarNavDrctv', function($timeout) {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-sidebar-nav-drctv.html';

    p.link = function(scope, element, attrs, controller) {
      $timeout(function() {
        ace.handle_side_menu(jQuery);
      }, 1);
    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiBreadcrumbsDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-breadcrumbs-drctv.html';

    p.link = function(scope, element, attrs, controller) {

    };

    p.controller = function($scope) {

    };

    p.scope = {

    };

    return p;
  })
  .directive('wiPageheaderDrctv', function() {
    var p = {};

    p.restrict = 'E';
    p.transclude = true;
    p.replace = true;
    p.templateUrl = '/app/common/widget/wi-pageheader-drctv.html';

    p.link = function (scope, element, attrs, controller) {

    };

    p.controller = function ($scope) {

    };

    p.scope = {

    };

    return p;
  });