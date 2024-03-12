'use strict';

fundoloApp.directive('mdSocialMessageDrctv', [
  function() {
    //http://cssload.net/
    var p         = {};
    p.restrict    = "E";
    p.templateUrl = "/app/common/md-social-message-drctv.min.html";
    p.transclude  = true;

    p.link = function(scope, element, attrs, ctrlr) {
      scope.$watch('textMessage', function(newValue, oldValue) {

        if (angular.isUndefined(scope.textMessage)) {
          scope.count = 0;
          return;
        }
        var newCount = scope.textMessage.length;

        if (newCount >= 140) {
          scope.count = 140;
        } else {
          scope.count = newCount;
        }
      });
    };

    p.scope = {
      textMessage: "="
    };

    return p;
  }
]);