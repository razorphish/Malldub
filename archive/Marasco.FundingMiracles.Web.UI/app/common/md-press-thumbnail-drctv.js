'use strict';

fundoloApp.directive('mdPressThumbnailDrctv', ['mdPressDataSvc', function (mdPressDataSvc) {
    var p = {};

    p.restrict = "E";
    p.templateUrl = '/app/common/md-press-thumbnail-drctv.min.html';
    p.transclude = true;
    p.replace = true;

    p.link = function(scope, element, attrs, controller) {
        scope.$watch(attrs.pressthumbnail, function (value) {
            setTimeout(function() {

                $(element[0].firstElementChild).flexslider({
                    animation: "slide",
                    easing: "swing",
                    animationLoop: true,
                    itemWidth: 1,
                    itemMargin: 1,
                    minItems: 2,
                    maxItems: 9,
                    controlNav: false,
                    directionNav: false,
                    move: 2
                });
                
            }, 1);
        });

        scope.presses = mdPressDataSvc.presses;
    };
    
    return p;
}]);