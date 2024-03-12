'use strict';

fundoloApp.directive('fdDashboardWidgetsUpdatesDrctv', function() {
  var p = {};

  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/fund/dashboard/widgets/fd-dashboard-widgets-updates-drctv.min.html';

  p.link = function($scope, element, attrs, controller) {

    $scope.$watch('showFeed', function (newValue, oldValue) {
      if (newValue === undefined && oldValue === undefined) {
        $scope.showFeed = true;
        return;
      }
      $scope.showFeed = (newValue === 'true' || newValue === true);
    });
  };
  
  p.controller = ['$scope', '$log', '$stateParams', '$location', '$timeout', '$window', 'fdDashboardSvc', 'seAuthSvc', 'Facebook', 'twitterConfiguration',
    function ($scope, $log, $stateParams, $location, $timeout, $window, fdDashboardSvc, seAuthSvc, Facebook, twitterConfiguration) {

    //#region === Initialize ===

    $scope.$watch(function () {
      return Facebook.isReady();
    }, function (newVal) {
      $scope.facebookReady = true;
    });

    $scope.$watch('fundId', function (newValue, oldValue) {
      if (newValue !== undefined && newValue > 0) {
        $scope.initialize();
      }
    });

    $scope.isLoading  = true;
    $scope.isSaving   = false;
    $scope.facebookIt = false;
    $scope.tweetIt    = false;
    $scope.mailIt     = false;
    $scope.twittered  = false;
    $scope.user = seAuthSvc.user;

    //#endregion

    $scope.addDeleting = function () {
      angular.forEach($scope.fundUpdates, function (value, key) {
        value.isDeleting = false;
      });
    };

    $scope.facebookMark = function() {
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
          $scope.tweetIt    = false;
          $scope.isSaving   = false; 
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

    $scope.mailMark = function() {
      $scope.mailIt = !$scope.mailIt;
    }

    $scope.viewPost = function () {
      $location.path($scope.permalink);
    };
    
    $scope.saveFundUpdate = function (fundUpdate) {
      $scope.isSaving = true;
      if (this.updateForm.$valid) {
        fundUpdate.fundId           = this.fundId;
        fundUpdate.fund             = $scope.fund;
        fundUpdate.postedToFacebook = $scope.facebookIt;
        fundUpdate.postedToTwitter  = $scope.tweetIt;
        fundUpdate.postedToEmail    = $scope.mailIt;
        fdDashboardSvc.saveUpdate(fundUpdate).then(
          function (response) {
            $scope.fundUpdates.push(response);
            $scope.fund.updateList = $scope.fundUpdates;
            clearbaseUpdate();
            $scope.isSaving = false;
            toastr.success("Connection added successfully");
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
    
    $scope.initialize = function () {
      fdDashboardSvc.allUpdatesByFundIdStatusId($scope.fundId).then(
        function (fundUpdates) {
          $scope.fundUpdates = fundUpdates;
          $scope.addDeleting();
          $scope.isLoading = false;
        },
        function (response) {
          $log.error(response);
          toastr.error('Unable to get updates.  Please try again');
          $scope.isLoading = false;
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

    //#endregion

    //#region === Methods ===

    function clearbaseUpdate() {
      $scope.fundUpdate.content = '';
      $scope.isDeleting         = false;
      $scope.facebookIt         = false;
      $scope.tweetIt            = false;
      $scope.mailIt             = false;
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
    //#endregion
  }];

  p.scope = {
    fund: '=',
    fundId: '=',
    permalink: '=',
    showFeed: '@'
  };
  return p;
});