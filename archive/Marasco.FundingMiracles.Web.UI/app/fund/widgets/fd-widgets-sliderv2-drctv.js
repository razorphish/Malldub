fundoloApp.directive('fdWidgetsSliderv2Drctv', [
  '$log', '$filter', 'fdSvc',
  function($log, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/fund/widgets/fd-widgets-sliderv2-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;

    p.link = function ($scope, element, attrs, controller) {
      $scope.$watch('fundCategory', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });
    };

    p.controller = [
      '$scope', '$timeout',
      function ($scope, $timeout) {

        //#region === Initialization ===
        $scope.isLoading = true;
        //#endregion

        //#region === Public Methods ===

        $scope.init = function () {

          switch ($scope.fundCategory.toLowerCase()) {
            case 'featured':
              initFeatured();
              break;
            case 'completed':
              initCompleted();
              break;
            default:
              initFeatured();
          }
        }

        //#endregion /=== Public Methods ===

        //#region === Private Methods ===

        function initCarousel(lapseTime) {
          $timeout(function () {
            //$window.App.mallDub.initOwlCarousel('#' + $scope.id);
            var owl = angular.element('#' + $scope.owlId);
            owl.owlCarousel({
              items: [4],
              itemsDesktop: [1000, 3], //3 items between 1000px and 901px
              itemsDesktopSmall: [979, 2], //2 items between 901px
              itemsTablet: [600, 1], //1 items between 600 and 0;
              slideSpeed: 1000
            });

            // Custom Navigation Events
            angular.element("#" + $scope.owlId + '-next').click(function () {
              owl.trigger('owl.next');
            });
            angular.element("#" + $scope.owlId + '-prev').click(function () {
              owl.trigger('owl.prev');
            });

            $scope.isLoading = false;
          }, lapseTime);
        }

        function initFeatured() {
          fdSvc.featured(8).then(function (funds) {
            $scope.funds = funds;
            initCarousel(1000);
          }, function (response) {
            $log.error(response);
          });
        }

        function initCompleted() {
          fdSvc.completed(8).then(
          function (funds) {
            $scope.funds = funds;
            initCarousel(1000);
          },
          function (response) {
            $log.error(response);
          });
        }

        //#endregion

      }
    ];

    p.scope = {
      fundCategory: '@',
      title: '@',
      subTitle: '@',
      owlId: '@'
    }
    return p;
  }
]);