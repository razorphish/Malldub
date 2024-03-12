fundoloApp.directive('fdWidgetsCommentsDrctv', [
  'seAuthSvc','cssInjector', 'fdSvc', 'mdCoreDataSvc',
  function (seAuthSvc, cssInjector, fdSvc, mdCoreDataSvc) {

  'use strict';

  var p = {};

  p.restrict    = 'E';
  p.replace     = true;
  p.templateUrl = '/app/fund/widgets/fd-widgets-comments-drctv.min.html';

  p.link = function ($scope, element, attrs, controller) {
    attrs.$observe('fundId', function (newValue, oldValue) {
      if (newValue > 0) {
        $scope.initComments(newValue);
      }
    });

    attrs.$observe('allowCommenting', function(newValue, oldValue) {
      if (newValue.length > 0) {
        $scope.allowCommenting = newValue;
      }
    });

    //#region === Initialize ===

    cssInjector.add("/assets/css/pages/profile.css", true);
    cssInjector.add("/assets/css/plugins/brand-buttons/brand-buttons.css", true);
    cssInjector.add("/assets/css/plugins/brand-buttons/brand-buttons-inversed.css", true);


    $scope.isCommentLoading       = true;
    $scope.user                   = seAuthSvc.user;
    $scope.isCommenting           = false;
    $scope.showValidationMessages = false;

    //=============================
    // Initialize pagination
    $scope.commentMaxSize  = 7;
    $scope.totalComments   = 0;
    $scope.currentPage     = 1;
    $scope.commentsPerPage = 10;
    //=============================

    mdCoreDataSvc.getGeoData2().then(
      function (data) {
        $scope.geo = data;
      },
      function () {
        //Do nothing
      });

    //#endregion

    //#region === Public Methods ===
    $scope.$watch('fundcomments', function(newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.commentsLength = newValue.length;
      }
    });

    $scope.displayCommentName = function(fundComment) {
      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateDonorName) {
          return 'Anonymous';
        }
      } 
      return fundComment.comment.name;
    }

    $scope.displayCommentTitle = function(fundComment) {
      
      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateAmount) {
          return 'commented with a donation:';
        }
      }
      return fundComment.comment.title.toLowerCase();
    }

    $scope.sendUser = function(fundComment) {

      if (angular.isDefined(fundComment.donation)) {
        if (fundComment.donation.isPrivateDonorName) {
          fundComment.aspNetUser.forceDefault = true;
          return fundComment.aspNetUser;
        }
      }
      return fundComment.aspNetUser;
    }

    $scope.getFundComments = function (pageNumber) {
      $scope.isCommentLoading = true;

      if (angular.isUndefined(pageNumber) || pageNumber === 0) {
        pageNumber = 1;
      }

      fdSvc.comment($scope.fundId, pageNumber, $scope.commentsPerPage).then(
        function (items) {
          $scope.fundcomments = items.data;
          $scope.initCommentPagination(items.count);
          $scope.isCommentLoading = false;
        },
        function (response) {
          toastr.error(response.error_description);
          $scope.isCommentLoading = false;
        });
    };

    $scope.initCommentPagination = function (fundsCount) {

      $scope.totalComments = fundsCount;
    }

    $scope.onSelectCommentPage = function () {
      $scope.getFundComments($scope.currentPage);
    };

    $scope.initComments = function (fundId) {
      $scope.fundId = fundId;
      $scope.getFundComments(1);
    }

    $scope.initLogin = function () {
      $scope.isLoggedIn = seAuthSvc.isLoggedIn();
    }

    $scope.likeThis = function (fundcomment) {
      fundcomment.comment.totalLikes++;
      fdSvc.commentLike($scope.fundId, fundcomment).then(
        function (response) {
          toastr.success('You have successfully liked this comment');
        },
        function (response) {
          fundcomment.comment.totalLikes--;
          toastr.error('Our bad!  Could you refresh the page and try again?');
        });
    }

    $scope.postComment = function () {
      $scope.isCommenting = true;
      if (this.donateCommentForm.$valid) {
        var fundComment = {
          fundId: $scope.fundId,
          originId: 'Fund',
          comment: {
            geo: $scope.geo,
            post: $scope.comment,
            title: 'Commented:',
            postToFacebook: $scope.postToFacebook
          }
        }

        fdSvc.commentSave($scope.fundId, fundComment, seAuthSvc.getBearerToken()).then(
          function (response) {
            $scope.fundcomments.push(response);
            toastr.success('Your comments mean alot to us. Thank you!');
            $scope.comment = '';
            $scope.postToFacebook = false;
            $scope.totalComments++;
            $scope.isCommenting = false;
          },
          function (response) {
            toastr.error('Uh oh!  Seems something is up with our system.  Please refresh and try it again');
            $scope.isCommenting = false;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isCommenting = false;
      }
    }
    //#endregion
  };

    p.controller = [
      '$scope', function($scope) {
        $scope.commentsLength = 0;
      }
    ];

  return p;
}]);
