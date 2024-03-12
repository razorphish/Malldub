fundoloApp.directive('fdWidgetsFundXsDrctv', ['seAuthSvc', 'fdSvc', 'appUrl', '$state',
  function (seAuthSvc, fdSvc, appUrl, $state) {
    var p = {};

    p.transclude  = true;
    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/widgets/fd-widgets-fund-xs-drctv.min.html';

    p.link = function($scope, element, attribute, controller) {
      $scope.$watch('fund', function (newValue, oldValue) {
        if (angular.isDefined(newValue)) {
          $scope.init(newValue);
        }
      }, false);

      attribute.$observe('useFundraiserName', function (value) {
        if (value === 'true') {
          $scope.fundTitle = $scope.fund.aspNetUser.firstName + ' ' + $scope.fund.aspNetUser.lastName;
        }
      });

      //#region === Initialize ===

      $scope.beneficary      = {};
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

      $scope.gotoFund = function(permalink) {
       $state.go('home.permalink', {permalink:  permalink});
      }
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