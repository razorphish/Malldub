fundoloApp.directive('mdAvatarDrctv', ['$window',
  function ($window) {
    'use strict';

    var p = {};

    p.replace    = true;
    p.transclude = true;
    p.restrict   = 'E';
    p.template   = '<img/>';

    p.link = function($scope, element, attributes, controller) {
      $scope.$watch('user', function (newValue, oldValue) {
        var randomImageNumber = $window.App.mallDub.randomIntFromInterval(0, 30);
        var imgLoc = '/img/avatar/' + randomImageNumber + '.jpg';

        if (angular.isDefined(newValue)) {

          if (newValue.forceDefault === true) {
            attributes.$set('src', imgLoc);
            return;
          }

          var imgSrc = '/img/logo/180.png';

          if (angular.isDefined(newValue.identification)) {
            if (angular.isDefined(newValue.facebookProvider && angular.isDefined(newValue.facebookProvider.providerKey))) {
              imgSrc = 'https://graph.facebook.com/' + newValue.facebookProvider.providerKey + '/picture';
            } else {
              imgSrc = newValue.avatarUploadTempLocation;
            }
          }

          attributes.$set('src', imgSrc);
        } else {
          attributes.$set('src', imgLoc);
        }
      }, true);

      attributes.$observe('classes', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          attributes.$set('class', newValue);
        }
      });
    }

    p.scope = {
      user : '='
    }

    return p;
  }
]);