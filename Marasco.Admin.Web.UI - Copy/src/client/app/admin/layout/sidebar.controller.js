(function () {
  'use strict';

  angular
    .module('mars.admin.layout')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = ['$scope', '$location', '$state', 'routerHelper', 'app',
    '$timeout', '$rootScope'];
  /* @ngInject */
  function Sidebar($scope, $location, $state, routerHelper, App, $timeout, $rootScope) {
    var vm = this;
    var states = routerHelper.getStates();
    $scope.parents = [];

    $scope.getParents = function () {
      $scope.parents = states.filter(function (r) {

        if ((r.topLevel)) {
          r.states = states.filter(function (c) {
            var isState = c.name.indexOf(r.name) === 0 &&
              c.name.split('.') > r.name.split('.') &&
              !c.abstract && c.title &&
              !c.forceParent &&
              !c.topLevel;
            return isState;
          });

          return true;
        }
        return false;
      });
    };

    if ($location.absUrl().search('webenrollment') === -1) {
      $scope.isWebenrollment = false;
    } else {
      $scope.isWebenrollment = true;
    }

    $scope.getIconClass = function (isBtn, suffix) {
      var iconSuffix = angular.isDefined(suffix) ? suffix : 'caret-right';
      var iconClass = (isBtn ? 'btn-' : 'fa-') + iconSuffix;
      return iconClass;
    };

    $scope.setMenuHeaderActive = function (state) {

      var page;
      var cssClass = '';

      if (state.topLevel) {
        if (!angular.isUndefined(state.states) &&
          state.states.length === 0) {
          page = $state.is(state.name);
          cssClass = 'active';
        }
        else if (!angular.isUndefined(state.states) &&
          state.states.length > 0) {
          page = $state.includes(state.name);
          cssClass = 'active open';
        }

      } else {
        page = $state.includes(state.name);
        cssClass = '';
      }

      if (page) {
        return cssClass;
      } else {
        return '';
      }
    };

    $scope.setMenuHeaderInactiveStyle = function (sectionLocation) {

      var page = $state.includes(sectionLocation);
      if (page) {
        return '';
      } else {
        return { 'display': 'none' };
      }
    };

    $scope.setMenuActive = function (pageLocation) {
      var page = $state.is(pageLocation);
      if (page) {
        return 'active';
      } else {
        return '';
      }
    };

    activate();

    function activate() {
      $scope.headermenu = $rootScope.headermenu;
      initiateApp();
      $scope.getParents();
      getMiniStates();
    }

    function initiateApp() {
      $timeout(function () {
        App.marascoUi.enableSidebar();
        App.marascoUi.sidebarTooltips();
        console.log('done initializing sidebar');
      }, 1);

    }

    function getMiniStates() {
      $scope.miniStates = states.filter(function (r) {
        return r.settings && r.settings.mini;
      });
    }
  }
})();
