fundoloApp.directive('fdWidgetsFeaturedSliderDrctv', ['$log', '$filter', '$timeout', 'fdSvc',
    function ($log, $filter, $timeout, fdSvc) {
      var p = {};

      p.templateUrl = '/app/fund/widgets/fd-widgets-featured-slider-drctv.min.html';
      p.transclude = true;
      p.replace = true;
      p.restrict = 'E';

      p.link = function (scope, element, attrs, ctrlr) {
        scope.isLoading = true;
        fdSvc.featured(12).then(function (funds) {
          scope.funds = funds;
          $timeout(function () {

            //App.initBxSlider();
          }, 500);
          scope.isLoading = false;
        }, function (response) {
          $log.error(response);
        });
      }

      p.controller = [
        '$scope', function($scope) {
          $scope.getProgressPercentage = function(fund) {
            return fdSvc.getProgressPercentage(fund);
          }

          $scope.getProgressPercentageWidth = function(fund) {
            return fdSvc.getProgressPercentageWidth(fund);
          };

          $scope.leftString = function(content, stringLength) {
            if (!angular.isNumber(stringLength)) {
              return content;
            } else {
              var parsedString = content.substring(0, stringLength);
              return parsedString;
            }
          };
        }
      ];

      return p;
    }])