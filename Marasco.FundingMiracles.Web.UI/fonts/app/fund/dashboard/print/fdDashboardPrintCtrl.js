'use strict';

fundoloApp.controller('fdDashboardPrintCtrl', [
  '$scope', '$log', '$stateParams', '$compile', 'mdCoreDataSvc', 'fdDashboardSvc', 'appUrl',
  function fdDashboardPrintCtrl($scope, $log, $stateParams, $compile, mdCoreDataSvc, fdDashboardSvc, appUrl) {

    //#region === Initialize ===
    $scope.showWarning = false;
    $scope.isLoading = true;

    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund = angular.isArray(fund) ? fund[0] : fund;
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        $scope.imageUrl = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
      },
      function (response) {
        toastr.error('Problem getting fund', 'There was a problem accessing your fundraiser.  Please try again');
        $log.error(response);
        $scope.isLoading = false;
      }
    );

    //#endregion

    //#region === Publicly Exposed Methods ===
    $scope.printIt = function () {

      var printContents = '<img src="' + appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink + '">';

      if (mdCoreDataSvc.isIe() > 1) {
        mdCoreDataSvc.printPage(printContents);
      } else {
        var element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
        mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
      }

    }

    $scope.imageLoaded = function() {
      $scope.isLoading = false;
      $scope.$apply('isLoading');
    }
    //#endregion


  }
]);