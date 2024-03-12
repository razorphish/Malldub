'use strict';

//http://cssload.net
malldubAdminApp.directive('mdSpinnerBarDrctv', function() {
  var p = {};
  
  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-spinner-bar-drctv.html';
  
  p.link = function (scope, element, attrs, controller) {

  };

  p.controller = function ($scope) {

  };

  p.scope = {

  };

  return p;
});