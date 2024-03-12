(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .directive('dateOnly', DateOnly);

  DateOnly.$inject = ['$window', 'moment'];
  function DateOnly($window, moment) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      link: Link,
      restrict: 'A',
      require: 'ngModel'
    };
    return directive;

    function Link(scope, element, attrs, modelCtrl) {
      element.on('click', function () {

        if (modelCtrl.$viewValue === undefined) {
          return;
        }

        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          var caret = this.selectionStart;

          var startSlash = modelCtrl.$viewValue.substring(0, caret).lastIndexOf('/');
          if (startSlash >= caret || startSlash === -1) {
            startSlash = 0;
          }
          else {
            startSlash++;
          }

          var endSlash = modelCtrl.$viewValue.indexOf('/', caret);

          if (endSlash === -1) {
            endSlash = this.value.length;
          }

          this.setSelectionRange(startSlash, endSlash);
        }
      });

      /*jshint maxcomplexity:9 */
      element.on('blur', function () {
        if (modelCtrl.$viewValue === undefined || modelCtrl.$viewValue === '') {
          return;
        }

        var transformedInput = '';
        var dateParts = modelCtrl.$viewValue.split('/');
        var month = '';
        var day = '';
        var year = '';
        if (dateParts.length > 0) {
          month = dateParts[0];

          if (month.length === 1) {
            month = '0' + month;
          }

          transformedInput += month;
        }

        if (dateParts.length > 1) {

          day = dateParts[1];

          if (day.length === 1) {
            day = '0' + day;
          }

          transformedInput += '/' + day;
        }

        if (dateParts.length > 2) {
          year = dateParts[2];
          transformedInput += '/' + year;
        }

        if (transformedInput !== modelCtrl.$viewValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }

      });

      var self = this;
      modelCtrl.minDate = scope.min;
      modelCtrl.maxDate = scope.max;

      if (!angular.isUndefined(scope.minAttr) && scope.minAttr !== '') {

        scope.$parent.$watch(scope.minAttr, function (value) {
          modelCtrl.minDate = value ? new Date(value) : undefined;
          modelCtrl.$validate();
        });

        modelCtrl.$validators.min =
          function (modelValue, viewValue) {
            if (angular.isUndefined(modelCtrl.minDate) ||
              viewValue === '' ||
              viewValue === undefined) {
              return true;
            }

            var minDate = angular.isDate(modelCtrl.minDate) ?
              modelCtrl.minDate : new Date(modelCtrl.minDate);
            return new Date(modelValue) >= minDate;
          };
      }

      if (!angular.isUndefined(scope.maxAttr) && scope.maxAttr !== '') {
        scope.$parent.$watch(scope.maxAttr, function (value) {
          modelCtrl.maxDate = value ? new Date(value) : undefined;
          modelCtrl.$validate();
        });

        modelCtrl.$validators.max =
          function (modelValue, viewValue) {

            if (angular.isUndefined(modelCtrl.maxDate) ||
              viewValue === '' || viewValue === undefined) {
              return true;
            }

            var maxDate = angular.isDate(modelCtrl.maxDate) ?
              modelCtrl.maxDate : new Date(modelCtrl.maxDate);
            return new Date(modelValue) <= maxDate;
          };
      }

      //remove the parser added by the bootstrap-ui date directive
      modelCtrl.$parsers.pop();

      /*jshint maxcomplexity:16, maxstatements:41 */
      modelCtrl.$parsers.push(function (viewValue) {

        modelCtrl.$setValidity('min', true);
        modelCtrl.$setValidity('date', true);

        if (viewValue === undefined || viewValue === '') {
          return '';
        }
        var transformedInput = '';
        var dateParts = viewValue.split('/');
        var month = '';
        var day = '';
        var year = '';
        if (dateParts.length > 0) {
          month = dateParts[0].replace(/[^0-9]/g, '');
          if (month.length > 2) {
            month = month.substring(0, 2);
          }
          if (month.length === 2 && parseInt(month) > 12) {
            month = '12';
          }
          if (month === '00') {
            month = '01';
          }

          transformedInput += month;
        }

        if (dateParts.length > 1) {

          day = dateParts[1].replace(/[^0-9]/g, '');
          if (day.length > 2) {
            day = day.substring(0, 2);
          }
          if (day.length === 2 && parseInt(day) > 31) {
            day = '31';
          }
          if (day === '00') {
            day = '01';
          }

          transformedInput += '/' + day;
        }

        if (dateParts.length > 2) {
          year = dateParts[2].replace(/[^0-9]/g, '');
          if (year.length > 4) {
            year = year.substring(0, 4);
          }
          if (year.length === 4 && parseInt(year) < 1901) {
            year = '1901';
          }
          transformedInput += '/' + year;
        }

        if (transformedInput !== viewValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }
        if (moment(transformedInput, 'MM/DD/YYYY').isValid() &&
          year.length === 4 && month.length > 0 && day.length > 0) {
          modelCtrl.$modelValue = new Date(Date.UTC(year, parseInt(month) - 1, day));
          return new Date(Date.UTC(year, parseInt(month) - 1, day));
        }
        else {
          return undefined;
        }
      });
    }
  }

})();
