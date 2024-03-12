fundoloApp.directive('fdControlpanelWidgetsPrintDrctv', [
  function () {
    'use strict';
    var p = {};

    p.tranclude   = true;
    p.replace     = true;
    p.restrict    = 'E';
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-print-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      });
    };

    p.controller = [
      '$scope', '$compile', 'appUrl', 'mdCoreDataSvc',
      function ($scope, $compile, appUrl, mdCoreDataSvc) {

        //#region === Initialize ===

        $scope.showWarning = false;
        $scope.isLoading   = true;
        $scope.imageUrl    = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;

        //#endregion
  
        //#region === Public Methods ===

        $scope.init = function(fund) {
          $scope.imageUrl = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;
        }

        $scope.printIt = function () {
          
          var printContents = '<img src="' + appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink + '">';

          if (mdCoreDataSvc.isIe() > 1) {
            mdCoreDataSvc.printPage(printContents);
          } else {
            var element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
            mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
          }

        }

        $scope.imageLoaded = function () {
          $scope.isLoading = false;
          $scope.$apply('isLoading');
        }
        //#endregion

      }
    ];

    p.scope = {
      fund: '='
    }
    return p;
  }])