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