fundoloApp.directive('fdControlpanelWidgetsTeamsLgDrctv', [
  '$timeout', '$location', '$uibModal', '$filter', 'fdSvc',
  function ($timeout, $location, $uibModal, $filter, fdSvc) {
    'use strict';
    var p = {};

    p.restrict    = 'E';
    p.replace     = true;
    p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-teams-lg-drctv.min.html';


    p.link = function($scope, element, attributes, controller) {
      $timeout(function() {
        $('li').tooltip();
      }, 1000);

      //#region === Initialize ===
      $scope.items               = [];
      $scope.itemList            = [];
      $scope.showWarning         = false;
      $scope.isLoading           = true;

      //=============================
      // Initialize pagination
      $scope.maxSize      = 7;
      $scope.totalItems   = 0;
      $scope.currentPage  = 1;
      $scope.itemsPerPage = 4;
      //=============================

      //=============================
      // Initialize Conditional Markup (columns per row)
      $scope.numberColumns      = 2;
      $scope.itemRows           = [];
      $scope.itemRows.length    = Math.ceil($scope.items.length / $scope.numberColumns);
      $scope.itemColumns        = [];
      $scope.itemColumns.length = $scope.numberColumns;
      //=============================[$parent.$index * numberColumns + $index]

      fdSvc.fundTeams($scope.fundId).then(
        function (teams) {
          $scope.teams = teams;
          $scope.init();
        },
        function (response) {
          $log.error(response);
        });

      //#endregion

      //#region === Public Methods ===
      $scope.init = function () {
        $scope.setUpImages();
        $scope.isLoading = false;
        $scope.itemList = $scope.teams;
        $scope.totalItems = $scope.itemList.length;
        setRecordsToDisplay();
      }

      $scope.setUpImages = function () {
        angular.forEach($scope.teams, function (value, index) {
          value.mainFundImage = fdSvc.getMainImage(value.fund.item.itemUploadList, 389, 246);
        });
      }

      $scope.findUserByType = function (fund, userTypeId) {
        var supporter = {};
        var exists;
        if (angular.isUndefined(fund)) {
          return {};
        }

        switch (userTypeId) {
          case 'Originator':
            if (angular.isDefined(fund.originator)) {
              supporter = fund.originator;
              exists = true;
            }
            break;
          case 'Beneficiary':
            if (angular.isDefined(fund.beneficiary)) {
              supporter = fund.beneficiary;
              exists = true;
            }
            break;
        }

        if (exists) {
          return supporter;
        }

        var userList = fund.userList;
        angular.forEach(userList, function (value, key) {
          switch (userTypeId) {
            case 'Originator':
              supporter = value;
              findPhotoUrl(supporter);
              fund.originator = supporter;
              break;
            case 'Beneficiary':
              supporter = value;
              findPhotoUrl(supporter);
              fund.beneficiary = supporter;
              break;
          }
        });

        return supporter;
      }

      $scope.hide = function (parentIndex) {
        return parentIndex === $scope.items.length || parentIndex > $scope.items.length;
      };

      $scope.onSelectPage = function () {
        setRecordsToDisplay();
      };

      $scope.openTeam = function (team) {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/fund/controlpanel/fdControlPanelTeamsMdl.min.html',
          controller: fdControlPanelTeamsMdl,
          size: 'sm-med',
          backdrop: 'true', //true:false:static(user click on background)
          resolve: {
            fundId: function () {
              return $scope.fundId;
            },
            team: function () {
              return team;
            }
          }
        });

        modalInstance.result.then(function (createdTeam) {
          if (createdTeam.isEdit) {

          } else {
            createdTeam.name = createdTeam.team.name;
            createdTeam.dateEntered = createdTeam.team.dateEntered;
            $scope.teams.push(createdTeam);
            $scope.itemList = $scope.teams;
            $scope.totalItems = $scope.itemList.length;
            setRecordsToDisplay();
          }
        }, function () {
          //Modal dismissed
        });
      };

      $scope.teamSettings = function (team) {
        $location.path('/fund/controlpanel/' + team.teamFundId + '/overview');
      }

      $scope.getTotalDonation = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        return fdSvc.getTotalDonation(fund.donationList, true);
      };

      $scope.getProgressBarPercentage = function (fund) {
        if (angular.isUndefined(fund)) {
          return { 'width': '0%' };
        }
        var percentageNumber = $scope.getProgressPercentage(fund);
        var percentage = {
          'width': percentageNumber + '%'
        };

        return percentage;
      };

      $scope.getProgressPercentage = function (fund) {
        if (angular.isUndefined(fund)) {
          return 0;
        }
        var percentageNumber = (this.getTotalDonation(fund) / fund.goalAmount) * 100;
        var percentage = $filter('number')(percentageNumber, 0);

        return percentage;
      };

      //#endregion

      //#region === Private Methods ===


      function findPhotoUrl(user) {
        if (angular.isDefined(user.facebook)) {
          user.photoUrl = 'https://graph.facebook.com/' + user.facebook.providerKey + '/picture?width=54&height=54';
        } else {
          user.photoUrl = user.avatarUploadTempLocation;
        }
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
      fundId: '='
    }
    return p;
  }
]);