(function () {
  'use strict';

  angular
    .module('mars.admin.fundolo')
    .controller('fundraiserUploadsControllerModal', FundraiserUploadsControllerModal);

  FundraiserUploadsControllerModal.inject = [
    '$scope', '$uibModalInstance', '$log',
    'item', 'items', 'isAdd', 'fundId',
    '$timeout',
    'fundraiserUploadsFactory', 'Upload',
    'toastr', 'moment', 'epAxisSettingsVal'
  ];

  /*jshint maxparams:13 */
  function FundraiserUploadsControllerModal(
    $scope, $uibModalInstance, $log,
    item, items, isAdd, fundId,
    $timeout,
    fundraiserUploadsFactory, Upload,
    toastr, moment, epAxisSettingsVal
  ) {

    var vm = this;
    vm.itemName = 'itemUpload';
    var itemDirty = false;
    $scope.items = angular.copy(items);

    vm.fileReaderSupported = window.FileReader != null &&
      (window.FileAPI == null);

    vm.close = function (reason) {
      if (itemDirty) {
        $uibModalInstance.close(true);
      }
      $uibModalInstance.dismiss(reason);
    };

    vm.uploads = function (uploads) {
      for (var i = 0; i < uploads.length; i++) {
        vm.errorMsg = null;
        generateThumb(uploads[i]);
        upload(uploads[i]);
      }
    };

    activate();

    ////////////////

    function activate() {
      $scope[vm.itemName] = angular.copy(item);
      vm.showValidationMessages = false;
      vm.isAdd = isAdd;
    }

    function findLatestSortOrder() {
      var length = 0;
      angular.forEach($scope.uploadList, function (value, key) {
        if (value.sortOrder >= length) {
          length = value.sortOrder + 1;
        }
      });
      return length || 0;
    }

    function generateThumb(file) {
      if (file != null) {
        if (vm.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function () {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
              $timeout(function () {
                file.dataUrl = e.target.result;
              });
            };
          });
        }
      }
    }

    function initFile(file, sortOrder, remoteFile) {
      var imgUrl = file.location;
      var thumbUrl = file.location;
      if (file.typeId === 'web.Image') {
        imgUrl = '/azure/' + file.containerName + '/' +
          file.name +
          '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = '/azure/' + file.containerName + '/' +
          file.name +
          '?height=180&width=180&mode=crop&scale=both';
      }

      var img = {
        isDefault: false,
        sortOrder: sortOrder,
        uploadId: file.identification || 0,
        itemId: fundId,
        upload: file,
        imgUrl: imgUrl,
        thumbUrl: thumbUrl,
      };
      if (angular.isDefined(remoteFile)) {
        img.file = remoteFile;
      }

      return img;
    }

    function initFileCreate(itemUpload, sortOrder, remoteFile) {
      var imgUrl = itemUpload.upload.location;
      var thumbUrl = itemUpload.upload.location;
      if (itemUpload.upload.typeId === 'web.Image') {
        imgUrl = '/azure/' + itemUpload.upload.containerName + '/' +
          itemUpload.upload.name +
          '?height=560&width=550&mode=crop&scale=both';

        thumbUrl = '/azure/' +
          itemUpload.upload.containerName + '/' +
          itemUpload.upload.name +
          '?height=180&width=180&mode=crop&scale=both';
      }

      itemUpload.imgUrl = imgUrl;
      itemUpload.thumbUrl = thumbUrl;

      if (angular.isDefined(remoteFile)) {
        itemUpload.file = remoteFile;
      }

      return itemUpload;
    }

    function saveImage(itemUpload, isImage, context) {

      vm.isSaving = true;
      if (isImage) {
        itemUpload.file.progress = 90;
      }

      //Hard-coded sort order.
      itemUpload.sortOrder = $scope.items.length;

      if (angular.isDefined(fundId) && fundId > 0) {
        fundraiserUploadsFactory.save(fundId, itemUpload).then(
          function (fundImage) {
            if (isImage) {
              itemUpload.file.progress = 100;
              itemUpload.file.actionVerb = '';
            } else {
              context.videoUrl = '';
            }

            var img = initFileCreate(fundImage, fundImage.sortOrder);
            itemUpload.uploadId = fundImage.uploadId;
            itemUpload.upload.identification = fundImage.uploadId;
            itemUpload.imgUrl = img.imgUrl;
            itemUpload.thumbUrl = img.thumbUrl;

            if (img.file) {
              itemUpload.file = img.file;
            }

            vm.isSaving = false;
            toastr.success('Image(s) saved successfully');
            $scope.items.push(itemUpload);
            $uibModalInstance.close($scope.items);
          },
          function (response) {
            toastr.error('We could not upload your file.  Please refresh and try again');
            $scope.items = items;
            vm.isSaving = false;
            if (isImage) {
              itemUpload.file.progress = 0;
            }
          });
      } else {
        vm.showValidationMessages = true;
        vm.isSaving = false;
      }
    }

    function traverse(files, append, queryable, remoteFile) {
      var res = [];
      var length = 0;
      angular.forEach($scope.uploadList, function (value, key) {
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

    function upload(file) {
      var data = vm.formUpload ? {
        //Place from properties here if applicable

      } : {};
      var uploadUrl = epAxisSettingsVal.adminApiUrl;
      uploadUrl += '/api/admin/item/';
      uploadUrl += fundId;
      uploadUrl += '/upload/uploader';

      Upload.upload({
        url: uploadUrl,
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
        saveImage(newFile, true);

      }).error(function (err) {
        if (err.status > 0) {
          vm.errorMsg = err.status + ': ' + err.data;
        }
      });
    }
  }
})();
