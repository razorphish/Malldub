'use strict';

fundoloApp.controller('pgAboutUsCtrl',['$scope', '$timeout',
  function pgAboutUsCtrl($scope, $timeout) {
    $scope.$parent.pageTitle = "About Funding Miracles - Free Online Fundraising";
    $scope.$parent.pageDescription = "FREE Online Fundraising";

    $timeout(function () {
      window.prerenderReady = true;
    }, 5000);
  }])

/* How it works */
  .controller('pgHowItWorksCtrl', [,
  function pgHowItWorksCtrl() {

  }])

/* Learn page */
 .controller('pgLearnCtrl', ['$scope', 'mdCoreDataSvc', 
  function pgLearnCtrl($scope, mdCoreDataSvc) {
    $scope.sendQuestion = function() {
      if (this.sendQuestionForm.$valid) {
        mdCoreDataSvc.sendQuestion({
          name: $scope.name,
          email: $scope.email,
          message: $scope.message,
          applicationId: 'Fundolo',
          noteTypeId: 'Question',
          title: 'Funding Miracles Question'
        }).then(function(res) {
            toastr.success('Thank you! We have received your message and are eager to get back to you.');
            $scope.name = '';
            $scope.email = '';
            $scope.message = '';

          },
          function(res) {
            toastr.error(res.error_description);
          });
      } else {
        toastr.error('Please be sure to fill out name, valid email and your message');
      }
    };
  }])

  .controller('pgHelpCtrl', ['$scope', function pgHelpCtrl($scope) {

  }])

  .controller('pgFeesCtrl', ['$scope', function pgFeesCtrl($scope) {

  }])

  .controller('pgTermsCtrl', ['$scope',function pgTermsCtrl($scope) {

  }])

  .controller('pgHowItWorksCtrl',['$scope', function pgHowItWorksCtrl($scope) {

  }])

  .controller('pgFeesCtrl',['$scope', function pgFeesCtrl($scope) {

  }])

  .controller('pgFeaturesCtrl',['$scope',function pgFeaturesCtrl($scope) {

  }])

  .controller('pgFaqCtrl', ['$scope', function pgFaqCtrl($scope) {

  }])
  .controller('pgCrowdFundCtrl', ['$scope', function pgCrowdFundCtrl($scope) {

  }])
  .controller('pgFundraisingIdeas', ['$scope', function pgFundraisingIdeas($scope) {

  }])

.controller('pgTipsCtrl', ['$scope', function pgTipsCtrl($scope) {

}])

//#region Cancer Pages
  .controller('pgCancerInfoCtrl', ['$scope', '$location',
  function pgCancerInfoCtrl($scope, $location) {
    $scope.createFundraiser = function() {
      $location.path('/controlpanel/fund/list');
    };
  }
]);
//#endregion /Cancer Pages