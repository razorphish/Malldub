fundoloApp.directive('fdWidgetsTweetsDrctv', [
  function() {
    "use strict";

    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-tweets-drctv.min.html';

    p.controller = [
      '$scope','$log', 'mdMallDubTwitter', 
      function ($scope, $log, mdMallDubTwitter) {

        //#region === Initialize ===
        $scope.tweets = [];
        $scope.maxLength = 10;
        $scope.active = 0;
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

        mdMallDubTwitter.mentionsTimeline().then(
          function (items) {
            //For mentions use this method
            $scope.mentions = angular.fromJson(items[0].rawSource);
            //for User timeline use this
            // $scope.tweets = items;
            addToTweets($scope.mentions, $scope.maxLength);
            getUserTimeline();
          }, function(response) {
          $log.error(response);
          });

        //#endregion

        //#region === Public Methods ===

        $scope.reply = function(tweetId) {
          mdMallDubTwitter.reply(tweetId);
        }

        $scope.retweet = function (tweetId) {
          mdMallDubTwitter.retweet(tweetId);
        }

        $scope.favorite = function (tweetId) {
          mdMallDubTwitter.favorite(tweetId);
        }

        //#endregion

        //#region Private Methods

        function addToTweets(tweets, maxLength) {
          var currentLength = tweets.length;

          for (var i = 0; i < currentLength; i++) {
            if ($scope.tweets.length <= maxLength) {
              if (angular.isUndefined(tweets[i].user.screenName)) {
                tweets[i].user.screenName = tweets[i].user.screen_name;
              }
              $scope.tweets.push(tweets[i]);
            }
          }
        }

        function getUserTimeline() {
          mdMallDubTwitter.userTimeline('FundingMiracles').then(
            function(items) {
              //For mentions use this method
              //$scope.userTimeline = angular.fromJson(items[0].rawSource);
              //for User timeline use this
              $scope.userTimeline = items;
              addToTweets($scope.userTimeline, $scope.maxLength);
            }, function(response) {
              $log.error(response);
            });
        }
        //#endregion
      }
    ];

    return p;
  }
]);