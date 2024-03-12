/*
 * 
 * 
 * 
 * 
 */
(function (window, angular, undefined) {
  'use strict';

  // Module global settings.
  var settings = {};

  angular.module('md.mallDub.twitter', [])

    //Declare module settings value
    .value('settings', settings)

    .provider('mdMallDubTwitter', function() {

      /**
      * Twitter access token
      * @type {String}
      */
      settings.accessToken = null;

      this.setAccessToken = function (accessToken) {
        settings.accessToken = accessToken;
      };

      this.getAccessToken = function () {
        return settings.accessToken;
      };

      /**
      * Twitter token secret
      * @type {String}
      */
      settings.tokenSecret = null;

      this.setTokenSecret = function (tokenSecret) {
        settings.tokenSecret = tokenSecret;
      };

      this.getTokenSecret = function () {
        return settings.tokenSecret;
      };


      /**
      * Twitter (internal) api
      * @type {String}
      */
      settings.apiUrl = null;

      this.setApiUrl = function (apiUrl) {
        settings.apiUrl = apiUrl;
      };

      this.getApiUrl = function () {
        return settings.apiUrl;
      };

      function MdMallDubTwitter($q, mdTwitterSvc) {
        var p = {};

        //#region Private methods
        var initScope = function() {
          if (settings.accessToken === null) {
            //throw('md.Twitter error: Please initialize the twitter\'s access token');
          }
          if (settings.tokenSecret === null) {
            //throw ('md.Twitter error: Please initialize the twitter\'s token secret');
          }
          if (settings.apiUrl === null) {
            throw ('md.Twitter error: Please initialize the api to your twitter service');
          }
        }

        //#region Public Methods
        p.userTimeline = function(screenName) {
          initScope();

          var deferred = $q.defer();

          mdTwitterSvc.userTimeline(screenName).then(
            function(items) {
              deferred.resolve(items);
            }, function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        }

        p.mentionsTimeline = function () {
          initScope();

          var deferred = $q.defer();

          mdTwitterSvc.mentionsTimeline().then(
            function (items) {
              deferred.resolve(items);
            }, function (response) {
              deferred.reject(response);
            });

          return deferred.promise;
        }

        //https://dev.twitter.com/web/intents
        //Web Intents
        p.reply = function (tweetId) {
          if (angular.isDefined) {
            var href = 'https://twitter.com/intent/tweet?' +
              'in_reply_to=' + tweetId;

            window.open(href, 'ReTweet this on Twitter', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
          }
        }

        p.retweet = function (tweetId) {

          if (angular.isDefined) {
            var href = 'https://twitter.com/intent/retweet?' +
              'tweet_id=' + tweetId;

            window.open(href, 'ReTweet this on Twitter', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
          }
        }

        p.favorite = function (tweetId) {
          if (angular.isDefined) {
            var href = 'https://twitter.com/intent/favorite?' +
              'tweet_id=' + tweetId;

            window.open(href, 'ReTweet this on Twitter', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
          }
        }
        //#endregion

        return p;
      }


     //#region Provider public methods
      this.$get = [
        '$q', 'mdTwitterSvc', function($q, mdTwitterSvc) {
          return new MdMallDubTwitter($q, mdTwitterSvc);
        }
      ];

      this.init = function (initSettings) {
        if (angular.isObject(initSettings)) {
          angular.extend(settings, initSettings);
        }
        return this;
      }

      //#endregion
    }).

    factory('mdTwitterSvc', [
      '$resource', '$q',
      function($resource, $q) {
        var p = {};

        //#region === Resources ===
        var resource = $resource(settings.apiUrl + '/api/twitter/:action/:id/:screenName',
        { id: '@id', action: '@action', screenName: '@screenName' }, {
          'userTimeline': { method: 'GET', params: { action: 'user_timeline' }, isArray: true },
          'mentionsTimeline': { method: 'GET', params: { action: 'mentions_timeline' }, isArray: true },
        });


        //#endregion === Resource ===

        //#region === Search ===

        p.userTimeline = function(screenName) {
          var deferred = $q.defer();

          if (angular.isUndefined(screenName)) {
            deferred.reject({
              error: 'Missing screen Name',
              error_description: 'Cannot retrieve results with missing or invalid screen name'
            });
          } else {

            resource.userTimeline({ screenName: screenName },
              function(items) {
                deferred.resolve(items);
              },
              function(response) {
                deferred.reject(response);
              }
            );
          }
          return deferred.promise;
        };

        p.mentionsTimeline = function () {
          var deferred = $q.defer();

          resource.mentionsTimeline({},
              function (items) {
                deferred.resolve(items);
              },
              function (response) {
                deferred.reject(response);
              }
            );
          return deferred.promise;
        };

        //#endregion === Search ===


        return p;
      }
    ]);
})(window, angular);