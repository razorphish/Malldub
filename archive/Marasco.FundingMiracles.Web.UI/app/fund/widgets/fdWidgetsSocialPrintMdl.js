var fdWidgetsSocialPrintMdl = ['$scope', '$uibModalInstance', '$compile', 'appUrl', 'mdCoreDataSvc', 'fund',
  function ($scope, $uibModalInstance, $compile, appUrl, mdCoreDataSvc, fund) {
    //#region === Initialization ===

    'use strict';
    $scope.isLoading = true;
    $scope.fund      = fund;
    $scope.imageUrl  = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
    var element = {};
    //#endregion

    $scope.imageLoaded = function () {
      element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
      $scope.isLoading = false;
      $scope.$apply('isLoading');
    }

    $scope.print = function () {
      //TODO DUPLICATE of PRINT fdDashboardPrintCtrl.js
      var printContents = '<img src="' + $scope.imageUrl + '">';

      if (mdCoreDataSvc.isIe() > 1) {
        mdCoreDataSvc.printPage(printContents);
      } else {
        mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
      }
    }

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];