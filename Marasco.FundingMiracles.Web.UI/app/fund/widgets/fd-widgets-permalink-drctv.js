'use strict';

fundoloApp.directive('fdWidgetsPermalinkDrctv', ['$timeout', 'permalinkData', function($timeout, permalinkData) {
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.transclude  = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-permalink-drctv.min.html';

  p.link = function (scope, element, attrs, controller) {
    var s = scope;
    scope.$watch('permalink', function (newValue, oldValue) {
      scope.showPermalinkAvailable = false;
      if (scope.loading === false) {
        
        if (angular.isUndefined(newValue)) {
          scope.showSpinner = false;
          scope.form.permalink.$setValidity('permalinkExists', true);
          return;
        };

        if (newValue === scope.oldPermalink) {
          scope.form.permalink.$setValidity('permalinkExists', true);
          return;
        }
        scope.permalink = scope.permalink.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-\s]/g, '');
        if (scope.permalink.substring (scope.permalink.length - 1) === '-') {
          scope.permalink = scope.permalink.substring(0, scope.permalink.length - 1);
          return;
        } else if (oldValue !== undefined  && oldValue.substring(oldValue.length - 1) === '-') {
          return;
        }
        
        if (newValue !== undefined && newValue.substring(0,1) === '-') {
          scope.permalink = newValue.substring(1);
        }

        scope.showSpinner = true;
        
        var promise = $timeout(function () {
          if (newValue === scope.permalink && scope.permalink.length >= 3) {
            var permPromise = permalinkData.exists(scope.permalink).then(
              function(permalinkExists) {
                var permalinkVisibility = permalinkExists === true ? false : true;
                scope.form.permalink.$setValidity('permalinkExists', permalinkVisibility);
                scope.showPermalinkAvailable = permalinkVisibility;
                scope.showSpinner = false;

              },
              function(data) {
                //TODO Add error message here
                console.log(data);
                scope.showSpinner = false;
              });
          } else {
            scope.showSpinner = false;
          }
        }, 1500);
        

      } else
        //Check to make sure permalink is defined. if not wait until it is
        scope.loading = angular.isUndefined(scope.permalink) ? true : false;
    });
  };

  p.controller = ['$scope', function($scope) {
    $scope.showSpinner            = false;
    $scope.loading                = true;
    $scope.showPermalinkAvailable = false;
    $scope.oldPermalink           = $scope.permalink;
  }];
  
  p.scope = {    
    permalink: '=',
    form: '='
  };
  return p;
}]);