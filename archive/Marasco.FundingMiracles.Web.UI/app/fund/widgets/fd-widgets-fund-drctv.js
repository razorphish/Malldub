fundoloApp.directive('fdWidgetsFundDrctv', ['seAuthSvc', 'fdSvc', 'appUrl', '$state',
  function (seAuthSvc, fdSvc, appUrl, $state) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fund-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      //#region === Initialize ===

      $scope.beneficiary      = {};
      $scope.fundLocation    = '';
      $scope.subFundLocation = '';
      $scope.hoverTitle      = 'View Fundraiser';
      $scope.subTitle        = 'Donate';
      $scope.isLoggedIn      = seAuthSvc.isLoggedIn() && $scope.secured;


      //#endregion

      //#region === Public Methods ===

      $scope.init = function (fund) {
        fund["totalDonation"]      = getTotalDonation(fund);
        fund["progressPercentage"] = getProgressPercentageWidth(fund);
        $scope.mainFundImage       = fdSvc.getMainImage($scope.fund.item.itemUploadList, 262, 197);
        $scope.fund                = fund;

        if ($scope.isLoggedIn) {
          $scope.fundLocation = $state.href('home.controlpanel.overview', { fundId: $scope.fund.identification });
          $scope.subFundLocation = $state.href('home.permalink', { permalink: $scope.fund.item.permalink });
        } else {
          $scope.fundLocation = $state.href('home.permalink', { permalink: $scope.fund.item.permalink });
          $scope.subFundLocation = $state.href('home.fundDonate', { fundId: $scope.fund.identification });
        }

        if ($scope.fund.beneficiary == null) {
          $scope.beneficiary = $scope.fund.originator;
        }
      }

      $scope.leftString = function (content, stringLength) {
        if (angular.isDefined(content)) {
          if (!angular.isNumber(stringLength)) {
            return content;
          } else {
            var parsedString = content.substring(0, stringLength);
            if (content.length > stringLength) {
              parsedString += '...';
            }
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
      fund: '=',
      secured : '='
    }

    return p;
  }
]);