'use strict';

fundoloApp.directive('numbersOnly',
    function() {
        var p = {};

        p.restrict = 'A';
        
        p.require = 'ngModel';
        
        p.link = function (scope, element, attrs, controller) {
            controller.$parsers.push(function(inputValue) {
                if (inputValue == undefined) return '';

                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                
                if (transformedInput !== inputValue) {
                    controller.$setViewValue(transformedInput);
                    controller.$render();
                }

                return transformedInput;
            });
            
        };

        return p;
    });
