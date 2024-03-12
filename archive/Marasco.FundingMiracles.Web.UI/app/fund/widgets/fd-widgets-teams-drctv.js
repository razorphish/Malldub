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