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