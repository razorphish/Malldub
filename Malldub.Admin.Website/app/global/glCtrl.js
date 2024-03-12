'use strict';

malldubAdminApp.controller('glNoteCtrl', ['$scope', 'mdAdminSvc', '$stateParams', function ($scope, mdAdminSvc, $stateParams) {

  //#region Initialize
  if (angular.isDefined($stateParams.applicationId)) {
    mdAdminSvc.notesByApplication($stateParams.applicationId).then(
      function (data) {
        $scope.notes = data;
      },
      function (response) {
        toastr.error('Error getting notes from db.' + response.error_description);
      }
    );
  } else {

    mdAdminSvc.notesAll().then(
      function(data) {
        $scope.notes = data;
      },
      function(response) {
        toastr.error('Error getting notes from db.' + response.error_description);
      }
    );
  }

  $scope.colNames = mdAdminSvc.noteColumnNames;
  $scope.colModel = mdAdminSvc.noteColumnModel;

  //#endregion
}])