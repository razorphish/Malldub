///#source 1 1 /app/security/routing-config.js
(function (exports) {

  var config = {
    /* List all the roles you wish to use in the app
    * You have a max of 31 before the bit shift pushes the accompanying integer out of
    * the memory footprint for an integer
    */
    roles: [
      'public',
      'user',
      'admin'],

    /*
    Build out all the access levels you want referencing the roles listed above
    You can use the "*" symbol to represent access to all roles
     */
    accessLevels: {
      'public': "*",
      'anon': ['public'],
      'user': ['user', 'admin'],
      'admin': ['admin']
    }
  };

  exports.userRoles = buildRoles(config.roles);
  exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

  /*
      Method to build a distinct bit mask for each role
      It starts off with "1" and shifts the bit to the left for each element in the
      roles array parameter
   */

  function buildRoles(roles) {

    var bitMask = "01";
    var userRoles = {};

    for (var role in roles) {
      var intCode = parseInt(bitMask, 2);
      userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
      };
      bitMask = (intCode << 1).toString(2);
    }

    return userRoles;
  }

  /*
  This method builds access level bit masks based on the accessLevelDeclaration parameter which must
  contain an array for each access level containing the allowed user roles.
   */
  function buildAccessLevels(accessLevelDeclarations, userRoles) {

    var accessLevels = {};
    for (var level in accessLevelDeclarations) {

      if (typeof accessLevelDeclarations[level] == 'string') {
        if (accessLevelDeclarations[level] == '*') {

          var resultBitMask = '';

          for (var role in userRoles) {
            resultBitMask += "1";
          }
          //accessLevels[level] = parseInt(resultBitMask, 2);
          accessLevels[level] = {
            bitMask: parseInt(resultBitMask, 2),
            title: accessLevelDeclarations[level]
          };
        } else {
          if (window.console) {
            console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
          }
        }

      }
      else {

        var resultBitMask = 0;
        for (var role in accessLevelDeclarations[level]) {
          if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
          else {
            if (window.console) {
              console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
            }
          }
        }
        accessLevels[level] = {
          bitMask: resultBitMask,
          title: accessLevelDeclarations[level][role]
        };
      }
    }

    return accessLevels;
  }

})(typeof exports === 'undefined' ? this['routingConfig'] = {} : exports);
///#source 1 1 /app/app.js
'use strict';
var fundoloApp = angular.module('fundoloApp', [
    'ngResource', 'ui.router', 'ngRoute', 'ngCookies', 'ui.validate', 'ngSanitize',
    'ui.bootstrap', 'ngGrid', 'ui.mask', 'facebook', 'angular.css.injector', 'md.mallDub.twitter', 'ngFileUpload', 'ui.sortable',
    'angulartics.google.analytics',
    function() {}
  ])
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'FacebookProvider', 'cssInjectorProvider', 'mdMallDubTwitterProvider', 'appUrl',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, FacebookProvider, cssInjectorProvider, mdMallDubTwitterProvider, appUrl) {

      var access = routingConfig.accessLevels;
      //$Html5Provider
      $locationProvider.html5Mode(true).hashPrefix('!');

      $urlRouterProvider.otherwise("/p/404");

      $urlRouterProvider.when('', '');
      $urlRouterProvider.when('/', '');

      $stateProvider
        .state('home', { url: '/', abstract: true, templateUrl: '/app/home/hmHomeContainer.min.html', controller: 'hmHomeContainer', access: access.user })
        .state('home.index', { url: '', templateUrl: '/app/home/hmHomeCtrl.min.html', controller: 'hmHomeCtrl', access: access.public })
        .state('home.login', { url: 'login', templateUrl: '/app/security/seLoginCtrl.min.html', controller: 'seLoginCtrl', access: access.anon })
        .state('home.register', { url: 'register', templateUrl: '/app/security/seRegisterCtrl.min.html', controller: 'seRegisterCtrl', access: access.anon })
        .state('home.resePassword', { url: 'resetPassword', templateUrl: '/app/security/seResetPasswordCtrl.min.html', controller: 'seResetPasswordCtrl', access: access.anon })
        .state('home.registerExtrenal', { url: 'registerExternal?email&firstName&lastName', templateUrl: '/app/security/seRegisterExternalCtrl.min.html', controller: 'seRegisterExternalCtrl', access: access.public })
        .state('home.authenticate', { url: 'authenticate?z', templateUrl: '/app/security/seAuthenticateCtrl.min.html', controller: 'seAuthenticateCtrl', access: access.anon })
        .state('home.connectExternal', { url: 'connectExternal?email', templateUrl: '/app/security/seConnectExternalCtrl.min.html', controller: 'seConnectExternalCtrl', access: access.anon })
        .state('home.permalink', { url: ':permalink', templateUrl: '/app/fund/fdCtrl.min.html', controller: 'fdCtrl', access: access.public, color: true })
        .state('home.aboutus', { url: 'p/aboutus', templateUrl: '/app/pages/pgAboutUsCtrl.min.html', controller: 'pgAboutUsCtrl', access: access.public })
        .state('home.learn', { url: 'p/learn', templateUrl: '/app/pages/pgLearnCtrl.min.html', controller: 'pgLearnCtrl', access: access.public })
        .state('home.terms', { url: 'p/terms', templateUrl: '/app/pages/pgTermsCtrl.min.html', controller: 'pgTermsCtrl', access: access.public })
        .state('home.privacy', { url: 'p/privacy', templateUrl: '/app/pages/pgPrivacyCtrl.min.html', controller: 'pgPrivacyCtrl', access: access.public })
        .state('home.howitworks', { url: 'p/howitworks', templateUrl: '/app/pages/pgHowItWorksCtrl.min.html', controller: 'pgHowItWorksCtrl', access: access.public })
        .state('home.fees', { url: 'p/fees', templateUrl: '/app/pages/pgFeesCtrl.min.html', controller: 'pgFeesCtrl', access: access.public })
        .state('home.faq', { url: 'p/faq', templateUrl: '/app/pages/pgFaqCtrl.min.html', controller: 'pgFaqCtrl', access: access.public })
        .state('home.whymiracles', { url: 'p/whymiracles', templateUrl: '/app/pages/pgWhyMiraclesCtrl.min.html', controller: 'pgWhyMiraclesCtrl', access: access.public })
        .state('home.features', { url: 'p/features', templateUrl: '/app/pages/pgFeaturesCtrl.min.html', controller: 'pgFeaturesCtrl', access: access.public })
        .state('home.cancerinfo', { url: 'p/cancerinfo', templateUrl: '/app/pages/pgCancerInfo.min.html', controller: 'pgCancerInfoCtrl', access: access.public })
        .state('home.crowd-funding', { url: 'p/crowd-funding', templateUrl: '/app/pages/pgCrowdFundCtrl.min.html', controller: 'pgCrowdFundCtrl', access: access.public })
        .state('home.tips', { url: 'p/tips', templateUrl: '/app/pages/pgTipsCtrl.min.html', controller: 'pgTipsCtrl', access: access.public })

        /*
        .state('home.basics', { url: 'account/basics', templateUrl: '/app/account/acBasicsCtrl.min.html', controller: 'acBasicsCtrl', access: access.user })
        .state('home.profile', { url: 'account/profile', templateUrl: '/app/account/acProfileCtrl.min.html', controller: 'acProfileCtrl', access: access.user })
        .state('home.withdraw', { url: 'account/withdraw', templateUrl: '/app/account/acWithdrawCtrl.min.html', controller: 'acWithdrawCtrl', access: access.user })
        .state('home.password', { url: 'account/password', templateUrl: '/app/account/acPasswordCtrl.min.html', controller: 'acPasswordCtrl', access: access.user })
        .state('home.donations', { url: 'account/donations', templateUrl: '/app/account/acDonationsCtrl.min.html', controller: 'acDonationsCtrl', access: access.user })
        .state('home.social', { url: 'account/social', templateUrl: '/app/account/acSocialCtrl.min.html', controller: 'acSocialCtrl', access: access.user })
        .state('home.notifications', { url: 'account/notifications', templateUrl: '/app/account/acNotificationsCtrl.min.html', controller: 'acNotificationsCtrl', access: access.user })
        .state('home.status', { url: 'account/status', templateUrl: '/app/account/acStatusCtrl.min.html', controller: 'acStatusCtrl', access: access.user })
        .state('home.close', { url: 'account/close', templateUrl: '/app/account/acCloseCtrl.min.html', controller: 'acCloseCtrl', access: access.user })
        */
        .state('home.account', { url: 'account', templateUrl: '/app/account/foAccountCtrl.min.html', controller: 'foAccountCtrl', access: access.user })
        .state('home.account.overview', { url: '/overview', templateUrl: '/app/account/foAccountOverviewCtrl.min.html', controller: 'foAccountOverviewCtrl', access: access.user })
        .state('home.account.profile', { url: '/profile', templateUrl: '/app/account/foAccountProfileCtrl.min.html', controller: 'foAccountProfileCtrl', access: access.user })
        .state('home.account.withdraw', { url: '/withdraw', templateUrl: '/app/account/foAccountWithdrawCtrl.min.html', controller: 'foAccountWithdrawCtrl', access: access.user })
        .state('home.account.password', { url: '/password', templateUrl: '/app/account/foAccountPasswordCtrl.min.html', controller: 'foAccountPasswordCtrl', access: access.user })
        .state('home.account.donations', { url: '/donations', templateUrl: '/app/account/foAccountDonationsCtrl.min.html', controller: 'foAccountDonationsCtrl', access: access.user })
        .state('home.account.notifications', { url: '/notifications', templateUrl: '/app/account/foAccountNotificationsCtrl.min.html', controller: 'foAccountNotificationsCtrl', access: access.user })
        .state('home.account.status', { url: '/status', templateUrl: '/app/account/foAccountStatusCtrl.min.html', controller: 'foAccountStatusCtrl', access: access.user })
        .state('home.wepayauthenticate', { url: 'wepay/authenticate?code', templateUrl: '/app/paymentgateway/wepay/pgWePayAuthenticateCtrl.min.html', controller: 'pgWePayAuthenticateCtrl', access: access.user })
        .state('home.search', { url: 'fund/search', templateUrl: '/app/fund/search/fdSearchCtrl.min.html', controller: 'fdSearchCtrl', access: access.public })
        .state('home.searchAdvanced', { url: 'fund/search/:category/:searchText', templateUrl: '/app/fund/search/fdSearchCtrl.min.html', controller: 'fdSearchCtrl', access: access.public })

        //.state('home.dashboard', { url: 'fund/dashboard/:fundId', templateUrl: '/app/fund/dashboard/fdDashboardCtrl.min.html', controller: 'fdDashboardCtrl', access: access.user, color: true })
        //.state('home.dashboardupdates', { url: 'fund/dashboard/updates/:fundId', templateUrl: '/app/fund/dashboard/updates/fdDashboardUpdatesCtrl.min.html', controller: 'fdDashboardUpdatesCtrl', access: access.user, color: true })
        //.state('home.dashboardonations', { url: 'fund/dashboard/donations/:fundId', templateUrl: '/app/fund/dashboard/donations/fdDashboardDonationsCtrl.min.html', controller: 'fdDashboardDonationsCtrl', access: access.user, color: true })
        //.state('home.dashboardsharing', { url: 'fund/dashboard/sharing/:fundId', templateUrl: '/app/fund/dashboard/sharing/fdDashboardSharingCtrl.min.html', controller: 'fdDashboardSharingCtrl', access: access.user, color: true })
        //.state('home.dashboardcomments', { url: 'fund/dashboard/comments/:fundId', templateUrl: '/app/fund/dashboard/comments/fdDashboardCommentsCtrl.min.html', controller: 'fdDashboardCommentsCtrl', access: access.user, color: true })
        //.state('home.dashboardwidgets', { url: 'fund/dashboard/widgets/:fundId', templateUrl: '/app/fund/dashboard/widgets/fdDashboardWidgetsCtrl.min.html', controller: 'fdDashboardWidgetsCtrl', access: access.user, color: true })
        //.state('home.dashboardpermalink', { url: 'fund/dashboard/permalink/:fundId', templateUrl: '/app/templates/controllers/fund-dashboard-permalink-controller.min.html', controller: 'FundDashboardPermalinkController', access: access.user, color: true })
        //.state('home.dashboardprint', { url: 'fund/dashboard/print/:fundId', templateUrl: '/app/fund/dashboard/print/fdDashboardPrintCtrl.min.html', controller: 'fdDashboardPrintCtrl', access: access.user, color: true })
        //.state('home.dashboardnotifications', { url: 'fund/dashboard/notifications/:fundId', templateUrl: '/app/fund/dashboard/notifications/fdDashboardNotificationsCtrl.min.html', controller: 'fdDashboardNotificationsCtrl', access: access.user, color: true })
        //.state('home.dashboardsupporters', { url: 'fund/dashboard/supporters/:fundId', templateUrl: '/app/fund/dashboard/supporters/fdDashboardSupportersCtrl.min.html', controller: 'fdDashboardSupportersCtrl', access: access.user, color: true })
        //.state('home.dashboardsettings', { url: 'fund/dashboard/settings/:fundId', templateUrl: '/app/fund/dashboard/settings/fdDashboardSettingsCtrl.min.html', controller: 'fdDashboardSettingsCtrl', access: access.user, color: true })
        //.state('home.dashboardteams', { url: 'fund/dashboard/teams/:fundId', templateUrl: '/app/fund/dashboard/teams/fdDashboardTeamsCtrl.min.html', controller: 'fdDashboardTeamsCtrl', access: access.user, color: true })
        .state('home.controlpanel', { url: 'fund/controlpanel/:fundId', templateUrl: '/app/fund/controlpanel/fdControlPanelCtrl.min.html', controller: 'fdControlPanelCtrl', access: access.user, color: true })
        .state('home.controlPanelList', { url: 'controlpanel/fund/list', templateUrl: '/app/fund/controlpanel/fdControlPanelListCtrl.min.html', controller: 'fdControlPanelListCtrl', access: access.user })
        .state('home.controlpanel.overview', { url: '/overview', templateUrl: '/app/fund/controlpanel/fdControlPanelOverviewCtrl.min.html', controller: 'fdControlPanelOverviewCtrl', access: access.user, color: true })
        .state('home.controlpanel.profile', { url: '/profile', templateUrl: '/app/fund/controlpanel/fdControlPanelProfileCtrl.min.html', controller: 'fdControlPanelProfileCtrl', access: access.user, color: true })
        .state('home.controlpanel.supporters', { url: '/supporters', templateUrl: '/app/fund/controlpanel/fdControlPanelSupportersCtrl.min.html', controller: 'fdControlPanelSupportersCtrl', access: access.user, color: true })
        .state('home.controlpanel.teams', { url: '/teams', templateUrl: '/app/fund/controlpanel/fdControlPanelTeamsCtrl.min.html', controller: 'fdControlPanelTeamsCtrl', access: access.user, color: true })
        .state('home.controlpanel.teammember', { url: '/teammember', templateUrl: '/app/fund/controlpanel/fdControlPanelTeamMemberCtrl.min.html', controller: 'fdControlPanelTeamMemberCtrl', access: access.user, color: true })
        .state('home.controlpanel.comments', { url: '/comments', templateUrl: '/app/fund/controlpanel/fdControlPanelCommentsCtrl.min.html', controller: 'fdControlPanelCommentsCtrl', access: access.user, color: true })
        .state('home.controlpanel.history', { url: '/history', templateUrl: '/app/fund/controlpanel/fdControlPanelHistoryCtrl.min.html', controller: 'fdControlPanelHistoryCtrl', access: access.user, color: true })
        .state('home.controlpanel.settings', { url: '/settings', templateUrl: '/app/fund/controlpanel/fdControlPanelSettingsCtrl.min.html', controller: 'fdControlPanelSettingsCtrl', access: access.user, color: true })
        .state('home.controlpanel.tools', { url: '/tools', templateUrl: '/app/fund/controlpanel/fdControlPanelToolsCtrl.min.html', controller: 'fdControlPanelToolsCtrl', access: access.user, color: true })
        .state('home.controlpanel.donations', { url: '/donations', templateUrl: '/app/fund/controlpanel/fdControlPanelDonationsCtrl.min.html', controller: 'fdControlPanelDonationsCtrl', access: access.user, color: true })
        .state('home.controlpanel.notifications', { url: '/notifications', templateUrl: '/app/fund/controlpanel/fdControlPanelNotificationsCtrl.min.html', controller: 'fdControlPanelNotificationsCtrl', access: access.user, color: true })
        .state('home.controlpanel.edit', { url: '/edit', templateUrl: '/app/fund/controlpanel/fdControlPanelEditCtrl.min.html', controller: 'fdControlPanelEditCtrl', access: access.user, color: true })

        .state('home.funddditWizard', { url: 'fund/edit/wizard', templateUrl: '/app/fund/dashboard/edit/fdDashboardEditWizardCtrl.min.html', controller: 'fdDashboardEditCtrl', access: access.user })
        .state('home.fundCreate', { url: 'fund/edit', templateUrl: '/app/fund/dashboard/edit/fdDashboardEditCtrl.min.html', controller: 'fdDashboardEditCtrl', access: access.user, color: true })
        .state('home.fundEdit', { url: 'fund/edit/:fundId', templateUrl: '/app/fund/dashboard/edit/fdDashboardEditCtrl.min.html', controller: 'fdDashboardEditCtrl', access: access.user })
        .state('home.fundSection', { url: 'fund/edit/:fundId/:section', templateUrl: '/app/fund/dashboard/edit/fdDashboardEditCtrl.min.html', controller: 'fdDashboardEditCtrl', access: access.user })
        .state('home.fundDonate', { url: 'fund/donate/:fundId?a', templateUrl: '/app/fund/donate/fdDonateCtrl.min.html', controller: 'fdDonateCtrl', access: access.public, color: true })
        .state('home.fundThankYou', { url: 'fund/donate/thankyou/:fundId', templateUrl: '/app/fund/donate/fdDonateThankyouCtrl.min.html', controller: 'fdDonateThankYouCtrl', access: access.public, color: true })
        .state('home.404', { url: 'p/404', templateUrl: '/app/common/hp404Ctrl.min.html', controller: 'hp404Ctrl', access: access.public })
        .state('fundCard', { url: '/fund/card/:permalink', templateUrl: '/app/embed/emFundCardCtrl.min.html', controller: 'emFundCardCtrl', access: access.public })
        .state('fundButton', { url: '/fund/button/:permalink', templateUrl: '/app/embed/emFundButtonCtrl.min.html', controller: 'emFundButtonCtrl', access: access.public })
        .state('fundWidget', { url: '/fund/widget/:permalink', templateUrl: '/app/embed/emFundWidgetCtrl.min.html', controller: 'emFundWidgetCtrl', access: access.public });

      var interceptor = [
        '$location', '$q', function($location, $q) {
          var p = {};

          p.response = function(response) {
            return response;
          };

          p.responseError = function(response) {
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

      ////Initialize Facebook api
      //facebookProvider.init({
      //  appId: '140316459192',
      //  channelUrl: '/app/facebook/channel.min.html'
      //});
      //Initialize Facebook api
      FacebookProvider.init('140316459192');

      cssInjectorProvider.setSinglePageMode(false);

      mdMallDubTwitterProvider.init({ apiUrl: appUrl.api });
    }
  ]).run([
    '$rootScope', '$location', '$window', 'seAuthSvc',
    function ($rootScope, $location, $window, seAuthSvc) {

      $rootScope.$on("$stateChangeStart", function(event, next, current) {
        $rootScope.error = null;
        if (!seAuthSvc.authorize(next.access)) {
          if (seAuthSvc.isLoggedIn()) {
            $location.path('/');
          } else {
            $location.path('/login');
          }
        }
        if (angular.isUndefined(next.color)) {
          $window.App.mallDub.setDomainColor('blue', 'light');
        }
      });
    }
  ])
  .controller('fdMainCtrl', [
    '$scope',
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

    }
  ])
  .controller('fdSearchMiniCtrl', [
    '$scope', '$location', '$window',
    function fdSearchMiniCtrl($scope, $location, $window) {
      $scope.searchText = '';
      $scope.goToSearch = function() {
        if (this.searchForm.$invalid) {
          return;
        }
        $window.App.mallDub.manualClickSearch();
        $location.path('/fund/search/all/' + $scope.searchText);
        $scope.searchText = '';
      };
    }
  ])
  .directive('fundSearch', [
    function() {
      var p = {};

      p.restrict = 'E';
      p.transclude = true;
      p.replace = true;
      p.template = '<li class="hidden-sm"><a class="search"><i class="fa fa-search search-btn"></i></a>' +
        '<div class="search-open"><div ng-form="searchForm" class="input-group">' +
        '<input type="text" class="form-control" placeholder="By title or user" ng-model="searchText" required />' +
        '<span class="input-group-btn"><button type="submit" class="btn-u" ng-click="goToSearch()">Go</button></span>' +
        '</div></li>';

      p.controller = function($scope, $location) {
        $scope.searchText = '';
        $scope.goToSearch = function() {
          if (this.searchForm.$invalid) {
            return;
          }

          $location.path('/fund/search/all/' + $scope.searchText);
        };
      };

      p.scope = {};
      return p;
    }
  ])
  .controller('fundSnippetController', [
      '$scope', '$timeout',
      function fundSnippetController($scope, $timeout) {

        $scope.defaultSortOrder = 'id';

        $scope.myInterval = 3000;

      }
    ]
  );
///#source 1 1 /app/constants/mdConfig.js

fundoloApp.constant("appUrl", {
    fundPrint: 'http://local.maras.co',
    shorty: 'local.fundingmiracles.com',
    base: 'http://local.fundingmiracles.com',
    api: 'http://api.local.fundingmiracles.com',
    facebook: {
      signInUrl: 'http://api.local.fundingmiracles.com/facebookauth.aspx?u='
    },
    defaultFundImage: '2154630987.png'
  })
  .constant("twitterConfiguration", {
    signInUrl: 'http://api.local.fundingmiracles.com/twitterauth.aspx?f=',
    tweetUrl: 'https://twitter.com/intent/tweet',
    countUrl: "http://cdn.api.twitter.com/1/urls/count.json"
  })
  .constant("wePayConst", {
    webUrl: 'https://stage.wepay.com',
    authUrl: 'https://stage.wepay.com/v2/oauth2/authorize',
    tokenUrl: 'https://stage.wepayapi.com/v2/oauth2/token',
    client_id: '181045', //staging,
    redirect_uri: 'http://local.fundingmiracles.com/wepay/authenticate',
    scope: 'manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments,manage_subscriptions',
    callback_uri: 'http://local.fundingmiracles.com/wepay/ipn',
    credit_card_number: '4003830171874018',
    endpoint: 'stage'
  }); 

///#source 1 1 /app/modules/mdCssInjector.js
/*
* angular-css-injector v1.0.4
* Written by Gabriel Delépine
* Special thanks to (github users) : @kleiinnn
* License: MIT
* https://github.com/Yappli/angular-css-injector/
*/
angular.module('angular.css.injector', [])
.provider('cssInjector', function () {
  'use strict';
  var singlePageMode = false;

  function CssInjector($compile, $rootScope) {
    // Variables
    var head = angular.element(document.getElementsByTagName('head')[0]),
        scope;

    // Capture the event `locationChangeStart` when the url change. If singlePageMode===TRUE, call the function `removeAll`
    $rootScope.$on('$locationChangeStart', function () {
      if (singlePageMode === true)
        removeAll();
    });

    // Always called by the functions `addStylesheet` and `removeAll` to initialize the variable `scope`
    var _initScope = function () {
      if (scope === undefined) {
        if ((scope = head.scope()) === undefined) // We initialise head's scope in a separated function because it is not defined at the time of the initialisation of the service.
          throw ("angular.css.injector error : Please initialize your app in the HTML tag and be sure your page has a HEAD tag.");
      }
    };

    // Used to add a CSS files in the head tag of the page
    var addStylesheet = function (href, prepend) {
      _initScope();

      if (scope.injectedStylesheets === undefined) {
        scope.injectedStylesheets = [];
        if (prepend === true) {
          head.prepend($compile("<link data-ng-repeat='stylesheet in injectedStylesheets' data-ng-href='{{stylesheet.href}}' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
        } else {
          head.append($compile("<link data-ng-repeat='stylesheet in injectedStylesheets' data-ng-href='{{stylesheet.href}}' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
        }
      }
      else {
        for (var i in scope.injectedStylesheets) {
          if (scope.injectedStylesheets[i].href == href) // An url can't be added more than once. I use a loop FOR, not the function indexOf to make the code IE < 9 compatible
            return;
        }
      }

      scope.injectedStylesheets.push({ href: href });
    };

    var remove = function (href) {
      _initScope();

      if (scope.injectedStylesheets) {
        for (var i = 0; i < scope.injectedStylesheets.length; i++) {
          if (scope.injectedStylesheets[i].href === href) {
            scope.injectedStylesheets.splice(i, 1);
            return;
          }
        }
      }
    };

    // Used to remove all of the CSS files added with the function `addStylesheet`
    var removeAll = function () {
      _initScope();

      if (scope.injectedStylesheets !== undefined)
        scope.injectedStylesheets = []; // Make it empty
    };

    return {
      add: addStylesheet,
      remove: remove,
      removeAll: removeAll
    };
  }

  this.$get = ['$compile', '$rootScope', function ($compile, $rootScope) {
    return new CssInjector($compile, $rootScope);
  }];

  this.setSinglePageMode = function (mode) {
    singlePageMode = mode;
    return this;
  }
});
///#source 1 1 /app/modules/mdMalldubTwitter.js
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
///#source 1 1 /app/services/mdGoogleSvc.js
fundoloApp.factory('mdGoogleSvc', ['$resource', '$q', '$filter', '$compile', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $filter, $compile, seAuthSvc, appUrl) {
    'use strict';
    var p = {};

    //#region === Resources ===

    var fundoloResource = $resource(appUrl.api + '/api/google/:app/:action/:pageId/:startDate/:endDate',
    {
      id: '@id',
      app: '@app',
      action: '@action',
      startDate: '@startDate',
      itemsPerPageendDate: '@endDate'
    }, {
      'query': {
        method: 'GET',
        params: { app: 'fundolo', action: 'page' },
        headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true
      }
      });



    //#endregion === Resource ===


    //#region === Page Views ===

    p.pageView = function (permalink, startDate, endDate) {
      var deferred = $q.defer();
      if (angular.isUndefined(permalink) || permalink.length === 0 ) {
        deferred.reject({
          error: 'Permalink is invalid',
          error_description: 'Invalid permalink'
        });
      } else {

        fundoloResource.query({ pageId: permalink, startDate: startDate, endDate: endDate},
          function (items) {
            deferred.resolve(items);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
    //#endregion


    return p;
  }]);
///#source 1 1 /app/pages/pgCtrl.js
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
///#source 1 1 /app/home/hmHomeContainer.js
fundoloApp.controller('hmHomeContainer', ['$scope', '$log',
function hmHomeContainer($scope, $log) {
  'use strict';
  $scope.getCurrentYear = function() {
    return moment().format('YYYY');
  }
}]);;
///#source 1 1 /app/home/hmHomeCtrl.js
fundoloApp.controller('hmHomeCtrl',['$scope', '$log', 'fdSvc',
  function hmHomeCtrl($scope, $log, fdSvc) {
    'use strict';

    //#region === Initialize ===

    //#endregion

  }])
///#source 1 1 /app/home/hm-header-drctv.js
fundoloApp.directive('hmHeaderDrctv', [
  '$window', 'seAuthSvc', 'pgWePaySvc',
  function ($window, seAuthSvc, pgWePaySvc) {
    'use strict';
    var p = {};

    p.transclude   = true;
    p.replace      = true;
    p.restrict     = 'E';
    p.templateUrl  = '/app/home/hm-header-drctv.min.html';

    p.link = function($scope, element, attribrutes, controller) {

      //#region === Public Methods ===

      $window.App.init();
      $window.StyleSwitcher.initStyleSwitcher();
      $window.App.mallDub.initToastr();

      $scope.hasWithdrawal            = false;
      $scope.hasConditionalWithdrawal = false;
      $scope.user                     = seAuthSvc.user;
      $scope.userRoles                = seAuthSvc.userRoles;
      $scope.accessLevels             = seAuthSvc.accessLevels;

      $scope.logout = function () {
        seAuthSvc.logout().then(
          function (response) {
            toastr.success('You have been successfully logged out');
            //TODO: HACK FOR NOW Until Service Singleton is figured out
            location.reload();
          },
          function (response) {
            toastr.error('Unable to logout');
          });
      };

      //#endregion === /Public Methods ===


    }



    return p;
  }])
///#source 1 1 /app/home/hm-header5-drctv.js
fundoloApp.directive('hmHeader5Drctv', [
  function () {
    'use strict';
    var p = {};

    p.transclude   = true;
    p.replace      = true;
    p.restrict     = 'E';
    p.templateUrl  = '/app/home/hm-header5-drctv.min.html';

    p.controller = [
      '$scope', 'seAuthSvc', 
      function ($scope, seAuthSvc) {

        //#region === Public Methods ===

        $scope.user         = seAuthSvc.user;
        $scope.userRoles    = seAuthSvc.userRoles;
        $scope.accessLevels = seAuthSvc.accessLevels;

        $scope.logout = function () {
          seAuthSvc.logout().then(
            function (response) {
              toastr.success('You have been successfully logged out');
              //TODO: HACK FOR NOW Until Service Singleton is figured out
              location.reload();
            },
            function (response) {
              toastr.error('Unable to logout');
            });
        };
        //#endregion === /Public Methods ===
      }
    ];


    return p;
  }])
///#source 1 1 /app/home/hm-slider-layer-drctv.js
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
///#source 1 1 /app/home/hm-slider-v2-drctv.js
fundoloApp.directive('hmSliderV2Drctv', [
  function() {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/home/hm-slider-v2-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      //$scope.$watch('myTwoWayBind', function (newValue, oldValue) {
      //  if (angular.isDefined(newValue)) {
      //    // $scope.isLoading = false;
      //  }
      //});
    }

    p.controller = [
      '$scope', '$location',
      function ($scope, $location) {

        //#region === Initialize ===

        RevolutionSlider.initRSfullWidth();

        //#endregion

        //#region === Private Methods ===

        //#endregion

        //#region === Public Methods ===

        $scope.goToEdit = function() {
          $location.path('/controlpanel/fund/list');
        }

        $scope.search = function() {
          $location.path('/fund/search');
        }

        $scope.learn = function() {
          $location.path('/p/learn');
        }

        $scope.join = function () {
          $location.path('/controlpanel/fund/list');
        }

        //#endregion
      }
    ];

    return p;

  }
]);
///#source 1 1 /app/security/seLoginCtrl.js
fundoloApp.controller('seLoginCtrl',
['$scope', '$location', '$log', 'seAuthSvc',
  function seLoginCtrl($scope, $location, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isLoggingIn            = false;
    $scope.user                   = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };
    $scope.persistent = false;

    $scope.login = function(user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function(response) {
          $location.path('/controlpanel/fund/list');
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };

  }
]);
///#source 1 1 /app/security/seNavigationCtrl.js
fundoloApp.controller('seNavigationCtrl',
['$scope', '$location', 'seAuthSvc',
  function ($scope, $location, seAuthSvc) {
    'use strict';
    $scope.user = seAuthSvc.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.accessLevels = seAuthSvc.accessLevels;

    $scope.logout = function() {
      seAuthSvc.logout().then(
        function(response) {
          toastr.success('You have been successfully logged out');
          //TODO: HACK FOR NOW Until Service Singleton is figured out
          location.reload();
        },
        function(response) {
          toastr.error('Unable to logout');
        });
    };
  }
]);
///#source 1 1 /app/security/seRegisterCtrl.js
fundoloApp.controller('seRegisterCtrl',
['$scope', '$location', '$log', 'seAuthSvc', 'mdCoreDataSvc',
  function seRegisterCtrl($scope, $location, $log, seAuthSvc, mdCoreDataSvc) {

    //#region ===Initialise===
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isSaving               = false;
    $scope.readTerms              = true;
    $scope.isLoadingGeo           = true;
    $scope.user = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };

    mdCoreDataSvc.getGeoData2().then(
      function(data) {
        $scope.user.geo = data;
        $scope.isLoadingGeo = false;
      },
      function(response) {
        $log.error(response);
        $scope.isLoadingGeo = false;
      });

    //#endregion 

    //#region Scope methods
    $scope.register = function(user) {
      $scope.isSaving = true;
      if ($scope.registerForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.register(user).then(
          function(response) {
            $scope.login(user);
          },
          function(response) {
            toastr.error(response.error_description);
            $log.error(response);
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
        toastr.error('Oops!  Looks like there are some issues');
      }
    };

    $scope.login = function(user) {
      seAuthSvc.login(user).then(
        function(response) {
          $location.path('/controlpanel/fund/list');
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isSaving = false;
        });
    };
    //#endregion

  }
]);
///#source 1 1 /app/security/seConnectExternalCtrl.js
fundoloApp.controller('seConnectExternalCtrl', [
  '$scope', '$location', '$stateParams', '$log', 'seAuthSvc',
  function ($scope, $location, $stateParams, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.role                   = seAuthSvc.userRoles.user;
    $scope.userRoles              = seAuthSvc.userRoles;
    $scope.isLoggingIn            = false;
    $scope.user                   = {
      statusId: 'Active',
      role: $scope.role,
      userName: $stateParams.email
    };
    $scope.persistent = false;

    $scope.login = function(user, persistent) {
      $scope.isLoggingIn = true;
      seAuthSvc.login(user, persistent).then(
        function(response) {
          addExternalLogin();
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isLoggingIn = false;
        });
    };

    function addExternalLogin() {
      seAuthSvc.addExternalLogin().then(
        function(response) {
          $location.path('/controlpanel/fund/list').hash(null);
        },
        function(response) {
          toastr.error(response.error_description);
          $log.error(response);
          $scope.isLoggingIn = false;

        });
    }
  }
]);
///#source 1 1 /app/security/seResetPasswordCtrl.js
fundoloApp.controller('seResetPasswordCtrl',
  ['$scope', '$location', '$log', 'seAuthSvc',
  function ($scope, $location, $log, seAuthSvc) {
    'use strict';
    $scope.showValidationMessages = false;
    $scope.isResetting = false;

    $scope.resetPassword = function () {
      if ($scope.resetPasswordForm.$valid) {
        $scope.isResetting = true;
        seAuthSvc.resetPassword({
          email: $scope.emailAddress
        }).then(function() {
          toastr.success('Found you!  We sent an email to you with what to do next');
          $scope.emailAddress = '';
          $location.path('\login');
          $scope.isResetting = false;
        }, function(response) {
          $log.error(response);
          toastr.error('Whoa! We tried but couldn\'t find you in our system.  Try it again!');
          $scope.isResetting = false;
        });
        $scope.isResetting = false;
      } else {
        $scope.showValidationMessages = true;
        $scope.isResetting = false;
        toastr.error('Oops!  Looks like some things are missing');
      }
    };

  }]);
///#source 1 1 /app/security/seRegisterExternalCtrl.js
fundoloApp.controller('seRegisterExternalCtrl',
['$scope', '$location', '$stateParams', '$log', 'seAuthSvc', 'mdCoreDataSvc',
  function ($scope, $location, $stateParams, $log, seAuthSvc, mdCoreDataSvc) {
    //#region Initialise
    'use strict';
    $scope.user = {
      email: $stateParams.email,
      firstName: $stateParams.firstName,
      lastName: $stateParams.lastName,
      confirmEmail: $stateParams.email,
      token: $stateParams.token,
      statusId: 'Active'
    };

    $scope.showValidationMessages = false;
    $scope.role = seAuthSvc.userRoles.user;
    $scope.userRoles = seAuthSvc.userRoles;
    $scope.isSaving = false;

    mdCoreDataSvc.getGeoData2().then(
      function(data) {
        $scope.user.geo = data;
        $scope.isLoadingGeo = false;
      },
      function(response) {
        toastr.error('Unable to get Geo data.  Please see administrator');
        $log.error(response);
        $scope.isLoadingGeo = false;
      });

    //#endregion

    // #region Scope Methods

    $scope.register = function(user) {
      $scope.isSaving = true;
      if ($scope.registerForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.registerExternal(user).then(
          function(response) {
            $scope.login($scope.user);
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error(response.error_description);
            $log.error(response);
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
        toastr.error('Oops!  Looks like there are some issues');
      }
    };

    $scope.login = function(user) {
      seAuthSvc.login(user).then(
        function(response) {
          $location.path('/controlpanel/fund/list').hash(null);
        },
        function(response) {
          toastr.error('Error authenticating user.  Please try again.');
          $scope.isSaving = false;
        });
    };

    // #endregion

  }
]);
///#source 1 1 /app/security/seAuthenticateCtrl.js
fundoloApp.controller('seAuthenticateCtrl',
['$scope', '$location', '$stateParams', '$window', 'seAuthSvc',
  function ($scope, $location, $stateParams, $window, seAuthSvc) {

    //#region Initialize
    'use strict';
    $scope.popup            = false;
    $scope.isAuthenticating = true;
    $scope.role             = seAuthSvc.userRoles.user;
    $scope.user             = {
      statusId: 'Active',
      role: $scope.role,
      userName: ''
    };

    //#endregion

    if ($location.$$hash.length > 0) {
      seAuthSvc.handleAccessTokenRedirect('Facebook', $location.$$hash).then(
        function (token) {
          //Indicates authentication by popup; return token
          $scope.popup = angular.isDefined($stateParams.z) && $stateParams.z === '1';
          if ($scope.popup) {
            window.opener.$davidScope.says = token;
            window.opener.$davidScope.connect = false;
            window.opener.$davidScope.register = false;
          }

          seAuthSvc.getUserInfo().then(function (promisedUser) {
            if (promisedUser.hasRegisteredExternal) {
              if ($scope.popup) {
                window.opener.$davidScope.user = promisedUser;
                window.value = true;
              } else {
                seAuthSvc.setUserExternal(promisedUser, token, 'Facebook');
                $location.path('/controlpanel/fund/list').hash(null);
              }
            } else {
                if (promisedUser.hasRegistered) {
                  if ($scope.popup) {
                    window.opener.$davidScope.user = promisedUser;
                    window.opener.$davidScope.connect = true;
                    window.value = true;
                  } else {
                    $location.path('/connectExternal').search({
                      email: promisedUser.email
                    }).hash(null);
                  }
                } else { 
                  if ($scope.popup) {
                    window.opener.$davidScope.user = promisedUser;
                    window.opener.$davidScope.register = true;
                    window.value = true;
                  } else {
                    $location.path('/registerExternal').search({
                      email: promisedUser.email,
                      firstName: promisedUser.firstName,
                      lastName: promisedUser.lastName,
                      token: token.access_token
                    }).hash(null);
                  }
                }
              }
            },
            function() {

            });
          
        },
        function(response) {
          toastr.error('Provider response: ' + response.error);
          $scope.error = response.error;
          $scope.isAuthenticating = false;
        });
    } else {
      $location.path('/register');
    }

    $scope.goToRegistration = function() {
      $location.path('/register');
    };

    $scope.goToLogin = function() {
      $location.path('/login');
    };
  }
]);
///#source 1 1 /app/security/se-external-logins-drctv.js
fundoloApp.directive('seExternalLoginsDrctv', ['$stateParams', 'appUrl', 'seAuthSvc',
  function ($stateParams, appUrl, seAuthSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/security/se-external-logins-drctv.min.html';
    p.link        = function(scope, element, attrs, controller) {

    };

    p.controller = [
      '$scope', '$log', '$location',
      function($scope, $log, $location) {
        $scope.isLoading = true;
        $scope.isAuthenticating = false;
        $scope.returnUrl = appUrl.base + '/authenticate';
        seAuthSvc.externalLogins($scope.returnUrl, true).then(
          function(et) {
            angular.forEach(et, function(value, key) {
              value.title = value.name;
              value.icon = value.name;
              value.sortOrder = 1000;
              switch (value.name) {
                case 'Facebook':
                  value.sortOrder = 1;
                  break;
                case 'Google':
                  value.name = 'GooglePlus';
                  value.icon = 'Google-Plus';
                  break;
                case 'Microsoft':
                  value.icon = 'Windows';
                  break;
              }

            });
            $scope.externalLogins = et;
            $scope.isLoading = false;
          },
          function(response) {
            $log.error(response);
            toastr.error(response.error_description);
            $scope.isLoading = false;
          });

        $scope.externalLogin = function(name, url) {
          $scope.isAuthenticating = true;
          window.location = appUrl.api + url;
        };

      }
    ];

    p.scope = {
      title: '@'
    };

    return p;

  }]);
///#source 1 1 /app/security/se-login-popup-drctv.js
fundoloApp.directive('seLoginPopupDrctv', [
  'seAuthSvc', function (seAuthSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/security/se-login-popup-drctv.min.html';
    p.link        = function ($scope, element, attrs, controller) {

    };

    p.controller = ['$scope', '$location', '$uibModal', 'fdSvc',
      function ($scope, $location, $uibModal, fdSvc) {
        $scope.user = seAuthSvc.user;

        function setUser (token) {
          seAuthSvc.setUser($scope.user,
            token,
            true);

        }

        $scope.login = function() { 
          var modalInstance = $uibModal.open({
            templateUrl: '/app/security/se-login-popup-mdl.min.html',
            controller: loginModal,
            size: 'sm-med',
            resolve: {

            }
          });

          modalInstance.result.then(function (token) {
            $scope.user.token = token;
            setUser(token);
            $scope.loginCallback();
          }, function (reason) {
            switch (reason) {
              case 'resetPassword':
                $scope.registerCallback();
                $location.path('/resetPassword');
                break;
              case 'register':
                $scope.registerCallback();
                $location.path('/register');
                break;
              default:
                break;
            }
          });
        }
      }];

    p.scope = {
      linkTitle : '@',
      registerCallback: '&',
      loginCallback: '&'
    };

    return p;
  }
]);

var loginModal = ['$scope', '$uibModalInstance', '$location', '$window', '$interval','Facebook', 'appUrl','seAuthSvc', 'mdCoreDataSvc',
  function ($scope, $uibModalInstance, $location, $window, $interval, Facebook, appUrl, seAuthSvc, mdCoreDataSvc) {

    //#region                     === Initialize ===
    $scope.viewModal              = 1;
    $scope.isExternalRegister     = false;
    $scope.isLoggingIn            = false;
    $scope.isFacebookLoggingIn    = false;
    $scope.facebookLoading        = true;
    $scope.returnUrl              = appUrl.base + '/authenticate?z=1';
    $scope.facebookUrl            = 'NA';
    $window.$davidScope           = {};
    $scope.token                  = {};
    $scope.showValidationMessages = false;
    $scope.isExternalLogin        = false;
    $scope.showConnectMessage     = false;
    $scope.user                   = {
                                      statusId: 'Active',
                                      role: seAuthSvc.userRoles.user,
                                      userName: '',
                                      confirmEmail: '',
                                      token: {},
                                      isAuthenticated: false
                                    };

    (function() {
      seAuthSvc.singleExternalLogin('Facebook', $scope.returnUrl, true).then(
        function(response) {
          $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
          $scope.facebookLoading = false;
        }, function(response) {
          toastr.error('Unable to get Facebook login url.  Please refresh and try again');
        });

      mdCoreDataSvc.getGeoData2().then(
        function(data) {
          $scope.user.geo = data;
          $scope.isLoadingGeo = false;
        },
        function(response) {
          toastr.error('Unable to get Geo data.  Please see administrator');
          $log.error(response);
          $scope.isLoadingGeo = false;
        });

    })();

    //#endregion

    //#region Standard Login
    $scope.login = function (user, persistent) {
      $scope.isLoggingIn = true;
      if (this.popupLoginForm.$valid) {
        seAuthSvc.login(user, persistent).then(
          function (response) {
            var facebookToken = {
              access_token: response.access_token,
              expires_in: response.expires_in,
              state: response.state,
              token_type: response.token_type
            }

            if ($scope.isExternalLogin) {
              addExternalLogin($scope.close, facebookToken);
            } else{
              $uibModalInstance.close(facebookToken);
            }
          },
          function(response) {
            toastr.error('Error authenticating user.  Please try again.');
            $scope.isLoggingIn = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isLoggingIn = false;
      }
    };

    //#region Register External Process
    $scope.loginExternal = function (user) {
      seAuthSvc.login(user).then(
        function (response) {
          $scope.close({
            access_token: response.access_token,
            expires_in: response.expires_in,
            state: response.state,
            token_type: response.token_type
          });
        },
        function (response) {
          toastr.error('Error authenticating user.  Please try again.');
        });
    };

    $scope.registerExternal = function () {
      //$scope.isExternalRegister = true;
      //if (this.popupRegisterForm.$valid) {
        $scope.showValidationMessages = false;
        $scope.user.userName = $scope.user.email;
        seAuthSvc.registerExternal($scope.user).then(
          function (response) {
            $scope.loginExternal($scope.user);
            $scope.isExternalRegister = false;

          },
          function (response) {
            toastr.error(response.error_description);
            $scope.isExternalRegister = false;
          }
        );
      //} else {
      //  $scope.showValidationMessages = true;
      //  $scope.isExternalRegister = false;
      //  toastr.error('Oops!  Looks like there are some issues');
     // }
    }
    //#endregion

    //#endregion

    //#region Facebook
    $scope.facebookLogin = function() {
      $scope.isFacebookLoggingIn = true;

      var left = screen.width / 2 - 200;
      var top = screen.height / 2 - 250;
      var popup = $window.open(appUrl.facebook.signInUrl + $scope.facebookUrl, '', "top=" + top + ",left=" + left + ",width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0");
      var interval = 1000;

      // create an ever increasing interval to check a certain global value getting assigned in the popup
      var i = $interval(function () {
        interval += 250;
        try {

          if (popup.value) {
            angular.extend($scope.user, $davidScope.user);
            if ($davidScope.connect) {
              $scope.isExternalLogin = true;
              $scope.showConnectMessage = true;
            } else if ($davidScope.register) {
              //$scope.viewModal = 2;
              $scope.viewModal = 3;
              $scope.showValidationMessages = false;
              $scope.user.confirmEmail = $scope.user.email;
              $scope.user.token = $davidScope.says.access_token;
              $scope.user.password = 'fundingmiracles';
              $scope.user.disableWePay = true;
              seAuthSvc.setUserExternalToken({
                access_token: $davidScope.says.access_token,
                expires_in: $davidScope.says.expires_in,
                state: $davidScope.says.state,
                token_type: $davidScope.says.token_type
              });
              $scope.registerExternal();
            } else {
              $scope.token = {
                access_token: $davidScope.says.access_token,
                expires_in: $davidScope.says.expires_in,
                state: $davidScope.says.state,
                token_type: $davidScope.says.token_type
              };
              $uibModalInstance.close($scope.token);
            }
            $interval.cancel(i);
            popup.close();
          }
        } catch (e) {
          console.error(e);
        }
      }, interval);
      
      $scope.isFacebookLoggingIn = false;
    }
    //#endregion


    $scope.close = function (result) {
      $uibModalInstance.close(result);
    };

    $scope.dismiss = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //#region Private methods
    function addExternalLogin(callback, token) {
      seAuthSvc.addExternalLogin(token).then(
        function(response) {
          callback(token);
        },
        function(response) {
          toastr.error(response.error_description);
        });
    }

//#endregion
  }];
///#source 1 1 /app/security/se-login-popup-facebook-drctv.js
fundoloApp.directive('seLoginPopupFacebookDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'A';
  p.replace     = false;
  p.transclude  = false;
  p.link        = function ($scope, element, attributes, controller) {
    //Add a click
    element.bind('click', function () {
      $scope.bindFacebookClick();
    });
  }

  p.controller = ['$scope', '$window', '$interval', 'cssInjector', 'appUrl', 'fdSvc', 'seAuthSvc',
    function ($scope, $window, $interval, cssInjector, appUrl, fdSvc, seAuthSvc) {

      //#region === Initialize ===

      $window.$davidScope = {};
      $scope.user         = seAuthSvc.user;
      $scope.returnUrl    = appUrl.base + '/authenticate?z=1';
      $scope.user         = {
        statusId: 'Active',
        role: seAuthSvc.userRoles.user,
        userName: '',
        confirmEmail: '',
        token: {},
        isAuthenticated: false
      };

      //#endregion

      //#region === Public Methods ===

      $scope.bindFacebookClick = function () {
        initFacebook(bindFacebook);
      }

      //#endregion

      //#region === Private Methods ===

      function initFacebook(bindCallBack) {
        seAuthSvc.singleExternalLogin('Facebook', $scope.returnUrl, true).then(
          function(response) {
            $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
            $scope.facebookLoading = false;
            bindCallBack();
          }, function(response) {
            toastr.error('Unable to get Facebook login url.  Please refresh and try again');
          });
      }

      function bindFacebook() {
        seAuthSvc.facebookLogin($scope.user, $scope.facebookUrl).then(
          function () {
            $scope.facebookCallback();
          },
          function (response) {
            toastr.error('This is embarassing.  Please refresh and try again');
            $scope.isSupporting = false;
          });
      }
      //#endregion

    }];

  p.scope = {
    facebookCallback : '&'
  }

  return p;
}]);




///#source 1 1 /app/fund/fdsvc.js
fundoloApp.factory('fdSvc', ['$resource', '$q', '$filter', '$compile', 'appUrl', 
  function ($resource, $q, $filter, $compile, appUrl) {
    'use strict';
    var p = {}; 

    //#region === Resources ===
    var resource = $resource(appUrl.api + '/api/funddetails/:action/:id',
    { id: '@id', action: '@action' }, {
      'featured':     { method: 'GET', params: { action: 'featured' }, isArray: true },
      'completed':    { method: 'GET', params: { action: 'completed' }, isArray: true },
      'byPermalink':  { method: 'GET', params: { action: 'permalink' }, isArray: true },
      'basic':        { method: 'GET', params: { action: 'basic' }, isArray: true },
      'share':        { method: 'POST', params: { action: 'share' }, isArray: true }
    });

    var searchResource = $resource(appUrl.api + '/api/fund/search/:category/:pageNumber/:itemsPerPage/:searchText/:sortCriteria',
    {
      category: '@category',
      searchText: '@searchText',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      sortCriteria: '@sortCriteria',
    });

    var fundNoteResource = $resource(appUrl.api + '/api/fund/:fundId/notes/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save': { method: 'POST' }
    });

    var fundTeamResource = $resource(appUrl.api + '/api/fund/:fundId/teams/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section : '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'byFundId': { method: 'GET', isArray: true }
    });

    var fundCommentResource = $resource(appUrl.api + '/api/fund/:fundId/comments/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      section: '@section'
    }, {
      'byFundId': { method: 'GET',isArray: false },
      'like': { method: 'POST', params: { action: 'like' } }
    });

    var fundDonationResource = $resource(appUrl.api + '/api/fund/:fundId/donations/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      action: '@action'
    }, {
      'query' : {method : 'GET', isArray: false}
    });
  
    //#endregion === Resource ===
  
    //#region === Search ===
  
    p.search = function (category, searchText, pageNumber, itemsPerPage, sortCriteria) {
      var deferred = $q.defer();

      if (angular.isUndefined(category) || angular.isUndefined(searchText)) {
        deferred.reject({
          error: 'Missing search variables',
          error_description: 'Oops! Looks like we can\'t find your search criteria.  Lets try again'
        });
      } else {

        searchResource.get(
          {
            category: category,
            searchText: searchText,
            pageNumber: pageNumber,
            itemsPerPage: itemsPerPage,
            sortCriteria: sortCriteria
          },
          function (funds) {
            deferred.resolve(funds);
          },
          function (response) {
            deferred.reject(response);
          }
        );
      }
      return deferred.promise;
    };
  
    //#endregion === Search ===
  
    //#region === Fund ===

    p.copy = function(fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
        { id: '@id', action: '@action' }, {
          'copy': { method: 'POST', params: { action: 'copy' }, headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.copy({id : fundId},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.copy2 = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
        { id: '@id', action: '@action' }, {
          'copy2': { method: 'POST', params: { action: 'copy2' }, headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.copy2({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
  
    p.featured = function(numberToTake) {
      var deferred = $q.defer();

      if (!angular.isNumber(numberToTake)) {
        deferred.reject({
          error_description: 'Invalid number for featured query'
        });
      } else {
        resource.featured({ numberToTake: numberToTake },
          function(promisedFunds) {
            deferred.resolve(promisedFunds);
          },
          function(response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
  
    p.completed = function (numberToTake) {
      var deferred = $q.defer();

      if (!angular.isNumber(numberToTake)) {
        deferred.reject({
          error_description: 'Invalid number for completed query'
        });
      } else {
        resource.completed({ numberToTake: numberToTake },
          function (promisedFunds) {
            deferred.resolve(promisedFunds);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.basic = function(fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error: 'Fund Id',
          error_description: 'Invalid fund Id'
        });
      } else {
      
        resource.basic({ id: fundId },
          function(promisedFund) {
            deferred.resolve(promisedFund);
          },
          function(response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.byPermalink = function (permalink) {
      var deferred = $q.defer();
      if (angular.isUndefined(permalink) || permalink.length === 0) {
        deferred.resolve(mockFund);
      } else {

        resource.byPermalink({ id: permalink },
          function (fund) {
            deferred.resolve(fund);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.share = function (model) {
      var deferred = $q.defer();

      if (angular.isUndefined(model)) {
        deferred.resolve({
          error: 'Missing or invalid share model',
          error_description: 'The model for sharing is invalid.'
        });
      } else {

        resource.share(model,
          function (response) {
            deferred.resolve(response);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.support = function (support, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'support': { method: 'POST', params: { action: 'support' }, headers: { 'authorization': token} }
      });
      var deferred = $q.defer();

      resourceSecured.support(support,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supportByUser = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'support': { method: 'GET', params: { action: 'support' }, headers: { 'authorization': token } }
      });
      var deferred = $q.defer();

      resourceSecured.support({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supportsByUser = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'supports': { method: 'GET', params: { action: 'supports' }, headers: { 'authorization': token }, isArray: true }
      });
      var deferred = $q.defer();

      resourceSecured.supports({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getTotalDonation = function (donationList, useBeneAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sum = 0;
        for (var t = 0; t < donationList.length; t++) {
          if (useBeneAmount) {
            sum += donationList[t].beneficiaryAmount;
          } else {
            sum += donationList[t].amount;
          }
        }
        return sum.toFixed(2);
      } else {
        return 0;
      }
    };

    p.getTotalDonationDateFrom = function(donationList, fromDays, useBeneAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sum = 0;
        var momentFrom = moment().subtract(fromDays, 'days').format();
        for (var t = 0; t < donationList.length; t++) {
          if (moment(donationList[t].dateEntered).isAfter(momentFrom)) {
            if (useBeneAmount) {
              sum += donationList[t].beneficiaryAmount;
            } else {
              sum += donationList[t].amount;
            }
          }
        }
        return sum.toFixed(2);
      } else {
        return 0;
      }
    }

    p.getTotalDonationMonthToMonth = function (donationList, useBeneAmount, goalAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sumLastMonth   = 0;
        var sumMonthBefore = 0;
        var sum            = 0;
        var lastMonth      = moment().subtract(30, 'days').format();
        var monthBefore    = moment().subtract(60, 'days').format();
        for (var t = 0; t < donationList.length; t++) {


          if (moment(donationList[t].dateEntered).isAfter(lastMonth)) {
            if (useBeneAmount) {
              sumLastMonth += donationList[t].beneficiaryAmount;
            } else {
              sumLastMonth += donationList[t].amount;
            }
          }

          if (moment(donationList[t].dateEntered).isBetween(monthBefore, lastMonth)) {
            if (useBeneAmount) {
              sumMonthBefore += donationList[t].beneficiaryAmount;
            } else {
              sumMonthBefore += donationList[t].amount;
            }
          }

          if (useBeneAmount) {
            sum += donationList[t].beneficiaryAmount;
          } else {
            sum += donationList[t].amount;
          }
        }
        sum = sum === 0 ? goalAmount : sum;

        var totalBalance = sumMonthBefore === 0 ? sum : sumMonthBefore;
        var percentage = ((sumLastMonth - sumMonthBefore) / totalBalance) * 100;
        return percentage;
      } else {
        return 0;
      }
    }

    p.isMyFund = function (fundId, token) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.resolve('false');
      } else {
        var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
            { id: '@id', action: '@action'}, {
          'isMyFund': { method: 'GET', params: { action: 'myfund' }, headers: { 'authorization': token } }
        });
        resourceSecured.isMyFund({ id: fundId },
          function () {
            deferred.resolve('true');
          }, function () {
            deferred.reject('false');
          });
      }

      return deferred.promise;
    };

    p.getProgressPercentageWidth = function(fund) {
      if (angular.isUndefined(fund.goalAmount) || !angular.isNumber(fund.goalAmount)) {
        return 0;
      }
      var percentageNumber = this.getProgressPercentage(fund);
      var percentage = {
        'width': $filter('number')(percentageNumber, 0) + '%'
      };

      return percentage;
    };

    p.getProgressPercentage = function (fund, useBeneAmount) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation(fund.donationList, useBeneAmount) / fund.goalAmount) * 100;
      return percentageNumber;
    };

    p.checkExpiration = function(endDate) {
      var start = moment(endDate);
      var end = moment();
      return end.diff(start) > 0;
    }

      //#endregion

    //#region === Fund Note ===

    p.saveFundNote = function(fundNote) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundNote)) {
        deferred.reject({
          error: 'Invalid note',
          error_description: 'The object [fundNote] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundNote.identification) || fundNote.identification < 0) {
          p.createFundNote(fundNote)
            .then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function(response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    }

    p.createFundNote = function(fundNote) {
      var deferred = $q.defer();

      fundNoteResource.save({ fundId: fundNote.fundNote.fundId }, fundNote,
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    //#endregion

    //#region === Fund Team ===

    p.fundTeams = function(fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundTeamResource.byFundId({ fundId: fundId },
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.fundTeamJoin = function(fundId, teamId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/fund/:fundId/teams/:id/:action',
      { id: '@id', action: '@action', fundId: '@fundId' }, {
        'join': { method: 'POST', params: { action: 'join' }, headers: { 'authorization': token } }
      });
      var deferred = $q.defer();

      resourceSecured.join({ fundId: fundId, id: teamId },
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion

    //#region === Comments ===

    p.comment = function(fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) ) {
        deferred.reject({
          error: 'Missing variables',
          error_description: 'Oops! Looks like we can\'t find fund comments.  Lets try again'
        });
      } else {

        fundCommentResource.byFundId({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
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

    p.commentLike = function(fundId, comment) {

      var deferred = $q.defer();

      fundCommentResource.like({ fundId: fundId }, comment,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.commentSave = function(fundId, comment, token) {
      var resourceSecured = $resource(appUrl.api + '/api/fund/:fundId/comments',
        {
          fundId: '@fundId',
        }, {
          'save': { method: 'POST', headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.save({fundId: fundId}, comment,
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    //#endregion === Comments ===

    //#region === Donations ===

    p.donations = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error: 'Missing variables',
          error_description: 'Oops! Looks like we can\'t find fund donations.  Lets try again'
        });
      } else {

        fundDonationResource.query({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (items) {
            deferred.resolve(items);
          },
          function (response) {
            deferred.reject(response);
          }
        );
      }
      return deferred.promise;
    };
    //#endregion

    //#region === Image ===

    p.getMainImage = function (uploadList, width, height) {
      var i = 0;
      var mainFundImage = '/azure/img/' + appUrl.defaultFundImage + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';
      width             = width || 262;
      height            = height || 197;

      if (uploadList.length > 0) {

        //mainFundImage = '/azure/' + uploadList[0].upload.containerName + '/'
        //  + uploadList[0].upload.name + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

        mainFundImage = uploadList[0].upload.locationHttp + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

        angular.forEach(uploadList, function (item, key) {

          if (item.isDefault || i === 0) {
            switch (item.upload.typeId) {
              case 'web.Video.Vimeo':
              case 'web.Video.YouTube':
                mainFundImage = item.upload.name;
                break;
              default:
                //mainFundImage = '/azure/' + item.upload.containerName + '/'
                //  + item.upload.name
                //  + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

                mainFundImage = item.upload.locationHttp
                  + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';
                break;
            }
          }

          i++;
        });
      } 

      return mainFundImage;
    }
    //#endregion

    //#region === Mocks ===
  
    var mockFund = {
      goalAmount: 0,
      pageColor: 'default',
      item: {
        typeId: 'FundoloFund',
        transactionTypeId: 'Donation',
        title: 'Customize your Campaign',
        shortSummary: '',
        description: '',
        endDate: '',
        userId: '',
        itemUploadList: []
      },
      fundUserList: [{
        userId: '',
        userTypeId: 'Originator'
      }
      ]
    };
  
    //#endregion === Mocks ===
  
  return p;
}]);
///#source 1 1 /app/paymentgateway/wepay/pgWePaySvc.js
'use strict';

fundoloApp.factory('pgWePaySvc', [
  '$resource', '$q', '$log', '$window', 'seAuthSvc', 'wePayConst', 'appUrl',
  function ($resource, $q, $log, $window, seAuthSvc, wePayConst, appUrl) {
    var p = {};

    //#region === Resources ===
    var resource = $resource(appUrl.api + '/api/wepay/:action', {}, {
      'authorize': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'authorize' } },
      'verify':    { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'verify' } },
      'resendConfirmation': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'resendConfirmation' } },
      'getAccount': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'account' }, isArray: false },
      'withdraw': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'withdraw' } }
    });
    //#endregion === Resources ===

    //#region === Utility Functions ===

    //#endregion === Utility Functions

    //#region Publicly exposed Methods
   // https://www.wepay.com/v2/oauth2/authorize?redirect_uri=https://www.fundingmiracles.com/wepay/authenticate&user_email=antonio@antoniomarasco.com&client_id=135196&scope=manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments,manage_subscriptions
    p.authenticate = function() {
      var params = $.param({
        user_email: seAuthSvc.user.userName,
        client_id: wePayConst.client_id,
        redirect_uri: wePayConst.redirect_uri,
        scope: wePayConst.scope
      });

      $window.location.href = wePayConst.authUrl + "?" + params;
    };

    p.verify = function() {
      var deferred = $q.defer();

      resource.verify({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.authorize = function (requestToken) {
      var deferred = $q.defer();

      if (angular.isUndefined(requestToken.code)) {
        deferred.reject({
          error: 'We Pay Authorize',
          error_description: 'Invalid or missing code from Wepay'
        });
      } else {
        requestToken.redirect_uri = wePayConst.redirect_uri;
        requestToken.callback_uri = wePayConst.callback_uri;
        resource.authorize(requestToken,
          function(accessToken) {
            deferred.resolve(accessToken);
          },
          function(response) {
            deferred.reject(response.data);
          });
      }

      return deferred.promise;
    };

    p.resendConfirmation = function () {
      var deferred = $q.defer();

      resource.resendConfirmation({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getAccount = function() {
      var deferred = $q.defer();

      resource.getAccount({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.withdraw = function() {
      var deferred = $q.defer();

      resource.withdraw({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    function displayActions(reasons) {
      var ulList = "";
      angular.forEach(reasons, function (value, key) {
        switch (value) {
          case "kyc":
            ulList = ulList + " [User verification]";
            break;
          case "bank_account":
            ulList = ulList + " [Bank account setup]";
            break;
        }
      });
      return ulList;
    }

    //This is waiting for a verify object [account]
    p.analyzeAccount = function (account, callback) {
      var model = {showAlert:true};
      if (account.userState !== 'registered') {
        switch (account.userState) {
          case 'pending':
            model.alertType   = 'danger';
            model.wePayStatus = 'Pending';
            model.title       = "Account Setup Incomplete!";
            model.message     = "In order to receive funds, you must complete the WePay Account Setup.  Click on the button below to complete this step.";
            break;
          case 'deleted':
            model.title       = 'Account Deleted';
            model.alertType   = 'danger';
            model.wePayStatus = 'Deleted';
            model.message     = '';
            break;
          case 'not registered':
            model.callback             = p.authenticate();
            model.title                = 'Connect with WePay!';
            model.alertType            = 'danger';
            model.wePayStatus          = 'Not Registered';
            model.message              = 'Connect your WePay account with us and get withdrawals instantly!';
            model.authorizeButtonTitle = "Connect your WePay Account";
            break;
          default: // 'registered' should never get here
            model.alertType   = 'success';
            model.wePayStatus = 'Registered';
            model.title       = "Successful registration";
            model.message     = "You have successfully registered with WePay";
            break;
        }
      } else {
        switch (account.accountState) {
          case 'pending':
            model.wePayStatus = 'Pending';
            model.alertType   = 'warning';
            model.title       = 'WePay Account Pending!';
            model.message     = 'Your WePay account is awaiting Activation.  Please log in to WePay to confirm your account.';
            break;
          case 'action_required':
            model.callback    = completeAccountSetup;
            model.alertType   = 'warning';
            model.wePayStatus = 'Action Required';
            model.title       = 'Action Required';
            model.message     = "WePay has indicated that you'll need to complete some small steps in order for you to withdraw funds from your account." +
              " Please log into WePay and complete the following: " + displayActions(account.actionReasons);
            model.authorizeButtonTitle = "Complete account Setup";

            break;
          case 'disabled':
            model.alertType   = 'danger';
            model.wePayStatus = 'Disabled';
            model.title       = 'Account Disabled';
            model.message     = 'Your WePay account has been disabled and you can no longer accept payments';
            break;
          case 'deleted':
            model.alertType   = 'danger';
            model.wePayStatus = 'Deleted';
            model.title       = 'Account Deleted';
            model.message     = 'Your WePay account has been deleted.  Please contact WePay Administrator for support.';
            break;
          default: // Active
            model.alertType   = 'success';
            model.wePayStatus = 'Active';
            model.title       = 'Account Active';
            model.message     = '';
            model.showAlert   = false;
            break;
        }
      }
      return model;
    }
    //#endregion

    //#region === Private Methods ===
    var completeAccountSetup = function() {
      $window.location.href = wePayConst.webUrl;
    }

    //#endregion

    return p;
  }
]);
///#source 1 1 /app/paymentgateway/wepay/pgWePayAuthenticateCtrl.js
'use strict';

fundoloApp.controller('pgWePayAuthenticateCtrl', ['$scope', '$stateParams', '$log', '$location', 'pgWePaySvc',
  function ($scope, $stateParams, $log, $location, pgWePaySvc) {
    //Authenticate the wepay client
    $scope.title = "Connecting and Authorizing WePay...";
    $scope.subTitle = "Please wait a moment as we connect with WePay";
    $scope.requestToken = {
      code: $stateParams.code
    };

    $scope.authorize = function () {
      if (angular.isUndefined($scope.requestToken.code)) {
        $scope.title         = "WePay Authorization";
        $scope.subTitle      = "Allow WePay to connect with Us!";
        $scope.error         = "missing Wepay code.  This usually indicates that you are already registered with WePay.  Please contact us @ support@fundingmiracles.com";
        $scope.isAuthorizing = false;
        toastr.error('The request has responded with ' + response.error_description + '.  Please try again');
      } else {
        $scope.isAuthorizing = true;
        pgWePaySvc.authorize($scope.requestToken).then(
          function(promisedToken) {
            $location.path("/account/overview");
            $scope.isAuthorizing = false;
          },
          function(response) {
            $scope.title         = "WePay Authorization";
            $scope.subTitle      = "Allow WePay to connect with Us!";
            $scope.error         = response.error_description;
            $scope.isAuthorizing = false;
            toastr.error('The request has responded with ' + response.error_description + '.  Please try again');
            $log.error(response);
          });
      }
    };

    //Initialize
    $scope.authorize();
  }
]);
///#source 1 1 /app/account/widgets/ac-dashboard-widgets-header-drctv.js
fundoloApp.directive('acDashboardWidgetsHeaderDrctv', function () {
  'use strict';
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/account/widgets/ac-dashboard-widgets-header-drctv.min.html';
  p.transclude  = true;

  p.controller = ['$scope', function ($scope) {
    $scope.moreTab = function (currentTab) {
      var isActive = false;
      switch (currentTab) {
        case 'Social':
        case 'Notifications':
        case 'Status':
        case 'Close':
          isActive = true;
          break;
      };
      return isActive;
    };
  }];

  p.scope = {
    headline: '@',
    activeTab: '@'
  };
  
  return p;
});
///#source 1 1 /app/account/widgets/ac-dashboard-widgets-manage-drctv.js
fundoloApp.directive('acDashboardWidgetsManageDrctv', [function() {
  'use strict';
  var p = {};

  p.restrict = 'E';
  p.replace = true;
  p.templateUrl = '/app/account/widgets/ac-dashboard-widgets-manage-drctv.min.html';
  p.transclude = true;

  p.scope = {

  };

  return p;
}]);
///#source 1 1 /app/account/foAccountCtrl.js
fundoloApp.controller('foAccountCtrl', [
  '$scope', '$stateParams', '$location', '$filter', '$log', 'cssInjector',
  function($scope, $stateParams, $location, $filter, $log, cssInjector) {

    //#region === Initialize ===
    'use strict';
    cssInjector.add("/assets/css/pages/profile.css", true);

    $scope.pageResolve = 'overview';
    $scope.mainImage = '';
    $scope.text = '';
    //#endregion

    //#region === Public Methods


    //#endregion

    //#region === Private Methods ===

    //TODO: Remove duplicate function [fdDashboardListCtrl]

    //#endregion
  }
]);
///#source 1 1 /app/account/foAccountOverviewCtrl.js
fundoloApp.controller('foAccountOverviewCtrl', [
  '$scope', '$log', 'userSvc', 'pgWePaySvc', 'seAuthSvc',
  function ($scope, $log, userSvc, pgWePaySvc, seAuthSvc) {
    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve    = 'overview';
    $scope.isLoading              = true;
    $scope.isSaving               = false; // Is Saving information
    $scope.user                   = userSvc.user;
    $scope.isLoading              = false; // Is loading page
    $scope.showValidationMessages = false;
    $scope.isVerifying            = true;  // Verifying WePay account
    $scope.isAuthorized           = false; // WePay account is authorized
    $scope.isPending              = false; // WePay account pending
    $scope.isSending              = false; // Resending WePay confirmation
    $scope.showAlert              = false;
    //#endregion 

    pgWePaySvc.verify().then(
      function (verification) {
        analyzeVerification(verification);
        $scope.verification = verification;
        $scope.isVerifying  = false;
        $scope.isAuthorized = true;
      },
      function (response) {
        $scope.verification = {
          email: response.data.email
        };
        switch (response.status) {
          case 500: //not registered
            $scope.alertType = "warning";
            $scope.message = "Our records show that you have not authorized us on your WePay Account.  Please see below for instructions";
            $scope.verification.userState = 'not authorized';
            $scope.authorizeButtonTitle = "Authorize your WePay Account";
            break;
          case 404://not found
            $scope.alertType = "danger";
            $scope.message = "Click 'Connect your WePay Account' below and get withdrawals instantly!";
            $scope.verification.userState = 'not connected';
            $scope.authorizeButtonTitle = "Connect your WePay Account";
            break;
        }
        $scope.title = "WePay Authorization";
        $scope.showAlert = true;
        $scope.isVerifying = false;
      });

    function analyzeVerification(verification) {
      var analysis = pgWePaySvc.analyzeAccount(verification);
      switch (verification.userState) {
        case 'pending':
          $scope.alertType   = "danger";
          $scope.title       = "You're Almost Done";
          $scope.message     = "You will be receiving an email from us to set up you WePay account.  Once you've set up WePay, you'll be able to receive donations.";
          $scope.wePayStatus = analysis.wePayStatus;
          break;
        default:
          $scope.alertType            = analysis.alertType;
          $scope.title                = analysis.title;
          $scope.message              = analysis.message;
          $scope.wePayStatus          = analysis.wePayStatus;
          $scope.authorizeButtonTitle = "Authorize your WePay Account";
      }
      $scope.showAlert = analysis.showAlert;
      $scope.isPending = analysis.wePayStatus === 'Pending';
    }

    $scope.saveUser = function () {
      $scope.isSaving = true;
      if ($scope.accountBasicsForm.$valid) {
        userSvc.updateBasics($scope.user).then(
          function (promisedUser) {
            toastr.success('Successfully saved this user.');
            seAuthSvc.extendUser($scope.user);
            $scope.isSaving = false;
          },
          function (response) {
            $log.error(response);
            toastr.error('There was an error saving this user.  Please try again.');
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.wePay = function () {
      pgWePaySvc.authenticate();
    };

    $scope.resendWePayRegistration = function () {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function (response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function (response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };
  }
]);
///#source 1 1 /app/account/foAccountProfileCtrl.js
fundoloApp.controller('foAccountProfileCtrl',
  ['$scope', '$log', 'mdCoreDataSvc', 'userSvc',
  function ($scope, $log, mdCoreDataSvc, userSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'profile';
    $scope.isLoading           = true;
    $scope.maskingAgent        = "(999) 999-9999";

    mdCoreDataSvc.getAllStates().then(
      function (states) {
        $scope.stateOptions = states;
      },
      function (response) {
        toastr.error('Error getting states.  Please try again');
        $log.error(response);
      });

    userSvc.get().then(
      function (promisedUser) {
        $scope.profile = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was an error retrieving profile information.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      });

    //#endregion

    //#region === Public Methods ===

    $scope.$watch('stateOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedState = $scope.stateOptions[0].identification;
      }
    });

    $scope.$watch('profile', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        if (angular.isDefined($scope.profile.address)) {
          $scope.selectedState = findState($scope.profile.address.state);
        }
      }
    });

    $scope.save = function () {
      $scope.isSaving = true;

      if ($scope.profileForm.$valid) {
        $scope.profile.address.state = $scope.selectedState;
        userSvc.update($scope.profile).then(
          function (response) {
            toastr.success('Profile saved successfully');
            $scope.isSaving = false;
          },
          function (response) {
            toastr.error('There was an error saving this profile.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods

    function findState(stateToFind) {
      var result = $.grep($scope.stateOptions, function (e) {
        return e.identification === stateToFind;
      });

      //should only be one result
      return result[0].identification;
    };

    //#endregion

  }]);
///#source 1 1 /app/account/foAccountWithdrawCtrl.js
fundoloApp.controller('foAccountWithdrawCtrl', [
  '$scope', '$log', '$window', '$location', 'pgWePaySvc',
  function ($scope, $log, $window, $location, pgWePaySvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve  = 'withdraw';
    $scope.isLoading            = true;
    $scope.isPending            = false;
    $scope.isActive             = false;
    $scope.isReadyForWithdrawal = false;

    //Initialize
    verifyWePay();

    //#endregion

    //#region === Public Methods ===

    $scope.confirmWithdrawal = function () {
      $window.location.href = $scope.withdrawal.withdrawal_uri;
    };

    $scope.gotoBasics = function () {
      $location.path('/account/basics');
    };

    $scope.resendWePayRegistration = function () {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function (response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function (response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };

    $scope.withdraw = function () {
      $scope.isWithdrawing = true;
      pgWePaySvc.withdraw().then(
        function (withdrawal) {
          toastr.success('Mo\' Money! Your account is now ready for withdrawal');
          $scope.isReadyForWithdrawal = true;
          $scope.isWithdrawing = false;
          $scope.withdrawal = withdrawal;
          $scope.isActive = false;
        },
        function (response) {
          toastr.error('Looks like WePay withdrawals are MIA.  Please try again later.');
          $scope.isWithdrawing = false;
        });
    };

    //#endregion

    //#region === Private Methods ===

    function verifyWePay() {
      pgWePaySvc.verify().then(
        function (account) {
          $scope.account = account;
          analyzeAccount(account);
          $scope.isLoading = false;
        },
        function (response) {
          analyzeAccount(response.data);
          $scope.isLoading = false;
        });
    }

    function analyzeAccount(account) {
      var verification = pgWePaySvc.analyzeAccount(account);

      $scope.showAlert = verification.showAlert;
      $scope.alertType = verification.alertType;
      $scope.title     = verification.title;
      $scope.message   = verification.message;

      if (verification.authorizeButtonTitle) {
        $scope.showBlock = true;
        $scope.buttonTitle = verification.authorizeButtonTitle;
      }
      $scope.isPending   = verification.wePayStatus === 'Pending';
      $scope.isActive    = verification.wePayStatus === 'Active' && account.balances[0].balance > 0;
      $scope.wePayAction = verification.callback;
    }

    //#endregion

  }
]);
///#source 1 1 /app/account/foAccountPasswordCtrl.js
fundoloApp.controller('foAccountPasswordCtrl',
  ['$scope', '$log', 'seAuthSvc', 'userSvc',
  function ($scope, $log, seAuthSvc, userSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve    = 'password';
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.password               = {};
    $scope.user                   = seAuthSvc.user;
    $scope.isSetPassword          = angular.isUndefined($scope.user.statusId) || $scope.user.statusId === 'Pending';

    //#endregion

    //#region === Public Methods ===

    $scope.save = function () {
      $scope.isSaving = true;
      if ($scope.passwordForm.$valid) {
        if ($scope.isSetPassword) {
          $scope.setPassword(function () {
            $scope.saveUserStatus('Active');
          });
        } else {
          $scope.changePassword();
        }
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.saveUserStatus = function (status) {

      userSvc.updateStatus(status).then(
        function (promisedUser) {
          $scope.user.statusId = status;
          seAuthSvc.extendUser($scope.user);
          toastr.success('Password saved successfully');
          $scope.isSetPassword = false;
          $scope.isSaving = false;
        },
        function (response) {
          $log.error(response);
          toastr.error('There was an error saving password.  Please try again.');
          $scope.isSaving = false;
        });

    };

    $scope.setPassword = function (callback) {
      $scope.isSaving = true;
      seAuthSvc.setPassword($scope.password).then(
        function (response) {
          if (angular.isFunction(callback)) {
            callback();
          } else {
            toastr.success('Password saved successfully');
            $scope.isSaving = false;
          };
        },
        function (response) {
          $log.error(response);
          toastr.error('Oops! We could not save your password.  Please try again.');
          $scope.isSaving = false;
        });
    };

    $scope.changePassword = function () {
      seAuthSvc.changePassword($scope.password).then(
        function (response) {
          toastr.success('Password saved successfully');
          $scope.isSaving = false;
        },
        function (response) {
          $log.error(response);
          toastr.error('Oops! We could not save your password.' + response.error_description);
          $scope.isSaving = false;
        });
    };

    //#endregion
  }
]);
///#source 1 1 /app/account/foAccountDonationsCtrl.js
fundoloApp.controller('foAccountDonationsCtrl', ['$scope', '$log', 'userSvc', 'fdSvc',
  function ($scope, $log, userSvc, fdSvc) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'donations';
    $scope.isLoading = true;

    //#endregion

    //#region === Public Methods ===

    userSvc.getDonations().then(
      function (donations) {
        $scope.donations = donations;
        $scope.isLoading = false;
      },
      function (response) {
        toastr.error('There was a problem loading donations.  Please try again.');
        $log.error(response);
        $scope.isLoading = false;
      });


    $scope.getImageFile = function(files) {
      return fdSvc.getMainImage(files, 263, 148);
    }
    //#endregion 
  }
]);
///#source 1 1 /app/account/foAccountNotificationsCtrl.js
fundoloApp.controller('foAccountNotificationsCtrl', [
  '$scope',
  function ($scope) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'notifications';

    //endregion
  }
]);
///#source 1 1 /app/account/foAccountStatusCtrl.js
fundoloApp.controller('foAccountStatusCtrl', ['$scope', '$location', 'seAuthSvc', 'pgWePaySvc',
  function ($scope, $location, $seAuthSvc, pgWePaySvc) {

    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'status';
    $scope.isLoadingWePay      = true;
    $scope.facebookStatus      = 'Active';
    $scope.user                = $seAuthSvc.user;
    $scope.status              = angular.isUndefined($scope.user.statusId) ? 'Pending' : $scope.user.statusId;

    $scope.gotoChangePassword = function () {
      $location.path('/account/password');
    };

    verifyWePay();

    //#endregion

    //#region === Public Methods ===

    $scope.resendWePayRegistration = function () {
      $scope.isSending = true;
      pgWePaySvc.resendConfirmation().then(
        function (response) {
          toastr.success('You have mail!  Please confirm your WePay account');
          $scope.isSending = false;
        },
        function (response) {
          toastr.error('Uh Oh.  For some reason our digital elves weren\'t able to resend the email.  Can you try again?');
          $log.error(response);
          $scope.isSending = false;
        });
    };

    //#endregion

    //#region === Private Methods

    function verifyWePay() {
      pgWePaySvc.verify().then(
      function (response) {
        analyzeAccount(response);
        $scope.isLoadingWePay = false;
      },
      function (response) {
        toastr.error('Oops!  Account information went out to lunch.  Please check again soon!');
        $scope.isLoading = false;
      });
    }

    function analyzeAccount(account) {
      var analysis = pgWePaySvc.analyzeAccount(account);

      $scope.wePayStatus = analysis.wePayStatus;
      $scope.message = analysis.message;
    }

    //#endregion
  }
]);
///#source 1 1 /app/fund/dashboard/fdDashboardSvc.js
'use strict';

fundoloApp.factory('fdDashboardSvc', ['$resource', '$q', '$filter', '$compile', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $filter, $compile, seAuthSvc, appUrl) {
    var p = {};

    //#region === Resources ===

    var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id/:pageNumber/:itemsPerPage',
      { id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
        'save':          { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
        'query':         { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'summary':       { method: 'GET',  params: { action: 'summary'},      headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'isMyFund':      { method: 'GET',  params: { action: 'myfund'},       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'update':        { method: 'PUT',  params: { action: 'update'},       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'saveFundImage': { method: 'POST', params: { action: 'fundImage'},    headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'support':       { method: 'POST', params: { action: 'support'},      headers: { 'authorization': seAuthSvc.getBearerToken } },
        'supporting':    { method: 'GET', params:  { action: 'supporting' },  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'subscribe':     { method: 'POST', params: { action: 'subscribe'},    headers: { 'authorization': seAuthSvc.getBearerToken } },
        'copy':          { method: 'POST', params: { action: 'copy' },        headers: { 'authorization': seAuthSvc.getBearerToken } },
        'copy2':         { method: 'POST', params: { action: 'copy2' },       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'supporters':    { method: 'GET',  params: { action: 'supporters' },  },
        'teamedUp':      { method: 'GET',  params: { action: 'teamedUp' },    headers: { 'authorization': seAuthSvc.getBearerToken }, isArray:true },
        'teamMembers':   { method: 'GET',  params: { action: 'teamMembers' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
        'status':        { method: 'POST', params: { action: 'status' },      headers: { 'authorization': seAuthSvc.getBearerToken } },
        'history':       { method: 'GET',  params: { action: 'history' },     headers: { 'authorization': seAuthSvc.getBearerToken } },
      });

    var fundUserResource = $resource(appUrl.api + '/api/fund/:fundId/user/:section/:id/:action/:pageNumber/:itemsPerPage',
      { fundId: '@fundId', section: '@section', id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
        'save':           { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
        'query':          { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'getBeneficiary': { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'beneficiary' }, isArray: true },
        'update':         { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken } },
        'fundraisers':    { method: 'GET', params: { section: 'fundraisers' } }
    });

    var fundNoteResource = $resource(appUrl.api + '/api/fund/:fundId/notes/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save': { method: 'POST' },
      'byFundId': { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken } },
      'updateView': { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'viewed' } },
      'respond':    { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'respond' } }
    });


    var fundSettingsResource = $resource(appUrl.api + '/api/fundsettings/:action/:id',
    { id: '@id', action: '@action' }, {
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'update' } }
    });

    var fundTeamResource = $resource(appUrl.api + '/api/fund/:fundId/teams/:id/:section/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'join': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params : {action:'join'} } 
    });

    var updateResource = $resource(appUrl.api + '/api/fund/:fundId/updates/:section/:id/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    },
    {
      'save':  { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'query':  { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'byStatusId': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'status' }, isArray: true }
    });

    var donationResource = $resource(appUrl.api + '/api/fund/:fundId/donations/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save':        { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'saveoffline': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'offline' } },
      'update':      { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken } },
      'xlite':       { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'xlite' } },
      'sendnote': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'sendnote' } }
    });

    var uploadResource = $resource(appUrl.api + '/api/fund/:fundId/uploads/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      action: '@action',
      id: '@id',
      section: '@section'
    }, {
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'delete': { method: 'DELETE', headers: { 'authorization': seAuthSvc.getBearerToken } }
    });

    //#endregion === Resource ===

    //#region === File Manager ===

    p.removeFile = function (file) {
      var deferred = $q.defer();
      var fileResource = $resource(appUrl.api + '/api/itemuploader/remove', { }, {
        'save': {method: 'POST', headers : {'authorization': seAuthSvc.getBearerToken } }
      });

      fileResource.save(file,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    //#endregion === File Manager ===

    //#region === Fund ===

    p.isMyFund = function (fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.resolve('false');
      } else {

        resourceSecured.isMyFund({ id: fundId },
          function () {
            deferred.resolve('true');
          }, function () {
            deferred.reject('false');
          });
      }

      return deferred.promise;
    };

    p.copy = function (token) {
      var deferred = $q.defer();

      resourceSecured.copy({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.copy2 = function (token) {
      var deferred = $q.defer();

      resourceSecured.copy2({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.summary = function (fundId) {
      var deferred = $q.defer();
      if (angular.isUndefined(fundId) || fundId < 1) {
        deferred.reject();
      } else {

        resourceSecured.summary({ id: fundId },
          function (fund) {
            deferred.resolve(fund);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.allByUser = function () {
      var deferred = $q.defer();
      //var resourceIn = $resource(appUrl.api + '/api/funddetails', {}, {
      //  'query': { method: 'GET', isArray: true, headers: { 'authorization': seAuthSvc.getBearerToken } }
      //});
      resourceSecured.query({ typeId: 'Campaign' },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supporters = function (id, pageNumber, itemsPerPage) {
      var deferred = $q.defer();
      resourceSecured.supporters({ id: id, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.teamMembers = function (id) {
      var deferred = $q.defer();
      resourceSecured.teamMembers({ id: id },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.teamedUp = function () {
      var deferred = $q.defer();
      resourceSecured.teamedUp({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supporting = function () {
      var deferred = $q.defer();
      resourceSecured.supporting({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };


    p.save = function (fund) {
      var deferred = $q.defer();

      if (angular.isUndefined(fund)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fund.identification) || fund.identification < 0) {
          p.create(fund).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.update(fund).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.create = function (fund) {
      var deferred = $q.defer();

      resourceSecured.save(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.update = function (fund) {
      var deferred = $q.defer();

      resourceSecured.update(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundImage = function (fund) {
      var deferred = $q.defer();

      resourceSecured.saveFundImage(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.support = function (support) {
      var deferred = $q.defer();

      resourceSecured.support(support,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.status = function (fundId, statusId) {
      var deferred = $q.defer();

      resourceSecured.status({fundId: fundId, statusId: statusId},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.subscribe = function (fundId, email, geo) {
      var deferred = $q.defer();

      resourceSecured.subscribe({
        fundId: fundId,
        email: email,
        geo: geo
        },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };


    //#endregion

    //#region === Note ===
    p.fundNoteByFundId = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundNoteResource.byFundId({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.saveFundNote = function (fundNote) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundNote)) {
        deferred.reject({
          error: 'Invalid note',
          error_description: 'The object [fundNote] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundNote.identification) || fundNote.identification < 0) {
          p.createFundNote(fundNote).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateFundNote(fundNote).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createFundNote = function (fundNote) {
      var deferred = $q.defer();

      fundNoteResource.save({fundId: fundNote.fundId}, fundNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundNote = function (fundNote) {
      var deferred = $q.defer();

      fundNoteResource.update({fundId : fundNote.fundId, id: fundNote.identification}, fundNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundNoteView = function (fundId, id) {
      var deferred = $q.defer();

      fundNoteResource.updateView({ fundId: fundId, id: id},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.respondFundNote = function (note) {
      var deferred = $q.defer();

      fundNoteResource.respond({ fundId: note.fundNote.fundId, id: note.fundNote.respondNoteId }, note,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getListClass = function (notification) {
      if (angular.isUndefined(notification)) {
        return 'icon-custom icon-sm rounded-x icon-line icon-bg-red icon-ghost';
      }
      var listClass = 'icon-custom icon-sm rounded-x icon-line ';

      switch (notification.typeId) {
        case 'Support':
          listClass += 'icon-bg-dark-blue icon-trophy';
          break;
        case 'Donation':
          listClass += 'icon-bg-red icon-heart';
          break;
        case 'Joined':
          listClass += 'icon-bg-light-grey fa fa-child';
          break;
        case 'Notification':
          listClass += 'icon-bg-orange icon-envelope';
          break;
        case 'Share':
          listClass += 'icon-bg-green icon-share';
          break;
        case 'Comment':
          listClass += 'icon-bg-blue fa fa-comments';
          break;
        case 'Subscribe':
          listClass += 'icon-bg-sea fa fa-pencil-square-o';
          break;
      }

      return listClass;
    }

    //#endregion

    //#region === Settings ===
    p.saveFundSettings = function (fundSettings) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundSettings)) {
        deferred.reject({
          error: 'Invalid settings',
          error_description: 'The object [fundSettings] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundSettings.fundId) || fundSettings.fundId < 0) {
          p.createfundSettings(fundSettings).then(
            function (response) {
              deferred.resolve(response);
              }, function (response) {
                deferred.reject(response);
              });
        } else {
          p.updatefundSettings(fundSettings).then(
            function(response) {
              deferred.resolve(response);
            }, function(response) {
              deferred.reject(response);
            });
        }
      }

      return deferred.promise;
    };

    p.createfundSettings = function (fundSettings) {
      var deferred = $q.defer();

      fundSettingsResource.save(fundSettings,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updatefundSettings = function (fundSettings) {
      var deferred = $q.defer();

      fundSettingsResource.update(fundSettings,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion ===/Fund Settings ===

    //#region === User methods ===

    p.getFundUser = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.resolve(mockFundUser);
      } else {
        fundUserResource.getBeneficiary({ id: fundId },
          function (fundUser) {
            deferred.resolve(fundUser);
          },
          function (response) {
            response.data = mockFundUser;
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    p.allUpdatesByUserId = function (userId) {
      var deferred = $q.defer();

      updateResource.query({ userId: userId },
        function (fundUpdates) {
          deferred.resolve(fundUpdates);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundUser = function (fundUser) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundUser)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fundUser.userId) || fundUser.userId.length === 0) {
          p.createFundUser(fundUser).then(function (promisedFundUser) {
            deferred.resolve(promisedFundUser);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateFundUser(fundUser).then(function (promisedFundUser) {
            deferred.resolve(promisedFundUser);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createFundUser = function (fundUser) {
      var deferred = $q.defer();

      fundUserResource.save(fundUser,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundUser = function (fundUser) {
      var deferred = $q.defer();

      fundUserResource.update(fundUser,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getFundraisers = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.reject({error_description: 'The fund id is either invalid or is missing', error: 'Invalid Fund Id'});
      } else {
        fundUserResource.fundraisers({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            response.data = mockFundUser;
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    //#endregion

    //#region === Donation methods ===

    p.saveDonation = function (donation) {
      var deferred = $q.defer();

      if (angular.isUndefined(donation)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(donation.identification) || donation.identification < 0) {
          if (donation.offlineDonation) {
            p.createOfflineDonation(donation).then(function (promisedDonation) {
              deferred.resolve(promisedDonation);
            }, function (response) {
              deferred.reject(response);
            });
          } else {
            p.createDonation(donation).then(function(promisedDonation) {
              deferred.resolve(promisedDonation);
            }, function(response) {
              deferred.reject(response);
            });
          }
        } else {
          p.updateDonation(donation).then(function (promisedDonation) {
            deferred.resolve(promisedDonation);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.saveDonationxLite = function (donation) {
      var deferred = $q.defer();

      if (angular.isUndefined(donation)) {
        deferred.reject();
      } else {
        donationResource.xlite({fundId: donation.fundId, id: donation.identification}, donation,
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.createDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.save({ fundId: donation.fundId }, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.createOfflineDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.saveoffline({ fundId: donation.fundId }, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.update({fundId: donation.fundId}, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.createDonationNote = function (donationNote) {
      var deferred = $q.defer();

      donationResource.sendnote({ fundId: donationNote.fundId, id: donationNote.donationId }, donationNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion === Donations ===

    //#region === Updates methods ===

    p.allUpdatesByFundIdStatusId = function (fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.reject('Invalid Fund Id [' + fundId + ']');
      } else {
        updateResource.byStatusId({ fundId: fundId, id: 'Active' },
          function (fundUpdates) {
            deferred.resolve(fundUpdates);
          },
          function (response) {
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    p.saveUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundUpdate)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fundUpdate.identification) || fundUpdate.identification < 0) {

          p.createUpdate(fundUpdate).then(function (promisedUpdate) {
            deferred.resolve(promisedUpdate);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateUpdate(fundUpdate).then(function (promisedUpdate) {
            deferred.resolve(promisedUpdate);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      updateResource.save({fundId : fundUpdate.fundId}, fundUpdate,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      updateResource.update({fundId : fundUpdate.fundId, id: fundUpdate.identification},fundUpdate,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion === Fund-Update methods ===

    //#region === Team ===
    p.saveFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundTeam)) {
        deferred.reject({
          error: 'Invalid fund team',
          error_description: 'The object [FundTeam] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundTeam.identification) || fundTeam.identification < 0) {
          p.createFundTeam(fundTeam).then(
            function (response) {
              deferred.resolve(response);
            }, function (response) {
              deferred.reject(response);
            });
        } else {
          p.updateFundTeam(fundTeam).then(
            function (response) {
              deferred.resolve(response);
            }, function (response) {
              deferred.reject(response);
            });
        }
      }

      return deferred.promise;
    };

    p.createFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.save({fundId : fundTeam.fundId }, fundTeam,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.update({id: fundTeam.identification, fundId : fundTeam.fundId }, fundTeam,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.joinFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.join({ fundId: fundTeam.fundId, id : fundTeam.identification},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.fundTeamByFundId = function(fundTeam) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundTeamResource.byFundId({ fundId: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion ===/Fund Settings ===

    //#region === History ===

    p.history = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();
      if (angular.isUndefined(fundId) || fundId < 1) {
        deferred.reject();
      } else {

        resourceSecured.history({ id: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (items) {
            deferred.resolve(items);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
    //#endregion

    //#region === Uploads ===

    p.updateFundUploads = function (fundId, uploads) {
      var deferred = $q.defer();

      uploadResource.update({ fundId: fundId }, uploads,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.deleteFundUploads = function (fundId, id) {
      var deferred = $q.defer();

      uploadResource.delete({ fundId: fundId, id: id},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundUpload = function (fundId, upload) {
      var deferred = $q.defer();

      uploadResource.save({ fundId: fundId}, upload,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    //#endregion

    //#region === Fundraiser ===
    var fundFundraiserResource = $resource(appUrl.api + '/api/fund/:fundId/fundraiser/:section/:id/:action/:pageNumber/:itemsPerPage',
    { fundId: '@fundId', section: '@section', id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
      'query': { method: 'GET', isArray: true },
    });

    p.fundraiserByFundId = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundFundraiserResource.query({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion

    //#region === Mocks ===

    var mockFundUser = {
      fundId: 0,
      userId: '',
      userTypeId: '',
      aspNetUser: {
        firstName: '',
        lastName: '',
        name: '',
        userAddressList: [{
          isDefault: true,
          address: {}
        }],
        userPhoneList: [{
          isDefault: true,
          phone: {
            typeId: 'Mobile'
          }
        }],
        userEmailList: [{
          isDefault: true,
          email: {}
        }]
      }
    };

    //#endregion === Mocks ===

    return p;
  }]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelCtrl.js
fundoloApp.controller('fdControlPanelCtrl', [
  '$scope', '$stateParams', '$location', '$filter', '$log', '$window', 'appUrl', 'fdSvc','fdDashboardSvc','pgWePaySvc', 'cssInjector',
  function ($scope, $stateParams, $location, $filter, $log, $window, appUrl, fdSvc, fdDashboardSvc, pgWePaySvc, cssInjector) {

    //#region === Initialize ===
    'use strict';
    $scope.notifications    = true;
    $scope.isLoading        = true;
    $scope.pageResolve      = 'overview';
    $scope.isVerifying      = true;
    $scope.socials          = ['facebook', 'twitter', 'mail'];
    $scope.fund             = {
      identification: $stateParams.fundId
    }
    cssInjector.add("/assets/css/pages/profile.css", true);

    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {

        $scope.fund          = angular.isArray(fund) ? fund[0] : fund;
        $scope.files         = $scope.fund.item.itemUploadList;
        $scope.mainFundImage = fdSvc.getMainImage($scope.files, 263, 148);

        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        fundToOpenGraph($scope.fund); 
        $scope.isLoading = false;
        getFundDonations();
        getFundNotes();
        setUpImages();
      },
      function (response) {
        $scope.isLoading = false;
        if (response.status === 404) {
          toastr.error('Either this fund does not exist or access to it has been restricted');
          $location.path('/controlpanel/fund/list');
        }
      });

    //#endregion

    //#region === Public Methods
    $scope.goToEdit = function() {
      $location.path('/' + $scope.fund.item.permalink);
    }

    $scope.getTotalDonation = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation($scope.fund.donationList, true);
    };

    $scope.getTotalDonationsFromDate = function (daysFrom) {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      return fdSvc.getTotalDonationDateFrom($scope.fund.donationList, daysFrom, true);
    }

    $scope.getTotalDonationMonthToMonth = function() {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }

      var sum = fdSvc.getTotalDonationMonthToMonth($scope.fund.donationList, true, $scope.fund.goalAmount);
      var isMore = sum > 0;
      var msg = Math.abs(Math.floor(sum)) + '%';
      msg += isMore ? " more " : " less";
      return msg;
    }
    $scope.getProgressBarPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return { 'width': '0%' };
      }
      var percentageNumber = $scope.getProgressPercentage();
      var percentage = {
        'width': percentageNumber + '%'
      };

      return percentage;
    };

    $scope.getProgressPercentage = function () {
      if (angular.isUndefined($scope.fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      var percentage = $filter('number')(percentageNumber, 0);

      return percentage;
    };

    //#endregion

    //#region === Private Methods ===

    function getFundDonations() {
      fdSvc.donations($scope.fund.identification, 0, 0).then(
        function (items) {
          $scope.donationCount = items.count;
          $scope.fund.donationList = items.data;
        },
        function(response) {
          toastr.error(response.error_description);
        });
    }

    function getFundNotes() {
      fdDashboardSvc.fundNoteByFundId($scope.fund.identification, 1, 0).then(
        function(item) {
          $scope.fund.fundNoteList = item;
        },
        function(response) {
          toastr.error('The notifications have gone missing.  Please refresh and try again');
        });
    }

    function fundToOpenGraph(fund) {
      var permalink = appUrl.base + '/' + fund.item.permalink;
      var defaultImageUrl = appUrl.base + $scope.mainFundImage;

      $scope.socialData = {
        fund: fund,
        facebookData: {
          method: 'feed',
          link: permalink,
          picture: defaultImageUrl,
          name: fund.item.title,
          caption: 'www.fundingmiracles.com',
          description: fund.item.description
        },
        twitterData: {
          hashtags: '',
          via: 'fundingmiracles',
          related: '//www.fundingmiracles.com',
          text: fund.item.title,
          url: permalink
        }
      };

      $scope.$parent.pageTitle       = fund.item.title;
      $scope.$parent.pageDescription = fund.item.description;
      $scope.$parent.og.title        = fund.item.title;
      $scope.$parent.og.description  = fund.item.description;
      $scope.$parent.og.url          = permalink,
      $scope.$parent.og.image         = defaultImageUrl;
    }

    function setUpImages() {
      $scope.fund.item.itemUploadList = $filter('orderBy')($scope.fund.item.itemUploadList, 'sortOrder');
      var i = 0;
      angular.forEach($scope.fund.item.itemUploadList, function (value, key) {
        var imgUrl = value.upload.location;
        var thumbUrl = value.upload.location;
        if (value.upload.typeId == 'web.Image') {
          //imgUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=560&width=550&mode=crop&scale=both';

          //thumbUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=180&width=180&mode=crop&scale=both';

          imgUrl = value.upload.location
            + '?height=560&width=550&mode=crop&scale=both';

          thumbUrl = value.upload.location
            + '?height=180&width=180&mode=crop&scale=both';
        }

        if (value.isDefault || i === 0) {
          switch (value.upload.typeId) {
            case 'web.Video.Vimeo':
            case 'web.Video.YouTube':
              $scope.fund.defaultImage = value.upload.name;
              $scope.fund.defaultImageThumb = value.upload.name;
              break;
            default:
              $scope.fund.defaultImage = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=200&width=310&mode=crop&scale=both';

              $scope.fund.defaultImageThumb = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=75&width=75&mode=crop&scale=both';
              break;
          }


        }
        value.imgUrl = imgUrl;
        value.thumbUrl = thumbUrl;
        i++;
      });
    }
    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelOverviewCtrl.js

fundoloApp.controller('fdControlPanelOverviewCtrl', [
  '$scope', '$stateParams', '$location', '$filter', '$log', 'appUrl', 'fdSvc', 'fdDashboardSvc', 'pgWePaySvc',
  function fdControlPanelOverviewCtrl($scope, $stateParams, $location, $filter, $log, appUrl, fdSvc, fdDashboardSvc, pgWePaySvc) {

    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'overview';

    //#endregion

    //#region === Public Methods



    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelProfileCtrl.js
fundoloApp.controller('fdControlPanelProfileCtrl', [
  '$scope',
  function($scope) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'profile';

    //#endregion

    //#region === Public Methods



    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelSupportersCtrl.js
fundoloApp.controller('fdControlPanelSupportersCtrl', [
  '$scope', '$stateParams', 'fdDashboardSvc',
  function fdControlPanelSupportersCtrl($scope, $stateParams, fdDashboardSvc) {

    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'supporters';
    $scope.items               = [];
    $scope.itemList            = [];
    $scope.showWarning         = false;
    $scope.isLoading           = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 4; 
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 2;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    // Initialize items
    fdDashboardSvc.supporters($stateParams.fundId, 1, 0).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading     = false;
        $scope.itemList      = fund.data;
        $scope.totalItems    = fund.count;
        setRecordsToDisplay();
      },
      function(response) {
        toastr.error('Problem getting supporters', 'There was a problem accessing your fundraiser.  Please try again');
        $scope.isLoading = false;
      }
    );

    //

    //#endregion

    //#region === Public Methods

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.onSelectPage = function () {
      setRecordsToDisplay();

    };
    //#endregion

    //#region === Private Methods ===
    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelTeamsCtrl.js
fundoloApp.controller('fdControlPanelTeamsCtrl', [
  '$scope',
  function ($scope) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'teams';

    //#endregion

    //#region === Public Methods ===

    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelCommentsCtrl.js
fundoloApp.controller('fdControlPanelCommentsCtrl', [
  '$scope', '$stateParams', 'fdSvc',
  function fdControlPanelCommentsCtrl($scope, $stateParams, fdSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'comments';
    $scope.isLoading = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 10;
    //=============================

    //#endregion

    //#region === Public Methods

    $scope.getFundComments = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdSvc.comment($stateParams.fundId, pageNumber, $scope.itemsPerPage).then(
        function (item) {
          $scope.comments = item.data;

          $scope.totalItems = item.count;
          $scope.isLoading = false;
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isLoading = false;
        });
    };

    $scope.onSelectPage = function () {
      $scope.getFundComments($scope.currentPage);
    };

    //#endregion

    //#region === Private Methods ===

    $scope.getFundComments(1);

    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelHistoryCtrl.js
fundoloApp.controller('fdControlPanelHistoryCtrl', [
  '$scope', '$stateParams','cssInjector', 'fdDashboardSvc', 'mdScrollScrollSvc',
  function ($scope, $stateParams, cssInjector, fdDashboardSvc, mdScrollScrollSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'history';
    $scope.timeLine            = [];
    $scope.isLoading           = true;
    $scope.moreToLoad          = true;
    cssInjector.add("/assets/css/pages/feature_timeline2.css");

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 10;
    //=============================

    //#endregion

    //#region === Public Methods

    $scope.getFundHistory = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdDashboardSvc.history($stateParams.fundId, pageNumber, $scope.itemsPerPage).then(
        function (item) {

          $scope.timeline = item.data;
          $scope.totalItems = item.count;
          $scope.isLoading = false;
          mdScrollScrollSvc.scrollTo('topofPage', 20);

          //setRecordsToDisplay();
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isLoading = false;
        });
    };

    $scope.onSelectPage = function () {
      $scope.getFundHistory($scope.currentPage);

    };

    $scope.getActivityIcon = function (activity) {
      var activityClass = '';

      switch (activity.fundActivityType.identification) {
        case '25PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-dark-blue icon-trophy';
          break;
        case '50PercentFundRaised':
          activityClass = 'icon-custom icon-xs  rounded-x icon-line icon-bg-orange icon-trophy';
          break;
        case '75PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-grey icon-trophy';
          break;
        case '100PercentFundRaised':
          activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-brown icon-trophy';
          break;
      }

      return activityClass;
    }
    //#endregion

    //#region === Private Methods ===

    $scope.getFundHistory(1);

    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelSettingsCtrl.js
fundoloApp.controller('fdControlPanelSettingsCtrl', [
  '$scope',
  function ($scope) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'settings';

    //#endregion

  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelToolsCtrl.js
fundoloApp.controller('fdControlPanelToolsCtrl', [
  '$scope','$stateParams', 'fdDashboardSvc',
function fdControlPanelToolsCtrl($scope, $stateParams, fdDashboardSvc) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'tools';

    //#endregion

    //#region === Public Methods ===
  fdDashboardSvc.summary($stateParams.fundId).then(
    //BUG: ANGULAR If object has array as property then it requires isArray: true
    function(fund) {
      $scope.fund = angular.isArray(fund) ? fund[0] : fund;
    },
    function(response) {
      $scope.isLoading = false;
      if (response.status === 404) {
        toastr.error('Either this fund does not exist or access to it has been restricted');
        $location.path('/controlpanel/fund/list');
      }
    });
  //#endregion

  //#region === Private Methods ===


  //#endregion
}
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelListCtrl.js

fundoloApp.controller('fdControlPanelListCtrl', ['$scope', '$state', 'fdSvc', 'fdDashboardSvc', 'pgWePaySvc', 'mdCoreDataSvc',
  function ($scope, $state, fdSvc, fdDashboardSvc, pgWePaySvc, mdCoreDataSvc) {

    // #region === Initialize ===

    'use strict';
    $scope.showMessage            = false;
    $scope.isContinuing           = false;
    $scope.showValidationMessages = false;
    $scope.fund                   = {};

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items              = [];
    $scope.numberColumns      = 4;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    $scope.isLoading          = true;
    //=============================[$parent.$index * numberColumns + $index]

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items2              = [];
    $scope.numberColumns2      = 4;
    $scope.itemRows2           = [];
    $scope.itemRows2.length    = Math.ceil($scope.items2.length / $scope.numberColumns2);
    $scope.itemColumns2        = [];
    $scope.itemColumns2.length = $scope.numberColumns2;
    $scope.isLoading2          = true;
    //=============================[$parent.$index * numberColumns + $index]

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.items3              = [];
    $scope.numberColumns3      = 4;
    $scope.itemRows3           = [];
    $scope.itemRows3.length    = Math.ceil($scope.items3.length / $scope.numberColumns3);
    $scope.itemColumns3        = [];
    $scope.itemColumns3.length = $scope.numberColumns3;
    $scope.isLoading3 = true;

    (function () {
        getFundCategories();
    })();

    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods ===

    fdDashboardSvc.allByUser().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.isLoading = false;
        } else {
          $scope.isLoading       = false;
          $scope.items           = funds;
          $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
          verify();
        }
      },
      function (response) {
        $scope.isLoading = false;
      });

    fdDashboardSvc.supporting().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.supportedFunds = [];
          $scope.isLoading2     = false;
        } else {
          $scope.isLoading2       = false;
          $scope.items2           = funds;
          $scope.itemRows2.length = Math.ceil($scope.items2.length / $scope.numberColumns2);
        }
      },
      function (response) {

      });

    fdDashboardSvc.teamedUp().then(
      function (funds) {
        if (funds.length == 0) {
          $scope.teamed     = [];
          $scope.isLoading3 = false;
        } else {
          $scope.isLoading3       = false;
          $scope.items3           = funds;
          $scope.itemRows3.length = Math.ceil($scope.items3.length / $scope.numberColumns3);
        }
      },
      function (response) {

      });

    $scope.continue = function() {
      $scope.isContinuing = true;
      if (this.createNewFundForm.$valid) {
        
        fdDashboardSvc.save($scope.fund).then(
          function (response) {
            toastr.success("Fund saved successfully");

            mdCoreDataSvc.reCache(response.item.permalink).then(
              function (resp) {
            
              }, function (resp) {

              });

            $scope.isContinuing = false;
            $state.go('home.permalink', {permalink:  response.item.permalink});
          },
          function () {

            $scope.isContinuing = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isContinuing = false;
      }
    }

    $scope.hide = function (parentIndex, items) {
      return parentIndex === items.length || parentIndex > items.length;
    };

    $scope.gotoBasics = function () {
      $state.go('home.account.withdraw');
    }
    //#endregion

    //#region === Private Methods ===
    function getFundCategories() {
      mdCoreDataSvc.getAllFundCategories().then(
        function (categories) {
          $scope.fundCategoryOptions = categories;
          //$scope.categoryId = $scope.fundCategoryOptions[0].identification;
        },
        function (response) {
    
        });
    }

    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }


    //TODO: remove duplicate method [fdDashboardCtrl]
    function verify() {
      pgWePaySvc.verify().then(
        function (verification) {
          //Everything OK; nothing to show
          analyzeAccount(verification);
          $scope.verification = verification;
        },
        function (response) {
          $scope.verification = {
            email: response.data.email
          };
          switch (response.status) {
            case 500: //not registered
              $scope.alertType              = "warning";
              $scope.message                = "Our records show that you have not authorized us on your WePay Account.  See below for instructions.";
              $scope.verification.userState = 'not authorized';
              $scope.authorizeButtonTitle   = "Authorize your WePay Account";
              break;
            case 404://not found
              $scope.alertType              = "danger";
              $scope.message                = "Connect your WePay account with us and get withdrawals instantly! See below for instructions";
              $scope.verification.userState = 'not connected';
              $scope.authorizeButtonTitle   = "Connect your WePay Account";
              break;
          }

          $scope.title = "WePay Authorization";
          $scope.showAlert = true;
          $scope.isLoading = false;
        });
    }

    function analyzeAccount(account) {
      var analysis     = pgWePaySvc.analyzeAccount(account);
      $scope.showAlert = analysis.showAlert;
      $scope.alertType = analysis.alertType;
      $scope.title     = analysis.title;
      $scope.message   = analysis.message;
      if (analysis.authorizeButtonTitle) {
        $scope.showBlock = true;
        $scope.buttonTitle = analysis.authorizeButtonTitle;
      }
      $scope.isPending                        = analysis.wePayStatus === 'Pending';
      $scope.isActive                         = analysis.wePayStatus === 'Active' && account.balances[0].balance > 0;
      $scope.$parent.hasWithdrawal            = $scope.isActive;
      $scope.$parent.hasConditionalWithdrawal = analysis.wePayStatus !== 'Active' && account.balances[0].balance > 0;
    }

    //#endregion
  }]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelTeamsMdl.js
var fdControlPanelTeamsMdl = ['$scope', '$uibModalInstance', '$filter', 'fdDashboardSvc', 'fundId', 'team',
  function ($scope, $uibModalInstance, $filter, fdDashboardSvc, fundId, team) {

    //#region === Initialize ===

    'use strict';
    $scope.isSaving               = false;
    $scope.fundId                 = fundId || undefined;
    $scope.fundTeam               = angular.isUndefined(team) ? { fundId: $scope.fundId, team: {} } : team;
    $scope.isEdit                 = angular.isDefined($scope.fundTeam.teamId && $scope.fundTeam.teamId > 0);
    $scope.team                   = angular.copy(team);
    $scope.showValidationMessages = false;

    //#endregion

    $scope.save = function () {
      if (this.createTeamForm.$valid) {
        $scope.isSaving = true;
        fdDashboardSvc.saveFundTeam($scope.fundTeam).then(
          function(response) {
            var action = $scope.isEdit ? "updated" : "created";
            toastr.success("Team " + action + " successfully");
            response.isEdit = $scope.isEdit;
            $uibModalInstance.close(response);
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error('Oops!  Problem saving team', 'There were some problems saving the new team.  Please try again');
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.close = function (cancelType) {
      if ($scope.isEdit) {
        $scope.fundTeam.team.name = $scope.team.team.name;
        $scope.fundTeam.captainEmail = $scope.team.captainEmail;
        $scope.fundTeam.goalAmount = $scope.team.goalAmount;
      }
      $uibModalInstance.dismiss(cancelType);
    };
  }];
///#source 1 1 /app/fund/controlpanel/fdControlPanelDonationsCtrl.js
fundoloApp.controller('fdControlPanelDonationsCtrl', [
  '$scope',
  function ($scope) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'donations';

    //#endregion

    //#region === Public Methods


    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelNotificationsCtrl.js
fundoloApp.controller('fdControlPanelNotificationsCtrl', [
  '$scope', 
  function ($scope) {

    //#region === Initialize ===

    'use strict';
    $scope.$parent.pageResolve = 'notifications';

    //#endregion

    //#region === Public Methods


    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelTeamMemberCtrl.js
fundoloApp.controller('fdControlPanelTeamMemberCtrl', [
  '$scope',
  function ($scope) {
    //#region === Initialize ===
    'use strict';
    $scope.$parent.pageResolve = 'teammember';

    //#endregion

    //#region === Public Methods ===

    //#endregion

    //#region === Private Methods ===


    //#endregion
  }
]);
///#source 1 1 /app/fund/controlpanel/fdControlPanelEditCtrl.js
fundoloApp.controller('fdControlPanelEditCtrl', [
    '$scope', function($scope) {
        //#region === Initialize ===

        'use strict';
        $scope.$parent.pageResolve = 'edit';
        $scope.newUploads = [];

        //#endregion
    }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-drctv.js
fundoloApp.directive('fdControlpanelWidgetsNotificationsDrctv', [
  '$timeout', '$filter', 'fdDashboardSvc',
  function ($timeout, $filter, fdDashboardSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {

      $scope.$watch('notifications', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isArray(newValue.data)) {
          $scope.init();
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {

        var s = $filter('filter')($scope.notifications.data, { typeId: 'Notification', note: { viewed: false}  });
        $scope.$parent.newNotifications = s.length;
        $scope.isLoading = false;
        $timeout(function () {
          $('#notificationScrollbar').perfectScrollbar();
        }, 1000);
          
      }

      $scope.getListClass = function (notification) {
        return fdDashboardSvc.getListClass(notification);
      }

      //#endregion
    }

    p.scope = {
      notifications: '='
    }

    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-activity-drctv.js
fundoloApp.directive('fdControlpanelWidgetsActivityDrctv', [
  '$timeout', '$state', 'fdDashboardSvc',
  function ($timeout, $state, fdDashboardSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-activity-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        fdDashboardSvc.history(fundId, 1, 10).then(
          function(items) {
            $scope.activities = items.data;
            $scope.isLoading = false;
            $timeout(function () {
              $('#activityScrollbar').perfectScrollbar();
            }, 1000);
          },
          function(response) {
            toastr.error(response.error_description);
            $scope.isLoading = false;
          });
      }

      $scope.getActivityIcon = function (activity) {
        var activityClass = '';

        switch (activity.typeId) {
          case '25PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-dark-blue icon-trophy';
            break;
          case '50PercentFundRaised':
            activityClass = 'icon-custom icon-xs  rounded-x icon-line icon-bg-orange icon-trophy';
            break;
          case '75PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-grey icon-trophy';
            break;
          case '100PercentFundRaised':
            activityClass = 'icon-custom icon-xs rounded-x icon-line icon-bg-brown icon-trophy';
            break;
        }

        return activityClass;
      }

      $scope.gotoActivity = function () {
        $state.go('^.history');
      }
      //#endregion
    }

    p.scope = {
      
    }

    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv.js
fundoloApp.directive('fdControlpanelWidgetsDonationsDrctv', [
  '$timeout', '$uibModal', '$state',
  function ($timeout, $uibModal, $state) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('donations', function(newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });

      //#region === Public Methods ===

      $scope.init = function () {
        $timeout(function () {
          $('#donationScrollbar').perfectScrollbar();
        }, 1000);
      }

      $scope.gotoDonations = function () {
        $state.go('^.donations');
      }

      $scope.addDonation = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv-mdl.min.html',
          controller: donationAddMdlCtrl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'sm-med',
          resolve: {
            fundId: function () {
              return $scope.fundId;
            }
          }
        });

        modalInstance.result.then(function (response) {
          $scope.donations.splice(0, 0, response);
          $scope.donations.join();
        }, function (responseCode) {

        });
      }
      //#endregion
    }

    p.scope = {
      donations: '=',
      fundId: '='
    }

    return p;
  }
]);

var donationAddMdlCtrl = [
  '$scope', '$uibModalInstance', '$filter', '$location', 'fundId', 'fdDashboardSvc',
  function($scope, $uibModalInstance, $filter, $location, fundId, fdDashboardSvc) {
    $scope.isSaving = false;
    $scope.thankYouMessage = '';
    $scope.showValidationMessages = false;
    $scope.donation = {
      processingFee: 0,
      beneficiaryAmount: 0,
      systemAmount: 0,
      amount: 0,
      offlineDonation: true,
      statusId: 'Active',
      feeTypeId: 'Level0',
      fundId: fundId
    };

    $scope.ok = function() {
      if (this.offlineDonationFormWidget.$valid) {
        $scope.isSaving = true;
        $scope.donation.amount = $scope.donation.beneficiaryAmount;
        fdDashboardSvc.saveDonation($scope.donation).then(
          function(response) {
            toastr.success("Offline donation completed successfully");
            $uibModalInstance.close(response);
            $scope.isSaving = false;
          },
          function(response) {
            toastr.error('Oops!  Problem saving offline donation', 'There were some problems saving the offline donation.  Please try again');
            $scope.isSaving = false;
          }
        );
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
];

var donationThankYouMdlCtrl = [
  '$scope', '$uibModalInstance', 'fdDashboardSvc', 'donation',
  function ($scope, $uibModalInstance, fdDashboardSvc, donation) {

    $scope.isSaving = false;
    $scope.donation = donation;
    $scope.donationNote = {
      typeId: 'ThankYou',
      donationId: donation.identification,
      fundId: donation.fundId
    };

    $scope.ok = function () {
      if (this.donationThankYouForm.$valid) {
        $scope.isSaving = true;
        fdDashboardSvc.createDonationNote($scope.donationNote).then(
          function (response) {
            donation.thankYouNoteSent = true;
            toastr.success("Thank you note sent successfully");
            $uibModalInstance.close(response);
            $scope.isSaving = false;
          },
          function (response) {
            toastr.error('Oops!  Problem sending Thank you note', 'There were some problems sending a Thank you note.  Please try again');
            $scope.isSaving = false;
          }
        );
      }

      $uibModalInstance.close(donation);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }];
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv.js
fundoloApp.directive('fdControlpanelWidgetsUpdatesDrctv', [
  '$timeout', 'fdDashboardSvc', '$uibModal',
  function ($timeout, fdDashboardSvc, $uibModal) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv.min.html';

    p.link = function($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 5;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 5;
      //=============================


      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        $scope.fundId = fundId;
        $scope.getFundUpdates();
      }

      $scope.getFundUpdates = function () {
        $scope.isLoading = true;


        fdDashboardSvc.allUpdatesByFundIdStatusId($scope.fundId).then(
          function(fundUpdates) {
            $scope.updates = fundUpdates;
            $timeout(function() {
              $('#updateScrollbar').perfectScrollbar();
            }, 1000);
            initDataTable();
          },
          function(response) {
            toastr.error('Unable to get updates.  Please try again');
            $scope.isLoading = false;
          }
        );
      }

      $scope.updateFundUpdate = function (fundUpdate) {
        fundUpdate.isUpdating = true;
        fundUpdate.statusId = 'Deleted';

        fdDashboardSvc.saveUpdate(fundUpdate).then(
          function (response) {
            $scope.updates.splice($scope.updates.indexOf(fundUpdate), 1);
            toastr.success("Post updated successfully");
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems remove the update.  Please try again');
            fundUpdate.isUpdating = false;
          }
        );
      };

      $scope.verifyDelete = function (update, isDeleting) {
        update.isDeleting = isDeleting;
      };

      $scope.postUpdate = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv-mdl.min.html',
          controller: fdControlPanelWidgetsUpdatesMdl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'med',
          resolve: {
            fundId: function () {
              return $scope.fundId;
            }
          }
        });

        modalInstance.result.then(function (response) {
          $scope.updates.splice(0, 0, response);
          $scope.updates.join();
        }, function (responseCode) {

        });
      }

      //#endregion

      //#region === Methods ===
      function initDataTable() {
        $scope.isLoading = false;
        $scope.itemList = $scope.updates;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
      }

      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.items.push($scope.itemList[i]);
          }
        }
      }

      //#endregion

      //#region === Events ===
      $scope.onSelectPage = function () {
        setRecordsToDisplay();
      };
      //#endregion
    }

    p.scope = {}

    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-updates-drctv-mdl.js
var fdControlPanelWidgetsUpdatesMdl = [
  '$scope', '$uibModalInstance', '$timeout', '$window', 'fdDashboardSvc', 'seAuthSvc', 'Facebook', 'twitterConfiguration', 'fundId',
  function ($scope, $uibModalInstance, $timeout, $window, fdDashboardSvc, seAuthSvc, Facebook, twitterConfiguration, fundId) {

    //#region === Initialization ===
    $scope.isLoading  = true;
    $scope.isSaving   = false;
    $scope.facebookIt = false;
    $scope.tweetIt    = false;
    $scope.mailIt     = false;
    $scope.twittered  = false;
    $scope.user       = seAuthSvc.user;

    $scope.$watch(function () {
      return Facebook.isReady();
    }, function (newVal) {
      $scope.facebookReady = true;
    });


    //#endregion 

    $scope.facebookMark = function () {
      $scope.facebookIt = !$scope.facebookIt;
    }

    $scope.intentLogin = function ($event, provider) {
      var checkbox = $event.target;
      if (checkbox.checked) {
        switch (provider) {
          case 'Facebook':
            //Logged in through Facebook
            if ($scope.user.isExternal && $scope.user.externalProvider === 'Facebook') {
              return;
            }
            //Client Logged In
            if (angular.isDefined($scope.user.facebookToken)) {
              return;
            }
            $scope.facebookGetLoginStatus();
            break;
          case 'Twitter':
            $scope.twitterGetLoginStatus();
            break;
          default:
        }
      }
    }

    $scope.intentLoginButton = function (provider) {

      switch (provider) {
        case 'Email':
          $scope.mailIt = !$scope.mailIt;
          break;
        case 'Facebook':
          $scope.facebookIt = !$scope.facebookIt;

          if (!$scope.facebookIt) return;

          //Logged in through Facebook
          if ($scope.user.isExternal && $scope.user.externalProvider === 'Facebook') {
            return;
          }
          //Client Logged In
          if (angular.isDefined($scope.user.facebookToken)) {
            return;
          }
          $scope.facebookGetLoginStatus();
          break;
        case 'Twitter':
          $scope.tweetIt = !$scope.tweetIt;

          if (!$scope.tweetIt) return;
          $scope.twitterGetLoginStatus();
          break;
        default:
      }
    }

    $scope.facebookLogin = function () {
      $scope.isSaving = true;
      Facebook.login(function (response) {
        if (response.status == 'connected') {
          $scope.isSaving = true;
          setFacebookUser(response);
        } else {
          toastr.error('There was a problem connecting to Facebook.  Please refresh and try again');
          $scope.facebookIt = false;
          $scope.tweetIt = false;
          $scope.isSaving = false;
        }

      });
    };

    $scope.me = function () {
      Facebook.api('/me', function (response) {
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        $scope.$apply(function () {
          $scope.user = response;
        });

      });
    };

    $scope.facebookGetLoginStatus = function () {
      Facebook.getLoginStatus(function (response) {
        if (response.status == 'connected') {
          setFacebookUser(response);
        }
        else
          $scope.facebookLogin();
      });
    }

    $scope.twitterGetLoginStatus = function () {
      if (!$scope.twittered) {
        $window.open(twitterConfiguration.signInUrl + $scope.fundId, 'Funding Miracles Authorization', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
      }
      $scope.twittered = true;
      return false;
    }

    $scope.mailMark = function () {
      $scope.mailIt = !$scope.mailIt;
    }

    $scope.saveFundUpdate = function (fundUpdate) {
      $scope.isSaving = true;
      if (this.controlPanelUpdateMdlForm.$valid) {
        fundUpdate.fundId           = fundId;
        fundUpdate.postedToFacebook = $scope.facebookIt;
        fundUpdate.postedToTwitter  = $scope.tweetIt;
        fundUpdate.postedToEmail    = $scope.mailIt;
        fdDashboardSvc.saveUpdate(fundUpdate).then(
          function (response) {
            clearbaseUpdate();
            $scope.isSaving = false;
            toastr.success("Update posted successfully");
            $uibModalInstance.close(response);
          },
          function (response) {
            toastr.error('Oops!  Problem creating update', 'There were some problems creating the update.  Please try again');
            $scope.isSaving = false;
          });
      } else {
        toastr.info('Oops!  Description is required', 'Description is required.  Please fill it in.');
        $scope.isSaving = false;
      }

    };

    $scope.verifyDelete = function (fundUpdate, isDeleting) {
      fundUpdate.isDeleting = isDeleting;
    };

    $scope.updateFundUpdate = function (fundUpdate) {
      fundUpdate.isUpdating = true;
      fundUpdate.statusId = 'Deleted';

      fdDashboardSvc.saveUpdate(fundUpdate).then(
        function (response) {
          $scope.fundUpdates.splice($scope.fundUpdates.indexOf(fundUpdate), 1);
          toastr.success("Connection updated successfully");
        },
        function (response) {
          toastr.error('Oops!  Problem removing update', 'There were some problems remove the update.  Please try again');
          fundUpdate.isUpdating = false;
        }
      );
    };

    //#region === Events ===

    $scope.$on('Facebook:statusChange', function (ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function () {
          $scope.salutation = true;
          $scope.byebye = false;
        });
      } else {
        $scope.$apply(function () {
          $scope.salutation = false;
          $scope.byebye = true;

          // Dismiss byebye message after two seconds
          $timeout(function () {
            $scope.byebye = false;
          }, 2000);
        });
      }
    });

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //#endregion

    //#region === Methods ===

    function clearbaseUpdate() {
      $scope.fundUpdate.content = '';
      $scope.isDeleting = false;
      $scope.facebookIt = false;
      $scope.tweetIt = false;
      $scope.mailIt = false;
    }

    function setFacebookUser(response) {
      $scope.user.facebookToken = response.authResponse;
      seAuthSvc.extendUser($scope.user);
      seAuthSvc.postClaim('Facebook', response.authResponse.accessToken).then(
        function () {
          $scope.isSaving = false;
        }, function () {
          toastr.error('Facebook gnomes are on the prowl.  Refresh your page and try again.');
        });
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-supporters-drctv.js
fundoloApp.directive('fdControlpanelWidgetsSupportersDrctv', [
  '$timeout', '$state',
  function ($timeout, $state) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-supporters-drctv.min.html';


    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('supporters', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });

      //#region === Private methods ===


      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {
        $timeout(function () {
          $('#supporterScrollbar').perfectScrollbar();
        }, 1000);

        //findPlayers();
      }

      $scope.viewAll = function () {
        $state.go('^.supporters');
      }

      // #endregion
    }

    p.scope = {
      supporters : '='
    }

    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-teams-drctv.js
fundoloApp.directive('fdControlpanelWidgetsTeamsDrctv', [
  '$location', '$timeout', '$uibModal', '$state', 'fdSvc',
  function($location, $timeout, $uibModal, $state, fdSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-teams-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {

      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region Public methods

      $scope.init = function (fundId) {
        $scope.fundId = fundId;

        fdSvc.fundTeams(fundId).then(
          function(teams) {
            $scope.teams = teams;
            $timeout(function () {
              $('#teamScrollbar').perfectScrollbar();
            }, 1000);
            $scope.isLoading = false;
          },
          function(response) {
            toastr.error('We seemed to have misplaced your teams.  Please refresh and try again');
            $scope.isLoading = false;
          });

      }

      $scope.openTeam = function(team) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/fdControlPanelTeamsMdl.min.html',
          controller: fdControlPanelTeamsMdl,
          size: 'sm-med',
          backdrop: 'true', //true:false:static(user click on background)
          resolve: {
            fundId: function() {
              return $scope.fundId;
            },
            team: function() {
              return team;
            }
          }
        });

        modalInstance.result.then(function (response) {
          if (response.isEdit) {

          } else {
            $scope.teams.splice(0, 0, response);
            $scope.teams.join();
          }
        }, function() {
          //Modal dismissed
        });
      };

      $scope.openTeamFund = function(team) {
        $location.path('/fund/controlpanel/' + team.teamFundId + '/overview');
      }

      $scope.viewAll = function () {
        $state.go('^.teams');
      }

      $scope.getProgressPercentage = function(fund) {
        if (angular.isUndefined(fund)) {
          return { 'width': '0%' };
        }
        var percentageNumber = fdSvc.getProgressPercentage(fund, true);
        var percentage = {
          'width': $filter('number')(percentageNumber, 0) + '%'
        };

        return percentage;
      };
      //#endregion
    }

    p.scope = {}

    return p;
  }
])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-teams-lg-drctv.js
fundoloApp.directive('fdControlpanelWidgetsTeamsLgDrctv', [
  '$timeout', '$location', '$uibModal', '$filter', 'fdSvc',
  function ($timeout, $location, $uibModal, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-teams-lg-drctv.min.html';


    p.link = function($scope, element, attributes, controller) {
      $timeout(function() {
        $('li').tooltip();
      }, 1000);

      //#region === Initialize ===
      $scope.items               = [];
      $scope.itemList            = [];
      $scope.showWarning         = false;
      $scope.isLoading           = true;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 7;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 4;
      //=============================

      //=============================
      // Initialize Conditional Markup (columns per row)
      $scope.numberColumns      = 2;
      $scope.itemRows           = [];
      $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
      $scope.itemColumns        = [];
      $scope.itemColumns.length = $scope.numberColumns;
      //=============================[$parent.$index * numberColumns + $index]

      fdSvc.fundTeams($scope.fundId).then(
        function (teams) {
          $scope.teams = teams;
          $scope.init();
        },
        function (response) {
          $log.error(response);
        });

      //#endregion

      //#region === Public Methods ===
      $scope.init = function () {
        $scope.setUpImages();
        $scope.isLoading = false;
        $scope.itemList = $scope.teams;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
      }

      $scope.setUpImages = function () {
        angular.forEach($scope.teams, function (value, index) {
          value.mainFundImage = fdSvc.getMainImage(value.fund.item.itemUploadList, 389, 246);
        });
      }

      $scope.findUserByType = function (fund, userTypeId) {
        var supporter = {};
        var exists;
        if (angular.isUndefined(fund)) {
          return {};
        }

        switch (userTypeId) {
          case 'Originator':
            if (angular.isDefined(fund.originator)) {
              supporter = fund.originator;
              exists = true;
            }
            break;
          case 'Beneficiary':
            if (angular.isDefined(fund.beneficiary)) {
              supporter = fund.beneficiary;
              exists = true;
            }
            break;
        }

        if (exists) {
          return supporter;
        }

        var userList = fund.userList;
        angular.forEach(userList, function (value, key) {
          switch (userTypeId) {
            case 'Originator':
              supporter = value;
              findPhotoUrl(supporter);
              fund.originator = supporter;
              break;
            case 'Beneficiary':
              supporter = value;
              findPhotoUrl(supporter);
              fund.beneficiary = supporter;
              break;
          }
        });

        return supporter;
      }

      $scope.hide = function (parentIndex) {
        return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
      };

      $scope.onSelectPage = function () {
        setRecordsToDisplay();
      };

      $scope.openTeam = function (team) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/fdControlPanelTeamsMdl.min.html',
          controller: fdControlPanelTeamsMdl,
          size: 'sm-med',
          backdrop: 'true', //true:false:static(user click on background)
          resolve: {
            fundId: function () {
              return $scope.fundId;
            },
            team: function () {
              return team;
            }
          }
        });

        modalInstance.result.then(function (createdTeam) {
          if (createdTeam.isEdit) {

          } else {
            createdTeam.name = createdTeam.team.name;
            createdTeam.dateEntered = createdTeam.team.dateEntered;
            $scope.teams.push(createdTeam);
            $scope.itemList = $scope.teams;
            $scope.totalItems = $scope.itemList.length;
            setRecordsToDisplay();
          }
        }, function () {
          //Modal dismissed
        });
      };

      $scope.teamSettings = function (team) {
        $location.path('/fund/controlpanel/' + team.teamFundId + '/overview');
      }

      $scope.getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList, true);
      };

      $scope.getProgressBarPercentage = function (fund) {
        if (angular.isUndefined(fund)) {
          return { 'width': '0%' };
        }
        var percentageNumber = $scope.getProgressPercentage(fund);
        var percentage = {
          'width': percentageNumber + '%'
        };

        return percentage;
      };

      $scope.getProgressPercentage = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        var percentageNumber = (this.getTotalDonation(fund) / fund.goalAmount) * 100;
        var percentage = $filter('number')(percentageNumber, 0);

        return percentage;
      };

      //#endregion

      //#region === Private Methods ===


      function findPhotoUrl(user) {
        if (angular.isDefined(user.facebook)) {
          user.photoUrl = 'https://graph.facebook.com/' + user.facebook.providerKey + '/picture?width=54&height=54';
        } else {
          user.photoUrl = user.avatarUploadTempLocation;
        }
      }

      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.items.push($scope.itemList[i]);
          }
        }

        $scope.itemRows = [];
        $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
      }

      //#endregion

    }

    p.scope = {
      fundId: '='
    }
    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-squad-drctv.js
fundoloApp.directive('fdControlpanelWidgetsSquadDrctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-squad-drctv.min.html';

    p.controller = [
      '$scope', '$location',
      function($scope, $location) {

        //#region === Private methods ===

        function findPlayers() {
          angular.forEach($scope.supporters, function(value, key) {
            switch(value.userTypeId) {
              case 'Originator':
                $scope.originator = value;
                break;
              case 'Beneficiary':
                $scope.beneficiary = value;
                break;
            }
          });

          if (angular.isUndefined($scope.beneficiary)) {
            $scope.beneficiary = $scope.originator;
          }

          findPhotoUrl($scope.beneficiary);
          findPhotoUrl($scope.originator);
        }

        function findPhotoUrl(user) {
          if (angular.isDefined(user.facebook)) {
            user.photoUrl = 'https://graph.facebook.com/' + user.facebook.providerKey + '/picture?width=54&height=54';
          } else {
            user.photoUrl = user.avatarUploadTempLocation;
          }
        }

        //#endregion

        //#region === Public Methods ===

        $scope.init = function() {
          findPlayers();
        }

        $scope.viewAll = function() {
          
        }

        $scope.sendEmail = function(user) {
          
        }
        // #endregion

      }
    ];

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('supporters', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });
    }

    p.scope = {
      supporters : '='
    }
    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-comments-drctv.js
fundoloApp.directive('fdControlpanelWidgetsCommentsDrctv', [
  '$timeout', '$state', 'fdSvc',
  function ($timeout, $state, fdSvc) {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-comments-drctv.min.html';

    p.link = function($scope, element, attributes, controller) {
      attributes.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fundId) {
        fdSvc.comment(fundId, 1, 10).then(
          function(items) {
            $scope.comments = items.data;

            $scope.isLoading = false;

            $timeout(function () {
              $('#commentScrollbar').perfectScrollbar();
            }, 1000);
          },
          function(response) {
            toastr.error(response.error_description);
           $scope.isLoading = false;
          });

      }

      $scope.viewAll = function () {
        $state.go('^.comments');
      }

      //#endregion === /Public Methods ===
    };

    //Interpolate scope: bastardize
    p.scope = {}

    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-badge-drctv.js
fundoloApp.directive('fdControlpanelWidgetsBadgeDrctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict   = 'E';
    p.transclude = true;
    p.replace    = true;
    p.template   = '<div ng-class="badgeClass">{{badgeContent}}</div>';


    p.link = function ($scope, element, attributes, controller) {
      //#region === Initialize ===
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      }, false);
      //#endregion

      //#region === Public Methods ===
      $scope.init = function () {
        if (angular.isDefined($scope.fund)) {

          // easy-bg-v2 (right corner), easy-block-v1-badge (left-top)
          // rgba-aqua, rgba-yellow, rgba-blue, rgba-purple, rgba-red, rgba-default
          $scope.badgeClass   = ['easy-block-v1-badge', 'rgba-aqua'];
          $scope.badgeContent = 'In Progress';

          //Set up new campaigns
          var pastDate    = moment.utc().subtract(30, 'days');
          var startDate   = moment.utc($scope.fund.item.startDate);
          var endDate     = moment.utc($scope.fund.item.endDate);
          var presentDate = moment.utc();

          if (startDate > pastDate) {
            $scope.badgeContent = "New!";
            $scope.badgeClass = ['easy-bg-v2', 'rgba-default'];
            return;
          }

          if (presentDate > endDate) {
            $scope.badgeContent = "Ended";
            $scope.badgeClass = ['easy-block-v1-badge', 'rgba-red'];
            return;
          }

          var total = 0;
          angular.forEach($scope.fund.donationList, function (item, key) {
            total += item.beneficiaryAmount;
          });
          if (total > $scope.fund.goalAmount) {
            $scope.badgeContent = "Goal Reached!";
            $scope.badgeClass = ['easy-block-v1-badge', 'rgba-purple'];
            return;
          }
        }
      }

      //#endregion

      //#region === Private Methods ===

      //#endregion
    }

    p.scope = {
      fund: '='
    }
    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-badgev2-drctv.js
fundoloApp.directive('fdControlpanelWidgetsBadgev2Drctv', [
  function () {
    'use strict';
    var p = {};

    p.restrict   = 'E';
    p.transclude = false;
    p.replace    = true;
    p.template   = '<div ng-class="badgeClass"><i ng-class="iconClass"></i> {{badgeContent}}</div>';


    p.link = function ($scope, element, attributes, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fund) {
        if (angular.isDefined(fund)) {
          //Start with Default
          // easy-bg-v2 (right corner), easy-block-v1-badge (left-top)
          // rgba-aqua, rgba-yellow, rgba-blue, rgba-purple, rgba-red, rgba-default
          $scope.badgeClass    = [];
          $scope.badgeContent  = '';
          $scope.iconClass     = [];
          $scope.bannerVersion = $scope.bannerVersion || 'rgba-banner';

          ////Set up new campaigns
          var pastDate    = moment.utc().subtract(10, 'days');
          var startDate   = moment.utc(fund.item.startDate);
          var endDate     = moment.utc(fund.item.endDate);
          var warningDate = moment.utc(fund.item.endDate).subtract(7, 'days');
          var presentDate = moment.utc();

          if (moment(startDate).isAfter(pastDate)) {
            $scope.badgeContent = "New!";
            $scope.badgeClass = ['shop-rgba-red', $scope.bannerVersion];
            return;
          }

          if (moment(presentDate).isAfter(endDate)) {
            // Check if goal reached
            var total = 0;

            angular.forEach(fund.donationList, function (item, key) {
              total += item.beneficiaryAmount;
            });

            if (total >= fund.goalAmount) {
              $scope.iconClass = ['fa', 'fa-trophy'];
              $scope.badgeContent = "Goal Reached!";
              $scope.badgeClass = ['shop-rgba-purple', $scope.bannerVersion];
              return;
            }

            $scope.badgeContent = "Ended";
            $scope.badgeClass = ['shop-rgba-dark', $scope.bannerVersion];
            return;
          }

          if (moment(presentDate).isAfter(warningDate)) {
            $scope.badgeContent = "Ending Soon!";
            $scope.badgeClass = ['shop-rgba-yellow', $scope.bannerVersion];
            return;
          }
        }
      }

      //#endregion

      //#region === Private Methods ===

      //#endregion
    }

    p.scope = {
      fund: '=',
      bannerVersion: '@'
    }
    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-embed-drctv.js
fundoloApp.directive('fdControlpanelWidgetsEmbedDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-embed-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.isLoading = false;
          $scope.init();
        }
      });
    };

    p.controller = [
      '$scope', 'appUrl',
      function ($scope, appUrl) {
        $scope.showWarning = false;


        //#region === Public Methods ===
        $scope.init = function() {
          $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
          $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
          $scope.cardSrc = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
          $scope.buttonSrc = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
          $scope.widgetSrc = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;
        }


        //#endregion === /Public Methods ===
      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-print-drctv.js
fundoloApp.directive('fdControlpanelWidgetsPrintDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-print-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      });
    };

    p.controller = [
      '$scope', '$compile', 'appUrl', 'mdCoreDataSvc',
      function ($scope, $compile, appUrl, mdCoreDataSvc) {

        //#region === Initialize ===

        $scope.showWarning = false;
        $scope.isLoading   = true;
        $scope.imageUrl    = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;

        //#endregion
  
        //#region === Public Methods ===

        $scope.init = function(fund) {
          $scope.imageUrl = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
        }

        $scope.printIt = function () {
          
          var printContents = '<img src="' + appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink + '">';

          if (mdCoreDataSvc.isIe() > 1) {
            mdCoreDataSvc.printPage(printContents);
          } else {
            var element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
            mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
          }

        }

        $scope.imageLoaded = function () {
          $scope.isLoading = false;
          $scope.$apply('isLoading');
        }
        //#endregion

      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-share-drctv.js
fundoloApp.directive('fdControlpanelWidgetsShareDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-share-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.fundToOpenGraph(newValue);
        }
      });
    };

    p.controller = [
      '$scope', '$state', 'appUrl', 'fdSvc',
      function ($scope, $state, appUrl, fdSvc) {

        //#region === Initialize ===

        $scope.showWarning = false;
        $scope.isLoading   = true;
        $scope.socials     = ['facebook', 'twitter', 'mail'];
        $scope.baseUrl     = appUrl.base;
        var permalink      = '';
        var url            = '';
        //#endregion

        //#region === Public Methods ===

        $scope.fundToOpenGraph = function (fund) {
          permalink            = fund.item.permalink;
          url                  = appUrl.base + '/' + permalink;
          $scope.mainFundImage = fdSvc.getMainImage(fund.item.itemUploadList, 230, 150);
          var defaultImageUrl  = appUrl.base + $scope.mainFundImage;
          $scope.socialData    = {
            fund: fund,
            facebookData: {
              method: 'feed',
              link: url,
              picture: defaultImageUrl,
              name: fund.item.title,
              caption: 'www.fundingmiracles.com',
              description: fund.item.description
            },
            twitterData: {
              hashtags: '',
              via: 'fundingmiracles',
              related: '//www.fundingmiracles.com',
              text: fund.item.title,
              url: url
            }
          };
        }

        $scope.viewFund = function() {
          $state.go('home.permalink', {'permalink': permalink});
        }

        //#endregion

      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-profile-drctv.js
fundoloApp.directive('fdControlpanelWidgetsProfileDrctv', ['appUrl', 'fdSvc',
  function (appUrl, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-profile-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isDefined(newValue.item)) {
          $scope.fundUrl       = appUrl.base + '/' + $scope.fund.item.permalink;
          $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 240, 200);
        }
      });
    }

    p.scope = {
      fund: '='
    }
    return p;
  }])
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-analytics-drctv.js
fundoloApp.directive('fdControlpanelWidgetsAnalyticsDrctv', [
  '$timeout', '$state', 'mdGoogleSvc',
  function ($timeout, $state, mdGoogleSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.transclude  = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-analytics-drctv.min.html';

    p.link = function ($scope, element, attributes, controller) {
      attributes.$observe('permalink', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && newValue.length > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.lastWeekLoading  = true;
      $scope.lastMonthLoading = true;
      $scope.allTimeLoading = true;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function (permalink) {
        lastWeek(permalink);
        lastMonth(permalink);
        allTime(permalink);
      }

      //#endregion

      //#region === Private ====
      function lastWeek(permalink) {
        var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function(items) {
            $scope.lastWeekData = items[0];
            $scope.lastWeekLoading = false;
          },
          function(response) {
            $scope.lastWeekData = {
              pageviews: 'N/A'
            }
            $scope.lastWeekLoading = false;
          });
      }

      function lastMonth(permalink) {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function (items) {
            $scope.lastMonthData = items[0];
            $scope.lastMonthLoading = false;
          },
          function (response) {
            $scope.lastMonthData = {
              pageviews: 'N/A'
            }
            $scope.lastMonthLoading = false;
          });
      }

      function allTime(permalink) {
        var startDate = '2014-01-01';
        var endDate = moment().add(1, 'days').format('YYYY-MM-DD');
        mdGoogleSvc.pageView(permalink, startDate, endDate).then(
          function (items) {
            $scope.allTimeData = items[0];
            $scope.allTimeLoading = false;
          },
          function (response) {
            $scope.allTimeData = {
              pageviews: 'N/A'
            }
            $scope.allTimeLoading = false;
          });
      }
      //#endregion
    }

    p.scope = {

    }

    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-settings-drctv.js
fundoloApp.directive('fdControlpanelWidgetsSettingsDrctv', ['$timeout', 'fdDashboardSvc',
  function ($timeout, fdDashboardSvc) {

    //#region === Initialization ===

    'use strict';
    var p         = {};
    p.transclude  = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-settings-drctv.min.html';
    p.replace     = true;

    //#endregion

    //#region === Directives ====

    p.link = function ($scope, element, attributes, controller) {

      //#region === Initialize ===
      var buttonOnTitle          = 'Turn On All';
      var buttonOffTitle         = 'Turn Off All';

      $scope.showWarning         = false;
      $scope.isLoading           = true;
      $scope.isSavingEmail       = false;
      $scope.isSavingFacebook    = false;
      $scope.isSavingConfig      = false;
      $scope.isSavingStatus      = false;
      $scope.isSavingDonation    = false;
      $scope.emailTurnOn         = true;
      $scope.facebookTurnOn      = true;
      $scope.configTurnOn        = true;
      $scope.donationTurnOn      = true;
      $scope.emailButtonTitle    = buttonOnTitle;
      $scope.facebookButtonTitle = buttonOnTitle;
      $scope.configButtonTitle   = buttonOnTitle;
      $scope.donationButtonTitle = buttonOnTitle;
      $scope.tabActives          = {
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false
      };
      var timer;

      if (angular.isDefined($scope.activeTab)) {

        switch ($scope.activeTab) {
          case '2':
            $scope.tabActives.tab2 = true;
            break;
          case '3':
            $scope.tabActives.tab3 = true;
            break;
          case '4':
            $scope.tabActives.tab4 = true;
            break;
          case '5':
            $scope.tabActives.tab5 = true;
            break;
          case '1':
          default:
            $scope.tabActives.tab1 = true;
            break;
        }
      } else {
        $scope.tabActives.tab1 = true;
      }
      //#endregion

      //#region === Public Methods

      $scope.updateStatus = function (status) {
        $scope.isSavingStatus = true;

        fdDashboardSvc.status($scope.fund.identification, status).then(
        function (response) {
          timer = $timeout(function () {
            toastr.success('Setting updated successfully');
            $scope.isSavingStatus = false;
          }, 2000);
        }, function (response) {
          toastr.error('Uh oh.  There is a problem changing the status.  Please refresh and try again.');
          $scope.isSavingStatus = false;
        });
      }

      $scope.updateSettings = function (section) {
        sectionSpinner(section, true);
        fdDashboardSvc.saveFundSettings($scope.fund.settings).then(
          function (response) {
            toastr.success('Setting updated successfully');
            timer = $timeout(function () {
              sectionSpinner(section, false);
            }, 2000);
          },
          function (response) {
            toastr.error('There was an issue saving the settings.  Please refresh and try again');
          });
      }

      $scope.updateSettingsGroup = function (section) {
        switch (section) {
          case 'email':
            $scope.fund.settings.emailReceiveUserDonation        = $scope.emailTurnOn;
            $scope.fund.settings.emailSendSupporter25Raised      = $scope.emailTurnOn;
            $scope.fund.settings.emailReceiveUserSupport         = $scope.emailTurnOn;
            $scope.fund.settings.emailSendSupporter50Raised      = $scope.emailTurnOn;
            $scope.fund.settings.emailReceiveUserFundraiser      = $scope.emailTurnOn;
            $scope.fund.settings.emailSendSupporter75Raised      = $scope.emailTurnOn;
            $scope.fund.settings.emailReceiveUserTeamMember      = $scope.emailTurnOn;
            $scope.fund.settings.emailSendSupporterFriendSupport = $scope.emailTurnOn;
            $scope.emailTurnOn                                   = !$scope.emailTurnOn;
            displayButtonTitle(section, $scope.emailTurnOn);
            break;
          case 'facebook':
            $scope.fund.settings.facebookPostAddVideo       = $scope.facebookTurnOn;
            $scope.fund.settings.facebookPostUserSupport    = $scope.facebookTurnOn;
            $scope.fund.settings.facebookPostAddImage       = $scope.facebookTurnOn;
            $scope.fund.settings.facebookPostUserDonate     = $scope.facebookTurnOn;
            $scope.fund.settings.facebookPostUpdate         = $scope.facebookTurnOn;
            $scope.fund.settings.facebookPostUserFundraiser = $scope.facebookTurnOn;
            $scope.facebookTurnOn                           = !$scope.facebookTurnOn;
            displayButtonTitle(section, $scope.facebookTurnOn);
            break;
          case 'config':
            $scope.fund.settings.allowAnonymousDonors  = $scope.configTurnOn;
            $scope.fund.settings.allowCommenting       = $scope.configTurnOn;
            $scope.fund.settings.allowRecuringPayments = $scope.configTurnOn;
            $scope.fund.settings.usePaymentModal       = $scope.configTurnOn;
            $scope.configTurnOn                        = !$scope.configTurnOn;
            displayButtonTitle(section, $scope.configTurnOn);
            break;
          case 'donation':
            $scope.fund.settings.donationHideAmount    = $scope.donationTurnOn;
            $scope.fund.settings.donationHideDonorName = $scope.donationTurnOn;
            $scope.donationTurnOn                      = !$scope.donationTurnOn;
            displayButtonTitle(section, $scope.donationTurnOn);
            break;
          default:
            break;
        }

        $scope.updateSettings(section);
      }

      //#endregion

      //#region === Private Methods ===

      function sectionSpinner(section, isOn) {
        switch (section) {
          case 'email':
            $scope.isSavingEmail = isOn;
            break;
          case 'facebook':
            $scope.isSavingFacebook = isOn;
            break;
          case 'config':
            $scope.isSavingConfig = isOn;
            break;
          case 'donation':
            $scope.isSavingDonation = isOn;
            break;
          default:
            break;
        }
      }

      function displayButtonTitle(section, isOn) {
        switch (section) {
          case 'email':
            $scope.emailButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
            break;
          case 'facebook':
            $scope.facebookButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
            break;
          case 'config':
            $scope.configButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
            break;
          case 'donation':
            $scope.donationButtonTitle = isOn ? buttonOnTitle : buttonOffTitle;
            break;
          default:
            break;
        }
      }

      //Kill the timer:good practice
      $scope.$on('destroy', function (event) {
        $timeout.cancel(timer);
      });
      //#endregion
    }

    p.scope = {
      fund: '=',
      activeTab : '@'
    }

    //#endregion
    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-lg-drctv.js
fundoloApp.directive('fdControlpanelWidgetsDonationsLgDrctv', [
  '$timeout', '$uibModal', '$filter', 'mdScrollScrollSvc', 'fdDashboardSvc',
function ($timeout, $uibModal, $filter, mdScrollScrollSvc, fdDashboardSvc) {

    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-lg-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $timeout(function () {
        $('li').tooltip();
        $('button').tooltip();
      }, 1000);

      $scope.$watch('donations', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && angular.isArray(newValue)) {
          $scope.init();
        }
      });

      //#region === Initialize ===

      $scope.items       = [];
      $scope.itemList    = [];
      $scope.showWarning = false;
      $scope.isLoading   = true;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 7;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 16;
      //=============================

      //=============================
      // Initialize Conditional Markup (columns per row)
      $scope.numberColumns      = 2;
      $scope.itemRows           = [];
      $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
      $scope.itemColumns        = [];
      $scope.itemColumns.length = $scope.numberColumns;
      //=============================[$parent.$index * numberColumns + $index]

      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {
        $scope.isLoading  = false;
        $scope.itemList   = $filter('orderBy')($scope.donations, 'dateEntered', true);
        $scope.totalItems = $scope.donations.length;
        setRecordsToDisplay();
      }

      $scope.addDonation = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-drctv-mdl.min.html',
          controller: donationAddMdlCtrl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'sm-med',
          resolve: {
            fundId: function () {
              return $scope.fundId;
            }
          }
        });

        modalInstance.result.then(function (response) {
          $scope.donations.splice(0, 0, response);
          $scope.donations.join();
          $scope.init();
        }, function (responseCode) {

        });
      }

      $scope.hide = function (parentIndex) {
        return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
      };

      $scope.onSelectPage = function () {
        setRecordsToDisplay();
        mdScrollScrollSvc.scrollTo('fundDonationsPage', 20);

      };

      $scope.openThankYou = function (donation) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-donations-thankyou-mdl.min.html',
          controller: donationThankYouMdlCtrl,
          backdrop: 'static', //true:false:static(user click on background)
          size: 'sm-med',
          resolve: {
            donation: function() {
               return donation;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {

        }, function () {

        });
      };

      $scope.makeAnonymous = function (donation) {
        $scope.saveDonationxLite(donation);
        $scope.verifyMakeAnonymous(donation, false);
      };

      $scope.saveDonationxLite = function (donation) {
        var dx = {
          identification: donation.identification,
          isPrivateAmount: donation.isPrivateAmount,
          isPrivateDonorName: donation.isPrivateDonorName,
          message: donation.message,
          fundId: $scope.fundId
        }

        fdDashboardSvc.saveDonationxLite(dx).then(
          function (response) {
            toastr.success("Operation completed successfully");
            donation.isUpdating = false;
            return true;
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems remove the update.  Please try again');
            $log.error(response);
            donation.isUpdating = false;
            return false;
          }
        );
      }

      $scope.save = function (donation) {
        donation.isUpdating = true;

        fdDashboardSvc.saveDonation(donation).then(
          function (response) {
            if (donation.statusId === 'Deleted') {
              $scope.fund.donationList.splice($scope.fund.donationList.indexOf(donation), 1);
            }
            toastr.success("Operation completed successfully");
            donation.isUpdating = false;
          },
          function (response) {
            toastr.error('Oops!  Problem removing update', 'There were some problems removing the update.  Please try again');
            donation.isUpdating = false;
          }
        );
      };

      $scope.deleteDonation = function (donation) {
        donation.statusId = 'Deleted';
        $scope.save(donation);
        $scope.verifyDeleteDonation(donation, false);
      };
      $scope.verifyDeleteComment = function (donation, isCommentDeleting) {
        donation.isCommentDeleting = isCommentDeleting;
      };

      $scope.verifyMakeAnonymous = function (donation, isMakeAnonymous) {
        donation.isMakeAnonymous = isMakeAnonymous;
      };

      $scope.verifyDeleteDonation = function (donation, isDeleteDonation) {
        donation.isDonationDeleting = isDeleteDonation;
      };

      $scope.deleteComment = function (donation) {
        var message = donation.message;
        donation.message = '';
        if ($scope.saveDonationxLite(donation) === false) {
          donation.message = message;
        }
        $scope.verifyDeleteComment(donation, false);
      };


      $scope.showDelete = function (statusId) {
        return statusId === 'Active';
      };
      //#endregion

      //#region === Private Methods ===
      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.items.push($scope.itemList[i]);
          }
        }

        $scope.itemRows = [];
        $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
      }

      //#endregion
    }

    p.scope = {
      donations: '=',
      fundId: '='
    }

    return p;
  }
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-lg-drctv.js
fundoloApp.directive('fdControlpanelWidgetsNotificationsLgDrctv', [
  '$timeout', '$uibModal', '$filter', 'mdScrollScrollSvc', 'fdDashboardSvc',
function ($timeout, $uibModal, $filter, mdScrollScrollSvc, fdDashboardSvc) {

  'use strict';
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-lg-drctv.min.html';

  p.link = function ($scope, element, attributes, controller) {

    $scope.$watch('notifications', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue.data)) {
        $scope.init();
      }
    });

    $timeout(function () {
      $('li').tooltip();
      $('button').tooltip();
    }, 1000);

    //#region === Initialize ===

    $scope.items       = [];
    $scope.itemList    = [];
    $scope.showWarning = false;
    $scope.isLoading   = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 16;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 2;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods ===

    $scope.init = function (fundId) {
        setProperties();
        $scope.isLoading        = false;
        var s                   = $filter('filter')($scope.notifications.data, { typeId: 'Notification' });
        $scope.itemList         = $filter('orderBy')(s, 'note.dateEntered', true);
        $scope.totalItems       = $scope.notifications.count;
        setRecordsToDisplay();

    }

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.onSelectPage = function () {
      setRecordsToDisplay();
      mdScrollScrollSvc.scrollTo('fundNotificationsPage', 20);

    };

    $scope.getListClass = function (notification) {
      return fdDashboardSvc.getListClass(notification);
    }

    $scope.respond = function(notification) {

      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-mdl.min.html',
        controller: fdControlpanelWidgetsNotificationsMdl,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          rowItem: function () { return notification; }
        }
      });

      modalInstance.result.then(function (responseCode) {
        handleViewed(notification, responseCode);
      }, function (responseCode) {
        handleViewed(notification, responseCode);
      });

    }

    //#endregion

    //#region === Private Methods ===

    function handleViewed(notification, responseCode) {

      switch (responseCode) {
        case 'closeSuccess':
          notification.note.viewed = true;
          $scope.$parent.newNotifications--;
          break;
        default:
          break;
      }
    }

    function setProperties() {
      angular.forEach($scope.notifications.data, function (value, index) {
        switch (value.typeId) {
          case 'Donation':
            value.note.subject = "You have a new donation!";
            break;
          case 'Notification':
            value.note.subject = "Someone is trying to connect with you!";
            break;
          case 'Support':
            value.note.subject = "A new Supporter has joined your campaign!";
        }
      });
    }

    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    //#endregion
  }

  p.scope = {
    notifications: '='
  }

  return p;
}
]);
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-mdl.js
var fdControlpanelWidgetsNotificationsMdl = ['$scope', '$uibModalInstance', '$uibModal', 'fdDashboardSvc', 'appUrl', 'rowItem',
  function ($scope, $uibModalInstance, $uibModal, fdDashboardSvc, appUrl, rowItem) {

    //#region ===Initialize===
    $scope.sender = {
      fundNote: {
        respondNoteId: rowItem.identification,
        fundId: rowItem.fundId,
        typeId: 'Response'
      },

      firstName: rowItem.note.firstName,
      lastName: rowItem.note.lastName,
      email: rowItem.note.email,
      comments: '',
      isPrivate: 'true'

    }

    $scope.showValidationMessages = false;
    $scope.isResponding           = false;
    $scope.record                 = rowItem;

    //#endregion

    $scope.respond = function () {
      $scope.isResponding = true;
      if (this.fundNotificationResponseForm.$valid) {
        fdDashboardSvc.respondFundNote($scope.sender).then(function (response) {
          toastr.success('Response sent successfully');
          $uibModalInstance.close($scope.sender);
        }, function (response) {
          toastr.error('Our gnomes are having trouble delivering this message.  Please refresh and try again');
        });
      } else {
        $scope.showValidationMessages = true;
      }
      $scope.isResponding = false;

    };

    $scope.cancel = function (reason) {

      if ($scope.record.note.viewed === false) {
        fdDashboardSvc.updateFundNoteView($scope.record.fundId, $scope.record.note.identification)
          .then(function () {
            $uibModalInstance.dismiss('closeSuccess');
          }, function () {
            $uibModalInstance.dismiss('closeFail');
          });
      } else {
        $uibModalInstance.dismiss(reason);
      }

    };
  }];
///#source 1 1 /app/fund/controlpanel/widgets/fd-controlpanel-widgets-edit-drctv.js
fundoloApp.directive('fdControlpanelWidgetsEditDrctv', [
    '$timeout', '$window', '$filter', 'Upload', 'fdDashboardSvc', 'seAuthSvc', 'mdCoreDataSvc', 'appUrl',
function($timeout, $window, $filter, Upload, fdDashboardSvc, seAuthSvc, mdCoreDataSvc, appUrl) {

        //#region === Initialization ===

        'use strict';
        var p         = {};
        p.transclude  = true;
        p.restrict    = 'E';
        p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-edit-drctv.min.html';
        p.replace     = true;

        //#endregion

        //#region === Directives ====

        p.link = function($scope, element, attributes, controller) {

            var origUploads;

            //#region === Initialize ===
            $scope.$watch('fund', function(newValue, oldValue) {
                if (angular.isDefined(newValue.item)) {
                    $scope.permalink  = newValue.item.permalink;
                    origUploads       = newValue.item.itemUploadList;
                    $scope.uploadList = newValue.item.itemUploadList;
                    $scope.dt         = new Date(newValue.item.endDate);
                    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
                }
            }, true);

            (function() {
                if (seAuthSvc.isLoggedIn()) {
                    getFundCategories();
                    $timeout(function() {
                        $window.CKEDITOR.replace('funddescription');
                        $scope.showTextEditor = true;
                    }, 1000);
                    return;
                }

            })();

            $scope.$watch('newUploads', function(uploads) {
                $scope.formUpload = false;
                if (uploads != null) {
                    $scope.uploads(uploads);
                }
            });

            $scope.uploads = function(uploads) {
                for (var i = 0; i < uploads.length; i++) {
                    $scope.errorMsg = null;
                    generateThumb(uploads[i]);
                    upload(uploads[i]);
                }
            };

            //#endregion


            //#region === Public Methods ===

            $scope.saveBasic = function() {
                $scope.isSaving = true;
                if (this.editFundBasicForm.$valid) {
                    $scope.fund.item.description = CKEDITOR.instances.funddescription.getData();
                    $scope.fund.item.endDate = $filter('date')($scope.dt, 'M/dd/yyyy');
                    $scope.save();
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.savePermalink = function() {
                $scope.isSaving = true;
                if (this.editFundPermalinkForm.$valid) {
                    $scope.fund.item.permalink = this.permalink;
                    $scope.save();
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };
            $scope.save = function (successCallBack, successTitle) {
                var fund = {};
                angular.copy($scope.fund, fund);
                fund.fundNoteList = [];
                fund.donationList = [];
                fdDashboardSvc.save(fund).then(
                    function () {
                      if (angular.isFunction(successCallBack)) {
                        successCallBack(successTitle);
                      } else {
                        $scope.isSaving = false;
                        toastr.success('The fundraiser updated successfully');
                      }
                    },
                    function() {
                        $scope.isSaving = false;
                        $scope.showValidationMessages = true;
                        toastr.error('There was an error saving this fund.  Please try again');
                    });
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                minDate: new Date(),
                startingDay: 1
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.changeColor = function (color) {
              $scope.fund.pageColor = color;
              $scope.save(toastrSuccessMessage, 'Nice Color! We went and changed it for you back here.');
            }

            $scope.changeSkin = function (skin) {
              $scope.fund.pageSkin = skin;
              var message = 'We\'ve changed the style to dark';
              if (skin === 'Light') {
                message = 'We\'ve changed the style to light';
              }
              $scope.save(toastrSuccessMessage, message);
            }

            $scope.changeLayout = function (layout) {
              $scope.fund.pageLayout = layout;
              var message = 'We\'ve changed the style to wide';
              if (layout === 'Boxed') {
                message = 'We\'ve changed the layout to boxed';
              }
              $scope.save(toastrSuccessMessage, message);
            }

            //#region === Image Function ===

            $scope.saveImage = function(itemUpload, isImage, context) {

                $scope.isSaving = true;
                if (isImage) {
                    itemUpload.file.progress = 90;
                }

                if (angular.isDefined($scope.fund.identification) && $scope.fund.identification > 0) {
                    fdDashboardSvc.saveFundUpload($scope.fund.identification, itemUpload).then(
                        function(fundImage) {
                            if (isImage) {
                                itemUpload.file.progress = 100;
                                itemUpload.file.actionVerb = '';
                            } else {
                                context.videoUrl = "";
                            }

                            var img = initFileCreate(fundImage, fundImage.sortOrder);
                            itemUpload.uploadId = fundImage.uploadId;
                            itemUpload.upload.identification = fundImage.uploadId;
                            itemUpload.imgUrl = img.imgUrl;
                            itemUpload.thumbUrl = img.thumbUrl;

                            if (img.file) {
                                itemUpload.file = img.file;
                            }

                            $scope.isSaving = false;
                            toastr.success("Image(s) saved successfully");
                            //$scope.fund.item.itemUploadList.push(img);
                            $scope.fund.item.itemUploadList.push(itemUpload);
                        },
                        function(response) {
                            toastr.error('We could not upload your file.  Please refresh and try again');
                            $scope.fund.item.itemUploadList = origUploads;
                            $scope.isSaving = false;
                            if (isImage) {
                                itemUpload.file.progress = 0;
                            }
                        });
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.getThumbnail = function(u) {

                var thumbNail = u.thumbUrl;

                switch (u.upload.typeId) {
                    case 'web.Video.Vimeo':
                    case 'web.Video.YouTube':
                        thumbNail = u.upload.name;
                        break;
                }

                return thumbNail;
            };
            $scope.sortableOptions = {
                update: function(e, ui) {

                },
                stop: function(e, ui) {
                    for (var index = 0; index < $scope.fund.item.itemUploadList.length; index++) {
                        $scope.fund.item.itemUploadList[index].sortOrder = index;
                    }

                    fdDashboardSvc.updateFundUploads($scope.fund.identification, $scope.fund.item.itemUploadList).then(
                        function(response) {

                            toastr.success('Success!');
                        }, function(response) {
                            toastr.error('There was a problem updating.  Please refresh and try again');
                        });
                }
            };

            $scope.remove = function(u) {
                var id = u.upload.identification;
                u.isRemoving = true;
                //TODO: Create confirmation modal
                fdDashboardSvc.deleteFundUploads($scope.fund.identification, id).then(
                    function(response) {

                        $scope.uploadList = $filter('orderBy')(organize($scope.uploadList.filter(
                            function(itemUpload) {
                                return itemUpload.uploadId !== id;
                            }), false, null, true), 'sortOrder');

                        $scope.fund.item.itemUploadList = $scope.uploadList;

                        toastr.success('Upload removed successfully');
                    },
                    function(response) {
                        u.isRemoving = false;
                        toastr.error('We\'re having trouble removing this image.  Try refreshing your page and trying again');
                    });
            };
            $scope.addVideoUrl = function() {
                $scope.isSaving = true;
                if (this.fundEditUploadVideoForm.$valid) {
                    var video = {
                        isDefault: false,
                        sortOrder: findLatestSortOrder(),
                        itemId: $scope.fund.identification,
                        upload: {
                            contentType: 'video/mpeg',
                            locationHttp: this.videoUrl,
                            description: this.videoUrl,
                            location: this.videoUrl,
                            name: this.videoUrl,
                            originalFileName: this.videoUrl,
                            isPrivate: false,
                            CategoryId: 'Multimedia',
                            typeId: 'web.Video'
                        },
                        imgUrl: this.videoUrl,
                        thumbUrl: this.videoUrl,
                    };

                    $scope.saveImage(video, false, this);
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.getThumbnail = function(u) {

                var thumbNail = u.thumbUrl;

                switch (u.upload.typeId) {
                    case 'web.Video.Vimeo':
                    case 'web.Video.YouTube':
                        thumbNail = u.upload.name;
                        break;
                }

                return thumbNail;
            };
            $scope.getUploadType = function(u) {
                var typeId = 'Image';

                switch (u.upload.typeId) {
                    case 'web.Video':
                    case 'web.Video.Video':
                    case 'web.Video.YouTube':
                        typeId = 'Video';
                        break;
                }

                return typeId;
            };
            $scope.getUploadRowIcon = function(u) {
                return {
                    'fa-image': u.upload.typeId === 'web.Image',
                    'fa-youtube': u.upload.typeId === 'web.Video.YouTube',
                    'fa-vimeo-square': u.upload.typeId === 'web.Video.Vimeo'
                };
            }; //#endregion

            //#endregion


            //#region === Private Methods ===

            //#region === Fund Categories ===

            function findCategory(categoryToFind) {
                if (angular.isDefined(categoryToFind)) {
                    var result = $.grep($scope.fundCategoryOptions, function(e) {
                        return e.identification === categoryToFind;
                    });

                    //should only be one result
                    return result[0].identification;
                } else {
                    return null;
                }
            };

            function getFundCategories() {
                mdCoreDataSvc.getAllFundCategories().then(
                    function(categories) {
                        $scope.fundCategoryOptions = categories;
                        $scope.categoryId = findCategory($scope.fund.categoryId);
                    },
                    function(response) {
                        $log.error(response);
                    });
            }

            //#endregion

            //#region === Image Function ===

            var findLatestSortOrder = function() {
                var length = 0;
                angular.forEach($scope.uploadList, function(value, key) {
                    if (value.sortOrder >= length) {
                        length = value.sortOrder + 1;
                    }
                });
                return length || 0;
            };

            function generateThumb(file) {
                if (file != null) {
                    if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                        $timeout(function() {
                            var fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function(e) {
                                $timeout(function() {
                                    file.dataUrl = e.target.result;
                                });
                            };
                        });
                    }
                }
            }

            function upload(file) {
                var data = $scope.formUpload ? {
                    //Place from properties here if applicable
        
                } : {};

                Upload.upload({
                  url: appUrl.api + '/api/uploader',
                    method: 'POST',
                    fields: data,
                    file: file
                }).progress(function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    if (angular.isUndefined(file.actionVerb)) {
                        file.actionVerb = 'Uploading';
                    }
                    var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    file.progress = progress > 80 ? 80 : progress;

                }).success(function(data, status, headers, config) {
                    file.progress   = 85;
                    file.actionVerb = 'Saving';
                    file.result     = data;
                    var newFile     = traverse(file.result, true, false, file);
                    $scope.saveImage(newFile, true);

                }).error(function(err) {
                    if (err.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                });

            }

            function organize(files, append, length, queryable, remoteFile) {
                var res = [];
                var nextSort = length || 0;

                for (var i = 0; i < files.length; i++) {
                    var file = queryable ? files[i].upload : files[i];
                    res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
                    nextSort++;
                }

                return res;
            }

            function traverse(files, append, queryable, remoteFile) {
                var res = [];
                var length = 0;
                angular.forEach($scope.uploadList, function(value, key) {
                    if (value.sortOrder >= length) {
                        length = value.sortOrder + 1;
                    }
                });
                var nextSort = findLatestSortOrder();

                for (var i = 0; i < files.length; i++) {
                    var file = queryable ? files[i].upload : files[i];
                    file.typeId = 'web.Image';
                    res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
                    nextSort++;
                }

                return res[0];
            }

            function initFile(file, sortOrder, remoteFile) {
                var imgUrl = file.location;
                var thumbUrl = file.location;
                if (file.typeId == 'web.Image') {
                    //imgUrl = '/azure/' + file.containerName + '/'
                    //    + file.name
                    //    + '?height=560&width=550&mode=crop&scale=both';

                    //thumbUrl = '/azure/' + file.containerName + '/'
                    //    + file.name
                    //    + '?height=180&width=180&mode=crop&scale=both';

                  imgUrl = file.location
                        + '?height=560&width=550&mode=crop&scale=both';

                  thumbUrl = file.location
                        + '?height=180&width=180&mode=crop&scale=both';
                }

                var img = {
                    isDefault: false,
                    sortOrder: sortOrder,
                    uploadId: file.identification || 0,
                    itemId: $scope.fund.identification,
                    upload: file,
                    imgUrl: imgUrl,
                    thumbUrl: thumbUrl,
                };
                if (angular.isDefined(remoteFile)) {
                    img.file = remoteFile;
                }

                return img;
            }

            function initFileCreate(itemUpload, sortOrder, remoteFile) {
                var imgUrl = itemUpload.upload.location;
                var thumbUrl = itemUpload.upload.location;
                if (itemUpload.upload.typeId == 'web.Image') {
                    //imgUrl = '/azure/' + itemUpload.upload.containerName + '/'
                    //    + itemUpload.upload.name
                    //    + '?height=560&width=550&mode=crop&scale=both';

                    //thumbUrl = '/azure/' + itemUpload.upload.containerName + '/'
                    //    + itemUpload.upload.name
                    //    + '?height=180&width=180&mode=crop&scale=both';

                  imgUrl = itemUpload.upload.location
                        + '?height=560&width=550&mode=crop&scale=both';

                  thumbUrl = itemUpload.upload.location
                        + '?height=180&width=180&mode=crop&scale=both';
                }

                itemUpload.imgUrl = imgUrl;
                itemUpload.thumbUrl = thumbUrl;

                if (angular.isDefined(remoteFile)) {
                    itemUpload.file = remoteFile;
                }

                return itemUpload;
            }

          //#endregion

            //#region === Style ===

              function toastrSuccessMessage(message, title) {
                $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
                toastr.success(message);
              }

            //#endregion

              //Kill the timer:good practice
              $scope.$on('destroy', function(event) {
                  $timeout.cancel(timer);
              });

              //#endregion
        };
        p.scope = {
            fund: '=',
            activeTab: '@'
        };

        //#endregion
        return p;
    }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-featured-slider-drctv.js
fundoloApp.directive('fdWidgetsFeaturedSliderDrctv', ['$log', '$filter', '$timeout', 'fdSvc',
    function ($log, $filter, $timeout, fdSvc) {
      var p = {};

      p.templateUrl = '/app/fund/widgets/fd-widgets-featured-slider-drctv.min.html';
      p.transclude = true;
      p.replace = true;
      p.restrict = 'E';

      p.link = function (scope, element, attrs, ctrlr) {
        scope.isLoading = true;
        fdSvc.featured(12).then(function (funds) {
          scope.funds = funds;
          $timeout(function () {

            //App.initBxSlider();
          }, 500);
          scope.isLoading = false;
        }, function (response) {
          $log.error(response);
        });
      }

      p.controller = [
        '$scope', function($scope) {
          $scope.getProgressPercentage = function(fund) {
            return fdSvc.getProgressPercentage(fund);
          }

          $scope.getProgressPercentageWidth = function(fund) {
            return fdSvc.getProgressPercentageWidth(fund);
          };

          $scope.leftString = function(content, stringLength) {
            if (!angular.isNumber(stringLength)) {
              return content;
            } else {
              var parsedString = content.substring(0, stringLength);
              return parsedString;
            }
          };
        }
      ];

      return p;
    }])
///#source 1 1 /app/fund/widgets/fd-widgets-contact-drctv.js
fundoloApp.directive('fdWidgetsContactDrctv', [
  function () {
    'use strict';
    var p = {};

    //#region === Initialize ===
    p.templateUrl = '/app/fund/widgets/fd-widgets-contact-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.restrict    = 'E';

    p.controller = ['$scope', '$uibModal',
      function ($scope, $uibModal) {

        $scope.contact = function () {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fd-widgets-contact-mdl.min.html',
            controller: contactFundModal,
            resolve: {
              fund: function () {
                return $scope.fund;
              }
            }
          });

          modalInstance.result.then(function (sender) {
            //Do nothing on close
          }, function () {
            //Do nothing on cancel
          });
        }
      }
    ];

    p.scope = {
      fund: '='
    }
    //#endregion

    return p;
  }
]);

var contactFundModal = ['$scope', '$uibModalInstance', 'fdSvc', 'fund',
  function ($scope, $uibModalInstance, fdSvc, fund) { 
    //#region === Initialize ===
    $scope.fund = fund;
    $scope.sender = {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }
    $scope.showValidationMessages = false;
    $scope.isSending = false; 
    //#endregion

    $scope.sendEmail = function () {
      if (this.sendMailContactForm.$valid) {
        $scope.isSending = true;
        fdSvc.createFundNote({
          fundNote: {
            fundId: $scope.fund.identification, 
            fundUserId: $scope.fund.originator.identification,
            typeId: 'Notification'
          },

          email: $scope.sender.email,
          firstName: $scope.sender.firstName,
          lastName: $scope.sender.lastName,
          comments: $scope.sender.message
        }).then(function(response) {
          toastr.success('Awesome!  You have successfully contacted ' + $scope.fund.originator.firstName);
          $uibModalInstance.close('Success');
          $scope.isSending = false;
        }, function(response) {
          toastr.error('It seems that we cannot make contact. Please refresh and try again');
          $scope.isSending = false;
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSending = false;
      }
    }

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];
///#source 1 1 /app/fund/widgets/fd-widgets-support-drctv.js
'use strict';

fundoloApp.directive('fdWidgetsSupportDrctv', [
  '$uibModal', '$state', 'Facebook', 'appUrl','seAuthSvc', 'fdSvc',
  function($uibModal, $state, Facebook, appUrl,seAuthSvc, fdSvc) {
    var p = {};

    p.templateUrl = '/app/fund/widgets/fd-widgets-support-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.restrict    = 'E';

    p.link = function($scope, element, attrs, ctrlr) {
      $scope.$watch('fund', function(newValue, oldValue) {
        if (angular.isUndefined(newValue.identification)) {
          return;
        }

        if (!initialized) {
          $scope.init(newValue.identification);
        }
      }, true);

      $scope.$watch('level', function(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        switch (newValue) {
          case 1:
            $scope.buttonTitle = 'Become a Fundraiser';
            $scope.title       = 'Make a Difference';
            $scope.buttonIcon  = 'fa-code-fork';
            break;
          case 2:
          case 3:
            $scope.buttonTitle = 'Share this';
            $scope.title       = 'Make a Difference';
            $scope.buttonIcon  = 'fa-share-alt';
            break;
          default:
            break;
        }
      });

      //#region === Initialize
      var initialized    = false;
      $scope.buttonTitle = 'Become a supporter';
      $scope.title       = 'Not ready to donate?';
      $scope.buttonIcon  = 'fa-users';
      $scope.level       = 0;

      //#endregion ===Initialize

      //#region === Publicly Exposed Methods

      $scope.init = function (fundId) {
        initialized = true;
        displaySupportLevel(fundId);
      };
      $scope.support = function () {
        switch ($scope.level) {
          case 0:
            createSupporter();
            break;
          case 1:
            createFundraiser();
          case 2:
          case 3:
            createShare();
            break;
        }
      }; //#endregion === Publicly Exposed Methods ===

      //#region === Methods

      function createSupporter() {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fd-widgets-support-mdl.min.html',
          controller: supportFundModal,
          windowClass: 'myclass',
          size: 'sm-med',
          resolve: {
            fund: function () {
              return $scope.fund;
            }
          }
        });

        modalInstance.result.then(function (level) {
          if (level > 0) {
            $scope.level = level; //Supporter
            showThankYou();
          }
        }, function (reason) {
          $scope.level = reason;
        });
      }

      function createFundraiser() {
        //Create fund then redirect to edit page
        fdSvc.copy2($scope.fund.item.identification, seAuthSvc.getBearerToken()).then(
          function (response) {
            $state.go('home.permalink', { 'permalink': response.item.permalink });
          }, function (response) {
            toastr.error('Ohh no!  Let\'s refresh and try again.');
          });
      }

      function createShare() {
        Facebook.ui($scope.data.facebookData, function (data) {
          //TODO: CREATE MODAL thank you with stats
          toastr.success('Thank you for sharing my fundraiser!');
        });
      }

      function displaySupportLevel(fundId) {
        //Check support Level
        if (seAuthSvc.isLoggedIn()) {
          fdSvc.supportsByUser(fundId, seAuthSvc.getBearerToken()).then(
            function (response) {
              //determine level of supports
              //1. if fundraiser, show 'Share Fundraiser'
              //2. if Supporter, show 'Become a Fundraiser'
              //3. if neither, show, Become a supporter (default)
              if (response.length > 0) {
                angular.forEach(response, function (item, key) {
                  switch (item.userTypeId) {
                    case 'Supporter':
                      $scope.level = 1;
                      break;
                    case 'Fundraiser':
                      $scope.level = $scope.level < 2 ? 2 : $scope.level;
                      break;
                    default:
                      $scope.level = $scope.level < 3 ? 3 : $scope.level;
                      break;
                  }
                });
              }
            }, function (response) {
              toastr.warning('Unable to find supports for this user.  Please contact the administrator');
            });
        }
      }

      function showThankYou() {
        //TODO Add modal to display a thank you
        toastr.info('Thank you so much for your support!');
      }

      //#endregion === Methods ===
    };

    p.scope = {
      fund: '=',
      data: '='
    };
    return p;
  } 
]);

var supportFundModal = [
  '$scope', '$uibModalInstance', 'appUrl', 'fdSvc', 'fund', 'seAuthSvc',
  function($scope, $uibModalInstance, appUrl, fdSvc, fund, seAuthSvc) {

    //#region === Initialize ===
    var returnUrl = appUrl.base + '/authenticate?z=1';
    $scope.facebookUrl = '';
    $scope.isLoggedIn = seAuthSvc.isLoggedIn();
    $scope.fund = fund;
    $scope.showValidationMessages = false;
    $scope.isSupporting = false;
    $scope.supported = false;
    $scope.support = {
      message: '',
      privateMessage: '',
      postToFacebook: true,
      fundId: $scope.fund.identification
    };
    $scope.user = {
      statusId: 'Active',
      role: seAuthSvc.userRoles.user,
      userName: '',
      confirmEmail: '',
      token: {},
      isAuthenticated: false
    };

    //Set up user
    $scope.$watch('user', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      $scope.isLoggedIn = seAuthSvc.isLoggedIn();
    }, true);

    //Set up facebook call
    (function() {
      seAuthSvc.singleExternalLogin('Facebook', returnUrl, true).then(
        function(response) {
          $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
        },
        function() {
          toastr.error('Unable to get Facebook login url.  Please refresh and try again');
        });

      if (seAuthSvc.isLoggedIn()) {
        fdSvc.supportByUser($scope.fund.identification, seAuthSvc.getBearerToken()).then(
          function (response) {
            $scope.supported = response.isSupporting;
          }, function (response) {
            switch (response.status) {
              case 409:
                $scope.supported = true;
                toastr.warning("You are already a supporter!  Would you like to increase your impact and become a fund raiser?");
                $uibModalInstance.dismiss(1);
                break;
              default:
                $scope.supported = false;
                break;
            }
          });
      }
    })();

    //#endregion === Initialize ===

    //#region === Private methods ===

    var sendSupport = function(closeOnError) {
      fdSvc.support($scope.support, seAuthSvc.getBearerToken()).then(
        function(response) {
          $uibModalInstance.close(1);
        },
        function(response) {
          var level = 0;
          switch (response.status) {
            case 400:
              level = 3;
              toastr.error('You are already the originator and cannot become a supporter.');
              break;
            case 409:
              level = 1;
              if (response.data.userTypeId === 'Supporter') {
                toastr.warning("You are already a supporter!  Would you like to increase your impact and become a fund raiser?");
              } else if (response.data.userTypeId === 'Fundraiser') {
                level = 3;
                toastr.warning("You are already a Fundraiser!  Make a difference by sharing this campaign");
              }

              break;
            default:
              toastr.error('It seems that support has hit a snag. Please refresh and try again');
              break;
          }

          $scope.isSupporting = false;
          if (closeOnError) {
            $uibModalInstance.dismiss(level);
          }
        });
    }; //#endregion 

    $scope.supportFund = function() {
      $scope.isSupporting = true;
      if (seAuthSvc.isLoggedIn() && seAuthSvc.user.hasRegisteredExternal) {
        sendSupport(true);
      } else {
        seAuthSvc.facebookLogin($scope.user, $scope.facebookUrl).then(
          function() {
            sendSupport(true);
          },
          function(response) {
            toastr.error('This is embarassing.  Please refresh and try again');
            $scope.isSupporting = false;
          });
      }
    };

    $scope.close = function(reason) { 
      if (seAuthSvc.isLoggedIn()) {
        sendSupport(true);
      } else {
        $uibModalInstance.close(reason);
      }
    };
  }
];
///#source 1 1 /app/fund/widgets/fd-widgets-permalink-drctv.js
'use strict';

fundoloApp.directive('fdWidgetsPermalinkDrctv', ['$timeout', 'permalinkData', function($timeout, permalinkData) {
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.transclude  = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-permalink-drctv.min.html';

  p.link = function (scope, element, attrs, controller) {
    var s = scope;
    scope.$watch('permalink', function (newValue, oldValue) {
      scope.showPermalinkAvailable = false;
      if (scope.loading === false) {
        
        if (angular.isUndefined(newValue)) {
          scope.showSpinner = false;
          scope.form.permalink.$setValidity('permalinkExists', true);
          return;
        };

        if (newValue === scope.oldPermalink) {
          scope.form.permalink.$setValidity('permalinkExists', true);
          return;
        }
        scope.permalink = scope.permalink.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-\s]/g, '');
        if (scope.permalink.substring (scope.permalink.length - 1) === '-') {
          scope.permalink = scope.permalink.substring(0, scope.permalink.length - 1);
          return;
        } else if (oldValue !== undefined  && oldValue.substring(oldValue.length - 1) === '-') {
          return;
        }
        
        if (newValue !== undefined && newValue.substring(0,1) === '-') {
          scope.permalink = newValue.substring(1);
        }

        scope.showSpinner = true;
        
        var promise = $timeout(function () {
          if (newValue === scope.permalink && scope.permalink.length >= 3) {
            var permPromise = permalinkData.exists(scope.permalink).then(
              function(permalinkExists) {
                var permalinkVisibility = permalinkExists === true ? false : true;
                scope.form.permalink.$setValidity('permalinkExists', permalinkVisibility);
                scope.showPermalinkAvailable = permalinkVisibility;
                scope.showSpinner = false;

              },
              function(data) {
                //TODO Add error message here
                console.log(data);
                scope.showSpinner = false;
              });
          } else {
            scope.showSpinner = false;
          }
        }, 1500);
        

      } else
        //Check to make sure permalink is defined. if not wait until it is
        scope.loading = angular.isUndefined(scope.permalink) ? true : false;
    });
  };

  p.controller = ['$scope', function($scope) {
    $scope.showSpinner            = false;
    $scope.loading                = true;
    $scope.showPermalinkAvailable = false;
    $scope.oldPermalink           = $scope.permalink;
  }];
  
  p.scope = {    
    permalink: '=',
    form: '='
  };
  return p;
}]);
///#source 1 1 /app/fund/widgets/fd-widgets-teams-drctv.js
'use strict';

fundoloApp.directive('fdWidgetsTeamsDrctv', [
  '$log', '$timeout', '$filter', '$uibModal', 'fdSvc',
  function($log, $timeout, $filter, $uibModal, fdSvc) {
    var p = {};

    p.templateUrl = '/app/fund/widgets/fd-widgets-teams-drctv.min.html';
    p.replace     = true;
    p.transclude  = true;
    p.restrict    = 'E';

    p.link = function($scope, element, attrs, ctrl) {
      attrs.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init();
        }
      });

      //#region === Initialize ===

      $scope.teamCount = 0;

      //#endregion

      //#region === Public Methods ===

      $scope.init = function () {
        fdSvc.fundTeams($scope.fundId).then(
          function (teams) {
            $scope.fundTeams = teams;
            $scope.teamCount = teams.length;
          },
          function (response) {
            $log.error(response);
          });
      }

      $scope.getProgressPercentage = function (fund) {
        if (angular.isUndefined(fund)) {
          return { 'width': '0%' };
        }
        var percentageNumber = fdSvc.getProgressPercentage(fund, true);
        var percentage = {
          'width': $filter('number')(percentageNumber, 0) + '%'
        };

        return percentage;
      };

      $scope.joinTeam = function (fundTeam) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fd-widgets-teams-mdl.min.html',
          controller: joinTeamModal,
          windowClass: 'myclass',
          size: 'sm-med',
          resolve: {
            fundTeam: function () {
              return fundTeam;
            }
          }
        });

        modalInstance.result.then(function (response) {
          toastr.success('You have successfully joined this team!');

        }, function (reason) {
          switch (reason) {
            case 1:
              toastr.warning("That's awesome!  You are already a team member!");
              break;
            default:
              break;
          }
        });
      }

      $scope.mainFundImage =  function(itemUploadList) {
        var mainFundImage = fdSvc.getMainImage(itemUploadList, 262, 197);
        return mainFundImage;
      }
      //#endregion
    }

    return p;
  }
]);

var joinTeamModal = [
  '$scope', '$uibModalInstance', 'appUrl', 'fdSvc', 'fundTeam', 'seAuthSvc',
  function ($scope, $uibModalInstance, appUrl, fdSvc, fundTeam, seAuthSvc) {

    //#region === Initialize ===
    var returnUrl                 = appUrl.base + '/authenticate?z=1';
    $scope.facebookUrl            = '';
    $scope.isLoggedIn             = seAuthSvc.isLoggedIn();
    $scope.fundTeam               = fundTeam;
    $scope.showValidationMessages = false;
    $scope.isJoining              = false;
    $scope.user                   = {
      statusId: 'Active',
      role: seAuthSvc.userRoles.user,
      userName: '',
      confirmEmail: '',
      token: {},
      isAuthenticated: false
    };

    //Set up user
    $scope.$watch('user', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      $scope.isLoggedIn = seAuthSvc.isLoggedIn();
    }, true);

    //Set up facebook call
    seAuthSvc.singleExternalLogin('Facebook', returnUrl, true).then(
      function (response) {
        $scope.facebookUrl = encodeURIComponent(response[0].url + '&display=popup');
      },
      function () {
        toastr.error('Unable to get Facebook login url.  Please refresh and try again');
      });

    //#endregion === Initialize ===

    //#region === Public Methods ===

    $scope.joinTeam = function () {
      $scope.isJoining = true;
      if (seAuthSvc.isLoggedIn() && seAuthSvc.user.hasRegisteredExternal) {
        joinTeam(true);
      } else {
        seAuthSvc.facebookLogin($scope.user, $scope.facebookUrl).then(
          function () {
            joinTeam(true); 
          },
          function (response) {
            $uibModalInstance.dismiss(1);
          });
      }
    };

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };

    $scope.dismiss = function (reason) {
      $uibModalInstance.dismiss(reason);
    };
    //#endregion

    //#region === Private methods ===

    var joinTeam = function (closeOnError) {
      fdSvc.fundTeamJoin($scope.fundTeam.fund.identification, $scope.fundTeam.identification, seAuthSvc.getBearerToken()).then(
        function (response) {
          $uibModalInstance.close(response);
        },
        function (response) {
          var level = 0;
          switch (response.status) {
            case 409:
                level = 1;
              break;
            default:
              level = 100;
              break;
          }

          $scope.isJoining = false;
          if (closeOnError) {
            $uibModalInstance.dismiss(level);
          }
        });
    };

    //#endregion 

  }
];
///#source 1 1 /app/fund/widgets/fd-widgets-featured-drctv.js
fundoloApp.directive('fdWidgetsFeaturedDrctv', ['$log', '$filter', 'fdSvc',
  function ($log, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/fund/widgets/fd-widgets-featured-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.link        = function(scope, element, attrs, controller) {

      fdSvc.featured(4).then(function(funds) {
        scope.funds = funds;
      }, function(response) {
        $log.error(response);
      });
    };

    p.controller = function ($scope) {

      //#region === Public Methods ===
      $scope.leftString = function(content, stringLength) {
        if (!angular.isNumber(stringLength)) {
          return content;
        } else {
          var parsedString = content.substring(0, stringLength);
          return parsedString;
        }
      };


      $scope.getTotalDonation = function(fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      $scope.getProgressPercentageWidth = function(fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      $scope.getProgressPercentage = function(fund) {
        return fdSvc.getProgressPercentage(fund);
      }

      //#endregion /=== Public Methods ===
    };

    return p;
  }])
///#source 1 1 /app/fund/widgets/fd-widgets-sliderv2-drctv.js
fundoloApp.directive('fdWidgetsSliderv2Drctv', [
  '$log', '$filter', 'fdSvc',
  function($log, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/fund/widgets/fd-widgets-sliderv2-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;

    p.link = function ($scope, element, attrs, controller) {
      $scope.$watch('fundCategory', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init();
        }
      });
    };

    p.controller = [
      '$scope', '$timeout',
      function ($scope, $timeout) {

        //#region === Initialization ===
        $scope.isLoading = true;
        //#endregion

        //#region === Public Methods ===

        $scope.init = function () {

          switch ($scope.fundCategory.toLowerCase()) {
            case 'featured':
              initFeatured();
              break;
            case 'completed':
              initCompleted();
              break;
            default:
              initFeatured();
          }
        }

        //#endregion /=== Public Methods ===

        //#region === Private Methods ===

        function initCarousel(lapseTime) {
          $timeout(function () {
            //$window.App.mallDub.initOwlCarousel('#' + $scope.id);
            var owl = angular.element('#' + $scope.owlId);
            owl.owlCarousel({
              items: [4],
              itemsDesktop: [1000, 3], //3 items between 1000px and 901px
              itemsDesktopSmall: [979, 2], //2 items between 901px
              itemsTablet: [600, 1], //1 items between 600 and 0;
              slideSpeed: 1000
            });

            // Custom Navigation Events
            angular.element("#" + $scope.owlId + '-next').click(function () {
              owl.trigger('owl.next');
            });
            angular.element("#" + $scope.owlId + '-prev').click(function () {
              owl.trigger('owl.prev');
            });

            $scope.isLoading = false;
          }, lapseTime);
        }

        function initFeatured() {
          fdSvc.featured(8).then(function (funds) {
            $scope.funds = funds;
            initCarousel(1000);
          }, function (response) {
            $log.error(response);
          });
        }

        function initCompleted() {
          fdSvc.completed(8).then(
          function (funds) {
            $scope.funds = funds;
            initCarousel(1000);
          },
          function (response) {
            $log.error(response);
          });
        }

        //#endregion

      }
    ];

    p.scope = {
      fundCategory: '@',
      title: '@',
      subTitle: '@',
      owlId: '@'
    }
    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-tweets-drctv.js
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
///#source 1 1 /app/fund/widgets/fd-widgets-provider-drctv.js
fundoloApp.directive('fdWidgetsProviderDrctv', [
  function () {
    "use strict";

    var p = {};

    p.transclude = true;
    p.restrict = 'E';
    p.replace = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-provider-drctv.min.html';;

    p.controller = [
      '$scope',
      function ($scope) {

      }
    ];

    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-fund-drctv.js
fundoloApp.directive('fdWidgetsFundDrctv', ['seAuthSvc', 'fdSvc', 'appUrl', '$state',
  function (seAuthSvc, fdSvc, appUrl, $state) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fund-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      $scope.beneficiary      = {};
      $scope.fundLocation    = '';
      $scope.subFundLocation = '';
      $scope.hoverTitle      = 'View Fundraiser';
      $scope.subTitle        = 'Donate';
      $scope.isLoggedIn      = seAuthSvc.isLoggedIn() && $scope.secured;


      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fund) {
        fund["totalDonation"]      = getTotalDonation(fund);
        fund["progressPercentage"] = getProgressPercentageWidth(fund);
        $scope.mainFundImage       = fdSvc.getMainImage($scope.fund.item.itemUploadList, 262, 197);
        $scope.fund                = fund;

        if ($scope.isLoggedIn) {
          $scope.fundLocation = $state.href('home.controlpanel.overview', { fundId: $scope.fund.identification });
          $scope.subFundLocation = $state.href('home.permalink', { permalink: $scope.fund.item.permalink });
        } else {
          $scope.fundLocation = $state.href('home.permalink', { permalink: $scope.fund.item.permalink });
          $scope.subFundLocation = $state.href('home.fundDonate', { fundId: $scope.fund.identification });
        }

        if ($scope.fund.beneficiary == null) {
          $scope.beneficiary = $scope.fund.originator;
        }
      }

      $scope.leftString = function (content, stringLength) {
        if (angular.isDefined(content)) {
          if (!angular.isNumber(stringLength)) {
            return content;
          } else {
            var parsedString = content.substring(0, stringLength);
            if (content.length > stringLength) {
              parsedString += '...';
            }
            return parsedString;
          }
        }

        return '';
      };

      //#endregion

      //#region === Private Methods ===
      var getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      var getProgressPercentageWidth = function (fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      //#endregion
    }

    p.scope = {
      fund: '=',
      secured : '='
    }

    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-fund-xs-drctv.js
fundoloApp.directive('fdWidgetsFundXsDrctv', ['seAuthSvc', 'fdSvc', 'appUrl', '$state',
  function (seAuthSvc, fdSvc, appUrl, $state) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fund-xs-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      attribute.$observe('useFundraiserName', function (value) {
        if (value === 'true') {
          $scope.fundTitle = $scope.fund.aspNetUser.firstName + ' ' + $scope.fund.aspNetUser.lastName;
        }
      });

      //#region === Initialize ===

      $scope.beneficary      = {};
      $scope.fundLocation    = '';
      $scope.subFundLocation = '';
      $scope.hoverTitle      = 'View Fundraiser';
      $scope.subTitle        = 'Donate';
      $scope.isLoggedIn      = seAuthSvc.isLoggedIn() && $scope.secured;


      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fund) {
        fund["totalDonation"]      = getTotalDonation(fund);
        fund["progressPercentage"] = getProgressPercentageWidth(fund);
        $scope.mainFundImage       = fdSvc.getMainImage($scope.fund.item.itemUploadList, 262, 197);
        $scope.fund                = fund;

      }

      $scope.leftString = function (content, stringLength) {
        if (angular.isDefined(content)) {
          if (!angular.isNumber(stringLength)) {
            return content;
          } else {
            var parsedString = content.substring(0, stringLength);
            return parsedString;
          }
        }

        return '';
      };

      $scope.gotoFund = function(permalink) {
       $state.go('home.permalink', {permalink:  permalink});
      }
      //#endregion

      //#region === Private Methods ===

      var getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      var getProgressPercentageWidth = function (fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      //#endregion
    }

    p.scope = {
      fund: '=',
      secured : '='
    }

    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-fundv2-drctv.js
fundoloApp.directive('fdWidgetsFundv2Drctv', ['$state', 'fdSvc', 'appUrl',
  function ($state, fdSvc, appUrl) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fundv2-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      $scope.beneficary = {};

      //#endregion

      //#region === Public Methods ===

      $scope.gotoDonate = function (permalink) {
        $state.go('home.permalink', { 'permalink': permalink });
      }

      $scope.init = function (fund) {
        fund["totalDonation"]      = getTotalDonation(fund);
        fund["progressPercentage"] = getProgressPercentageWidth(fund);
        $scope.mainFundImage       = fdSvc.getMainImage($scope.fund.item.itemUploadList, 262, 197);
        $scope.fund                = fund;

        if ($scope.fund.beneficiary == null) {
          $scope.beneficiary = $scope.fund.originator;
        } else {
          $scope.beneficiary = $scope.fund.beneficiary;
        }
      }

      $scope.leftString = function (content, stringLength) {
        if (angular.isDefined(content)) {
          if (!angular.isNumber(stringLength)) {
            return content;
          } else {
            var parsedString = content.substring(0, stringLength);
            return parsedString;
          }
        }

        return '';
      };

      //#endregion

      //#region === Private Methods ===
      var getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      var getProgressPercentageWidth = function (fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      //#endregion

    }


    p.scope = {
      fund: '='
    }

    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-social-drctv.js
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

///#source 1 1 /app/fund/widgets/fd-widgets-sliderv3-drctv.js
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
              //imgUrl = '/azure/' + value.upload.containerName + '/'
              //  + value.upload.name
              //  + '?height=560&width=550&mode=crop&scale=both';

              //thumbUrl = '/azure/' + value.upload.containerName + '/'
              //  + value.upload.name
              //  + '?height=360&width=480&mode=crop&scale=both';

              imgUrl = value.upload.location
                + '?height=560&width=550&mode=crop&scale=both';

              thumbUrl = value.upload.location
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
///#source 1 1 /app/fund/widgets/fd-widgets-donate-drctv.js
fundoloApp.directive('fdWidgetsDonateDrctv', [
  function() {
    var p = {};

    p.restrict    = "A";

    p.link = function($scope, element, attributes, controller) {
      //Add a click
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue.identification)) {
          element.bind('click', function () {
            $scope.initDonate();
          });
        }
      });
      
    }

    p.controller = [
      '$scope', '$uibModal', '$location', '$analytics', '$state',
      function ($scope, $uibModal, $location, $analytics, $state) {

        //#region === Public Methods ===

        $scope.initDonate = function () {
          $analytics.pageTrack('/' + $scope.fund.item.permalink);
          $analytics.eventTrack('donateOpen');
          $scope.$apply(function() {
            if ($scope.fund.settings.usePaymentModal) {
              byModal();
              //modalThankYou();
            } else {
              if (angular.isDefined($scope.donationAmount) && $scope.donationAmount > 0) {
                $location.path('/fund/donate/' + $scope.fund.identification).search('a', $scope.donationAmount);
              } else {
                $location.path('/fund/donate/' + $scope.fund.identification);
              }
            }
          });

        };

        //#endregion 

        //#region === Private Methods ===

        function byModal() {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fdWidgetsDonateMdl.min.html',
            controller: fdWidgetsDonateMdl,
            resolve: {
              fund: function () {
                return $scope.fund;
              },
              donationAmount: function () {
                var donationAmount = angular.isUndefined($scope.donationAmount) || $scope.donationAmount === 0 ? 35 : $scope.donationAmount;
                return donationAmount;
              }
            },
            size: 'med',
            backdrop: true,
            keyboard: true
          });

          modalInstance.result.then(function (donation) {
            //Add new donation to donation list
            $scope.fund.donationList.push(donation);
            modalThankYou(donation);
          }, function () {
            //Do nothing on cancel
          });
        }

        function modalThankYou(promisedOrder) {
          var modalInstance = $uibModal.open({
            templateUrl: '/app/fund/widgets/fdWidgetsDonateThankYouMdl.min.html',
            controller: fdWidgetsDonateThankYouMdl,
            size: 'med',
            resolve: {
              fund: function () {
                return $scope.fund;
              },
              order: function() {
                return promisedOrder;
              }
            }
          });

          modalInstance.result.then(function () {
            //Do nothing on close
          }, function () {
            //Do nothing on cancel
          });
        }
        //#endregion
      }
    ];

    p.scope = {
      fund: '=',
      donationAmount: '='
    }
    return p;
  }
]);
///#source 1 1 /app/fund/widgets/fd-widgets-updates-drctv.js
fundoloApp.directive('fdWidgetsUpdatesDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-updates-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    $scope.$watch('updates', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {

      }
    });
  };

  //Performs DOM transformation befire link function runs
  p.compile = function (elem, attrs) {

  }

  p.controller = ['$scope', 'cssInjector',
    function ($scope, cssInjector) {

      //#region === Initialize ===
      cssInjector.add("/assets/css/pages/profile.css", true);
      //#endregion


      //#region === Public Methods ===


      //#endregion

      //#region === Private Methods ===


      //#endregion

    }];

  p.scope = {
    updates: '=',
  }

  return p;
}]);

///#source 1 1 /app/fund/widgets/fd-widgets-comments-drctv.js
fundoloApp.directive('fdWidgetsCommentsDrctv', [
  'seAuthSvc','cssInjector', 'fdSvc', 'mdCoreDataSvc',
  function (seAuthSvc, cssInjector, fdSvc, mdCoreDataSvc) {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-comments-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (newValue > 0) {
        $scope.initComments(newValue);
      }
    });

    attrs.$observe('allowCommenting', function(newValue, oldValue) {
      if (newValue.length > 0) {
        $scope.allowCommenting = newValue;
      }
    });

    //#region === Initialize ===

    cssInjector.add("/assets/css/pages/profile.css", true);
    cssInjector.add("/assets/css/plugins/brand-buttons/brand-buttons.css", true);
    cssInjector.add("/assets/css/plugins/brand-buttons/brand-buttons-inversed.css", true);


    $scope.isCommentLoading       = true;
    $scope.user                   = seAuthSvc.user;
    $scope.isCommenting           = false;
    $scope.showValidationMessages = false;

    //=============================
    // Initialize pagination
    $scope.commentMaxSize  = 7;
    $scope.totalComments   = 0;
    $scope.currentPage     = 1;
    $scope.commentsPerPage = 10;
    //=============================

    mdCoreDataSvc.getGeoData2().then(
      function (data) {
        $scope.geo = data;
      },
      function () {
        //Do nothing
      });

    //#endregion

    //#region === Public Methods ===
    $scope.$watch('fundcomments', function(newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.commentsLength = newValue.length;
      }
    });

    $scope.displayCommentName = function(fundComment) {
      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateDonorName) {
          return 'Anonymous';
        }
      } 
      return fundComment.comment.name;
    }

    $scope.displayCommentTitle = function(fundComment) {
      
      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateAmount) {
          return 'commented with a donation:';
        }
      }
      return fundComment.comment.title.toLowerCase();
    }

    $scope.sendUser = function(fundComment) {

      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateDonorName) {
          fundComment.aspNetUser.forceDefault = true;
          return fundComment.aspNetUser;
        }
      }
      return fundComment.aspNetUser;
    }

    $scope.getFundComments = function (pageNumber) {
      $scope.isCommentLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdSvc.comment($scope.fundId, pageNumber, $scope.commentsPerPage).then(
        function (items) {
          $scope.fundcomments = items.data;
          $scope.initCommentPagination(items.count);
          $scope.isCommentLoading = false;
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isCommentLoading = false;
        });
    };

    $scope.initCommentPagination = function (fundsCount) {

      $scope.totalComments = fundsCount;
    }

    $scope.onSelectCommentPage = function () {
      $scope.getFundComments($scope.currentPage);
    };

    $scope.initComments = function (fundId) {
      $scope.fundId = fundId;
      $scope.getFundComments(1);
    }

    $scope.initLogin = function () {
      $scope.isLoggedIn = seAuthSvc.isLoggedIn();
    }

    $scope.likeThis = function (fundcomment) {
      fundcomment.comment.totalLikes++;
      fdSvc.commentLike($scope.fundId, fundcomment).then(
        function (response) {
          toastr.success('You have successfully liked this comment');
        },
        function (response) {
          fundcomment.comment.totalLikes--;
          toastr.error('Our bad!  Could you refresh the page and try again?');
        });
    }

    $scope.postComment = function () {
      $scope.isCommenting = true;
      if (this.donateCommentForm.$valid) {
        var fundComment = {
          fundId: $scope.fundId,
          originId: 'Fund',
          comment: {
            geo: $scope.geo,
            post: $scope.comment,
            title: 'Commented:',
            postToFacebook: $scope.postToFacebook
          }
        }

        fdSvc.commentSave($scope.fundId, fundComment, seAuthSvc.getBearerToken()).then(
          function (response) {
            $scope.fundcomments.push(response);
            toastr.success('Your comments mean alot to us. Thank you!');
            $scope.comment = '';
            $scope.postToFacebook = false;
            $scope.totalComments++;
            $scope.isCommenting = false;
          },
          function (response) {
            toastr.error('Uh oh!  Seems something is up with our system.  Please refresh and try it again');
            $scope.isCommenting = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isCommenting = false;
      }
    }
    //#endregion
  };

    p.controller = [
      '$scope', function($scope) {
        $scope.commentsLength = 0;
      }
    ];

  return p;
}]);

///#source 1 1 /app/fund/widgets/fd-widgets-fundraisers-drctv.js
fundoloApp.directive('fdWidgetsFundraisersDrctv', [
  '$uibModal','fdDashboardSvc',
  function ($uibModal, fdDashboardSvc) {

    'use strict';

    var p = {};

    p.restrict    = 'E';
    p.transclude  = true;
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fundraisers-drctv.min.html';

    p.link = function ($scope, element, attrs, controller) {
      attrs.$observe('fundId', function (newValue, oldValue) {
        if (angular.element.isNumeric(newValue) && newValue > 0) {
          $scope.init(newValue);
        }
      });

      //#region === Initialize ===

      $scope.isLoading = true;
      $scope.fundraisers = [];

      //#endregion

      //#region === Public Methods

      $scope.init = function (fundId) {
        $scope.fundId = fundId;
        $scope.getFundFundraisers(1);
      }

      $scope.getFundFundraisers = function () {
        $scope.isLoading = true;

        fdDashboardSvc.getFundraisers($scope.fundId, 1, 3).then(
          //BUG: ANGULAR If object has array as property then it requires isArray: true
          function (response) {
            $scope.isLoading = false;
            $scope.fundraisers = response.data;
            angular.forEach($scope.fundraisers, function(value, index) {
              value.fund.aspNetUser = value.aspNetUser;
            });
          },
          function (response) {
            toastr.error('Problem getting fundraisers', 'There was a problem accessing your fundraiser.  Please try again');
            $scope.isLoading = false;
          }
        );
      }

      $scope.viewAll = function() {
        $scope.tabSelect();
      }

      $scope.becomeFundraiser = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/widgets/fd-widgets-support-mdl.min.html',
          controller: supportFundModal,
          windowClass: 'myclass',
          size: 'sm-med',
          resolve: {
            fund: function () {
              return $scope.fund;
            }
          }
        });

        modalInstance.result.then(function (level) {
          if (level > 0) {
            $scope.level = level; //Supporter
            showThankYou();
          }
        }, function (reason) {
          $scope.level = reason;
        });
        
      }
      //#endregion

      //#region === Private Methods ===


      //#endregion 
    };


    p.controller = [
        '$scope', function ($scope) {

        }
    ];

    p.scope = {
      tabSelect : '&'
    }
    return p;
  }]);

///#source 1 1 /app/fund/widgets/fdWidgetsSocialPostMdl.js
var fdWidgetsSocialPostMdl = ['$scope', '$uibModalInstance', '$uibModal', 'fdSvc', 'appUrl', 'user', 'fund',
  function ($scope, $uibModalInstance, $uibModal, fdSvc, appUrl, user, fund) {

    //#region ===Initialize===

    'use strict';
    $scope.showValidationMessages = false;
    $scope.fund                   = fund;
    $scope.isSending              = false;
    $scope.sender                 = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipients: '',
      emails: []
    }

    //#endregion

    $scope.sendEmail = function () {
      if (this.sendMailForm.$valid) {
        $scope.isSending = true;
        var emailString = $scope.sender.recipients.split(',');
        var count = 0;
        var toEmails = [];

        angular.forEach(emailString, function (value, key) {
          //Check emails;
          if (App.validateEmail(value.trim())) {
            $scope.sender.emails.push(value.trim());
            toEmails.push({
              email: value.trim(),
              name: value.trim(),
            });
            count++;
          }
        });

        if (count === 0) {
          toastr.warning('Please add at least one email recipient.');
          $scope.sender.recipients = $scope.sender.emails.join();
          $scope.isSending = false;
        } else {
          fdSvc.share({
            firstName: $scope.sender.firstName,
            lastName: $scope.sender.lastName,
            fundTitle: $scope.fund.item.title,
            fundId: $scope.fund.item.identification,
            fundDescription: $scope.fund.item.description,
            fundDonateUrl: appUrl.base + '/fund/donate/' + $scope.fund.item.identification,
            fundUrl: $scope.fund.url,
            fundImageUrl: appUrl.base + $scope.fund.defaultImage,
            fromEmail: $scope.sender.email,
            toEmails: toEmails
          }).then(function (response) {
            $uibModalInstance.close($scope.sender);
            $scope.isSending = false;
          }, function (response) {
            toastr.error('Unable to share campaign.  Please refresh and try again');
            $scope.isSending = false;
          });

        }
      } else {
        $scope.showValidationMessages = true;
      }
    };

    $scope.preview = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/common/mdPostMailPreviewMdl.min.html',
        controller: fdWidgetsSocialMailPreviewMdl,
        size: 'sm',
        resolve: {}
      });

      modalInstance.result.then(function () {
        //do nothing on close 
      }, function () {
        //do nothing on dismiss(cancel)
      });
    }

    $scope.cancel = function (reason) {
      $uibModalInstance.dismiss(reason);
    };
  }];
///#source 1 1 /app/fund/widgets/fdWidgetsSocialMailPreviewMdl.js
var fdWidgetsSocialMailPreviewMdl = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

  $scope.close = function (reason) {
    $uibModalInstance.close(reason);
  };
}];
///#source 1 1 /app/fund/widgets/fdWidgetsSocialPrintMdl.js
var fdWidgetsSocialPrintMdl = ['$scope', '$uibModalInstance', '$compile', 'appUrl', 'mdCoreDataSvc', 'fund',
  function ($scope, $uibModalInstance, $compile, appUrl, mdCoreDataSvc, fund) {
    //#region === Initialization ===

    'use strict';
    $scope.isLoading = true;
    $scope.fund      = fund;
    $scope.imageUrl  = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
    var element = {};
    //#endregion

    $scope.imageLoaded = function () {
      element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
      $scope.isLoading = false;
      $scope.$apply('isLoading');
    }

    $scope.print = function () {
      //TODO DUPLICATE of PRINT fdDashboardPrintCtrl.js
      var printContents = '<img src="' + $scope.imageUrl + '">';

      if (mdCoreDataSvc.isIe() > 1) {
        mdCoreDataSvc.printPage(printContents);
      } else {
        mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
      }
    }

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];
///#source 1 1 /app/fund/widgets/fdWidgetsSocialEmbedMdl.js
var fdWidgetsSocialEmbedMdl = ['$scope', '$uibModalInstance', 'appUrl', 'fund',
  function ($scope, $uibModalInstance, appUrl, fund) {
    'use strict';
    $scope.fund = fund;

    $scope.miraclesLogo = appUrl.base + '/assets/img/logo103.png';
    $scope.miraclesHome = appUrl.base + '?fm_src=fundcard';
    $scope.cardSrc      = appUrl.base + '/fund/card/' + $scope.fund.item.permalink;
    $scope.buttonSrc    = appUrl.base + '/fund/button/' + $scope.fund.item.permalink;
    $scope.widgetSrc    = appUrl.base + '/fund/widget/' + $scope.fund.item.permalink;


    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];
///#source 1 1 /app/fund/widgets/fdWidgetsDonateMdl.js
var fdWidgetsDonateMdl = [
  '$scope', '$uibModalInstance', '$uibModal', '$filter', 'appUrl', 'mdCoreDataSvc', 'userSvc', 'seAuthSvc', 'orDataSvc', 'wePayConst', 'fund', 'donationAmount',
  function ($scope, $uibModalInstance, $uibModal, $filter, appUrl, mdCoreDataSvc, userSvc, seAuthSvc, orDataSvc, wePayConst, fund, myDonationAmount) {

    //#region === Initialize ===

    'use strict';
    $scope.fund                   = fund;
    $scope.order                  = {
      cardNumber: wePayConst.credit_card_number === undefined ? '' : wePayConst.credit_card_number
    };
    $scope.showValidationMessages = false;
    $scope.buttonNo               = 1;
    $scope.isSaving               = false;
    $scope.isUpdating             = false;
    $scope.hideAmountText         = false;
    $scope.coverFees              = true;
    $scope.payOptions             = mdCoreDataSvc.payOptions;
    $scope.yearOptions            = mdCoreDataSvc.yearOptions();
    $scope.monthOptions           = mdCoreDataSvc.monthOptions;
    $scope.selectedCardMonth      = $scope.monthOptions[0];
    $scope.selectedCardYear       = $scope.yearOptions[0];
    $scope.isDonorReadonly        = false;
    $scope.hideAmountText         = false;
    $scope.donation               = {
      isPrivate: false,
      amount: myDonationAmount
    };
    $scope.dropdownItems          = getItems();

    /* Local field */
    var isPrivate = false;

    //#endregion

    //#region === Events ===
    $scope.onFeeSelect = function ($event) {
      $scope.selectedFee = this.selectedFee;
      if (this.selectedFee.levels[$scope.level].customizableAmount === true) {
        $scope.isCustomAmount = true;
      } else {
        $scope.isCustomAmount = false;
      }
    };

    $scope.$watch('selectedFee.levels[level].customAmount', function (newValue, oldValue) {

      if (angular.isUndefined(newValue)) {
        if (angular.isDefined($scope.selectedFee)) {
          $scope.selectedFee.levels[$scope.level].amount = 0;
        }
      } else {
        $scope.selectedFee.levels[$scope.level].amount = newValue;
      }
    });

    //#endregion

    //#region === Public Methods ===

    $scope.amountToCoverOptions = function () {
      var currentLevel   = $scope.level;
      var items          = getItems();
      var donationAmount = getDonationAmount();
      var amountToCoverF = $filter('number')((donationAmount * mdCoreDataSvc.defaultChargeFee) * 2, 0);
      var amountToCover  = (amountToCoverF === 0) ? 0 : amountToCoverF / 2;

      $scope.coverFees = this.coverFees;
      angular.forEach(items, function (value, key) {

        if ($scope.coverFees) {
          value.levels[currentLevel].percentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = false;
          $scope.iGotThis = true;
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = true;

          $scope.iGotThis = false;
        }
      });
    };

    init();

    $scope.anonymize = function () {
      if ($scope.donation.isPrivateDonorName) {
        $scope.donation.donorName = 'Anonymous';
        $scope.isDonorReadonly = true;
      } else {
        $scope.donation.donorName = '';
        $scope.isDonorReadonly = false;
      }
    };

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.hideAmount = function () {
      $scope.hideAmountText = $scope.donation.isPrivateAmount;
    };

    $scope.modalPaymentBreakdown = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateBreakdownMdl.html',
        controller: donationBreakdownModal,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          donation: function () {
            getDonation();
            return $scope.donation;
          },
          totalAmount: function () { return $scope.totalAmount(); }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalPaymentUsage = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonatePaymentUsageMdl.min.html',
        controller: paymentUsageModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalProcessingFee = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateProcessingFeeMdl.html',
        controller: processingFeeModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.resetAmount = function () {
      setLevel();
      setFeeAmount(getDonationAmount(), $scope.selectedFee);
      $scope.amountToCoverOptions();
    };

    $scope.totalAmount = function () {
      var donationAmount = getDonationAmount();
      setLevel();

      if (angular.isUndefined($scope.selectedFee)) {
        $scope.selectedFee = $scope.payOptions[2]; // Default
      }

      setFeeAmount(donationAmount, $scope.selectedFee);

      return donationAmount + $scope.selectedFee.iGotThisAmount;
    };
    //#endregion

    //#region === Donation Steps ===

    //Step 1 Save
    $scope.saveDonation = function () {
      $scope.isSaving = true;
      if (this.fundDonationForm.$valid) {
        var search = $scope.order.billingAddressAddress.address1 + ' ' + $scope.order.billingAddressAddress.zipCode;
        $scope.order.cardExpirationMonth = this.fundDonationForm.cardExpirationMonth.$modelValue.value;
        $scope.order.cardExpirationYear = this.fundDonationForm.cardExpirationYear.$modelValue.value;

        mdCoreDataSvc.getGeoData3(search).then(function (data) {
          $scope.order.billingAddressAddress.state = data.stateCode;
          $scope.order.billingAddressAddress.city = data.city;
          $scope.order.billingAddressAddress.zipCode = data.zip;
          
          $scope.saveInfo();
        }, function (response) {
          toastr.error('D\'oh! ' + response.error_message);
          $scope.isSaving = false;
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //Step 2
    $scope.saveInfo = function () {


      $scope.customer = {
        userName: $scope.donation.email,
        firstName: $scope.donation.isPrivateDonorName ? 'Anonymous' : $scope.order.cardName,
        email: $scope.donation.email,
      };

      userSvc.getByUserName($scope.donation.email).then(
        function(promisedUser) {
          var user = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;

          // User found
          if (angular.isUndefined(user)) {
            toastr.error('There was a problem retrieving user information.  Please try again');
            $scope.isSaving = false;
          } else {
            $scope.customer.identification = user.identification;
            $scope.savePayment();
          }
        },
        function(response, headers) {
          // User not found
          if (response.status === 404) {
            seAuthSvc.registerAnonymous($scope.customer).then(
              function(promisedNewUser) {
                $scope.customer.identification = promisedNewUser.identification;
                $scope.savePayment();
              }, function(innerresponse) {
                toastr.error('There was a problem saving user info.  Please try again');
                $log.error(innerresponse);
                $scope.isSaving = false;
              });
          } else {
            toastr.error('There was a problem saving donation info. Please try again');
            $log.error(response);
            $scope.isSaving = false;
          }
        });
    };

    //Step 3
    $scope.savePayment = function () {

      getDonation();
      $scope.order.paymentMethodSystemName     = "Payments.WePay";
      $scope.order.orderItemList = [{
        itemId: $scope.fund.identification,
        price: $scope.donation.amount
      }];
      $scope.order.statusId = 'Completed';
      $scope.order.PaymentStatusId = 'Paid';
      $scope.order.aspNetUser = {
        email: $scope.donation.email,
        identification: $scope.customer.identification
      };
      $scope.order.customerId = $scope.customer.identification;
      $scope.order.donationList = [
        $scope.donation
      ];

      orDataSvc.save($scope.order).then(
        function(donation) {
          $scope.isSaving = false;
          $scope.saveThankYou(donation);
        },
        function(response) {
          handleError(response.data);
          $scope.isSaving = false;
        });
    };

    $scope.saveThankYou = function (donation) {
      $uibModalInstance.close(donation);
    };

    //#endregion

    //#region === Private Methods ===

    function setLevel() {
      var donationAmount = getDonationAmount();

      if (donationAmount < 100) {
        $scope.level = 0;
      } else if (donationAmount >= 100 && donationAmount < 200) {
        $scope.level = 1;
      } else {
        $scope.level = 2;
      }
    };

    function getDonation() {
      $scope.donation.beneficiary = angular.isDefined($scope.fund.beneficiary)
        ? $scope.fund.beneficiary.fullName : $scope.fund.originator.fullName;
      $scope.donation.beneficiaryAmount  = $scope.selectedFee.beneficiaryAmount;
      $scope.donation.systemAmount       = $scope.selectedFee.levels[$scope.level].amount;
      $scope.donation.processingFee      = $scope.selectedFee.chargeFeeAmount;
      $scope.donation.donorUserId        = angular.isDefined($scope.customer) ? $scope.customer.identification : 0;
      $scope.donation.feeTypeId          = 'Level0';
      $scope.donation.fundId             = $scope.fund.identification;
      $scope.donation.offlineDonation    = false;
      $scope.donation.isPrivate          = isPrivate;
      $scope.donation.statusId           = 'Active';
      $scope.donation.thankYouNoteSent   = false;
      $scope.donation.costsCovered       = $scope.coverFees;
      $scope.donation.donorName          = $scope.order.cardName;
      $scope.donation.subscriptionTypeId = $scope.donation.contributeMonthly ? 'Monthly' : 'None';
    };

    function getDonationAmount() {
      return parseInt(angular.isUndefined($scope.donation.amount) ? 0 : $scope.donation.amount, 10);
    };

    function getGeo() {
      mdCoreDataSvc.getGeoData2().then(
        function (geo) {
          $scope.order.geo = geo;
        },
        function (response) {
          //Assign/Do Nother
        });
    }

    function getItems() {
      var dropdownOptions = [];
      var donationAmount = getDonationAmount();
      setLevel();

      angular.forEach($scope.payOptions, function (value, key) {
        setFeeAmount(donationAmount, value);
        value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : '');
        dropdownOptions.push(value);
      });

      return dropdownOptions;
    };

    function init() {
      $scope.amountToCoverOptions();
      getGeo();
    }

    function setFeeAmount(donationAmount, feeObject) {

      var chargeFee = ((donationAmount + feeObject.levels[$scope.level].amount) * feeObject.levels[$scope.level].chargePercentage) * 2;
      if (chargeFee === 0) {
        chargeFee = .6;
      }
      feeObject.chargeFeeAmount = ((chargeFee === 0) ? 0 : chargeFee / 2) + feeObject.levels[$scope.level].chargeAmount;
      var percentageFee = (donationAmount * feeObject.levels[$scope.level].percentage) * 2;
      var percentageFeeAmount = (percentageFee === 0) ? 0 : percentageFee / 2;

      feeObject.feeAmount = (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : feeObject.levels[$scope.level].chargeAmount)
        + percentageFeeAmount
        + feeObject.levels[$scope.level].amount;

      feeObject.beneficiaryAmount = donationAmount - (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : 0);

      feeObject.iGotThisAmount = (feeObject.levels[$scope.level].chargeFee ? 0 : feeObject.chargeFeeAmount)
        + feeObject.levels[$scope.level].amount;

    };

    function handleError(data) {
      var msg;
      switch (data.error_description) {
        case 'App fee can not be greater than 20% of the amount':
          msg = 'Your donation to Funding Miracles cannot exceed more than 20% of the your total donation.';
          toastr.error(msg);
          $scope.title = 'Thank you! But, ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
        default:
          msg = data.error_description;
          toastr.error(msg);
          $scope.title = 'Ooops! ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
      }
    }
    //#endregion
  }];
///#source 1 1 /app/fund/widgets/fdWidgetsDonateThankYouMdl.js
var fdWidgetsDonateThankYouMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl','fdSvc', 'fund', 'order',
  function ($scope, $uibModalInstance, $filter, appUrl, fdSvc, fund, order) {

    //#region === Initialize ===

    'use strict';
    $scope.fund = fund;
    $scope.order = order;
    //#endregion


    //#region === Public Methods ===
    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.thankYou = function () {
      $uibModalInstance.close();
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

    //#endregion

    //#region === Private Methods ===

    function init() {
      var defaultImageUrl = appUrl.base + $scope.fund.defaultImage;

      $scope.socialData = {
        fund: fund,
        facebookData: {
          method: 'feed',
          link: fund.url,
          picture: defaultImageUrl,
          name: fund.item.title,
          caption: 'www.fundingmiracles.com',
          description: fund.item.description
        },
        twitterData: {
          hashtags: '',
          via: 'fundingmiracles',
          related: '//www.fundingmiracles.com',
          text: fund.item.title,
          url: fund.url
        }
      };
    }
    //#endregion
  }];
///#source 1 1 /app/fund/widgets/fd-widgets-donations-drctv.js
fundoloApp.directive('fdWidgetsDonationsDrctv', [function () {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-donations-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (angular.element.isNumeric(newValue) && newValue > 0) {
        $scope.initDonations(newValue);
      }
    });

    $scope.$watch('donations', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        $scope.initDonations();
      }
    }, true);
  };

  p.controller = ['$scope', 'fdSvc', 'mdScrollScrollSvc',
    function ($scope, fdSvc, mdScrollScrollSvc) {

      //#region === Initialize ===

      $scope.isLoading = true;
      $scope.included = false;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 3;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 10;
      //=============================

      //#endregion

      //#region === Public Methods ===

      $scope.getFundDonations = function(pageNumber) {
        $scope.isLoading = true;

        if (angular.isUndefined(pageNumber) || pageNumber === 0) {
          pageNumber = 1;
        }

        if ($scope.included) {
          setRecordsToDisplay();
          $scope.isLoading = false;
        } else {
          fdSvc.donations($scope.fundId, pageNumber, $scope.itemsPerPage).then(
            function(items) {
              $scope.itemList = items.data;
              $scope.initDonationPagination(items.count);
              $scope.isLoading = false;
            },
            function(response) {
              toastr.error(response.error_description);
              $scope.isLoading = false;
            });
        }
      };

      $scope.initDonations = function () {
        if (angular.isUndefined($scope.donations)) {
          $scope.getFundDonations(1);
        } else {
          $scope.included = true;
          $scope.initDonationsPaginate();
        }

      }

      $scope.initDonationsPaginate = function () {
        $scope.itemList   = $scope.donations;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
        $scope.isLoading = false;
      }

      $scope.initDonationPagination = function (fundsCount) {
        $scope.totalItems = fundsCount;
      }

      $scope.onSelectPage = function () {
        $scope.getFundDonations($scope.currentPage);
        mdScrollScrollSvc.scrollTo($scope.scrollId, 20);
      };

      //#endregion

      //#region === Private Methods ===

      function setRecordsToDisplay() {
        $scope.items = [];
        var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endItem = startItem + $scope.itemsPerPage;
        for (var i = startItem; i < endItem; i++) {
          if (angular.isDefined($scope.itemList[i])) {
            $scope.itemList[i].user.forceDefault = $scope.itemList[i].offlineDonation;
            $scope.items.push($scope.itemList[i]);
          }
        }
      }

      //#endregion

    }];

  p.scope = {
    donations: '=',
    scrollId: '@'
  }

  return p;
}]);

///#source 1 1 /app/fund/widgets/fd-widgets-supporters-drctv.js
fundoloApp.directive('fdWidgetsSupportersDrctv', [
  'cssInjector', 'fdDashboardSvc',
  function (cssInjector, fdDashboardSvc) {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-supporters-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (angular.element.isNumeric(newValue) && newValue > 0) {
        $scope.initSupporters(newValue);
      }
    });

    //#region === Initialize ===

    $scope.items       = [];
    $scope.itemList    = [];
    $scope.showWarning = false;
    $scope.isLoading   = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 20;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 4;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.initSupporters = function (fundId) {
      $scope.fundId = fundId;
      $scope.getFundSupporters(1);
    }

    $scope.initPagination = function (fundsCount) {

      $scope.totalItems = fundsCount;
    }

    $scope.getFundSupporters = function (pageNumber) {
      $scope.isLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdDashboardSvc.supporters($scope.fundId, pageNumber, $scope.itemsPerPage).then(
        //BUG: ANGULAR If object has array as property then it requires isArray: true
        function (supporters) {
          $scope.isLoading = false;
          $scope.itemList = supporters.data;
          $scope.initPagination(supporters.count);
          $scope.supportersLength = supporters.count;
          
          setRecordsToDisplay();
        },
        function (response) {
          toastr.error('Problem getting supporters', 'There was a problem accessing your fundraiser.  Please try again');
          $scope.isLoading = false;
        }
      );
    }

    $scope.onSelectPage = function () {
      setRecordsToDisplay();
    };
    //#endregion

    //#region === Private Methods ===

    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    //#endregion 
  };


  p.controller = [
      '$scope', function ($scope) {
        $scope.supportersLength = 0;
      }
  ];

  return p;
}]);

///#source 1 1 /app/fund/donate/fdDonateThankYouCtrl.js
'use strict';

fundoloApp.controller('fdDonateThankYouCtrl', [
  '$scope', '$stateParams', '$window','fdSvc',
  function ($scope, $stateParams, $window, fdSvc) {
  
  //#region Initialize

  fdSvc.basic($stateParams.fundId).then(
    //BUG: ANGULAR If object has array as property then it requires isArray: true
    function (fund) {
      $scope.fund = angular.isArray(fund) ? fund[0] : fund;
      $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

      $scope.mainFundImage = '/azure/' + $scope.fund.item.itemUploadList.upload.containerName + '/'
      + $scope.fund.item.itemUploadList.upload.name
      + '?height=150&width=230&mode=crop';
    },
    function (response) {
      $log.error(response);
    });


  //#endregion 
}]);
///#source 1 1 /app/fund/donate/fdDonateCtrl.js
fundoloApp.controller('fdDonateCtrl', ['$scope', '$location', '$stateParams', '$uibModal', '$log', '$filter', 'seAuthSvc', 'fdSvc', 'userSvc', 'orDataSvc', 'mdCoreDataSvc', 'wePayConst',
  function fdDonateCtrl($scope, $location, $stateParams, $uibModal, $log, $filter, seAuthSvc, fdSvc, userSvc, orDataSvc, mdCoreDataSvc, wePayConst) {
    'use strict';
    //#region Initialize
    var a = Number($stateParams["a"]);
    $scope.displayAmount = angular.element.isNumeric(a);

    fdSvc.basic($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

        $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 230, 150);
      },
      function (response) {
        $log.error(response);
      });

    mdCoreDataSvc.getAllStates().then(
      function (states) {
        $scope.stateOptions = states;
      },
      function (response) {
        toastr.error('Error getting states.  Please try again');
        $log.error(response);
      });

    //#endregion 

    //#region Methods
    var getDonationAmount = function () {
      return angular.isUndefined($scope.donation.amount) ? 0 : $scope.donation.amount;
    };

    var setLevel = function () {
      var donationAmount = getDonationAmount();

      if (donationAmount < 100) {
        $scope.level = 0;
      } else if (donationAmount >= 100 && donationAmount < 200) {
        $scope.level = 1;
      } else {
        $scope.level = 2;
      }
    };

    var setFeeAmount = function (donationAmount, feeObject) {

      var chargeFee = ((donationAmount + feeObject.levels[$scope.level].amount) * feeObject.levels[$scope.level].chargePercentage) * 2;
      if (chargeFee === 0) {
        chargeFee = .6;
      }
      feeObject.chargeFeeAmount = ((chargeFee === 0) ? 0 : chargeFee / 2) + feeObject.levels[$scope.level].chargeAmount;
      var percentageFee = (donationAmount * feeObject.levels[$scope.level].percentage) * 2;
      var percentageFeeAmount = (percentageFee === 0) ? 0 : percentageFee / 2;

      feeObject.feeAmount = (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : feeObject.levels[$scope.level].chargeAmount)
        + percentageFeeAmount
        + feeObject.levels[$scope.level].amount;

      feeObject.beneficiaryAmount = donationAmount - (feeObject.levels[$scope.level].chargeFee ? feeObject.chargeFeeAmount : 0);

      feeObject.iGotThisAmount = (feeObject.levels[$scope.level].chargeFee ? 0 : feeObject.chargeFeeAmount)
        + feeObject.levels[$scope.level].amount;

    };
    //#endregion //Methods

    //#region Publicly Exposed Methods
    $scope.items = function () {
      var dropdownOptions = [];
      var donationAmount = getDonationAmount();
      setLevel();

      angular.forEach($scope.payOptions, function (value, key) {
        setFeeAmount(donationAmount, value);
        var formatted = $filter('currency')(value.iGotThisAmount);
        //value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : formatted + ' ');
        value.name = value.levels[$scope.level].title.replace('{0}', value.levels[$scope.level].percentage === 0 ? '' : '');
        dropdownOptions.push(value);
      });

      return dropdownOptions;
    };

    $scope.donation = {
      isPrivate: false
    };

    $scope.order                  = {
      cardNumber: wePayConst.credit_card_number === undefined ? '' : wePayConst.credit_card_number
    };
    $scope.donation.amount        = angular.element.isNumeric(a) ? a : 100;
    $scope.buttonNo               = 1;
    $scope.isSaving               = false;
    $scope.isUpdating             = false;
    $scope.iGotThis               = true;
    $scope.coverFees              = true;
    $scope.yearOptions            = mdCoreDataSvc.yearOptions();
    $scope.monthOptions           = mdCoreDataSvc.monthOptions;
    $scope.selectedCardMonth      = $scope.monthOptions[0];
    $scope.selectedCardYear       = $scope.yearOptions[0];
    $scope.payOptions             = mdCoreDataSvc.payOptions;
    $scope.showValidationMessages = false;
    $scope.dropdownItems          = $scope.items();
    $scope.isDonorReadonly        = false;
    $scope.hideAmountText         = false;
    /* Local field */
    var oldNameValue = '';
    var isPrivate = false;

    $scope.$watch('stateOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedState = $scope.stateOptions[0];
      }
    });

    $scope.anonymize = function() {
      if ($scope.donation.isPrivateDonorName) {
        $scope.donation.donorName = 'Anonymous';
        $scope.isDonorReadonly = true;
      } else {
        $scope.donation.donorName = '';
        $scope.isDonorReadonly = false;
      }
    };

    $scope.hideAmount = function() {
      $scope.hideAmountText = $scope.donation.isPrivateAmount;
    };
    
    $scope.setDonationAmount = function (buttonNumber, amount) {
      $scope.buttonNo = buttonNumber;
      $scope.donation.amount = amount;
      $scope.resetAmount();
    };

    $scope.amountToCoverOptions = function () {
      var currentLevel = $scope.level;
      var items = $scope.items();
      var donationAmount = getDonationAmount();
      var amountToCoverF = $filter('number')((donationAmount * mdCoreDataSvc.defaultChargeFee) * 2, 0);
      var amountToCover = (amountToCoverF === 0) ? 0 : amountToCoverF / 2;

      $scope.coverFees = this.coverFees;
      angular.forEach(items, function (value, key) {
        var formatted;

        if ($scope.coverFees) {
          value.levels[currentLevel].percentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = false;
          //formatted = $filter('currency')(value.levels[currentLevel].amount + amountToCover + value.levels[$scope.level].chargeAmount);
          //value.name = value.levels[currentLevel].title.replace('{0}',
          //  value.levels[currentLevel].percentage === 0 ? '' : formatted + ' ');
          $scope.iGotThis = true;
        } else {
          value.levels[currentLevel].percentage = 0;
          value.levels[currentLevel].chargePercentage = mdCoreDataSvc.defaultChargeFee;
          value.levels[currentLevel].chargeFee = true;
          //value.name = value.levels[currentLevel].title.replace('{0}', '');
          $scope.iGotThis = false;
        }
      });
    };

    $scope.amountToCoverOptions();

    $scope.onFeeSelect = function ($event) {
      $scope.selectedFee = this.selectedFee;
      if (this.selectedFee.levels[$scope.level].customizableAmount === true) {
        $scope.isCustomAmount = true;
      } else {
        $scope.isCustomAmount = false;
      }
    };

    $scope.$watch('selectedFee.levels[level].customAmount', function (newValue, oldValue) {

      if (angular.isUndefined(newValue)) {
        if (angular.isDefined($scope.selectedFee)) {
          $scope.selectedFee.levels[$scope.level].amount = 0;
        }
      } else {
        $scope.selectedFee.levels[$scope.level].amount = newValue;
      }
    });

    $scope.totalAmount = function () {
      var donationAmount = getDonationAmount();
      setLevel();

      if (angular.isUndefined($scope.selectedFee)) {
        $scope.selectedFee = $scope.payOptions[2]; // Default
      }

      setFeeAmount(donationAmount, $scope.selectedFee);

      return donationAmount + $scope.selectedFee.iGotThisAmount;
    };


    $scope.makeAnonymous = function () {
      if ($scope.donation.isPrivate) {
        oldNameValue = $scope.donation.donorName;
        $scope.donation.donorName = 'Anonymous';
        isPrivate = true;
      } else {
        $scope.donation.donorName = oldNameValue;
        oldNameValue = '';
        isPrivate = false;
      }
    };

    //#region === Step1 Save Info ===
    //Step 2
    $scope.saveInfo = function () {

      if (this.fundDonationForm.$valid) {

        $scope.customer = {
          userName: $scope.donation.email,
          firstName: $scope.donation.donorName,
          lastName: $scope.donation.donorName,
          email: $scope.donation.email,
        };

        userSvc.getByUserName($scope.donation.email).then(
          function (promisedUser) {
            var user = angular.isArray(promisedUser) ? promisedUser[0] : promisedUser;

            // User found
            if (angular.isUndefined(user)) {
              toastr.error('There was a problem retrieving user information.  Please try again');
              $scope.isSaving = false;
            } else {
              $scope.customer.identification = user.identification;
              $scope.savePayment();
            }
          },
          function (response, headers) {
            // User not found
            if (response.status === 404) {
              seAuthSvc.registerAnonymous($scope.customer).then(
                function (promisedNewUser) {
                  $scope.customer.identification = promisedNewUser.identification;
                  $scope.savePayment();
                }, function (innerresponse) {
                  toastr.error('There was a problem saving user info.  Please try again');
                  $log.error(innerresponse);
                  $scope.isSaving = false;
                });
            } else {
              toastr.error('There was a problem saving donation info. Please try again');
              $log.error(response);
              $scope.isSaving = false;
            }
          });
      } else {
        $scope.isSaving = false;
        $scope.showValidationMessages = true;
      }
    };

    //#endregion === Step2 Save Info ===

    $scope.savePayment = function () {
      if ($scope.fundDonationForm.$valid) {
        getDonation();
        $scope.order.paymentMethodSystemName = "Payments.WePay";
        $scope.order.billingAddressAddress.state = $scope.fundDonationForm.billingState.$modelValue.identification;
        $scope.order.cardExpirationMonth = $scope.fundDonationForm.cardExpirationMonth.$modelValue.value;
        $scope.order.cardExpirationYear = $scope.fundDonationForm.cardExpirationYear.$modelValue.value;
        $scope.order.orderItemList = [{
          itemId: $scope.fund.identification,
          price: $scope.donation.amount
        }];
        $scope.order.statusId = 'Completed';
        $scope.order.PaymentStatusId = 'Paid';
        $scope.order.aspNetUser = {
          email: $scope.donation.email,
          identification: $scope.customer.identification
        };
        $scope.order.customerId = $scope.customer.identification;
        $scope.order.donationList = [
          $scope.donation
        ];

        orDataSvc.save($scope.order).then(
          function (promisedOrder) {
            $scope.isSaving = false;
            $scope.saveThankYou();
          },
          function (response) {
            handleError(response.data);
            $scope.isSaving = false;
          });
      }
    };

    var getDonation = function () {
      $scope.donation.beneficiaryAmount = $scope.selectedFee.beneficiaryAmount;
      $scope.donation.systemAmount      = $scope.selectedFee.levels[$scope.level].amount;
      $scope.donation.processingFee     = $scope.selectedFee.chargeFeeAmount;
      $scope.donation.donorUserId       = angular.isDefined($scope.customer) ? $scope.customer.identification: 0;
      $scope.donation.feeTypeId         = 'Level0';
      $scope.donation.fundId            = $scope.fund.identification;
      $scope.donation.offlineDonation   = false;
      $scope.donation.isPrivate         = isPrivate;
      $scope.donation.statusId          = 'Active';
      $scope.donation.thankYouNoteSent  = false;
      $scope.donation.costsCovered      = $scope.coverFees;
      $scope.donation.beneficiary       = 'Beneficiary';
    };

    $scope.saveThankYou = function () {
      toastr.success('You are awesome!  Thank you for your generosity');
      $location.path('/' + $scope.fund.item.permalink);
    };

    $scope.updateAmount = function () {
      $scope.isUpdating = false;
    };

    $scope.editAmount = function () {
      $scope.isUpdating = true;
    };


    $scope.modalPaymentUsage = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonatePaymentUsageMdl.min.html',
        controller: paymentUsageModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalProcessingFee = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateProcessingFeeMdl.html',
        controller: processingFeeModal,
        resolve: {
          items: function () { return 'ok'; }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.modalPaymentBreakdown = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/donate/fdDonateBreakdownMdl.html',
        controller: donationBreakdownModal,
        backdrop: 'true', //true:false:static(user click on background)
        resolve: {
          donation: function () {
            getDonation();
            return $scope.donation;
          },
          totalAmount: function () { return $scope.totalAmount(); }
        }
      });

      modalInstance.result.then(function () {
        //Do nothing on exit
      }, function () {
        //Do nothing on cancel
      });
    };

    $scope.resetAmount = function () {
      setLevel();
      setFeeAmount(getDonationAmount(), $scope.selectedFee);
      $scope.amountToCoverOptions();
    };

    //Step 1 Save
    $scope.saveDonation = function () {
      $scope.isSaving = true;
      if (this.fundDonationForm.$valid) {
        $scope.saveInfo();
      } else {
        toastr.error('Oops.  You have some missing or invalid data!');
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    function handleError(data) {
      var msg;
      switch (data.error_description) {
        case 'App fee can not be greater than 20% of the amount':
          msg = 'Your donation to Funding Miracles cannot exceed more than 20% of the your total donation.';
          toastr.error(msg);
          $scope.title = 'Thank you! But, ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
        default:
          msg = data.error_description;
          toastr.error(msg);
          $scope.title = 'Ooops! ';
          $scope.message = msg;
          $scope.alertType = 'warning';
          $scope.showAlert = true;
          break;
      }
    }
  }]);

var paymentUsageModal = ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];

var processingFeeModal = ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];

var donationBreakdownModal = ['$scope', '$uibModalInstance', 'donation', 'totalAmount',
  function ($scope, $uibModalInstance, donation, totalAmount) {
  $scope.donation = donation;
  $scope.totalAmount = totalAmount;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}];
///#source 1 1 /app/fund/fdCtrl.js
fundoloApp.controller('fdCtrl', ['$uibModal', '$scope', '$log', '$stateParams', '$state', '$filter', '$window', 'fdSvc',
  'seAuthSvc', 'appUrl', 'cssInjector', 'Facebook', 'fdDashboardSvc', 'mdCoreDataSvc', '$analytics',
  function fdFundCtrl($uibModal, $scope, $log, $stateParams, $state, $filter, $window, fdSvc,
    seAuthSvc, appUrl, cssInjector, Facebook, fdDashboardSvc, mdCoreDataSvc, $analytics) {
    'use strict';

    //#region === Initialize ===
    var initBootStrap = function() {
      $window.App.mallDub.initBootstrapListener('xs', function (alias) {
        angular.element('#donate-bar-nav').css({ 'width': '100%' });
        //$state.transitionTo($state.current, $stateParams, {
        //  reload: true,
        //  inherit: false,
        //  notify: true
        //});
        },
        function(alias) {
          if ($scope.fund.pageLayout === 'Boxed') {
            angular.element('#donate-bar-nav').css({ 'width': 'inherit' });
          }
        });
    }

    cssInjector.add("/assets2/plugins/master-slider/quick-start/masterslider/style/masterslider.css", true);
    cssInjector.add("/assets2/plugins/master-slider/quick-start/masterslider/skins/default/style.css", true);

    $scope.geo              = {};
    $scope.tabSupportActive = false;
    $scope.isDonateable     = true;
    $scope.isLoggedIn       = false;
    $scope.isThisFundMine   = false;
    $scope.slides           = [];
    $scope.isLoading        = true;
    $scope.baseUrl          = appUrl.base;
    $scope.errorThrown      = false;
    $scope.myInterval       = 5000;
    $scope.showAlert        = false;
    $scope.gatewayExists    = false;
    $scope.fund             = {
      item: {
        title: 'Waiting for the fund...'
      }
    }



    //#endregion

    //#region === Public Methods ===

    $scope.init = function() {
      fdSvc.byPermalink($stateParams.permalink).then(
        //BUG: ANGULAR If object has array as property then it requires isArray: true
        function(fund) {
          $scope.fund = angular.isArray(fund) ? fund[0] : fund;
          $scope.setup();
        },
        function(response) {
          $scope.errorThrown = true;
          $scope.fund = { item: { title: 'Fund currently not available' } };
          $log.error(response);
          if (response.data.error_code === '4000' || response.data.error_code === '4001') {
            handleError(response.data);
          } else {
            toastr.error('There was a problem getting this fund.  Please refresh page and try again');
          }
        }
      );

      getGeo();
    }

    $scope.init();

    $scope.setup = function () {
      isMyFund();
    }

    $scope.changeColor = function(color) {
      $scope.fund.pageColor = color;
      saveFund(toastrSuccessMessage, 'Nice Color! We went and changed it for you back here.');
    }

    $scope.changeSkin = function (skin) {
      $scope.fund.pageSkin = skin;
      var message = 'We\'ve changed the style to dark';
      if (skin === 'Light') {
        message = 'We\'ve changed the style to light';
      }
      saveFund(toastrSuccessMessage, message);
    }

    $scope.changeLayout = function (layout) {
      $scope.fund.pageLayout = layout;
      var message = 'We\'ve changed the style to wide';
      if (layout === 'Boxed') {
        message = 'We\'ve changed the layout to boxed';
      }
      saveFund(toastrSuccessMessage, message);
    }

    $scope.donate = function (donationAmount) {
      if ($scope.fund.settings.usePaymentModal) {

      } else {
        if (angular.isDefined(donationAmount)) {
          $state.go('fundDonate', { fundId: $scope.fund.identification, a:donationAmount });
        } else {
          $state.go('fundDonate', { fundId: $scope.fund.identification });
        }
      }
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

    $scope.postFacebook = function () {
      $scope.isLoggedIn = seAuthSvc.isLoggedIn();
      Facebook.ui($scope.socialData.facebookData, function (data) {
        //TODO: CREATE MODAL thank you with stats
        toastr.success('Thank you for sharing my fundraiser!');
      });
    }

    $scope.situate = function () {
      $scope.imageUrl = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
      initBootStrap();
      $scope.fund.url = appUrl.base + '/' + $scope.fund.item.permalink;
      setUpMessage();
      setUpImages();
      $scope.isLoading = false;
      $scope.daysFromNow = daysFromNow($scope.fund.item.endDate);
      $scope.fundExpired = fdSvc.checkExpiration($scope.fund.item.endDate);
      fundToOpenGraph($scope.fund);
      $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      checkPaymentGateway();
      getFundDonations($scope.fund.identification);
      $scope.fundId = $scope.fund.identification;
      $analytics.pageTrack('/' + $scope.fund.identification);
      $analytics.eventTrack('pageView', { category: 'fundraiser', label: $scope.fund.item.title });
      angular.element(document).scrollTop();
    }

    $scope.subscribe = function() {
      $scope.isSubscribing = true;
      if (this.fundSubscribeForm.$valid) {
        fdDashboardSvc.subscribe($scope.fund.identification, $scope.subscribeEmail, $scope.geo).then(
          function () {
            $scope.isSubscribing = false;
            $scope.subscribeEmail = '';
            toastr.success('Awesome! You have successfully subscribed to this fundraiser!');
          },
          function (response) {
            switch (response.status) {
              case 409:
                toastr.error('Oops! You are already subscribed to this campaign');
                break;
              case 400:
                toastr.error('The originator cannot subscribe to this campaign');
                break;
              default:
                toastr.error('Oh no!  We couldn\'t get your subscription started.  Please refresh and try again');
                break;
            }
            $scope.isSubscribing = false;
            $scope.showValidationMessages = true;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSubscribing = false;
        toastr.warning('The email provided is either missing or incorrect.  Please try again');
      }
    }

    $scope.activate = function () {
      $scope.fund.item.statusId = 'Active';
      fdDashboardSvc.save($scope.fund).then(
        function () {
          $scope.showAlert = false;
          toastr.success('Congratulations.  Your fundraiser is now activated');
        },
        function () {
          toastr.error('There was an error activating this fundraiser.  Please try again');
        });

    };

    $scope.setTabActive = function(tabName, subName) {
      switch(tabName) {
        case 'supporter':
          $scope.tabSupportActive = true;
          break;
        default:
          break;
      }
    }

    //#endregion

    //#region === Private Methods ===

    function getGeo() {
      mdCoreDataSvc.getGeoData2().then(
        function (geo) {
          $scope.geo = geo;
        },
        function (response) {
          //Assign/Do Nothing
        });
    }

    function setUpImages() {
      $scope.fund.item.itemUploadList = $filter('orderBy')($scope.fund.item.itemUploadList, 'sortOrder');
      var i = 0;
      angular.forEach($scope.fund.item.itemUploadList, function (value, key) {
        var imgUrl = value.upload.location;
        var thumbUrl = value.upload.location;
        if (value.upload.typeId == 'web.Image') {
          //imgUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=560&width=550&mode=crop&scale=both';

          //thumbUrl = '/azure/' + value.upload.containerName + '/'
          //  + value.upload.name
          //  + '?height=180&width=180&mode=crop&scale=both';

          imgUrl = value.upload.location
            + '?height=560&width=550&mode=crop&scale=both';

          thumbUrl = value.upload.location
            + '?height=180&width=180&mode=crop&scale=both';
        }


        $scope.slides.push({
          imgUrl: imgUrl,
          thumbUrl: thumbUrl,
          title: '',
          description: '',
          active: value.isDefault
        });

        if (value.isDefault || i === 0) {
          switch (value.upload.typeId) {
            case 'web.Video.Vimeo':
            case 'web.Video.YouTube':
              $scope.fund.defaultImage = value.upload.name;
              $scope.fund.defaultImageThumb = value.upload.name;
              break;
            default:
              $scope.fund.defaultImage = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=200&width=310&mode=crop&scale=both';

              $scope.fund.defaultImageThumb = '/azure/' + value.upload.containerName + '/'
                + value.upload.name
                + '?height=75&width=75&mode=crop&scale=both';
              break;
          }


        }
        value.imgUrl = imgUrl;
        value.thumbUrl = thumbUrl;
        i++;
      });
    }

    function setUpMessage() {
      //<md-alert-drctv title="{{title}}" message="{{message}}" alert-type="{{alertType}}" fade="fadeIn" show-alert="{{showAlert}}"></md-alert-drctv>
      if ($scope.isThisFundMine) {

        switch ($scope.fund.item.statusId) {
          case 'Preliminary':
            $scope.showAlert      = true;
            $scope.showBlock      = true;
            $scope.title          = 'Activate Now';
            $scope.message        = 'Your fundraiser has not yet been activated and will not be seen by anyone except you.  ';
            $scope.message       += 'To publicize and begin accepting donations click "Activate Now" below.';
            $scope.alertType      = 'info'; //success, danger, warning, info
            $scope.buttonTitle    = 'Activate Now!';
            $scope.buttonFunction = $scope.activate;
            break;
          case 'Private':
          case 'Hidden':
            $scope.showAlert      = true;
            $scope.showBlock      = true;
            $scope.title          = 'Change status';
            $scope.message        = 'Your fundraiser is marked with the status of "' + $scope.fund.item.statusId + '" ';
            $scope.message       += 'and only be seen by a limited number of people.  To change the status click "Change Status" below.';
            $scope.alertType      = 'info'; //success, danger, warning, info
            $scope.buttonTitle    = 'Change Status';
            $scope.buttonFunction = function() {
              $scope.modalEditSettings(4);
            }
            break;
          case 'Expired': //Completed
            $scope.showAlert      = true;
            $scope.showBlock      = true;
            $scope.title          = 'Accept Donations';
            $scope.message        = 'Your fundraiser is marked with the status of "Completed" ';
            $scope.message       += 'and can no longer accept donations.  To change the status click "Change Status" below';
            $scope.alertType      = 'danger'; //success, danger, warning, info
            $scope.buttonTitle    = 'Change Status';
            $scope.buttonFunction = function() {
              $scope.modalEditSettings(4);
            };
            break;
          default:
            break;
        }
      } 
      return;
    }

    function getFundDonations(fundId) {
      fdSvc.donations(fundId, 1, 0).then(
        function (items) {
          angular.forEach(items.data, function(value, index) {
            if ($scope.fund.settings.donationHideAmount) {
              value.isPrivateAmount = true;
            }
            if ($scope.fund.settings.donationHideDonorName) {
              value.isPrivateDonorName = true;
            }
          });
          $scope.fund.donationList = items.data;
        },
        function (response) {
          toastr.error('We couldn\'t get the donations! Please refresh and try again');
        });
    }

    function isMyFund() {
      if (seAuthSvc.isLoggedIn()) {
        $scope.isLoggedIn = true;
        fdSvc.isMyFund($scope.fund.identification, seAuthSvc.getBearerToken()).then(
          function (response) {
            $scope.isThisFundMine = true;
            $scope.fund.item.userId = seAuthSvc.user.identification;
            $window.App.mallDub.initNavBarScroll('#edit-bar', '#edit-bar-nav', false);
            $scope.situate();
          }, function(response) {
            situateTheirFund();
        });
      } else {
        situateTheirFund();
      }
    } 

    function situateTheirFund() {
      switch($scope.fund.item.statusId) {
        case 'Active':
        case 'Private':
          $window.App.mallDub.initNavBarScroll('#donate-bar', '#donate-bar-nav', true);
          $scope.situate();
          break;
        case 'Expired': // Completed
          $scope.isDonateable = false;
          $scope.situate();
          break;
        default: // Hidden
          $state.go('home.404');
          break;
      }
    }

    function checkPaymentGateway() {
      if ($scope.fund)
      if ($scope.fund.originator.gatewayList.length > 0) {
        $scope.gatewayExists = true;
      }  
    }

    function handleError(data) {

      switch (data.error_code) {
        case '4000':
        case '4001':
          $scope.title = 'Fund not available';
          $scope.message = 'D\'oh! This fundraiser is currently on vacation.  If you\'d like some assistance please contact this fundraiser\'s organizer';
          $scope.alertType = 'danger';
          $scope.showAlert = true;
          break;
      }
    }

    function daysFromNow(endDate) {
      var start = moment();
      var end = moment(endDate);
      var difference = end.diff(start) > 0 ? " left" : " ago";
      var ended = end.diff(start) > 0 ? "" : "ended ";
      //return start.from(end);
      return ended + moment(endDate).fromNow(true) + difference;
    }

    function fundToOpenGraph(fund) {
        var defaultImageUrl = appUrl.base + $scope.fund.defaultImage;
        var description = fund.item.softDescription;

      $scope.socialData = {
        fund: fund,
        facebookData: {
          method: 'feed',
          link: fund.url,
          picture: defaultImageUrl,
          name: fund.item.title,
          caption: 'www.fundingmiracles.com',
          description: description
    },
        twitterData: {
          hashtags: '',
          via: 'fundingmiracles',
          related: '//www.fundingmiracles.com',
          text: fund.item.title,
          url: fund.url
        }
      };

      $scope.$parent.pageTitle       = fund.item.title;
      $scope.$parent.pageDescription = fund.item.softDescription;
      $scope.$parent.og.title        = fund.item.title;
      $scope.$parent.og.url          = fund.url;
      $scope.$parent.og.description  = fund.item.softDescription;
      $scope.$parent.og.image        = defaultImageUrl;
      $scope.$parent.og.card         = 'summary';
    }

    function saveFund (successCallBack, successTitle) {
      $scope.isSaving = true;

      fdDashboardSvc.save($scope.fund).then(
        function (promisedFund) {
          $scope.isSaving = false;
          $scope.fund.identification = promisedFund.identification;

          mdCoreDataSvc.reCache(promisedFund.item.permalink).then(
            function (resp) {
              $log.info(resp);
            }, function (resp) {
              $log.error(resp);
            });

          if (angular.isFunction(successCallBack)) {
            successCallBack(successTitle);
          }
        },
        function (response) {
          toastr.error('There was an error saving this fund.  Please try again');
          $log.error(response);
          $scope.isSaving = false;
        });
    };

    function toastrSuccessMessage(message, title) {
      $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      toastr.success(message);
    }
    //#endregion

    //#region === Modals ===

    $scope.modalEditTitle = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/fdCtrlEditTitleMdl.min.html',
        controller: fdCtrlEditTitleMdl,
        size: 'sm',
        resolve: {
          fund: function () {
            return $scope.fund;
          },
        }
      });

      modalInstance.result.then(function (title) {
        $scope.fund.item.title = title;
        toastr.success('The title has been changed successfully');
        //Save
      }, function () {
        //Do nothing on cancel
      });
    }

    $scope.modalEditGoal = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/fdCtrlEditGoalMdl.min.html',
        controller: fdCtrlEditGoalMdl,
        size: 'sm',
        resolve: {
          fund: function () {
            return $scope.fund;
          },
        }
      });

      modalInstance.result.then(function (amount) {
        $scope.fund.goalAmount = amount;
        toastr.success('The goal amount has been changed successfully');
        //Save
      }, function () {
        //Do nothing on cancel
      });
    }

    $scope.modalEditPermalink = function () {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditPermalinkMdl.min.html',
          controller: fdCtrlEditPermalinkMdl,
          size: 'sm-med',
          resolve: {
            fund: function() {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function(permalink) {
          $scope.fund.item.permalink = permalink;
          $scope.fund.url = appUrl.base + '/' + $scope.fund.item.permalink;
          $state.go('home.permalink', {permalink: permalink});
          toastr.success('The permalink has been changed successfully');
          //Save
        }, function() {
          //Do nothing on cancel
        });
      }
    }

    $scope.modalEditDescription = function () {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditDescriptionMdl.min.html',
          controller: fdCtrlEditDescriptionMdl,
          size: 'med',
          resolve: {
            fund: function () {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function (description) {
          $scope.fund.item.description = description;
          toastr.success('The description has been changed successfully');
          //Save
        }, function () {
          //Do nothing on cancel
        });
      }
    }

    $scope.modalEditShortSummary = function() {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditShortSummaryMdl.min.html',
          controller: fdCtrlEditShortSummaryMdl,
          size: 'med',
          resolve: {
            fund: function() {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function(shortSummary) {
          $scope.fund.item.shortSummary = shortSummary;
          toastr.success('The short summary has been changed successfully');
          //Save
        }, function() {
          //Do nothing on cancel
        });
      }
    }

    $scope.modalEditCategory = function () {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditCategoryMdl.min.html',
          controller: fdCtrlEditCategoryMdl,
          size: 'med',
          resolve: {
            fund: function () {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function (category) {
          $scope.fund.categoryId   = category.identification;
          $scope.fund.categoryName = category.friendlyName;
          toastr.success('The category has been changed successfully');
          //Save
        }, function () {
          //Do nothing on cancel
        });
      }

    }

    $scope.modalEditUpload = function () {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditUploadMdl.min.html',
          controller: fdCtrlEditUploadMdl,
          size: 'med',
          resolve: {
            fund: function () {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function (uploadList) {
          $scope.fund.item.itemUploadList = uploadList;
          //Save
        }, function (reason) {
          //In case image order changed
          switch(reason) {
            case 'cancelled':
            default:
              break;
          }
          //$state.transitionTo($state.current, $stateParams, {
          //  reload: true,
          //  inherit: false,
          //  notify: true
          //});
        });
      }
    }

    $scope.modalEditDate = function () {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditDateMdl.min.html',
          controller: fdCtrlEditDateMdl,
          size: 'sm-med',
          resolve: {
            fund: function () {
              return $scope.fund;
            },
          }
        });

        modalInstance.result.then(function (endDate) {
          $scope.daysFromNow = daysFromNow(endDate);
          $scope.fund.item.endDate = endDate;
          toastr.success('The campaigns end date has been changed successfully');
        }, function (reason) {
          //In case image order changed
        });
      }
    }

    $scope.modalEditSettings = function (activeTab) {
      if (seAuthSvc.isLoggedIn()) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/fdCtrlEditSettingsMdl.min.html',
          controller: fdCtrlEditSettingsMdl,
          size: 'med',
          resolve: {
            fund: function () {
              return $scope.fund;
            },
            activeTab: function() {
              return activeTab;
            }
          }
        });

        modalInstance.result.then(function (endDate) {
          $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
          });
        }, function (reason) {
          $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
          });
        });
      }
    }

    //#endregion

  }]);
///#source 1 1 /app/fund/fdCtrlEditTitleMdl.js
var fdCtrlEditTitleMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origTitle                 = fund.item.title;
    $scope.title                  = fund.item.title;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    // Init modal
    (function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    //#endregion

    //#region === Public Methods ===

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function() {
      $scope.isSaving = true;
      if (this.fundEditTitleForm.$valid) {
        fund.item.title = $scope.title;
        fdDashboardSvc.save(fund).then(
          function() {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.title);
          },
          function() {
            fund.item.title = origTitle;
            $scope.isSaving = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===


    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditGoalMdl.js
var fdCtrlEditGoalMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origGoal                  = fund.goalAmount;
    $scope.goalAmount             = fund.goalAmount;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditAmountForm.$valid) {
        fund.goalAmount = $scope.goalAmount;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.goalAmount);
          },
          function () {
            fund.goalAmount               = origGoal;
            $scope.isSaving               = false;
            $scope.showValidationMessages = true;
            toastr.error('There was a problem saving the amount.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }

    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditPermalinkMdl.js
var fdCtrlEditPermalinkMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origPermalink             = fund.item.permalink;
    $scope.permalink              = fund.item.permalink;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditPermalinkForm.$valid) {
        fund.item.permalink = $scope.permalink;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close(fund.item.permalink);
          },
          function () {
            fund.item.permalink           = origPermalink;
            $scope.isSaving               = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }
    //#endregion

  }];
///#source 1 1 /app/fund/fdCtrlEditDescriptionMdl.js
var fdCtrlEditDescriptionMdl = [
  '$scope', '$uibModalInstance', '$filter', '$timeout', '$window', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, $timeout, $window, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origDescription           = fund.item.description;
    $scope.description            = fund.item.description;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.showTextEditor         = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditDescriptionForm.$valid) {
        $scope.description = CKEDITOR.instances.funddescription.getData();
        fund.item.description = $scope.description;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.description);
          },
          function () {
            fund.item.description         = origDescription;
            $scope.isSaving               = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        $timeout(function() {
          $window.CKEDITOR.replace('funddescription');
          $scope.showTextEditor = true;
        }, 1000);



        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }

    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditShortSummaryMdl.js
var fdCtrlEditShortSummaryMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origShortSummary          = fund.item.shortSummary;
    $scope.shortSummary           = fund.item.shortSummary;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    init();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditShortSummaryForm.$valid) {
        fund.item.shortSummary = $scope.shortSummary;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.shortSummary);
          },
          function () {
            fund.item.shortSummary = origShortSummary;
            $scope.isSaving = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        var length = this.fundEditShortSummaryForm.shortSummary.$viewValue.length;
        if (length > 140) {
          toastr.error('You are only allowed to add 140 characters to the short summary.  You are currently at ' + length);
        }
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function init() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    }

    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditCategoryMdl.js
var fdCtrlEditCategoryMdl = [
  '$scope', '$uibModalInstance', '$filter', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'mdCoreDataSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, appUrl, fdDashboardSvc, seAuthSvc, mdCoreDataSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origCategoryId            = fund.categoryId;
    $scope.categoryId             = fund.categoryId;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    (function() {
      if (seAuthSvc.isLoggedIn()) {
        getFundCategories();
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditCategoryForm.$valid) {
        fund.categoryId = $scope.categoryId;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close(getCategory($scope.categoryId));
          },
          function () {
            fund.categoryId = origCategoryId;
            $scope.isSaving = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    function findCategory(categoryToFind) {
      if (angular.isDefined(categoryToFind)) {
        var result = $.grep($scope.fundCategoryOptions, function (e) {
          return e.identification === categoryToFind;
        });

        //should only be one result
        return result[0].identification;
      } else {
        return null;
      }
    };

    function getCategory(categoryToFind) {
      if (angular.isDefined(categoryToFind)) {
        var result = $.grep($scope.fundCategoryOptions, function (e) {
          return e.identification === categoryToFind;
        });

        //should only be one result
        return result[0];
      } else {
        return null;
      }
    };

    function getFundCategories() {
      mdCoreDataSvc.getAllFundCategories().then(
        function (categories) {
          $scope.fundCategoryOptions = categories;
          $scope.categoryId = findCategory(fund.categoryId);
        },
        function (response) {
          $log.error(response);
        });
    }

    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditUploadMdl.js
var fdCtrlEditUploadMdl = [
  '$scope', '$uibModalInstance', '$filter', 'Upload', '$timeout', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, Upload, $timeout, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origUploads               = fund.item.itemUploadList;
    $scope.uploadList             = fund.item.itemUploadList;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.newUploads             = [];
    $scope.fileReaderSupported    = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

    //Init
    (function () {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    //#endregion

    //#region === Public Methods ===

    $scope.$watch('newUploads', function (uploads) {
      $scope.formUpload = false;
      if (uploads != null) {
        for (var i = 0; i < uploads.length; i++) {
          $scope.errorMsg = null;
          generateThumb(uploads[i]);
          upload(uploads[i]);
        }
      }
    });

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function (itemUpload, isImage) {

      $scope.isSaving = true;
      if (isImage) itemUpload.file.progress = 90;

      if (angular.isDefined(fund.identification) && fund.identification > 0) {
        fdDashboardSvc.saveFundUpload(fund.identification, itemUpload).then(
          function (fundImage) {
            if (isImage) {
              itemUpload.file.progress = 100;
            itemUpload.file.actionVerb = '';
            }

            var img = initFileCreate(fundImage, fundImage.sortOrder);
            $scope.isSaving   = false;
            toastr.success("Image(s) saved successfully");
            fund.item.itemUploadList.push(img);
          },
          function (response) {
            toastr.error('We could not upload your file.  Please refresh and try again');
            fund.item.itemUploadList = origUploads;
            $scope.isSaving = false;
            if (isImage) itemUpload.file.progress = 0;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.sortableOptions = {
      update: function (e, ui) {
        //var logEntry = tmpList.map(function (i) {
        //  return i.value;
        //}).join(', ');
        //$scope.sortingLog.push('Update: ' + logEntry);
      },
      stop: function (e, ui) {
        for (var index = 0; index < fund.item.itemUploadList.length; index++) {
          fund.item.itemUploadList[index].sortOrder = index;
        }

        fdDashboardSvc.updateFundUploads(fund.identification, fund.item.itemUploadList).then(
          function (response) {

            toastr.success('Success!');
          }, function(response) {
          toastr.error('There was a problem updating.  Please refresh and try again');
        });
      }
    };

    $scope.remove = function (u) {
      var id = u.upload.identification;
      u.isRemoving = true;
      //TODO: Create confirmation modal
      fdDashboardSvc.deleteFundUploads(fund.identification, id).then(
        function(response) {

          $scope.uploadList = $filter('orderBy')(organize($scope.uploadList.filter(
            function (itemUpload) {
            return itemUpload.uploadId !== id;
            }), false, null, true), 'sortOrder');

          fund.item.itemUploadList = $scope.uploadList;

          toastr.success('Upload removed successfully');
        },
        function (response) {
          u.isRemoving = false;
          toastr.error('We\'re having trouble removing this image.  Try refreshing your page and trying again');
        });
    }

    $scope.addVideoUrl = function () {
      $scope.isSaving = true;
      if (this.fundEditUploadVideoForm.$valid) {
        $scope.save({
          isDefault: false,
          sortOrder: findLatestSortOrder(),
          itemId: fund.identification,
          upload: {
            contentType: 'video/mpeg',
            locationHttp: $scope.videoUrl,
            description: $scope.videoUrl,
            location: $scope.videoUrl,
            name: $scope.videoUrl,
            originalFileName: $scope.videoUrl,
            isPrivate: false,
            CategoryId: 'Multimedia',
            typeId: 'web.Video'
          },
          imgUrl: $scope.videoUrl,
          thumbUrl: $scope.videoUrl,
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };
    
    $scope.getThumbnail = function (u) {

      var thumbNail = u.thumbUrl;

      switch (u.upload.typeId) {
        case 'web.Video.Vimeo':
        case 'web.Video.YouTube':
          thumbNail = u.upload.name;
          break;
      }

      return thumbNail;
    }

    $scope.getUploadType = function(u) {
      var typeId = 'Image';

      switch (u.upload.typeId) {
        case 'web.Video':
        case 'web.Video.Video':
        case 'web.Video.YouTube':
          typeId = 'Video';
          break;
      }

      return typeId;
    }

    $scope.getUploadRowIcon = function(u) {
      return {
        'fa-image': u.upload.typeId === 'web.Image',
        'fa-youtube': u.upload.typeId === 'web.Video.YouTube',
        'fa-vimeo-square': u.upload.typeId === 'web.Video.Vimeo'
      }
    }
    //#endregion

    //#region === Private Methods ===

    var findLatestSortOrder = function () {
      var length = 0;
      angular.forEach($scope.uploadList, function (value, key) {
        if (value.sortOrder >= length) {
          length = value.sortOrder + 1;
        }
      });
      return length || 0;
    };

    function generateThumb(file) {
      if (file != null) {
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function () {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
              $timeout(function () {
                file.dataUrl = e.target.result;
              });
            }
          });
        }
      }
    }

    function upload(file) {
        var data = $scope.formUpload ? {
            //Place from properties here if applicable
        } : {};

        Upload.upload({
            url: appUrl.api +  '/api/uploader',
            method: 'POST',
            fields: data,
            file: file
        }).progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            if (angular.isUndefined(file.actionVerb)) {
                file.actionVerb = 'Uploading';
            }
            var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            file.progress = progress > 80 ? 80 : progress;

        }).success(function (data, status, headers, config) {
            file.progress = 85;
            file.actionVerb = 'Saving';
            file.result = data;
            var newFile = traverse(file.result, true, false, file);
            $scope.save(newFile, true);

        }).error(function (err) {
          if (err.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
          }

          if (err.exceptionMessage) {
            if (err.exceptionMessage === 'Maximum request length exceeded.') {
              toastr.error('File too large.  Please use a smaller one');
            } else {
              toastr.error(err.exceptionMessage);
            }
            
          } else {
            toastr.error('There was a problem updating.  Please refresh and try again');
          }

          // reset image upload bars
          file.progress = 0;
          file.actionVerb = '#FAIL';
          file.fileUploadFailure = true;
        });

    }

    function organize(files, append, length, queryable, remoteFile) {
      var res = [];
      var nextSort = length || 0;

      for (var i = 0; i < files.length; i++) {
        var file = queryable ? files[i].upload : files[i];
        res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
        nextSort++;
      }

      return res;
    }

    function traverse(files, append, queryable, remoteFile) {
      var res = [];
      var length = 0;
      angular.forEach($scope.uploadList, function(value, key) {
        if (value.sortOrder >= length) {
          length = value.sortOrder + 1;
        }
      });
      var nextSort = findLatestSortOrder();

      for (var i = 0; i < files.length; i++) {
        var file = queryable ? files[i].upload : files[i];
        file.typeId = 'web.Image';
        res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
        nextSort++;
      }
        
      return res[0];
    }

    function initFile(file, sortOrder, remoteFile) {
      var imgUrl = file.location;
      var thumbUrl = file.location;
      if (file.typeId == 'web.Image') {
        //imgUrl = '/azure/' + file.containerName + '/'
        //  + file.name
        //  + '?height=560&width=550&mode=crop&scale=both';

        //thumbUrl = '/azure/' + file.containerName + '/'
        //  + file.name
        //  + '?height=180&width=180&mode=crop&scale=both';

        imgUrl = file.location
          + '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = file.location
          + '?height=180&width=180&mode=crop&scale=both';
      }

      //Remove upload list
      file.itemUploadList = null;

      var img = {
        isDefault: false,
        sortOrder: sortOrder,
        uploadId: file.identification || 0,
        itemId: fund.identification,
        upload: file,
        imgUrl: imgUrl,
        thumbUrl: thumbUrl,
        fileUploadFailure : false
      }

      if (angular.isDefined(remoteFile)) {
        img.file = remoteFile;
      }

      return img;
    }

    function initFileCreate(itemUpload, sortOrder, remoteFile) {
      var imgUrl = itemUpload.upload.location;
      var thumbUrl = itemUpload.upload.location;
      if (itemUpload.upload.typeId == 'web.Image') {
        //imgUrl = '/azure/' + itemUpload.upload.containerName + '/'
        //  + itemUpload.upload.name
        //  + '?height=560&width=550&mode=crop&scale=both';

        //thumbUrl = '/azure/' + itemUpload.upload.containerName + '/'
        //  + itemUpload.upload.name
        //  + '?height=180&width=180&mode=crop&scale=both';

        imgUrl = itemUpload.upload.location
          + '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = itemUpload.upload.location
          + '?height=180&width=180&mode=crop&scale=both';
      }

      itemUpload.imgUrl = imgUrl;
      itemUpload.thumbUrl = thumbUrl;

      if (angular.isDefined(remoteFile)) {
        itemUpload.file = remoteFile;
      }

      return itemUpload;
    }

    //#endregion

  }];
///#source 1 1 /app/fund/fdCtrlEditDateMdl.js
var fdCtrlEditDateMdl = [
  '$scope', '$uibModalInstance', '$filter', '$timeout', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, $timeout, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origEndDate               = fund.item.endDate;
    $scope.endDate                = fund.item.endDate;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;

    //#endregion

    //#region === Public Methods ===

    //init
    (function() {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function () {
      $scope.isSaving = true;
      if (this.fundEditDateForm.$valid) {
        fund.item.endDate = $filter('date')($scope.endDate, 'M/dd/yyyy');;
        fdDashboardSvc.save(fund).then(
          function () {
            $scope.isSaving = false;
            $uibModalInstance.close($scope.endDate);
          },
          function () {
            fund.item.endDate             = origEndDate;
            $scope.isSaving               = false;
            $scope.showValidationMessages = true;
            toastr.error('There was an error saving this fund.  Please try again');
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    //#endregion

    //#region === Private Methods ===

    //#endregion

    //#region === Date Functions ===
    (function() {
      $scope.dt = new Date();
      $scope.minDate = ($scope.minDate) ? null : new Date();
    })();


    $scope.showWeeks = false;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    // date-disabled="disabled(date, mode)"
    $scope.disabled = function (date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };


    $scope.open = function () {
      $timeout(function () {
        $scope.opened = true;
      });
    };

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
    };

    //#endregion
  }];
///#source 1 1 /app/fund/fdCtrlEditSettingsMdl.js
var fdCtrlEditSettingsMdl = [
  '$scope', '$uibModalInstance', 'fund', 'activeTab',
  function ($scope, $uibModalInstance, fund, activeTab) {

    //#region === Initialize ===

    'use strict';
    $scope.fund = fund;
    $scope.activeTab = activeTab;

    //#endregion

    //#region === Public Methods ===

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    //#endregion

  }];
///#source 1 1 /app/fund/search/fdSearchCtrl.js
fundoloApp.controller('fdSearchCtrl', ['$scope', '$location', '$log', '$stateParams', '$state', '$filter', 'fdSvc', 'mdCoreDataSvc', 'mdScrollScrollSvc',
  function ($scope, $location, $log, $stateParams, $state, $filter, fdSvc, mdCoreDataSvc, mdScrollScrollSvc) {

    //#region === Initialize ===
    'use strict';
    $scope.searchText   = $stateParams.searchText;
    $scope.items          = [];
    $scope.totalItems     = 0;
    $scope.isLoading      = false;
    $scope.sortCriteria   = 'default';
    $scope.sortTitle      = 'Popularity';
    $scope.searchSelected = '';
    $scope.resultType     = 'grid';

    if (angular.isUndefined($stateParams.category)) {
      $scope.category = ['All'];
    } else {
      $scope.category = [$stateParams.category];
    }

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 9;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 3;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    
    $scope.onSelectPage = function() {
      $scope.search($scope.currentPage);
      mdScrollScrollSvc.scrollTo('topofPage', 20);
    };

    //=============================
    //#endregion

    //#region === Public Methods ===
    $scope.checkDefault = function () {
      var found = false;
      angular.forEach($scope.categories, function (value, key) {
        if (angular.isDefined(value.selected) && value.selected === true) {
          found = true;
        }
      });

      if (found) return;

      angular.forEach($scope.categories, function (value, key) {
        if (value.identification === 'All') {
          value.selected = true;
          return;
        }
      });
    }

    $scope.checkInput = function(inputText) {
      if (inputText.length === 0 || angular.isUndefined(inputText)) {
        $scope.search(1, 'All');
      }
    }

    $scope.getCategories = function() {
      mdCoreDataSvc.getAllFundCategories().then(function (categories) {

        angular.forEach(categories, function(value, index) {
          value.selected = false;
        });

          $scope.categories = categories;
        },
      function(response) {
        $log.error(response);
        toastr.error('Can\'t find the categories!  Let\'s try again');
      });
    }

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.init = function(fundsCount) {  
      $scope.isLoading       = false;
      $scope.items           = $scope.funds;
      $scope.totalItems      = fundsCount;
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    $scope.onCategorySelect = function(item, model, label) {
      var arrItem = item.split(',');
      $scope.search(1, arrItem[0]);
    }

    $scope.reset = function() {
      angular.forEach($scope.categories, function(item, key) {
        item.selected = false;
      });
      $scope.searchText = undefined;
      $scope.category = ['All'];
      $scope.searchSelected = '';
      $scope.search(1);
    }

    $scope.search = function (pageNumber, searchText) {
      $scope.isLoading = true;

      if (angular.isUndefined(searchText) && angular.isUndefined($scope.searchText)) {
        $scope.searchText = 'All';
        searchText = $scope.searchText;
      } else if (angular.isUndefined(searchText)) {
        searchText = $scope.searchText;
      } else {
        $scope.searchText = searchText;
      }


      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      } 

      return fdSvc.search(
        $scope.category,
        searchText,
        pageNumber,
        $scope.itemsPerPage,
        $scope.sortCriteria).then(
        function (funds) {

          $scope.funds       = funds.data;
          $scope.init(funds.count);
          var mapping = $scope.funds.map(function (fund) {
            var searchLabel = fund.item.title + ', For ';

            if (angular.isDefined(fund.beneficiary)) {
              searchLabel += fund.beneficiary.fullName;
            } else {
              searchLabel += fund.originator.fullName;
            }
            return searchLabel;
          });
          return mapping;
        },
        function (response) {
          toastr.error(response.error_description);
          $log.info(response);
          $scope.isLoading = false;
        });

    };

    $scope.setCategory = function (categoryId) {

      var category = $filter('findById')($scope.categories, categoryId);
      category.selected = !category.selected;

      $scope.checkDefault();

      $scope.category.length = 0;

      angular.forEach($scope.categories, function (value, key) {
        if (angular.isDefined(value.selected)) {
          if (value.selected) {
            $scope.category.push(value.identification);
          }
        } 
      });

      if ($scope.category.length === 0) {
        $scope.category.push('All');
      }

      $scope.search(1);
    }

    $scope.show = function (showPage) {
      $scope.itemsPerPage = showPage;
      $scope.search(1);
    };

    $scope.sort = function(criteria, title) {
      $scope.sortCriteria = criteria;
      $scope.sortTitle    = title;
      $scope.search(1);
    }
    //#endregion

    //#region === Private Methods ===


    //#endregion

    $scope.getCategories();
    $scope.search(1);

  }])
.filter('findById', function() {
  return function (input, id) {
    var i = 0, len = input.length;
    for (i; i < len; i++) {
      if (input[i].identification === id) {
        return input[i];
      }
    }
    return undefined;
  }
});

///#source 1 1 /app/fund/widgets/fdWidgetsPermalinkSvc.js
'use strict';

fundoloApp.factory('permalinkData', ['$resource', '$q', 'appUrl',
  function ($resource, $q, appUrl) {
  var resource = $resource(appUrl.api + '/api/permalinks/:permalink', { permalink: '@permlaink' },
    {
      
    });
  var p = {};

  p.exists = function(permalink) {
    var deferred = $q.defer();

    if (angular.isUndefined(permalink) || permalink.length < 1) {
      deferred.reject(false);
    } else {
      resource.get({ permalink: permalink },
        function(response) {
          deferred.resolve(response.exists);
        },
        function(response) {
          deferred.reject(false);
        });
    }

    return deferred.promise;
  };

  return p;
}]);
///#source 1 1 /app/security/seAuthSvc.js
fundoloApp.factory('seAuthSvc', ['$http', '$cookieStore', '$resource', '$q', '$log', '$interval', '$window', 'appUrl',
  function ($http, $cookieStore, $resource, $q, $log, $interval, $window, appUrl) {
  
  //#region === Variables ===
    'use strict';
    var p = {};
    var mockToken = {
      access_token: 'bearer ',
      expires_in: '',
      token_type: '',
      userName: ''
    };
    var ghostToken;
    var accessLevels = routingConfig.accessLevels;
    var userRoles    = routingConfig.userRoles;
    var currentUser = parseUser() || {
      userName: '',
      role: userRoles.public,
      isAuthenticated: false
    };

  //#endregion === Variables ===
  
  //#region === Utility Functions ===
  //TODO Add this method to a utilities function global::
    function queryStringToJson(queryString) {
      //if first character is '?'
      //var pairs = querystring.slice(1).split('&');
      var pairs = queryString.split('&');

      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });

      return JSON.parse(JSON.stringify(result));
    }

    var parseError = function (response) {
      if (angular.isUndefined(response.data)) {
        return null;
      }

      if (angular.isDefined(response.data.modelState)) {
        return parseModelObject(response);
      } else {
        return response;
      }
    };
  
    function parseUser() {
      var cookie = (sessionStorage['user'] || localStorage['user']);
      if (angular.isUndefined(cookie)) {
        return null;
      }

      return JSON.parse(cookie);
    };

    function stringifyUser(user) {
      return JSON.stringify(user);
    }

    function changeUser(user) {
      angular.extend(currentUser, user);
    };

    var clearUser = function () {
      changeUser({
        userName: '',
        role: userRoles.public,
        token: mockToken
      });
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    };

    function getInternalToken() {
      var token = p.user.token || ghostToken;
      if (angular.isUndefined(token)) {
        return '';
      }
      return token.token_type + ' ' + token.access_token;
    };

    var parseModelObject = function(response) {

      var model = response.data;
      var errorObject = {
        error: model.message,
        error_description: ''
      };
      if (!angular.isUndefined(model.modelState[""])) {
        errorObject.error_description += ' ' + model.modelState[""];
      }

      if (!angular.isUndefined(model.modelState["model.ConfirmEmail"])) {
        errorObject.error_description = model.modelState["model.ConfirmEmail"];
      }

      if (!angular.isUndefined(model.modelState["model.UserName"])) {
        errorObject.error_description += ' ' + model.modelState["model.UserName"];
      }

      if (!angular.isUndefined(model.modelState["model.ConfirmPassword"])) {
        errorObject.error_description += ' ' + model.modelState["model.ConfirmPassword"];
      }

      if (!angular.isUndefined(model.modelState["model.Password"])) {
        errorObject.error_description += ' ' + model.modelState["model.Password"];
      }

      if (!angular.isUndefined(model.modelState["model.Email"])) {
        errorObject.error_description += ' ' + model.modelState["model.Email"];
      }

      if (!angular.isUndefined(model.modelState["model.FirstName"])) {
        errorObject.error_description += ' ' + model.modelState["model.FirstName"];
      }

      if (!angular.isUndefined(model.modelState["model.LastName"])) {
        errorObject.error_description += ' ' + model.modelState["model.LastName"];
      }

      if (!angular.isUndefined(model.modelState["model.StatusId"])) {
        errorObject.error_description += ' ' + model.modelState["model.StatusId"];
      }
      return errorObject;
    };
  //#endregion
  
  //#region === Resources ===
  
    var resource = $resource(appUrl.api + '/api/auth/:action', {
      action: '@action'
    }, {
      'register':           { method: 'POST', params: { action: 'register' } },
      'registerAnonymous':  { method: 'POST', params: { action: 'registerAnonymous' } },
      'externalLogin':      { method: 'POST', params: { action: 'externalLogin' } },
      'externalLogins':     { method: 'GET',  params: { action: 'externalLogins' }, isArray: true },
      'singleExternalLogin':{ method: 'GET',  params: { action: 'singleExternalLogin' }, isArray: true },
      'manageInfo':         { method: 'GET',  params: { action: 'manageInfo' }, headers: { 'authorization': getInternalToken } },
      'addExternalLogin':   { method: 'POST', params: { action: 'addExternalLogin' }, headers: { 'authorization': getInternalToken } },
      'changePassword':     { method: 'POST', params: { action: 'changePassword' }, headers: { 'authorization': getInternalToken } },
      'logout':             { method: 'POST', params: { action: 'logout' }, headers: { 'authorization': getInternalToken } },
      'registerExternal':   { method: 'POST', params: { action: 'registerExternal' }, headers: { 'authorization': getInternalToken } },
      'removeLogin':        { method: 'POST', params: { action: 'removeLogin' } },
      'setPassword':        { method: 'POST', params: { action: 'setPassword' }, headers: { 'authorization': getInternalToken } },
      'userInfo':           { method: 'GET',  params: { action: 'userInfo' }, headers: { 'authorization': getInternalToken } },
      'postClaim':          { method: 'POST', params: { action: 'claim' }, headers: { 'authorization': getInternalToken } },
      'resetPassword':      { method: 'POST', params: { action: 'resetPassword' }},
    });

    var tokenResource = $resource(appUrl.api + '/token', {}, {
      'token': { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    });

  //#endregion === Resources ===

  //#region === Methods ===
    p.addExternalLogin = function (myToken) {
      var deferred = $q.defer();
      var model = ghostToken || myToken;
      if (angular.isUndefined(model)) {
        deferred.reject({
          error: 'Add external login',
          error_description: 'The access token is missing or invalid'
        });
      } else {
        resource.addExternalLogin({
          externalAccessToken: model.access_token
      },
          function(response) {
            deferred.resolve(response);
          },
          function(response) {
            deferred.reject({
              error: 'Add external login',
              error_description: 'Unable to add external login.',
              data: response
            });
          });
      }

      return deferred.promise;
    };
  
    p.handleAccessTokenRedirect = function (provider, querystring) {
      var deferred = $q.defer();
      var fragment = queryStringToJson(querystring);

      if (angular.isDefined(fragment.error)) {
        deferred.reject(fragment);
      } else {
        ghostToken = fragment;
        deferred.resolve(fragment);
      }

      return deferred.promise;
    };

    p.getBearerToken = getInternalToken;

    p.removeLogin = function(login) {
      var deferred = $q.defer();

      if (angular.isUndefined(login.loginProvider) || angular.isUndefined(login.providerKey)) {
        deferred.reject({
          error: 'Remove login provider',
          error_description: 'Login provider and/or provider key are missing or invalid.'
        });
      } else {
        resource.removeLogin(login,
          function(response) {
            deferred.resolve(response);
          }, 
          function(response) {
            deferred.reject({
              error: 'Remove login provider',
              error_description: 'There was an error removing login provider',
              obj: response
            });
        });
      }

      return deferred.promise;
    };

    p.externalLogins = function(returnUrl, generateState) {
      var deferred = $q.defer();

      if (angular.isUndefined(returnUrl)) {
        returnUrl = appUrl.base + '/';
      }
    
      if (angular.isUndefined(generateState)) {
        generateState = true;
      }

      resource.externalLogins({
        returnUrl: returnUrl,
        generateState: generateState
      },
        function(ets) {
          deferred.resolve(ets);
        },
        function(response) {
          deferred.reject({          
            error: 'ExternalLogin',
            error_description: 'Unable to retrieve external logins.  Please try again.',
            obj: response
          });
        });

      return deferred.promise;
    };

    p.singleExternalLogin = function (provider, returnUrl, generateState) {
      var deferred = $q.defer();

      if (angular.isUndefined(returnUrl)) {
        returnUrl = appUrl.base + '/';
      }

      if (angular.isUndefined(generateState)) {
        generateState = true;
      }

      if (angular.isUndefined(provider)) {
        deferred.reject({
          error: 'Provider',
          error_description: 'Invalid or missing provider.'
        });
      } else {

        resource.singleExternalLogin({
            provider: provider,
            returnUrl: returnUrl,
            generateState: generateState
          },
          function(ets) {
            deferred.resolve(ets);
          },
          function(response) {
            deferred.reject({
              error: 'SingleExternalLogin',
              error_description: 'Unable to retrieve external login [' + provider + ']  Please try again.',
              obj: response
            });
          });
      }
      return deferred.promise;
    };
  
    p.login = function(user, persistent) {
      var deferred = $q.defer();

      if (angular.isUndefined(user.userName) || angular.isUndefined(user.password)) {
        deferred.reject({
          error: 'Username/Password',
          error_description: 'Invalid or missing username and/or password.'
        });
      } else {

        var params = $.param({
          username:   user.userName,
          password:   user.password,
          grant_type: 'password'
        });

        tokenResource.save(params,
          function (authToken) {
            p.setUser(user, authToken, persistent);
            //simple 200 will suffice
            deferred.resolve(authToken);
          },
          function(response) {
            deferred.reject({
              error: 'Login',
              error_description: 'Unable to login into system. Please try again'
            });
            $log.warn(response);
          }
        );
      
      }
      return deferred.promise;
    };

    var setUserCookie = function(user, persistent) {
      if (persistent) {
        localStorage['user'] = stringifyUser(user);
      } else {
        sessionStorage['user'] = stringifyUser(user);
      }
    };

    p.setUser = function (user, token, persistent) {
      user.token      = token;
      user.role       = userRoles.user;
      user.password   = '';
      user.persistent = persistent;
      // Call here to set token for next call :GetUserInfo
      changeUser(user);

      p.getUserInfo().then(function (promisedUser) {
        user.firstName             = promisedUser.firstName;
        user.lastName              = promisedUser.lastName;
        user.email                 = promisedUser.email;
        user.hasRegistered         = promisedUser.hasRegistered;
        user.hasRegisteredExternal = promisedUser.hasRegisteredExternal;
        user.isAuthenticated       = promisedUser.isAuthenticated;
        user.facebookProvider      = promisedUser.facebookProvider;
        user.identification        = promisedUser.identification;
        changeUser(user);
        setUserCookie(user, persistent);
      }, function (response) {
        //TODO Thro angular exception
      });
    };
    p.getUserInfo = function () {

      var deferred = $q.defer();
      resource.userInfo({}, function(userInfo) {
        deferred.resolve(userInfo);
      }, function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    p.authorize = function(accessLevel, role) {
      if (role === undefined)
        role = currentUser.role;

      return accessLevel.bitMask & role.bitMask;
    };
  
    p.isLoggedIn = function(user) {
      if (user === undefined || user === null)
        user = currentUser;
      return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
    };
  
    p.register = function(user) {

      var deferred = $q.defer();

      if (angular.isUndefined(user)) {
        deferred.reject({
          error: 'Username object',
          error_description: 'Invalid or missing user.'
        });
      } else {
        resource.register(user,
          function (response, status, headers, confi) {
            deferred.resolve(response);
          },
          function (response, status, headers, confi) {
            deferred.reject(parseError(response));
          });
      }
      return deferred.promise;
    };
  
    p.registerAnonymous = function (user) {

      var deferred = $q.defer();

      if (angular.isUndefined(user)) {
        deferred.reject({
          error: 'Username object',
          error_description: 'Invalid or missing user.'
        });
      } else {
        resource.registerAnonymous(user,
          function (response, status, headers, confi) {
            deferred.resolve(response);
          },
          function (response, status, headers, confi) {
            deferred.reject(parseError(response));
          });
      }
      return deferred.promise;
    };

    p.registerExternal = function (user) {

      var deferred = $q.defer();

      if (angular.isUndefined(user)) {
        deferred.reject({
          error: 'Username object',
          error_description: 'Invalid or missing user.'
        });
      } else {
        var externalResource = $resource(appUrl.api + '/api/auth/:action', {
          action: '@action'
        }, {
          'registerExternal': { method: 'POST', params: { action: 'registerExternal' }, headers: { 'authorization': getInternalToken } },
        });
        externalResource.registerExternal(user,
          function (response) {
            deferred.resolve(response);
          },
          function (response, xhr) {
            deferred.reject(parseError(response));
          });
      }
      return deferred.promise;
    };

    p.manageInfo = function (returnUrl, generateState) {
      var deferred = $q.defer();

      if (angular.isUndefined(returnUrl)) {
        returnUrl = appUrl.base + '/';
      }

      if (angular.isUndefined(generateState)) {
        generateState = true;
      }

      resource.manageInfo({
        returnUrl: returnUrl,
        generateState: generateState
      },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject({
            error: 'Manage Info',
            error_description: 'Unable to retrieve manage info.  Please try again.',
            obj: response
          });
        });

      return deferred.promise;
    };

    p.setUserExternal = function (user, token, provider) {
      var myToken           = token || ghostToken;
      user.token            = myToken;
      user.role             = userRoles.user;
      user.password         = '';
      user.isExternal       = true;
      user.externalProvider = provider;
      ghostToken            = null;
      changeUser(user);
      setUserCookie(user, true);
    };

    p.setUserExternalToken = function(token) {
      ghostToken = token;
    }

    p.extendUser = function (user) {
      var persistent = user.persistent || false;
      changeUser(user);
      setUserCookie(user, persistent);
    };

    p.setPassword = function(password) {
      var deferred = $q.defer();

      if (angular.isUndefined(password) || angular.isUndefined(password.confirmPassword)) {
        deferred.reject({
          error: 'Password object',
          error_description: 'Invalid or missing password.'
        });
      } else {
        resource.setPassword(password,
          function(response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.postClaim = function(claimType, val) {
      var deferred = $q.defer();

      if (angular.isUndefined(claimType) || angular.isUndefined(val)) {
        deferred.reject({
          error: 'Invalid params',
          error_description: 'Claim type or Val is either missing or invalid'
        });
      } else {
        resource.postClaim({claimType: claimType, val: val}, 
         function(response) {
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        });
      }

      return deferred.promise;
    }

    p.resetPassword = function(resetPasswordModel) {
      var deferred = $q.defer();

      if (angular.isUndefined(resetPasswordModel)) {
        deferred.reject({
          error: 'Reset password username invalid',
          error_description: 'Invalid or missing username.'
        });
      } else {
        resource.resetPassword(resetPasswordModel,
          function(response) {
            deferred.resolve(response);
          }, function(response) {
          deferred.reject(response);
        });
      }

      return deferred.promise;
    };

    p.changePassword = function(password) {
      var deferred = $q.defer();

      if (angular.isUndefined(password)) {
        deferred.reject({
          error: 'Password object',
          error_description: 'Invalid or missing password.'
        });
      } else {
        resource.changePassword(password,
          function(response) {
            deferred.resolve(response);
          },
          function (response) {
            if (angular.isUndefined(response.data.modelState) === false) {
              deferred.reject(parseModelObject(response));
            }
            deferred.reject({
              error: 'Password object',
              error_description: 'Invalid or missing password.'
            });
          });
      }

      return deferred.promise;
    };

    p.logout = function () {
      var deferred = $q.defer();
    
      resource.logout({},
        function(response) {
          clearUser();       
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
          clearUser();
        });

      return deferred.promise;
    };
    //#endregion === Methods ===
  
    //#region === Facebook Methods ====
    p.facebookLogin = function (user, facebookUrl) {
      var deferred = $q.defer();

      $window.$davidScope = {};
      var obj = {};



        var left     = screen.width / 2 - 200;
        var top      = screen.height / 2 - 250;
        var popup = $window.open(appUrl.facebook.signInUrl + facebookUrl, '', "top=" + top + ",left=" + left +
          ",width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0");
        var interval = 1000;

        // create an ever increasing interval to check a certain global value getting assigned in the popup
        var i = $interval(function() {
          interval += 250;
          try {

            if (popup.value) {
              angular.extend(user, $davidScope.user);
              obj.user = user;
              if ($davidScope.connect) {
                obj.isExternalLogin = true;
                deferred.resolve(obj);
              } else if ($davidScope.register) {
                obj.isExternalRegister = true;
                obj.user.confirmEmail  = user.email;
                obj.user.token         = $davidScope.says.access_token;
                obj.user.password      = 'fundingmiracles';
                obj.user.disableWePay  = true;
                obj.user.userName      = user.email;
                obj.token = {
                  access_token: $davidScope.says.access_token,
                  expires_in: $davidScope.says.expires_in,
                  state: $davidScope.says.state,
                  token_type: $davidScope.says.token_type
                };
                p.setUserExternalToken(obj.token);
                p.registerExternal(obj.user).then(function () {
                  p.login(obj.user).then(function(response) {
                    deferred.resolve(obj);
                  },
                  function(response) {
                    toastr.error('Error authenticating the external user.  Please refresh and try again');
                    deferred.reject(obj);
                  });
                }, function(response) {
                  deferred.reject(response);
                });
              } else {
                obj.token = {
                  access_token: $davidScope.says.access_token,
                  expires_in: $davidScope.says.expires_in,
                  state: $davidScope.says.state,
                  token_type: $davidScope.says.token_type
                };
                obj.user.token = obj.token;
                p.setUser(obj.user, obj.token, true);
                deferred.resolve(obj);
              }
              $interval.cancel(i);
              popup.close();
            }
          } catch (e) {
            deferred.reject(e);
          }
        }, interval);

      return deferred.promise;
    }
      //#endregion

    p.accessLevels = accessLevels;
    p.userRoles    = userRoles;
    p.user         = currentUser;

    return p;
}]);

fundoloApp.factory('Users', ['$http', function ($http) {
  return {
    getAll: function (success, error) {
      $http.get('/users').success(success).error(error);
    }
  };
}]);

///#source 1 1 /app/security/security.js
fundoloApp.directive('accessLevel', ['seAuthSvc', function (seAuthSvc) {
  'use strict';
  var p = {};

  p.restrict = 'A';
  p.link = function (scope, element, attrs) {
      var prevDisp = element.css('display')
          , userRole
          , accessLevel;

      scope.user = seAuthSvc.user;
      scope.$watch('user', function (user) {
        if (user.role)
          userRole = user.role;
        updateCss();
      }, true);

      attrs.$observe('accessLevel', function (al) {
        if (al) accessLevel = scope.$eval(al);
        updateCss();
      });

      function updateCss() {
        if (userRole && accessLevel) {
          if (!seAuthSvc.authorize(accessLevel, userRole))
            element.css('display', 'none');
          else
            element.css('display', prevDisp);
        }
      }
  };

  return p;
}])

.directive('activeNav', ['$location', function ($location) {
  var p = {};
  p.restrict = 'A';

  p.link = function(scope, element) {
    var nestedA = element.find('a')[0];
    var path = nestedA.href;

    scope.location = $location;

    scope.$watch('location.absUrl()', function(newPath) {
      if (path === newPath) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    });
  };

  return p;
}]);
///#source 1 1 /app/user/userSvc.js
'use strict';

fundoloApp.factory('userSvc', ['$resource', '$q', 'appUrl', 'seAuthSvc',
  function ($resource, $q, appUrl, seAuthSvc) {
  var p = {};
  var resource = $resource(appUrl.api + '/api/userdetails/:action', {}, {
    'get':           { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }},
    'update':        { method: 'PUT', params: { action: 'update' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'updateBasics':  { method: 'PUT', params: { action: 'updateBasics' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'updateStatus':  { method: 'PUT', params: { action: 'updatestatus' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'donations':     { method: 'GET', params: { action: 'donations' }, headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
    'getByUserName': { method: 'GET' },
  });


  p.user = seAuthSvc.user;

  p.get = function () {
    var deferred = $q.defer();
      
    resource.get({},
      function (user) {
        deferred.resolve(user);
      },
      function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };


  p.getByUserName = function (userName) {
    var deferred = $q.defer();

    if (angular.isUndefined(userName) || userName < 1) {
      deferred.reject(mockUser);
    } else {
      resource.getByUserName({ userName: userName },
        function (user) {
          deferred.resolve(user);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };
  
  p.save = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject();
    } else {

      if (angular.isUndefined(user.identification) || user.identification.length < 1) {
        if (angular.isUndefined(user.userEmailList)) {
          user.userEmailList = [ {email: {identification : user.name}}];
        } else {
          user.userEmailList[0].email.identification = user.name;
        }
        p.create(user).then(function (promisedUser) {
          deferred.resolve(promisedUser);
        }, function (response) {
          deferred.reject(response);
        });
      } else {
        p.update(user).then(function (promisedUser) {
          deferred.resolve(promisedUser);
        }, function (response) {
          deferred.reject(response);
        });
      }
    }

    return deferred.promise;
  };

  p.create = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject();
    } else {
      resource.save(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.update = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user) || user.identification < 1) {
      deferred.reject();
    } else {
      resource.update(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.updateBasics = function (user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user) || user.identification < 1) {
      deferred.reject({
        error: 'User',
        error_description: 'Oops this user was either launched into space or abducted by aliens.'
      });
    } else {
      resource.updateBasics(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.updateStatus = function (status) {
    var deferred = $q.defer();

    if (angular.isUndefined(status)) {
      deferred.reject();
    } else {
      resource.updateStatus({
          status : status
        },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.getDonations = function() {
    var deferred = $q.defer();

    resource.donations({},
      function(response) {
        deferred.resolve(response);
      },
      function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  var mockUser = {
    name: '',
    firstName: '',
    lastName: '',
    keepUpdated: false,
    statusId: 'Pending',
    itemList: null,
    userAddressList: [{
      isDefault: true,
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        longitude: 0,
        latitude: 0,
        county: '',
        country: ''
      }
    }],
    userPhoneList: [{
      isDefault: true,
      phone : {
        typeId: 'Mobile',
        number: ''
      }
    }],
    userEmailList: [{
      isDefault: true,
      email: {
        identification: ''
      }
    }],
    bidList: null
  };
  
  return p;
}]);
///#source 1 1 /app/shopping/orDataSvc.js
fundoloApp.factory('orDataSvc',
[
  '$resource', '$q', 'appUrl',
  function($resource, $q, appUrl) {
    'use strict';
    var p = {};

    var resource = $resource(appUrl.api + '/api/orderdetails/:action/:id', {
      id: '@id',
      action: '@action'
    }, {
      'update': { method: 'PUT', params: { action: 'update' } }
    });

    p.save = function(order) {
      var deferred = $q.defer();

      if (angular.isUndefined(order)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(order.identification) || order.identification < 0) {
          p.create(order).then(function(promisedorder) {
            deferred.resolve(promisedorder);
          }, function(response) {
            deferred.reject(response);
          });
        } else {
          p.update(order).then(function(promisedorder) {
            deferred.resolve(promisedorder);
          }, function(response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.create = function(order) {
      var deferred = $q.defer();

      resource.save(order,
        function(response, status, headers, confi) {
          deferred.resolve(response);
        },
        function(response, status, headers, confi) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.update = function(order) {
      var deferred = $q.defer();

      resource.update(order,
        function(response, status, headers, confi) {
          deferred.resolve(response);
        },
        function(response, status, headers, confi) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return p;
  }
]);
///#source 1 1 /app/widgets/wiFeatureSummarySvc.js
fundoloApp.factory('wiFeatureSummarySvc', function() {
  'use strict';
  var p = {};

  p.featureSummaries = [
    {
      title: 'You Create',
      summary: 'Online fundraising made easy using our Campaign Creator. Within a few minutes, create then publish your fundraiser and share with your friends and family...',
      iconClass: 'fa fa-edit'
    }, {
      title: 'They Donate',
      summary: 'Share on Facebook, Twitter or by Email. The more you share the more responses you will get and the quicker you will get to your fund goal. Need help? Contact us for additional tips...',
      iconClass: 'fa fa-heart'
    }, {
      title: 'We Change Lives',
      summary: 'Miracles was created to help provide fast and easy funding services for any cause. When you create, and others donate, we all contribute to changing the lives of those in need...',
      iconClass: 'fa fa-smile-o'
    }
  ];

  return p;
});
///#source 1 1 /app/widgets/wi-feature-summary-drctv.js
fundoloApp.directive('wiFeatureSummaryDrctv', [
  'wiFeatureSummarySvc',
  function(wiFeatureSummarySvc) {
    'use strict';
    var p = {};

    p.restrict    = "E";
    p.templateUrl = '/app/widgets/wi-feature-summary-drctv.min.html';
    p.transclude  = true;
    p.replace     = true;
    p.scope       = {

    };

    p.link = function(scope, element, attrs, ctrl) {
      scope.featureSummaries = wiFeatureSummarySvc.featureSummaries;
    };

    return p;
  }
]);
///#source 1 1 /app/embed/emFundWidgetCtrl.js
fundoloApp.controller('emFundWidgetCtrl', [
  '$scope', '$stateParams', '$log', '$location', 'fdSvc', 'appUrl', '$window',
  function($scope, $stateParams, $log, $location, fdSvc, appUrl, $window) {

    //#region === Initialize ===
    $scope.isLoading = true;

    fdSvc.byPermalink($stateParams.permalink).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        getFundDonations($scope.fund.identification);
        $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 240, 200);

        //$scope.fundLink                = appUrl.base + '/' + $scope.fund.item.permalink + '?fm_src=fundWidget';
        $scope.fundLink = appUrl.base + '/' + $scope.fund.item.permalink;
        $scope.fundExpired = fdSvc.checkExpiration($scope.fund.item.endDate);
        $scope.isLoading = false;

        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

      }, function(response) {
        //Show default card for Miracles
      });

    //#endregion

    //#region === Publicly Exposed Methods ===

    $scope.donate = function() {
      $window.top.location.href = $scope.fundLink;
    };
    //#endregion

    //#region === Private methods ===

    function getFundDonations(fundId) {
      fdSvc.donations(fundId, 1, 0).then(
        function (items) {
          angular.forEach(items.data, function (value, index) {
            if ($scope.fund.settings.donationHideAmount) {
              value.isPrivateAmount = true;
            }
            if ($scope.fund.settings.donationHideDonorName) {
              value.isPrivateDonorName = true;
            }
          });
          $scope.fund.donationList = items.data;
          $scope.fund.totalDonation = getTotalDonation($scope.fund);
          $scope.fund.progressPercentage = getProgressPercentageWidth($scope.fund);
        },
        function (response) {
          toastr.error('We couldn\'t get the donations! Please refresh and try again');
        });
    }

    var getTotalDonation = function (fund) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation(fund.donationList);
    };

    var getProgressPercentageWidth = function (fund) {
      return fdSvc.getProgressPercentageWidth(fund);
    };
    //#endregion
  }
]);
///#source 1 1 /app/embed/emFundCardCtrl.js
fundoloApp.controller('emFundCardCtrl', [
  '$scope', '$stateParams', '$log', '$filter', '$window', 'fdSvc', 'appUrl',
  function($scope, $stateParams, $log, $filter, $window, fdSvc, appUrl) {

    //#region === Initialize ===
    'use strict';
    $scope.isLoading = true;

    fdSvc.byPermalink($stateParams.permalink).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        getFundDonations($scope.fund.identification);

        $scope.fundUrl                 = appUrl.base + '/' + $scope.fund.item.permalink;
        $scope.mainFundImage           = fdSvc.getMainImage($scope.fund.item.itemUploadList, 240, 200);
        $scope.fundLink                = appUrl.base + '/' + $scope.fund.item.permalink + '?fm_src=fundCard';
        $scope.fundExpired             = fdSvc.checkExpiration($scope.fund.item.endDate);
        $scope.isLoading               = false;

        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);

      }, function(response) {
        //Show default card for Miracles
      });

    //#endregion

    //#region === Public methods ===
    $scope.donate = function () {
      $window.top.location.href = $scope.fundLink;
    };
    //#endregion

    //#region === Private methods ===

    function getFundDonations(fundId) {
      fdSvc.donations(fundId, 1, 0).then(
        function (items) {
          angular.forEach(items.data, function (value, index) {
            if ($scope.fund.settings.donationHideAmount) {
              value.isPrivateAmount = true;
            }
            if ($scope.fund.settings.donationHideDonorName) {
              value.isPrivateDonorName = true;
            }
          });
          $scope.fund.donationList = items.data;
          $scope.fund.totalDonation = getTotalDonation($scope.fund);
          $scope.fund.progressPercentage = getProgressPercentageWidth($scope.fund);
        },
        function (response) {
          toastr.error('We couldn\'t get the donations! Please refresh and try again');
        });
    }

    var getTotalDonation = function (fund) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      return fdSvc.getTotalDonation(fund.donationList);
    };

    var getProgressPercentageWidth = function (fund) {
      return fdSvc.getProgressPercentageWidth(fund);
    };

    //#endregion

  }
]);
///#source 1 1 /app/embed/emFundButtonCtrl.js
fundoloApp.controller('emFundButtonCtrl', [
  '$scope', '$stateParams', '$window', 'fdSvc', 'appUrl',
  function ($scope, $stateParams, $window, fdSvc, appUrl) {

    //#region === Initialize ===
    'use strict';
    $scope.isLoading = true;

    fdSvc.byPermalink($stateParams.permalink).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function(fund) {

        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.fundLink = appUrl.base + '/' + $scope.fund.item.permalink;
        $scope.isLoading = false;
        $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      }, function(response) {
        //Show default card for Miracles
      });

    //#endregion

    //#region === Publicly Exposed Methods ===

    $scope.donate = function () {
      $window.top.location.href = $scope.fundLink;
    };

    //#endregion
  }
]);
///#source 1 1 /app/common/md-alert-drctv.js
'use strict';

fundoloApp.directive('mdAlertDrctv', [function () {
  var p = {};
  //Alert Types: warning,danger,success,info

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-alert-drctv.min.html';

  p.scope = {
    title: '@',
    message: '@',
    alertType: '@',
    fade: '@',
    showAlert: '@',
    showBlock: '@',
    buttonTitle: '@',
    buttonFunction: '&'
};

  return p;
}]);
///#source 1 1 /app/common/dtPickerCtrl.js
'use strict';

fundoloApp.controller('dtPickerCtrl',['$scope', '$timeout',
    function ($scope, $timeout) {
    
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = false;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        // date-disabled="disabled(date, mode)"
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = ($scope.minDate) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
}]);
///#source 1 1 /app/common/mdCommonDrctv.js
'use strict';

fundoloApp.directive('selectOnClick', [
    function() {
      var p = {};

      p.restrict = 'A';
      p.link = function(scope, element, attrs) {
        element.bind('click', function() {
          this.select();
        });
      }

      return p;
    }
  ])
  .directive('imageonload', [
    function() {
      var p = {};

      p.restrict = 'A';

      p.link = function(scope, element, attrs) {
        element.on('load', scope.callBack());
      }

      p.scope = {
        callBack: '&callBack'
      }

      return p;
    }
  ])
  .directive('mdPrint', [
    function () {
      'use strict';
      var p = {};
      p.restrict = 'A';

      var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
          printSection = document.createElement('div');
          printSection.id = 'printSection';
          document.body.appendChild(printSection);
        }


        p.link = function (scope, element, attrs) {
          element.on('click', function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
              printElement(elemToPrint);
            }
          });
          window.onafterprint = function () {
            // clean the print section before adding new content
            printSection.innerHTML = '';
          }
        }

        function printElement(elem) {
          // clones the element you want to print
          var domClone = elem.cloneNode(true);
          printSection.innerHTML = '';
          printSection.appendChild(domClone);
          window.print();
        }


      return p;
    }
  ]);

///#source 1 1 /app/common/validation/va-password-check-drctv.js
'use strict';

fundoloApp.directive('vaPasswordCheckDrctv', [function () {
	  return {
	    require: 'ngModel',
	    link: function (scope, elem, attrs, ctrl) {
	      var firstPassword = '#' + attrs.vaPasswordCheckDrctv;
	      elem.add(firstPassword).on('keyup', function () {
	        scope.$apply(function () {
	          var v = elem.val() === $(firstPassword).val();
	          ctrl.$setValidity('pwmatch', v);
	        });
	      });
	    }
	  }
	}]);
///#source 1 1 /app/common/mdCoreDataSvc.js
'use strict';

fundoloApp.factory('mdCoreDataSvc', ['$resource', '$q', '$window', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $window, seAuthSvc, appUrl) {
  var p = {};
  p.defaultChargeFee = .029;
  p.defaultChargeAmount = .30;

  //#region === Resources ===

  var miracleResource = $resource(appUrl.api + '/api/miracle/:action/:id', { id: '@id', action: '@action' }, {
    'states':         { method: 'GET',  params: { action: 'states' },    isArray: true },
    'fundTypes':      { method: 'GET',  params: { action: 'fundtypes' }, isArray: true },
    'sendQuestion':   { method: 'POST', params: { action: 'sendquestion' }, isArray: true },
    'fundCategories': { method: 'GET',  params: { action: 'fundCategories'}, isArray:true}
  });

  var preRenderSource = $resource(appUrl.api + '/api/marasco/:action', {action: '@action'}, {
    'recache': { method: 'POST', params: { action: 'recache' } },
    'qrcode': { method: 'POST', params: { action: 'qrcode' } },
    'ipapi': { method: 'GET', params: {action: 'ipapi'} },
  });

  //#endregion === Resource ===
  
  //#region === Options data ===
  p.monthOptions = [
    { name: 'Jan', value: '1' },
    { name: 'Feb', value: '2' },
    { name: 'Mar', value: '3' },
    { name: 'Apr', value: '4' },
    { name: 'May', value: '5' },
    { name: 'Jun', value: '6' },
    { name: 'Jul', value: '7' },
    { name: 'Aug', value: '8' },
    { name: 'Sep', value: '9' },
    { name: 'Oct', value: '10' },
    { name: 'Nov', value: '11' },
    { name: 'Dec', value: '12' }
  ];

  p.yearOptions = function () {
    var years = [];
    var d = new Date();
    var currentYear = d.getFullYear();
    var rangeEndYear = d.getFullYear() + 15;
    for (var i = currentYear; i < rangeEndYear; i++) {
      years.push({        
        name: i,
        value: i
      });
    }
    return years;
  };
  
  p.payOptions = [
    {
      isDefault: false,
      levels: [{
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }, {
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }, {
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }]
    },
    {
      isDefault: false,
      levels: [{
        title: '+$2 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 2.00
      }, {
        title: '+$5 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 5.00
      }, {
        title: '+$10 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }]
    },
    {
      isDefault: true,
      levels: [{
        title: '+$3 ({0}Because I wanna help everybody!  Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 3.00
      }, {
        title: '+$10 ({0}Miracles is doing something special. Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }, {
        title: '+$15 ({0}Miracles is doing something special. Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }]
    },
    {
      isDefault: false,
      levels: [{
        title: '+$10 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }, {
        title: '+$15 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }, {
        title: '+$20 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 20.00
      }]
    }, {
      isDefault: false,
      levels: [{
        title: '+$15  ({0}Because I Love, Love, Love Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }, {
        title: '+$20 ({0}I Love, Love, Love Miracles and how they\'re making a difference)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 20.00
      },
      {
        title: '+$25 ({0}I Love, Love, Love Miracles and how they\'re making a difference)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 25.00
      }]
    }, {
      isDefault: false,
      levels: [{
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }, {
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }, {
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }]
    }];
  //#endregion

  //#region === Misc ===
  p.getAllStates = function() {
    var deferred = $q.defer();

    miracleResource.states({},
      function(states) {
        deferred.resolve(states);
      }, function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.getAllFundTypes = function () {
    var deferred = $q.defer();

    miracleResource.fundTypes({},
      function (fundTypes) {
        deferred.resolve(fundTypes);
      }, function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.getAllFundCategories = function () {
    var deferred = $q.defer();

    miracleResource.fundCategories({},
      function (categories) {
        deferred.resolve(categories);
      }, function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.reCache = function(url) {
    var deferred = $q.defer();

    preRenderSource.recache({
      url: appUrl.base + '/' + url
    }, function(res) {
      deferred.resolve(res);
    }, function(res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };

  p.qrcode = function (url) {
    var deferred = $q.defer();

    preRenderSource.qrcode({
      value: appUrl.base + '/' + url,
      altTag: ''
    }, function (res) {
      deferred.resolve(res);
    }, function (res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };

  p.isIe = function() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape') {
      var ua = navigator.userAgent;
      var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv;
  }

    //#endregion

  //#region === Print methods ===

  p.printPage = function (printContents) {
    var styleContents = '<style>@page{margin-left: 0px;margin-right: 10px;margin-top: 0px;margin-bottom: 0px;}</style>';
    var popupWin = window.open('', '_blank', 'width=800,height=1010');
    popupWin.document.open();
    popupWin.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"><html><head>' + styleContents + '</head><body>' + printContents + '</html>');
    popupWin.print();
  }

  p.printSection = function (element, printContents, title) {

    element.printArea({
      mode: 'popup', //iframe
      removeMargins: true,
      popTitle: title,
      retainAttr:['id', 'ng-src', 'src']
    });

    return false;
  }
    //#endregion

  //#region === General Mail ===
  p.sendQuestion = function(questionModel) {
    var deferred = $q.defer();

    miracleResource.sendQuestion(questionModel,
      function(res) {
        deferred.resolve(res);
      },
      function() {
        deferred.reject({
          error: 'SendQuestion',
          error_description: 'Chipmunks have raided our email servers and we are attempting to quarantine.  Please try again!'
        });
      });

    return deferred.promise;
  }
  //#endregion

  //#region === Geo Methods ===

  p.getGeoData = function () {
    var deferred = $q.defer();

    $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {
      data.originalDevice = navigator.userAgent;
      deferred.resolve(data);
    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from smart-ip',
        error_description: 'Unable to get data from smart-ip'
      });
    });

    return deferred.promise;
  }

  p.getGeoData2 = function () {
    var deferred = $q.defer();

    preRenderSource.ipapi({}, function (data) {
      data.host           = data.query;
      data.originalDevice = navigator.userAgent;
      data.latitude       = data.lat;
      data.longitude      = data.lon;
      data.ipAddress      = data.host;
      data.alias          = data.as;
      data.organization   = data.org;
      deferred.resolve(data);
    }, function (res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };


  p.getGeoData4 = function () {
    var deferred = $q.defer();

    $.getJSON("http://ip-api.com/json", function (data) {
      data.host           = data.query;
      data.originalDevice = navigator.userAgent;
      data.latitude       = data.lat;
      data.longitude      = data.lon;
      data.ipAddress      = data.host;
      data.alias          = data.as;
      data.organization   = data.org;
      deferred.resolve(data);
    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from ip-api',
        error_description: 'Unable to get data from ip-api'
      });
    });

    return deferred.promise;
  }

  p.getGeoData3 = function (address) {
    //Google based
    var deferred = $q.defer();
    var dataAddress = encodeURIComponent(address);
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + dataAddress, function (data) {
      if (data.status !== 'OK') {
        deferred.reject({
          error: 'Error retrieving records',
          error_description: 'No records were returned from call'
        });
        return;
      }

      switch(data.results.length) {
        case 0:
          deferred.reject({
            error: 'No records returned',
            error_description: 'No records were returned from call',
            error_message: 'The address provided was incomplete or invalid.  Please check and try again.'
          });
          break;
        case 1:
          if (data.results[0].types.length !== 1 || data.results[0].types.indexOf('street_address') === -1) {
            deferred.reject({
              error: 'Invalid data returned',
              error_description: 'No records were returned from call',
              error_stack: data,
              error_message: 'The address provided returned mixed results.  Please check and try again.'
            });
            return;
          }
          var geo = {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            formattedAddress: data.results[0].formatted_address
          }
          angular.forEach(data.results[0].address_components, function (value, key) {
            if (value.types.indexOf('neighborhood') === 0) {
              geo.neighborhood = value.long_name;
            }
            if (value.types.indexOf('locality') === 0) {
              geo.city = value.long_name;
            }
            if (value.types.indexOf('administrative_area_level_2') === 0) {
              geo.county = value.long_name;
            }
            if (value.types.indexOf('administrative_area_level_1') === 0) {
              geo.state = value.long_name;
              geo.stateCode = value.short_name;
            }
            if (value.types.indexOf('country') === 0) {
              geo.country = value.long_name;
              geo.countryCode = value.short_name;
            }
            if (value.types.indexOf('postal_code') === 0) {
              geo.zip = value.long_name;
            }
            if (value.types.indexOf('postal_code_suffix') === 0) {
              geo.zipSuffix = value.long_name;
            }
          });
          deferred.resolve(geo);
          break;
        default:
          deferred.reject({
            error: 'More than 1 record was returned',
            error_description: 'The query matched more than one item',
            error_message: 'The address provided some mixed results.  Please check and try again.'
          });
          break;
      }

    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from google Api',
        error_description: 'Unable to get data from google',
        error_message: 'Please refresh the page and try again'
      });
    });

    return deferred.promise;
  }
  //#endregion

  return p;
}])
///#source 1 1 /app/common/md-press-thumbnail-drctv.js
'use strict';

fundoloApp.directive('mdPressThumbnailDrctv', ['mdPressDataSvc', function (mdPressDataSvc) {
    var p = {};

    p.restrict = "E";
    p.templateUrl = '/app/common/md-press-thumbnail-drctv.min.html';
    p.transclude = true;
    p.replace = true;

    p.link = function(scope, element, attrs, controller) {
        scope.$watch(attrs.pressthumbnail, function (value) {
            setTimeout(function() {

                $(element[0].firstElementChild).flexslider({
                    animation: "slide",
                    easing: "swing",
                    animationLoop: true,
                    itemWidth: 1,
                    itemMargin: 1,
                    minItems: 2,
                    maxItems: 9,
                    controlNav: false,
                    directionNav: false,
                    move: 2
                });
                
            }, 1);
        });

        scope.presses = mdPressDataSvc.presses;
    };
    
    return p;
}]);
///#source 1 1 /app/common/md-carousel-drctv.js
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


///#source 1 1 /app/common/validation/va-whole-number-drctv.js
'use strict';

fundoloApp.directive('vaWholeNumberDrctv', [function() {
    var p = {};

    p.link = function(scope, element, attrs, ctrlr) {
        element.on('blur', function() {
            var num = Math.abs(parseInt(element.val(), 10));
            element.val(num);
            scope.$apply(); // update view
        });
    };

    return p;
}]);
///#source 1 1 /app/common/md-social-message-drctv.js
'use strict';

fundoloApp.directive('mdSocialMessageDrctv', [
  function() {
    //http://cssload.net/
    var p         = {};
    p.restrict    = "E";
    p.templateUrl = "/app/common/md-social-message-drctv.min.html";
    p.transclude  = true;

    p.link = function(scope, element, attrs, ctrlr) {
      scope.$watch('textMessage', function(newValue, oldValue) {

        if (angular.isUndefined(scope.textMessage)) {
          scope.count = 0;
          return;
        }
        var newCount = scope.textMessage.length;

        if (newCount >= 140) {
          scope.count = 140;
        } else {
          scope.count = newCount;
        }
      });
    };

    p.scope = {
      textMessage: "="
    };

    return p;
  }
]);
///#source 1 1 /app/common/bt-swatch-drctv.js
'use strict';

fundoloApp.directive('btSwatchDrctv', [function () {
  var p = {};
  p.restrict = 'E';
  p.transclude = true;
  p.replace = true;
  p.templateUrl = '/app/common/bt-swatch-drctv.min.html';

  p.link = function(scope, element, attrs, controller) {
    scope.$watch('color', function (newValue, oldValue) {
      if (angular.isUndefined(scope.color) || scope.color === 'default') {
        scope.form.inputColor.$setValidity('requiredColor', false);
      } else {
        scope.form.inputColor.$setValidity('requiredColor', true);
      }
    });
  };

  p.controller = ['$scope', function($scope) {
    $scope.changeColor = function(colorDesired) {
      if (colorDesired !== this.color) {
        this.color = colorDesired;
      }
    };

    $scope.getClass = function(colorCheck) {
      if (colorCheck === this.color) {
        return 'fa fa-check icon-white icon-only';
      }
      return '';
    };
  }];

  p.scope = {    
    color: '=',
    form: '='
  };

  return p;
}]);
///#source 1 1 /app/common/at-plugin.js
'use strict';

/**
 * http://stackoverflow.com/questions/15593039/angularjs-and-addthis-social-plugin
 * AddThis widget directive
 *
 * Usage:
 *   1. include `addthis_widget.js` in header with async=1 parameter
 *   <script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=<pubid>&async=1"></script>
 *   http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#configuration-url
 *   2. add "addthis-toolbox" directive to a widget's toolbox div
 *   <div addthis-toolbox class="addthis_toolbox addthis_default_style addthis_32x32_style">
 *     ...       ^
 *   </div>
 *   at = Add This
 */

fundoloApp.directive('atPlugin', [function () {
  var p = {};

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/at-plugin.html';

  p.link = function (scope, element, attrs, controller) {

    setTimeout(function() { // Dynamically init for performance reason
      // Safe for multiple calls, only first call will be processed (loaded css/images, popup injected)
      // http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#configuration-url
      // http://support.addthis.com/customer/portal/articles/381221-optimizing-addthis-performance
      addthis.init();
      // Ajax load (bind events)
      // http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#rendering-js-toolbox
      // http://support.addthis.com/customer/portal/questions/548551-help-on-call-back-using-ajax-i-lose-share-buttons
      addthis.toolbox($(element).get());
    }, 1000);
  };

  p.scope = {
    url: '@',
    title: '@',
    description: '@',
    currentPagePath: '@', //This prevents default behavior with routing
    enable32: '='
  };
  

  return p;
}]);
///#source 1 1 /app/common/md-spinner-bar-drctv.js
'use strict';

fundoloApp.directive('mdSpinnerBarDrctv', [function() {
  var p = {};
  
  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/common/md-spinner-bar-drctv.min.html';

  p.link = function($scope, element, attr, ctrlr) {
    $scope.$watch('spinnerType', function(newValue, oldValue) {
      if (newValue === undefined) {
        $scope.spinnerType = 'squareLarge';
      }
    });

    $scope.$watch('spinnerSize', function (newValue, oldValue) {
      if (newValue === undefined) {
        $scope.spinnerSize = 'med';
      }
    });
  }

  p.scope = {
    spinnerType: '@',
    spinnerSize: '@'
  }

  return p;
}]);
///#source 1 1 /app/common/mdPressDataSvc.js
'use strict';

fundoloApp.factory('mdPressDataSvc', [function () {
    var p = {};
    p.sortOrder = 'id';
    p.presses = [{            
            id: '1',
            imgUrl: '/assets/img/clients/hp_grey.png',
            imgColorUrl: '/assets/img/clients/hp.png'
        }, {            
            id: '2',
            imgUrl: '/assets/img/clients/igneus_grey.png',
            imgColorUrl: '/assets/img/clients/igneus.png'
        }, {            
            id: '3',
            imgUrl: '/assets/img/clients/vadafone_grey.png',
            imgColorUrl: '/assets/img/clients/vadafone.png'
        }, {
            id: '4',
            imgUrl: '/assets/img/clients/walmart_grey.png',
            imgColorUrl: '/assets/img/clients/walmart.png'
        }, {
            id: '5',
            imgUrl: '/assets/img/clients/shell_grey.png',
            imgColorUrl: '/assets/img/clients/shell.png'
        }, {
            id: '6',
            imgUrl: '/assets/img/clients/natural_grey.png',
            imgColorUrl: '/assets/img/clients/natural.png'
        }, {
            id: '7',
            imgUrl: '/assets/img/clients/aztec_grey.png',
            imgColorUrl: '/assets/img/clients/aztec.png'
        }, {
            id: '8',
            imgUrl: '/assets/img/clients/gamescast_grey.png',
            imgColorUrl: '/assets/img/clients/gamescast.png'
        }, {
            id: '9',
            imgUrl: '/assets/img/clients/cisco_grey.png',
            imgColorUrl: '/assets/img/clients/cisco.png'
        }, {
            id: '10',
            imgUrl: '/assets/img/clients/everyday_grey.png',
            imgColorUrl: '/assets/img/clients/everyday.png'
        }, {
            id: '11',
            imgUrl: '/assets/img/clients/cocacola_grey.png',
            imgColorUrl: '/assets/img/clients/cocacola.png'
        }, {
            id: '12',
            imgUrl: '/assets/img/clients/spinworkx_grey.png',
            imgColorUrl: '/assets/img/clients/spinworkx.png'
        }, {
            id: '13',
            imgUrl: '/assets/img/clients/shell_grey.png',
            imgColorUrl: '/assets/img/clients/shell.png'
        }, {
            id: '14',
            imgUrl: '/assets/img/clients/natural_grey.png',
            imgColorUrl: '/assets/img/clients/natural.png'
        }, {
            id: '15',
            imgUrl: '/assets/img/clients/gamescast_grey.png',
            imgColorUrl: '/assets/img/clients/gamescast.png'
        }, {
            id: '16',
            imgUrl: '/assets/img/clients/everyday_grey.png',
            imgColorUrl: '/assets/img/clients/everyday.png'
        }, {
            id: '17',
            imgUrl: '/assets/img/clients/spinworkx_grey.png',
            imgColorUrl: '/assets/img/clients/spinworkx.png'
        }
    ];

    return p;
}]);
///#source 1 1 /app/common/mdFilters.js
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
///#source 1 1 /app/common/md-avatar-drctv.js
fundoloApp.directive('mdAvatarDrctv', ['$window',
  function ($window) {
    'use strict';

    var p = {};

    p.replace    = true;
    p.transclude = true;
    p.restrict   = 'E';
    p.template   = '<img/>';

    p.link = function($scope, element, attributes, controller) {
      $scope.$watch('user', function (newValue, oldValue) {
        var randomImageNumber = $window.App.mallDub.randomIntFromInterval(0, 30);
        var imgLoc = '/img/avatar/' + randomImageNumber + '.jpg';

        if (angular.isDefined(newValue)) {

          if (newValue.forceDefault === true) {
            attributes.$set('src', imgLoc);
            return;
          }

          var imgSrc = '/img/logo/180.png';

          if (angular.isDefined(newValue.identification)) {
            if (angular.isDefined(newValue.facebookProvider && angular.isDefined(newValue.facebookProvider.providerKey))) {
              imgSrc = 'https://graph.facebook.com/' + newValue.facebookProvider.providerKey + '/picture';
            } else {
              imgSrc = newValue.avatarUploadTempLocation;
            }
          }

          attributes.$set('src', imgSrc);
        } else {
          attributes.$set('src', imgLoc);
        }
      }, true);

      attributes.$observe('classes', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          attributes.$set('class', newValue);
        }
      });
    }

    p.scope = {
      user : '='
    }

    return p;
  }
]);
///#source 1 1 /app/common/mdSmoothScrollSvc.js
fundoloApp.service('mdScrollScrollSvc', function () {

  this.scrollTo = function (elementId, speed) {

    // This scrolling function 
    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

    var startY = currentYPosition();
    var stopY = elmYPosition(elementId);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY); return;
    }

    if (speed === undefined) {
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
    }

    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }
    for (var j = startY; j > stopY; j -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }

    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }

    function elmYPosition(elementId) {
      var elm = document.getElementById(elementId);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }

  };

});
