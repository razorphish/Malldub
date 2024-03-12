'use strict';

fundoloApp.controller('fdDashboardNotificationsCtrl', [
  '$scope', '$stateParams', '$location', '$modal', 'fdDashboardSvc', 'fdSvc',
  function fdDashboardNotificationsCtrl($scope, $stateParams, $location, $modal, fdDashboardSvc,fdSvc) {
    
    //#region === Initialize ===
    $scope.isLoading = true;
    $scope.myData = [];
    $scope.selectedItem = [];
    $scope.gridOptions = {
      data: 'myData',
      enableColumnResize: true,
      multiSelect: false,
      selectedItems: $scope.selectedItem, 
      afterSelectionChange: onRowSelect,
      columnDefs: [
        {
          field: 'note.subject',
          displayName: 'Subject'
        }, {
          field: 'note.dateEntered',
          displayName: 'Created',
          width: 250
        },
        {
          field: 'note.viewed',
          displayName: 'Viewed',
          width: 70,
          cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span class="label label-success" ng-hide="row.getProperty(col.field)">New</span></div>'
        }]
    };

    fdDashboardSvc.summary($stateParams.fundId).then(
      //BUG: ANGULAR If object has array as property then it requires isArray: true
      function (fund) {
        $scope.fund          = angular.isArray(fund) ? fund[0] : fund;
        $scope.files         = $scope.fund.item.itemUploadList;
        $scope.mainFundImage = fdSvc.getMainImage($scope.fund.item.itemUploadList, 230, 150);
        App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        $scope.isLoading = false;
        setGridOptions();
      },
      function (response) {
        if (response.status === 404) {
          toastr.error('Either this fund does not exist or access to it has been restricted');
          $location.path('/controlpanel/fund/list');
        }
      });

    //#endregion

    //#region === Functions ===
    function setGridOptions() {
      var noteList = $scope.fund.noteList;
      angular.forEach(noteList, function(value, index) { 
        switch(value.typeId) { 
          case 'Donation':
            value.note.subject = "You have a new donation!";
            break;
          case 'Notification':
            value.note.subject = "Someone is trying to connect with you!"; 
            break;
          case 'Support':
            value.note.subject = "A new Supporter has joined your campaign!";
        }
        var dateEntered = moment.utc(value.note.dateEntered).toDate();
        value.note.dateEntered = moment(dateEntered).format('MMMM Do YYYY h:mm a');
      });

      $scope.myData = noteList;
    }

    function onRowSelect(rowItem) {
      if (rowItem.selected === false) {
        return;
      }

      var modalInstance = $modal.open({
        templateUrl: '/app/fund/dashboard/notifications/fdDashboardNotificationsMdl.min.html',
        controller: notificationResponseMdlCtrl,
        backdrop: 'static', //true:false:static(user click on background)
        resolve: {
          rowItem: function () { return rowItem.entity; } 
        }
      });

      modalInstance.result.then(function (responseCode) {
        handleViewed(rowItem.rowIndex, responseCode);
      }, function (responseCode) {
        handleViewed(rowItem.rowIndex, responseCode);
      });

    }

    function handleViewed(rowIndex, responseCode) {

      switch (responseCode) {
        case 'closeSuccess':
          $scope.fund.noteList[rowIndex].note.viewed = true;
          $scope.myData = $scope.fund.noteList;
          break;
        default:
          break;
      }
    }
    //#endregion

  }
]);

var notificationResponseMdlCtrl = ['$scope', '$modalInstance', '$modal', 'fdDashboardSvc', 'appUrl', 'rowItem',
  function ($scope, $modalInstance, $modal, fdDashboardSvc, appUrl, rowItem) {

    //#region ===Initialize===
    $scope.sender = {
      fundNote: {
        respondNoteId: rowItem.identification,
        fundId: rowItem.fundId
      },

      firstName: rowItem.note.firstName,
      lastName: rowItem.note.lastName,
      email: rowItem.note.email,
      comments: '',
      isPrivate: 'true'

    }

    $scope.showValidationMessages = false;
    $scope.isResponding = false;
    $scope.record = rowItem;

    //#endregion

    $scope.respond = function () {
      $scope.isResponding = true;
      if (this.responseForm.$valid) {
        fdDashboardSvc.respondFundNote($scope.sender).then(function (response) {
          toastr.success('Response sent successfully');
          $modalInstance.close($scope.sender);
        }, function(response) {
          toastr.error('Our gnomes are having trouble delivering this message.  Please refresh and try again');
        });
      } else {
        $scope.showValidationMessages = true;
      }
      $scope.isResponding = false;

    };

    $scope.cancel = function (reason) {

      if ($scope.record.note.viewed === false) {
        fdDashboardSvc.updateFundNoteView($scope.record.fundId, $scope.record.note.identification)
          .then(function() {
            $modalInstance.dismiss('closeSuccess');
          }, function() {
            $modalInstance.dismiss('closeFail');
        });
      } else {
        $modalInstance.dismiss(reason);
      }

    };
  }];