'use strict';

fundoloApp.filter('doubleDigit', function() {
    return function(number, padding) {
      padding = (padding || 0);
      if (angular.isDefined(number)) {
        var str = "" + number;
        while (str.length < padding) str = "0" + str;
        return str;
      }
      return number;
    };
  })
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  })
  .filter('colorTen', function() {
    return function(number, prepend) {
      var things = [
        'zero', 'one', 'two', 'three',
        'four', 'five', 'six', 'seven',
        'eight', 'nine'
      ];

      prepend = (prepend || '');

      if (angular.isDefined(number) && angular.isNumber(number)) {
        var lastDigit = number.toString().substr(number.toString().length - 1);
        return prepend + things[parseInt(lastDigit)];
      }
      return 'one';

    }
  })
  .filter('blockColor', function() {
    return function(number, prepend) {
      var things = [
        'pending', 'success',
        'info', 'error', 'default'
      ];

      prepend = prepend || '';

      if (angular.isDefined(number) && angular.isNumber(number)) {
        var finalInt = 0;
        var lastDigit = number.toString().substr(number.toString().length - 1);
        var parsedInt = parseInt(lastDigit);
        if (parsedInt > 4) {
          finalInt = parsedInt - 5;
        } else {
          finalInt = parsedInt;
        }
        return prepend + things[finalInt];
      }
      return '';
    }
  })
  .filter('momentFrom', function() {
    return function(momentDate) {
      if (angular.isDefined(momentDate)) {
        var ret = moment(utcToLocalTimeUnFormatted(momentDate)).fromNow();
        return ret;
      }

      return momentDate;
    }
  })
  .filter('momentTo', function() {
    return function(momentDate, formatter) {
      if (angular.isDefined(momentDate)) {
        var ret = moment(utcToLocalTimeUnFormatted(momentDate));
        if (angular.isDefined(formatter)) {
          return ret.format(formatter);
        }
        return ret.format('LL');
      }

      return momentDate;
    }
  });

function utcToLocalTimeUnFormatted(utcMoment) {
  var utcDate = moment.utc(utcMoment).toDate();
  var localDate = moment(utcDate);
  return localDate;
}