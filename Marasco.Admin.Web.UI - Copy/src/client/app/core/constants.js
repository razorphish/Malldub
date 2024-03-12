/* global toastr:false, moment:false, App:false, ace:true */
(function () {
  'use strict';

  angular
    .module('mars.axis.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('app', App);
})();
