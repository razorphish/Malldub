fundoloApp.directive('accessLevel', ['seAuthSvc', function (seAuthSvc) {
  'use strict';
  var p = {};

  p.restrict = 'A';
  p.link = function (scope, element, attrs) {
      var prevDisp = element.css('display')
          , userRole
          , accessLevel;

      scope.user = seAuthSvc.user;
      scope.$watch('user', function (user) {
        if (user.role)
          userRole = user.role;
        updateCss();
      }, true);

      attrs.$observe('accessLevel', function (al) {
        if (al) accessLevel = scope.$eval(al);
        updateCss();
      });

      function updateCss() {
        if (userRole && accessLevel) {
          if (!seAuthSvc.authorize(accessLevel, userRole))
            element.css('display', 'none');
          else
            element.css('display', prevDisp);
        }
      }
  };

  return p;
}])

.directive('activeNav', ['$location', function ($location) {
  var p = {};
  p.restrict = 'A';

  p.link = function(scope, element) {
    var nestedA = element.find('a')[0];
    var path = nestedA.href;

    scope.location = $location;

    scope.$watch('location.absUrl()', function(newPath) {
      if (path === newPath) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    });
  };

  return p;
}]);