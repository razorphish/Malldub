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