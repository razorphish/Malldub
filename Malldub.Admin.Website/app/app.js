'use strict';

var malldubAdminApp = angular.module('malldubAdminApp', ['ngResource', 'ui.router', 'ngRoute', 'ngCookies', 'ui.validate', 'ui.bootstrap', 'kendo.directives', 'ui.mask'])
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

      var access = routingConfig.accessLevels;

      //$Html5Provider
      $locationProvider.html5Mode(true).hashPrefix('!');

      // #region Router Provider

      $urlRouterProvider.otherwise("/login");

      $stateProvider
        .state('login',        { url: '/login',        templateUrl: '/app/security/seLoginCtrl.html',        controller: 'seLoginCtrl',        access: access.user})
        .state('authenticate', { url: '/authenticate', templateUrl: '/app/security/seAuthenticateCtrl.html', controller: 'seAuthenticateCtrl', access: access.anon })
        .state('register',     { url: '/register',     templateUrl: '/app/security/seRegisterCtrl.html',     controller: 'seRegisterCtrl',     access: access.anon })

        .state('admin',              { url: '/admin',                 templateUrl: '/app/home/hmHomeContainer.html',        controller: 'hmHomeContainer',  access: access.user })
        .state('admin.home',         { url: '/home',                  templateUrl: '/app/home/hmHomeCtrl.html',             controller: 'hmHomeCtrl',       access: access.user })
        .state('admin.fundoloFunds', { url: '/fundolo/funds',         templateUrl: '/app/fundolo/funds/foloFundsCtrl.html', controller: 'foloFundsCtrl',    access: access.user })
        .state('admin.fundoloFund',  { url: '/fundolo/funds/:fundId', templateUrl: '/app/fundolo/funds/foloFundCtrl.html',  controller: 'foloFundCtrl',     access: access.user })

        .state('admin.globalNotes', { url: '/global/notes', templateUrl: '/app/global/glNoteCtrl.html', controller: 'glNoteCtrl', access: access.user })
        .state('admin.globalNotesByApp', { url: '/global/notes/:applicationId', templateUrl: '/app/global/glNoteCtrl.html', controller: 'glNoteCtrl', access: access.user })

        .state('admin.users', { url: '/users',         templateUrl: '/app/user/usrUsersCtrl.html', controller: 'usrUsersCtrl', access: access.user })
        .state('admin.user',  { url: '/users/:userId', templateUrl: '/app/user/usrUserCtrl.html',  controller: 'usrUserCtrl',  access: access.user })

        .state('admin.404', { url: '/p', templateUrl: '/app/common/hp404Ctrl.html', controller: 'hp404Ctrl', access: access.user });

      // #endregion

      var interceptor = [
        '$location', '$q', function ($location, $q) {
          var p = {};

          p.response = function (response) {
            return response;
          };

          p.responseError = function (response) {
            if (response.status === 401) {
              $location.path('/login');
              return $q.reject(response);
            } else {
              return $q.reject(response);
            }
          };

          return p;
        }
      ];

      $httpProvider.interceptors.push(interceptor);

    }
  ]).run([
    '$rootScope', '$location', 'seAuthSvc', function ($rootScope, $location, seAuthSvc) {

      $rootScope.$on("$stateChangeStart", function (event, next, current) {
        $rootScope.error = null;
        if (!seAuthSvc.authorize(next.access)) {
          if (seAuthSvc.isLoggedIn()) {
            $location.path('/admin/home');
          } else {
            $location.path('/login');
          }
        }
      });
    }
  ])
    .controller('mdaMainCtrl', ['$scope',
    function fdMainCtrl($scope) {
      $scope.pageTitle = "Free online Fund Raising made easy";
      $scope.pageDescription = "FREE online fund raising San Diego, cancer fundraising, arthritis fundraising";
      $scope.pageMetaKeywords = "FundingMiracles, free online fundraising, donation website, accept free donations, raise money for cancer patients, arthritis donations, raise money for arthritis, help with medical bills, personal fundraising site, free fundraising, heart transplant fundraising, miracle fundraising, cancer fundraising, arthritis fundraising";
      // We will create an seo variable on the scope and decide which fields we want to populate
      $scope.seo = {
        pageTitle: '',
        pageDescription: ''
      };

      $scope.og = {
        title: '',
        description: '',
        url: '',
        image: '',
        video: '',
        videoWidth: '',
        videoHeight: '',
        videoType: '',
        card: '',
        type: 'website'
      };

    }])
  .constant("BASE_URL", "http://local.admin.fundingmiracles.com")
  .constant("BASE_API_URL", "http://api.local.fundingmiracles.com")
  .constant("wePayConst", {
    authUrl: 'https://stage.wepay.com/v2/oauth2/authorize',
    tokenUrl: 'https://stage.wepayapi.com/v2/oauth2/token',
    client_id: '181045', //staging,
    redirect_uri: 'http://local.fundingmiracles.com/wepay/authenticate',
    scope: 'manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments',
    callback_uri: 'http://local.fundingmiracles.com/wepay/ipn'
  });

//.constant("BASE_URL", "https://admin.fundingmiracles.com") 
//.constant("BASE_API_URL", "https://api.fundingmiracles.com")
//.constant("wePayConst", {
//  authUrl: 'https://www.wepay.com/v2/oauth2/authorize',
//  tokenUrl: 'https://www.wepayapi.com/v2/oauth2/token',
//  client_id: '135196', //production,
//  redirect_uri: 'https://www.fundingmiracles.com/wepay/authenticate',
//  scope: 'manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments',
//  callback_uri: 'https://www.fundingmiracles.com/wepay/ipn'
//});
