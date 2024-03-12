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