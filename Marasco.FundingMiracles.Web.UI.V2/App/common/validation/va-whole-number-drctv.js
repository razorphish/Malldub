'use strict';

fundoloApp.directive('vaWholeNumberDrctv', [function() {
    var p = {};

    p.link = function(scope, element, attrs, ctrlr) {
        element.on('blur', function() {
            var num = Math.abs(parseInt(element.val(), 10));
            element.val(num);
            scope.$apply(); // update view
        });
    };

    return p;
}]);