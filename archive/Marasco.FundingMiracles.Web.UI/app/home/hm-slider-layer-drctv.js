fundoloApp.directive('hmSliderLayerDrctv', [function () {
  'use strict';
  var p = {};

  p.transclude = true;
  p.restrict = 'E';
  p.templateUrl = '/app/home/hm-slider-layer-drctv.min.html';

  p.replace = true;
  p.link = function(scope, element, attrs, ctrlr) {
    //Index.initLayerSlider();
  }

  return p;
}]);