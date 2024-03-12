fundoloApp.directive('fdWidgetsSliderv3Drctv', [
  '$window', '$timeout',
  function ($window, $timeout) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/fund/widgets/fd-widgets-sliderv3-drctv.min.html';
    p.replace     = true;

    p.link = function ($scope, element, attrs, controller) {
      $scope.$watch('imageList', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isArray(newValue)) {
          $scope.init();
        }
      }, true);

      //#region === Initialization ===
      var slider               = {};
      $scope.isLoading         = true;
      $scope.sliderId = $window.App.mallDub.randomator(3);
      $scope.sliderContainerId = 'sliderContainer' + $scope.sliderId;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {

        initImageList();
        initSlides();
        initSlider();

      }

      //#endregion /=== Public Methods ===

      //#region === Private Methods ===

      function initImageList() {
        $scope.slides = [];
        if ($scope.imageList.length > 0) {
          var imgUrl = '';
          var thumbUrl = '';
          angular.forEach($scope.imageList, function(value, key) {
            imgUrl = value.upload.location;
            thumbUrl = value.upload.location;

            if (value.upload.typeId === 'web.Image') {
              imgUrl = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=560&width=550&mode=crop&scale=both';

              thumbUrl = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=360&width=480&mode=crop&scale=both';
            }

            $scope.slides.push({
              imgUrl: imgUrl,
              thumbUrl: thumbUrl,
              title: '',
              description: '',
              active: value.isDefault,
              typeId: value.upload.typeId,
              name: value.upload.name,
              location: value.upload.location
            });

          });
        } else {
          // Add a default image
          var defaultImageUrl = '/img/logo/250b.png';

          $scope.slides.push({
            imgUrl: defaultImageUrl,
            thumbUrl: defaultImageUrl,
            title: '',
            description: '',
            active: true,
            typeId: 'web.Image.System',
            name: defaultImageUrl,
            location: defaultImageUrl
        });
        }
      }

      function initSlides() {
        var data = '';
        var i = 1;

        angular.forEach($scope.slides, function (value, key) {
          angular.element($('#' + $scope.sliderContainerId)).html('');

          data += '<div class="ms-slide" id="slide_' + $scope.sliderId + '_' + i + '">';

          switch (value.typeId) {
            case 'web.Video.Vimeo':
            case 'web.Video.YouTube':
              data += '<img src="/assets2/img/blank.gif" data-src="' + value.name + '"/>';
              data += '<img class="ms-thumb" src="' + value.name + '">';
              data += '<a data-type="video" data-autoplay="true" href="' + value.location + '"> </a>';
              data += '</div>';
              break;
            default:

              data += '<img src="/assets2/img/blank.gif" data-src="' + value.imgUrl + '"/>';
              data += '<img class="ms-thumb" src="' + value.thumbUrl + '"></div>';
              break;
          }
          i++;
        });

        angular.element($('#' + $scope.sliderContainerId)).html(data);
      }

      function initSlider() {
        //$timeout(function() {
        slider = $window.App.mallDub.initMasterSliderShowcase2($scope.sliderContainerId);
        //},1);
      }
      //#endregion
    };

    p.scope = {
      imageList: '='
    }
    return p;
  }
]);