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