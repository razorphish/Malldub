'use strict';
fundoloApp.directive('socialAddThisDrctv', [function () {
  var p = {};

  p.restrict = 'E';
  p.transclude = true;
  p.replace = true;
  p.templateUrl = '/app/common/social-add-this-drctv.min.html';

  p.link = function (scope, element, attrs, controller) {

  };

  //Performs DOM transformation befire link function runs
  p.compile = function (elem, attrs) {

  }

  p.controller = ['$scope', '$uibModal', 'Facebook', 'seAuthSvc', 'twitterConfiguration',
    function ($scope, $uibModal, Facebook, seAuthSvc, twitterConfiguration) {
      //#region === Initialize
      $scope.facebookIt = false;
      $scope.tweetId = false;
      $scope.mailIt = false;
      $scope.twitterCount = 0;

      $scope.socials = [
        { name: 'facebook' },
        { name: 'twitter' },
        { name: 'googleplus' }
      ];
      //#endregion

      $scope.postData = function (provider) {

        switch (provider) {
          case 'Facebook':
            postFacebook();
            break;
          case 'Twitter':
            postTwitter();
            break;
          case 'Mail':
            postMail();
            break;
          case 'Print':
            postPrint();
            break;
          default:
        }
      }

      function postFacebook() {

        Facebook.ui($scope.data.facebookData, function (data) {
          //TODO: CREATE MODAL thank you with stats
          toastr.success('Thank you for sharing my fundraiser!');
        });
      }

      function postMail() {

        var modalInstance = $uibModal.open({
          templateUrl: '/app/common/mdPostMailMdl.min.html',
          controller: postMailModal,
          resolve: {
            user: function () {
              return seAuthSvc.user;
            },
            fund: function () {
              return $scope.data.fund;
            }
          }
        });

        modalInstance.result.then(function (sender) {
          toastr.success('This fundraiser was shared successfully');
        }, function () {
          //Do nothing on cancel
        });
      }

      function postPrint() {
        var modalInstance = $uibModal.open({
          templateUrl: '/app/common/mdPostPrintMdl.min.html',
          controller: postPrintModal,
          resolve: {
            fund: function () {
              return $scope.data.fund;
            }
          }
        });

        modalInstance.result.then(function (sender) {
         //Do nothing on print/close
        }, function () {
          //Do nothing on cancel
        });
      }

      function postTwitter() {
        var url = encodeURIComponent($scope.data.twitterData.url);

        var href = twitterConfiguration.tweetUrl +
          '?hashtags=' + encodeURIComponent($scope.data.twitterData.hashtags) +
          '&original_referer=' + encodeURIComponent(document.location.href) +
          '&related=' + encodeURIComponent($scope.data.twitterData.related) +
          '&source=tweetbutton' +
          '&text=' + $scope.data.twitterData.text +
          '&url=' + url +
          '&via=' + $scope.data.twitterData.via;

        //// Get count and set it as the inner HTML of .count
        $.getJSON(twitterConfiguration.countUrl + "?callback=?&url=" + url, function (data) {
          $scope.twitterCount = data.count;
        });

        window.open(href, 'Share a link on Twitter', 'width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0');
      }

    }];

  p.scope = {
    socials: '=',
    data: '=',
    withCount: '=',
    size: '@'
  }

  return p;
}]);


var postMailModal = ['$scope', '$uibModalInstance', '$uibModal', 'fdSvc', 'appUrl', 'user', 'fund',
  function ($scope, $uibModalInstance, $uibModal, fdSvc, appUrl, user, fund) {

    //#region ===Initialize===
    $scope.sender = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipients: '',
      emails: []
    }
    $scope.showValidationMessages = false;

    $scope.fund = fund;
    $scope.isSending = false;

    //#endregion

    $scope.sendEmail = function () {
      if (this.sendMailForm.$valid) {
        $scope.isSending = true;
        var emailString = $scope.sender.recipients.split(',');
        var count = 0;
        var toEmails = [];

        angular.forEach(emailString, function (value, key) {
          //Check emails;
          if (App.validateEmail(value.trim())) {
            $scope.sender.emails.push(value.trim());
            toEmails.push({
              email: value.trim(),
              name: value.trim(),
            });
            count++;
          }
        });

        if (count === 0) {
          toastr.warning('Please add at least one email recipient.');
          $scope.sender.recipients = $scope.sender.emails.join();
          $scope.isSending = false;
        } else {
          fdSvc.share({
            firstName: $scope.sender.firstName,
            lastName: $scope.sender.lastName,
            fundTitle: $scope.fund.item.title,
            fundId: $scope.fund.item.identification,
            fundDescription: $scope.fund.item.description,
            fundDonateUrl: appUrl.base + '/fund/donate/' + $scope.fund.item.identification,
            fundUrl: $scope.fund.url,
            fundImageUrl: appUrl.base + $scope.fund.defaultImage,
            fromEmail: $scope.sender.email,
            toEmails: toEmails
          }).then(function (response) {
            $uibModalInstance.close($scope.sender);
            $scope.isSending = false;
          }, function (response) {
            toastr.error('Unable to share campaign.  Please refresh and try again');
            $scope.isSending = false;
          });

        }
      } else {
        $scope.showValidationMessages = true;
      }
    };

    $scope.preview = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/app/common/mdPostMailPreviewMdl.min.html',
        controller: postMailPreviewModal,
        size: 'sm',
        resolve: {}
      });

      modalInstance.result.then(function () {
        //do nothing on close 
      }, function () {
        //do nothing on dismiss(cancel)
      });
    }

    $scope.cancel = function (reason) {
      $uibModalInstance.dismiss(reason);
    };
  }];


var postMailPreviewModal = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

  $scope.close = function (reason) {
    $uibModalInstance.close(reason);
  };
}];


var postPrintModal = ['$scope', '$uibModalInstance', '$compile', 'appUrl', 'mdCoreDataSvc', 'fund',
  function ($scope, $uibModalInstance, $compile, appUrl, mdCoreDataSvc, fund) {
    $scope.isLoading = true;
    $scope.fund = fund;
    $scope.imageUrl = appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink;

    $scope.imageLoaded = function () {
      $scope.isLoading = false;
      $scope.$apply('isLoading');
    }

    $scope.print = function () {
      //TODO DUPLICATE of PRINT fdDashboardPrintCtrl.js
      var printContents = '<img src="' + appUrl.fundPrint + '/printfund.aspx?f=' + $scope.fund.item.permalink + '">';

      if (mdCoreDataSvc.isIe() > 1) {
        mdCoreDataSvc.printPage(printContents);
      } else {
        var element = $compile(angular.element(document.getElementById('fundPrintImage')))($scope);
        mdCoreDataSvc.printSection(element, printContents, $scope.fund.item.title);
      }
    }

    $scope.close = function (reason) {
      $uibModalInstance.close(reason);
    };
  }];
