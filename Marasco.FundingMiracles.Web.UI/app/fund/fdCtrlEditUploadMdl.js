var fdCtrlEditUploadMdl = [
  '$scope', '$uibModalInstance', '$filter', 'Upload', '$timeout', 'appUrl', 'fdDashboardSvc', 'seAuthSvc', 'fund',
  function ($scope, $uibModalInstance, $filter, Upload, $timeout, appUrl, fdDashboardSvc, seAuthSvc, fund) {

    //#region === Initialize ===

    'use strict';
    var origUploads               = fund.item.itemUploadList;
    $scope.uploadList             = fund.item.itemUploadList;
    $scope.isSaving               = false;
    $scope.showValidationMessages = false;
    $scope.newUploads             = [];
    $scope.fileReaderSupported    = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

    //Init
    (function () {
      if (seAuthSvc.isLoggedIn()) {
        return;
      }

      $uibModalInstance.dismiss('User not logged in');
    })();

    //#endregion

    //#region === Public Methods ===

    $scope.$watch('newUploads', function (uploads) {
      $scope.formUpload = false;
      if (uploads != null) {
        for (var i = 0; i < uploads.length; i++) {
          $scope.errorMsg = null;
          generateThumb(uploads[i]);
          upload(uploads[i]);
        }
      }
    });

    $scope.close = function (reason) {
      $uibModalInstance.dismiss(reason);
    };

    $scope.save = function (itemUpload, isImage) {

      $scope.isSaving = true;
      if (isImage) itemUpload.file.progress = 90;

      if (angular.isDefined(fund.identification) && fund.identification > 0) {
        fdDashboardSvc.saveFundUpload(fund.identification, itemUpload).then(
          function (fundImage) {
            if (isImage) {
              itemUpload.file.progress = 100;
            itemUpload.file.actionVerb = '';
            }

            var img = initFileCreate(fundImage, fundImage.sortOrder);
            $scope.isSaving   = false;
            toastr.success("Image(s) saved successfully");
            fund.item.itemUploadList.push(img);
          },
          function (response) {
            toastr.error('We could not upload your file.  Please refresh and try again');
            fund.item.itemUploadList = origUploads;
            $scope.isSaving = false;
            if (isImage) itemUpload.file.progress = 0;
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };

    $scope.sortableOptions = {
      update: function (e, ui) {
        //var logEntry = tmpList.map(function (i) {
        //  return i.value;
        //}).join(', ');
        //$scope.sortingLog.push('Update: ' + logEntry);
      },
      stop: function (e, ui) {
        for (var index = 0; index < fund.item.itemUploadList.length; index++) {
          fund.item.itemUploadList[index].sortOrder = index;
        }

        fdDashboardSvc.updateFundUploads(fund.identification, fund.item.itemUploadList).then(
          function (response) {

            toastr.success('Success!');
          }, function(response) {
          toastr.error('There was a problem updating.  Please refresh and try again');
        });
      }
    };

    $scope.remove = function (u) {
      var id = u.upload.identification;
      u.isRemoving = true;
      //TODO: Create confirmation modal
      fdDashboardSvc.deleteFundUploads(fund.identification, id).then(
        function(response) {

          $scope.uploadList = $filter('orderBy')(organize($scope.uploadList.filter(
            function (itemUpload) {
            return itemUpload.uploadId !== id;
            }), false, null, true), 'sortOrder');

          fund.item.itemUploadList = $scope.uploadList;

          toastr.success('Upload removed successfully');
        },
        function (response) {
          u.isRemoving = false;
          toastr.error('We\'re having trouble removing this image.  Try refreshing your page and trying again');
        });
    }

    $scope.addVideoUrl = function () {
      $scope.isSaving = true;
      if (this.fundEditUploadVideoForm.$valid) {
        $scope.save({
          isDefault: false,
          sortOrder: findLatestSortOrder(),
          itemId: fund.identification,
          upload: {
            contentType: 'video/mpeg',
            locationHttp: $scope.videoUrl,
            description: $scope.videoUrl,
            location: $scope.videoUrl,
            name: $scope.videoUrl,
            originalFileName: $scope.videoUrl,
            isPrivate: false,
            CategoryId: 'Multimedia',
            typeId: 'web.Video'
          },
          imgUrl: $scope.videoUrl,
          thumbUrl: $scope.videoUrl,
        });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };
    
    $scope.getThumbnail = function (u) {

      var thumbNail = u.thumbUrl;

      switch (u.upload.typeId) {
        case 'web.Video.Vimeo':
        case 'web.Video.YouTube':
          thumbNail = u.upload.name;
          break;
      }

      return thumbNail;
    }

    $scope.getUploadType = function(u) {
      var typeId = 'Image';

      switch (u.upload.typeId) {
        case 'web.Video':
        case 'web.Video.Video':
        case 'web.Video.YouTube':
          typeId = 'Video';
          break;
      }

      return typeId;
    }

    $scope.getUploadRowIcon = function(u) {
      return {
        'fa-image': u.upload.typeId === 'web.Image',
        'fa-youtube': u.upload.typeId === 'web.Video.YouTube',
        'fa-vimeo-square': u.upload.typeId === 'web.Video.Vimeo'
      }
    }
    //#endregion

    //#region === Private Methods ===

    var findLatestSortOrder = function () {
      var length = 0;
      angular.forEach($scope.uploadList, function (value, key) {
        if (value.sortOrder >= length) {
          length = value.sortOrder + 1;
        }
      });
      return length || 0;
    };

    function generateThumb(file) {
      if (file != null) {
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function () {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
              $timeout(function () {
                file.dataUrl = e.target.result;
              });
            }
          });
        }
      }
    }

    function upload(file) {
        var data = $scope.formUpload ? {
            //Place from properties here if applicable
        } : {};

        Upload.upload({
            url: appUrl.api +  '/api/uploader',
            method: 'POST',
            fields: data,
            file: file
        }).progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            if (angular.isUndefined(file.actionVerb)) {
                file.actionVerb = 'Uploading';
            }
            var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            file.progress = progress > 80 ? 80 : progress;

        }).success(function (data, status, headers, config) {
            file.progress = 85;
            file.actionVerb = 'Saving';
            file.result = data;
            var newFile = traverse(file.result, true, false, file);
            $scope.save(newFile, true);

        }).error(function (err) {
          if (err.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
          }

          if (err.exceptionMessage) {
            if (err.exceptionMessage === 'Maximum request length exceeded.') {
              toastr.error('File too large.  Please use a smaller one');
            } else {
              toastr.error(err.exceptionMessage);
            }
            
          } else {
            toastr.error('There was a problem updating.  Please refresh and try again');
          }

          // reset image upload bars
          file.progress = 0;
          file.actionVerb = '#FAIL';
          file.fileUploadFailure = true;
        });

    }

    function organize(files, append, length, queryable, remoteFile) {
      var res = [];
      var nextSort = length || 0;

      for (var i = 0; i < files.length; i++) {
        var file = queryable ? files[i].upload : files[i];
        res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
        nextSort++;
      }

      return res;
    }

    function traverse(files, append, queryable, remoteFile) {
      var res = [];
      var length = 0;
      angular.forEach($scope.uploadList, function(value, key) {
        if (value.sortOrder >= length) {
          length = value.sortOrder + 1;
        }
      });
      var nextSort = findLatestSortOrder();

      for (var i = 0; i < files.length; i++) {
        var file = queryable ? files[i].upload : files[i];
        file.typeId = 'web.Image';
        res.push(initFile(file, append ? nextSort : files[i].sortOrder, remoteFile));
        nextSort++;
      }
        
      return res[0];
    }

    function initFile(file, sortOrder, remoteFile) {
      var imgUrl = file.location;
      var thumbUrl = file.location;
      if (file.typeId == 'web.Image') {
        //imgUrl = '/azure/' + file.containerName + '/'
        //  + file.name
        //  + '?height=560&width=550&mode=crop&scale=both';

        //thumbUrl = '/azure/' + file.containerName + '/'
        //  + file.name
        //  + '?height=180&width=180&mode=crop&scale=both';

        imgUrl = file.location
          + '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = file.location
          + '?height=180&width=180&mode=crop&scale=both';
      }

      //Remove upload list
      file.itemUploadList = null;

      var img = {
        isDefault: false,
        sortOrder: sortOrder,
        uploadId: file.identification || 0,
        itemId: fund.identification,
        upload: file,
        imgUrl: imgUrl,
        thumbUrl: thumbUrl,
        fileUploadFailure : false
      }

      if (angular.isDefined(remoteFile)) {
        img.file = remoteFile;
      }

      return img;
    }

    function initFileCreate(itemUpload, sortOrder, remoteFile) {
      var imgUrl = itemUpload.upload.location;
      var thumbUrl = itemUpload.upload.location;
      if (itemUpload.upload.typeId == 'web.Image') {
        //imgUrl = '/azure/' + itemUpload.upload.containerName + '/'
        //  + itemUpload.upload.name
        //  + '?height=560&width=550&mode=crop&scale=both';

        //thumbUrl = '/azure/' + itemUpload.upload.containerName + '/'
        //  + itemUpload.upload.name
        //  + '?height=180&width=180&mode=crop&scale=both';

        imgUrl = itemUpload.upload.location
          + '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = itemUpload.upload.location
          + '?height=180&width=180&mode=crop&scale=both';
      }

      itemUpload.imgUrl = imgUrl;
      itemUpload.thumbUrl = thumbUrl;

      if (angular.isDefined(remoteFile)) {
        itemUpload.file = remoteFile;
      }

      return itemUpload;
    }

    //#endregion

  }];