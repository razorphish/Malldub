'use strict';

fundoloApp.controller('fdDashboardTeamsCtrl', [
  '$scope', '$stateParams', '$modal', '$location', '$log', '$timeout', 'fdDashboardSvc',
  function fdDashboardTeamsCtrl($scope, $stateParams, $modal, $location, $log, $timeout, fdDashboardSvc) {

    //#region Initialize

    fdDashboardSvc.summary($stateParams.fundId).then(
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        $scope.isLoading = false;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
      },
      function (response) {
        toastr.error('Problem getting donations', 'There was a problem accessing your donations.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      }
    );

    $scope.showWarning = false;
    $scope.isLoading = true;

    var timer;
    //#endregion

    //#region === Publicly exposed methods (Scope) ===
    $scope.openTeam = function (team) {
      var modalInstance = $modal.open({
        templateUrl: '/app/fund/dashboard/teams/fdDashboardTeamsCtrlCreateMdl.min.html',
        controller: ModalCreateTeamCtlr,
        size: 'sm-med',
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          fund: function () {
            if (angular.isDefined(team)) {
              return team.fund;
            }
             return undefined;
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
          $scope.fund.teamList.push(createdTeam);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openTeamFund = function(team) {
      $location.path('/fund/dashboard/' + team.teamFundId);
    }

    $scope.getProgressPercentage = function () {
      //if (angular.isUndefined($scope.fund)) {
      //  return { 'width': '0%' };
      //}
      //var percentageNumber = (this.getTotalDonation() / $scope.fund.goalAmount) * 100;
      //var percentage = {
      //  'width': $filter('number')(percentageNumber, 0) + '%'
     // };

      //return percentage;

      return { 'width': '65%'  };
    };
    //#endregion

    //#region === Methods ===

    //#endregion

    //Kill the timer:good practice
    $scope.$on('destroy', function (event) {
      $timeout.cancel(timer);
    });
    //#endregion

  }
]);

var ModalCreateTeamCtlr = ['$scope', '$modalInstance', '$filter', 'fdDashboardSvc', 'fund', 'team',
  function ($scope, $modalInstance, $filter, fdDashboardSvc, fund, team) {
    $scope.isSaving = false;
    $scope.fund     = fund || {};
    $scope.fundTeam = angular.isUndefined(team) ? { fundId: $scope.fund.identification, team: {} } : team;
    $scope.isEdit   = angular.isDefined($scope.fundTeam.teamId && $scope.fundTeam.teamId > 0);
    $scope.team     = angular.copy(team);

    $scope.ok = function () {
      if (this.createTeamForm.$valid) {
        $scope.isSaving = true;
        fdDashboardSvc.saveFundTeam($scope.fundTeam).then(
          function (response) {
            var action = $scope.isEdit ? "updated" : "created";
            toastr.success("Team " + action + " successfully");
            response.isEdit = $scope.isEdit;
            $modalInstance.close(response);
            $scope.isSaving = false;
          },
          function (response) {
            toastr.error('Oops!  Problem saving team', 'There were some problems saving the new team.  Please try again');
            $scope.isSaving = false;
          }
        );
      }
    };

    $scope.cancel = function (cancelType) {
      if ($scope.isEdit) {
        $scope.fundTeam.team.name    = $scope.team.team.name;
        $scope.fundTeam.captainEmail = $scope.team.captainEmail;
        $scope.fundTeam.goalAmount   = $scope.team.goalAmount;
      }
      $modalInstance.dismiss(cancelType);
    };
  }];