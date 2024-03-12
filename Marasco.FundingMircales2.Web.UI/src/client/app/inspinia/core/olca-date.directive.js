(function () {
    'use strict';

    angular
        .module('mars.inspinia')
        .directive('olcaDate', OlcaDate);

    OlcaDate.$inject = [];
    function OlcaDate() {
        // Usage:
        // <olca-date></olca-date>
        // Creates:
        // Date input element
        var directive = {
            replace: true,
            link: link,
            restrict: 'E',
            templateUrl: 'app/inspinia/core/olca-date.directive.html',
            scope: {
                inputValue: '=',
                dateOptions: '=',
                //min is used for the calendar date-disabled functionality
                min: '=minDate',
                //minAttr is bound as @ as we want to get the name of the
                //property min date is bound to. We will implement a watch on
                //this in in date-only directive in case the min date changes
                minAttr: '@minDate',
                max: '=maxDate',
                maxAttr: '@maxDate',
                inputName: '@',
                dateChanged: '&',
                dateRequired: '='
            }
        };

        return directive;

        function link(scope, element, attrs) {
            scope.opened = false;

            scope.open = function ($event) {

                //we have called the javascript setTimeOut as it does not
                //call the $apply() automatically thus we do not have to worry
                //about stopPropagation which is needed to avoid calendars
                //from hiding automatically.
                //i. e. first the click event propagates to make sure all
                //the open calendars hide automatically, and only after that
                //our changes to show the calendar are applied
                setTimeout(function () {
                    scope.opened = true;
                    scope.$apply();
                }, 10);
            };
        }
    }
})();
