fundoloApp.directive('fdControlpanelWidgetsNotificationsLgDrctv', [
  '$timeout', '$uibModal', '$filter', 'mdScrollScrollSvc', 'fdDashboardSvc',
function ($timeout, $uibModal, $filter, mdScrollScrollSvc, fdDashboardSvc) {

  'use strict';
  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-lg-drctv.min.html';

  p.link = function ($scope, element, attributes, controller) {

    $scope.$watch('notifications', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue.data)) {
        $scope.init();
      }
    });

    $timeout(function () {
      $('li').tooltip();
      $('button').tooltip();
    }, 1000);

    //#region === Initialize ===

    $scope.items       = [];
    $scope.itemList    = [];
    $scope.showWarning = false;
    $scope.isLoading   = true;

    //=============================
    // Initialize pagination
    $scope.maxSize      = 7;
    $scope.totalItems   = 0;
    $scope.currentPage  = 1;
    $scope.itemsPerPage = 16;
    //=============================

    //=============================
    // Initialize Conditional Markup (columns per row)
    $scope.numberColumns      = 2;
    $scope.itemRows           = [];
    $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
    $scope.itemColumns        = [];
    $scope.itemColumns.length = $scope.numberColumns;
    //=============================[$parent.$index * numberColumns + $index]

    //#endregion

    //#region === Public Methods ===

    $scope.init = function (fundId) {
        setProperties();
        $scope.isLoading        = false;
        var s                   = $filter('filter')($scope.notifications.data, { typeId: 'Notification' });
        $scope.itemList         = $filter('orderBy')(s, 'note.dateEntered', true);
        $scope.totalItems       = $scope.notifications.count;
        setRecordsToDisplay();

    }

    $scope.hide = function (parentIndex) {
      return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
    };

    $scope.onSelectPage = function () {
      setRecordsToDisplay();
      mdScrollScrollSvc.scrollTo('fundNotificationsPage', 20);

    };

    $scope.getListClass = function (notification) {
      return fdDashboardSvc.getListClass(notification);
    }

    $scope.respond = function(notification) {

      var modalInstance = $uibModal.open({
        templateUrl: '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-notifications-mdl.min.html',
        controller: fdControlpanelWidgetsNotificationsMdl,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          rowItem: function () { return notification; }
        }
      });

      modalInstance.result.then(function (responseCode) {
        handleViewed(notification, responseCode);
      }, function (responseCode) {
        handleViewed(notification, responseCode);
      });

    }

    //#endregion

    //#region === Private Methods ===

    function handleViewed(notification, responseCode) {

      switch (responseCode) {
        case 'closeSuccess':
          notification.note.viewed = true;
          $scope.$parent.newNotifications--;
          break;
        default:
          break;
      }
    }

    function setProperties() {
      angular.forEach($scope.notifications.data, function (value, index) {
        switch (value.typeId) {
          case 'Donation':
            value.note.subject = "You have a new donation!";
            break;
          case 'Notification':
            value.note.subject = "Someone is trying to connect with you!";
            break;
          case 'Support':
            value.note.subject = "A new Supporter has joined your campaign!";
        }
      });
    }

    function setRecordsToDisplay() {
      $scope.items = [];
      var startItem = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var endItem = startItem + $scope.itemsPerPage;
      for (var i = startItem; i < endItem; i++) {
        if (angular.isDefined($scope.itemList[i])) {
          $scope.items.push($scope.itemList[i]);
        }
      }

      $scope.itemRows = [];
      $scope.itemRows.length = Math.ceil($scope.items.length / $scope.numberColumns);
    }

    //#endregion
  }

  p.scope = {
    notifications: '='
  }

  return p;
}
]);