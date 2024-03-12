'use strict';

fundoloApp.directive('mdGravatarSvc', [function(gravatarUrlBuilder) {
    var p = {};

    p.restrict = "E";
    p.template = "<img/>";
    p.replace = "true";

    p.link = function(scope, element, attrs, controller) {
        attrs.$observe('email', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                attrs.$set('src', gravatarUrlBuilder.buildGravatarUrl(email));
            }
        });
    };

    return p;
}])