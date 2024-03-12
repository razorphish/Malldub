'use strict';

fundoloApp.directive('mdCarousel', [function() {
  var p = {};

  p.restrict    = "E";
  p.templateUrl = '/app/common/md-carousel-drctv.min.html';
  p.transclude  = true;
  p.replace     = true;

  //p.link = function(scope, element, attrs, ctrl) {

  //};

  p.controller = ['$scope', '$filter', 'fdSvc', function ($scope, $filter, fdSvc) {
    $scope.hideHeadline = function() {
      return (angular.isUndefined(this.slideHeadline) || this.slideHeadline.length < 1);
    };
      
    $scope.hideCaption2 = function () {
      if (angular.isUndefined(this.hideCaption)) {
        return false;
      }
      return this.hideCaption;
    };
    
    $scope.getTotalDonation = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation($scope.fund.donationList, true);
    };

    $scope.getProgressPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      var percentage = {
        'width': $filter('number')(percentageNumber, 0) + '%'
      };

      return percentage;
    };
  }];

  p.scope = {
    slideHeadline: '@',
    slides: '=',
    myInterval: "=",
    fund: "=",
    spanClass: '@',
    hideCaption: '@',
    showProgress: '@'
  };
  
  return p;
}]);

