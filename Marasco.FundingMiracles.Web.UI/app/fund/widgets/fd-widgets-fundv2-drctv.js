fundoloApp.directive('fdWidgetsFundv2Drctv', ['$state', 'fdSvc', 'appUrl',
  function ($state, fdSvc, appUrl) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fundv2-drctv.min.html';

    p.link = function ($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      $scope.beneficary = {};

      //#endregion

      //#region === Public Methods ===

      $scope.gotoDonate = function (permalink) {
        $state.go('home.permalink', { 'permalink': permalink });
      }

      $scope.init = function (fund) {
        fund["totalDonation"]      = getTotalDonation(fund);
        fund["progressPercentage"] = getProgressPercentageWidth(fund);
        $scope.mainFundImage       = fdSvc.getMainImage($scope.fund.item.itemUploadList, 262, 197);
        $scope.fund                = fund;

        if ($scope.fund.beneficiary == null) {
          $scope.beneficiary = $scope.fund.originator;
        } else {
          $scope.beneficiary = $scope.fund.beneficiary;
        }
      }

      $scope.leftString = function (content, stringLength) {
        if (angular.isDefined(content)) {
          if (!angular.isNumber(stringLength)) {
            return content;
          } else {
            var parsedString = content.substring(0, stringLength);
            return parsedString;
          }
        }

        return '';
      };

      //#endregion

      //#region === Private Methods ===
      var getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList);
      };

      var getProgressPercentageWidth = function (fund) {
        return fdSvc.getProgressPercentageWidth(fund);
      };

      //#endregion

    }


    p.scope = {
      fund: '='
    }

    return p;
  }
]);