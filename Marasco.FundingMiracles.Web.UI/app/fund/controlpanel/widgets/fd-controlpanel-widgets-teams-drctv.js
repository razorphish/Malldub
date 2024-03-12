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