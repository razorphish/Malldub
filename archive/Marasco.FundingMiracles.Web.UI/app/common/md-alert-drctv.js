'use strict';

fundoloApp.directive('mdAlertDrctv', [function () {
  var p = {};
  //Alert Types: warning,danger,success,info

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-alert-drctv.min.html';

  p.scope = {
    title: '@',
    message: '@',
    alertType: '@',
    fade: '@',
    showAlert: '@',
    showBlock: '@',
    buttonTitle: '@',
    buttonFunction: '&'
};

  return p;
}]);