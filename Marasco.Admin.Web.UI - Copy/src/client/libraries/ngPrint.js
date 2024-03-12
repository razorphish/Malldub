(function (angular) {
    'use strict';

    var mod = angular.module('ngPrint', []);

    function printDirective() {
        var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }

        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {
                    printElement(elemToPrint);
                }
            });

            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            };
        }

        function printElement(elem) {
            // clones the element you want to print
            var domClone = elem.cloneNode(true);
           
            $(domClone).find("style").remove();
            $(domClone).find("div[ui-grid]").removeAttr('style');

            $.each($(domClone).find("div[ui-grid]"), function (i, e) {
                var count = $(e).find(".ui-grid-header-cell").length;
                var perWidth = 100.00 / count;
                var cells = $(e).find(".ui-grid-header-cell, .ui-grid-cell");
                cells.css('width', perWidth+'%');
            });

       
            
            printSection.innerHTML = '';
            printSection.appendChild(domClone);
            window.print();
        }

        return {
            link: link,
            restrict: 'A'
        };
    }

    mod.directive('ngPrint', [printDirective]);
}(window.angular));