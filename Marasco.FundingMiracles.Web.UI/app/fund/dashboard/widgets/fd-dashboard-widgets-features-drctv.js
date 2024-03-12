'use strict';

fundoloApp.directive('fdDashboardWidgetsFeaturesDrctv', [function() {
  var p = {};
  p.restrict    = 'E';
  p.transclude  = true;
  p.replace     = true;
  p.templateUrl = '/app/fund/dashboard/widgets/fd-dashboard-widgets-features-drctv.min.html';

  p.link = function(scope) {
    scope.$watch('fund', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        scope.fund = newValue;
        scope.notificationNumber = getUnViewedNotes(newValue);
      } 
    }, true);  //The true makes sure that when changes are made internally to $apply
  }

  var getUnViewedNotes = function (myFund) {
    var count = 0;
    angular.forEach(myFund.fundNoteList, function (value, key) {
      if (value.note.viewed === false) {
        count++;
      }
    });
    return count;
  }

  p.controller = ['$scope',
    function ($scope) {
      //$scope.notificationNumber = $scope.fund.fundNoteList.length;
    }
  ];

  p.scope = {
    fund: '='
  };
  return p;
}])