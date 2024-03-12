fundoloApp.directive('fdWidgetsSocialDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-social-drctv.min.html';

  p.link = function (scope, element, attrs, controller) {

  };

  //Performs DOM transformation befire link function runs
  p.compile = function (elem, attrs) {

  }

  p.controller = ['$scope', '$uibModal', 'Facebook', 'seAuthSvc', 'twitterConfiguration',
    function ($scope, $uibModal, Facebook, seAuthSvc, twitterConfiguration) {

      //#region === Initialize ===

      $scope.facebookIt = false;
      $scope.tweetId = false;
      $scope.mailIt = false;
      $scope.twitterCount = 0;

      $scope.socials = [
        { name: 'facebook' },
        { name: 'twitter' },
        { name: 'googleplus' }
      ];

      //#endregion


      //#region === Public Methods ===

      $scope.postData = function (provider) {

        switch (provider) {
          case 'Facebook':
            postFacebook();
            break;
          case 'Twitter':
            postTwitter();
            break;
          case 'Mail':
            postMail();
            break;
          case 'Print':
            postPrint();
            break;
          case 'Embed':
            embed();
          default:
        }
      }

      //#endregion

      //#region === Private Methods ===

      function embed() {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fdWidgetsSocialEmbedMdl.min.html',
          controller: fdWidgetsSocialEmbedMdl,
          resolve: {
            fund: function () {
              return $scope.data.fund;
            }
          }
        });

        modalInstance.result.then(function (sender) {
          //Do nothing on close
        }, function () {
          //Do nothing on cancel
        });
      }


      function postFacebook() {

        Facebook.ui($scope.data.facebookData, function (data) {
          //TODO: CREATE MODAL thank you with stats
          toastr.success('Thank you for sharing my fundraiser!');
        });
      }

      function postMail() {

        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fdWidgetsSocialPostMdl.min.html',
          controller: fdWidgetsSocialPostMdl,
          resolve: {
            user: function () {
              return seAuthSvc.user;
            },
            fund: function () {
              return $scope.data.fund;
            }
          }
        });

        modalInstance.result.then(function (sender) {
          toastr.success('This fundraiser was shared successfully');
        }, function () {
          //Do nothing on cancel
        });
      }

      function postPrint() {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fdWidgetsSocialPrintMdl.min.html',
          controller: fdWidgetsSocialPrintMdl,
          resolve: {
            fund: function () {
              return $scope.data.fund;
            }
          }
        });

        modalInstance.result.then(function (sender) {
          //Do nothing on print/close
        }, function () {
          //Do nothing on cancel
        });
      }

      function postTwitter() {
        var url = encodeURIComponent($scope.data.twitterData.url);

        var href = twitterConfiguration.tweetUrl +
          '?hashtags=' + encodeURIComponent($scope.data.twitterData.hashtags) +
          '&original_referer=' + encodeURIComponent(document.location.href) +
          '&related=' + encodeURIComponent($scope.data.twitterData.related) +
          '&source=tweetbutton' +
          '&text=' + $scope.data.twitterData.text +
          '&url=' + url +
          '&via=' + $scope.data.twitterData.via;

        //// Get count and set it as the inner HTML of .count
        $.getJSON(twitterConfiguration.countUrl + "?callback=?&url=" + url, function (data) {
          $scope.twitterCount = data.count;
        });

        window.open(href, 'Share a link on Twitter', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
      }

      //#endregion

    }];

  p.scope = {
    data: '=',
  }

  return p;
}]);
