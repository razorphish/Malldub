'use strict';

malldubAdminApp.directive('mdInquiryDrctv', function() {
  var p = {};

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-inquiry-drctv.html';

  p.link = function (scope, element, attrs, controller) {

  };

  p.controller = function ($scope) {

  };

  p.scope = {

  };

  return p;
});