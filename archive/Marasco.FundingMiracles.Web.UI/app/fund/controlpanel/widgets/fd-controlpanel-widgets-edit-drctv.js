fundoloApp.directive('fdControlpanelWidgetsEditDrctv', [
    '$timeout', '$window', '$filter', 'Upload', 'fdDashboardSvc', 'seAuthSvc', 'mdCoreDataSvc',
    function($timeout, $window, $filter, Upload, fdDashboardSvc, seAuthSvc, mdCoreDataSvc) {

        //#region === Initialization ===

        'use strict';
        var p         = {};
        p.transclude  = true;
        p.restrict    = 'E';
        p.templateUrl = '/app/fund/controlpanel/widgets/fd-controlpanel-widgets-edit-drctv.min.html';
        p.replace     = true;

        //#endregion

        //#region === Directives ====

        p.link = function($scope, element, attributes, controller) {

            var origUploads;

            //#region === Initialize ===
            $scope.$watch('fund', function(newValue, oldValue) {
                if (angular.isDefined(newValue.item)) {
                    $scope.permalink  = newValue.item.permalink;
                    origUploads       = newValue.item.itemUploadList;
                    $scope.uploadList = newValue.item.itemUploadList;
                    $scope.dt         = new Date(newValue.item.endDate);
                    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
                }
            }, true);

            (function() {
                if (seAuthSvc.isLoggedIn()) {
                    getFundCategories();
                    $timeout(function() {
                        $window.CKEDITOR.replace('funddescription');
                        $scope.showTextEditor = true;
                    }, 1000);
                    return;
                }

            })();

            $scope.$watch('newUploads', function(uploads) {
                $scope.formUpload = false;
                if (uploads != null) {
                    $scope.uploads(uploads);
                }
            });

            $scope.uploads = function(uploads) {
                for (var i = 0; i < uploads.length; i++) {
                    $scope.errorMsg = null;
                    generateThumb(uploads[i]);
                    upload(uploads[i]);
                }
            };

            //#endregion


            //#region === Public Methods ===

            $scope.saveBasic = function() {
                $scope.isSaving = true;
                if (this.editFundBasicForm.$valid) {
                    $scope.fund.item.description = CKEDITOR.instances.funddescription.getData();
                    $scope.fund.item.endDate = $filter('date')($scope.dt, 'M/dd/yyyy');
                    $scope.save();
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.savePermalink = function() {
                $scope.isSaving = true;
                if (this.editFundPermalinkForm.$valid) {
                    $scope.fund.item.permalink = this.permalink;
                    $scope.save();
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };
            $scope.save = function (successCallBack, successTitle) {
                var fund = {};
                angular.copy($scope.fund, fund);
                fund.fundNoteList = [];
                fund.donationList = [];
                fdDashboardSvc.save(fund).then(
                    function () {
                      if (angular.isFunction(successCallBack)) {
                        successCallBack(successTitle);
                      } else {
                        $scope.isSaving = false;
                        toastr.success('The fundraiser updated successfully');
                      }
                    },
                    function() {
                        $scope.isSaving = false;
                        $scope.showValidationMessages = true;
                        toastr.error('There was an error saving this fund.  Please try again');
                    });
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                minDate: new Date(),
                startingDay: 1
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.changeColor = function (color) {
              $scope.fund.pageColor = color;
              $scope.save(toastrSuccessMessage, 'Nice Color! We went and changed it for you back here.');
            }

            $scope.changeSkin = function (skin) {
              $scope.fund.pageSkin = skin;
              var message = 'We\'ve changed the style to dark';
              if (skin === 'Light') {
                message = 'We\'ve changed the style to light';
              }
              $scope.save(toastrSuccessMessage, message);
            }

            $scope.changeLayout = function (layout) {
              $scope.fund.pageLayout = layout;
              var message = 'We\'ve changed the style to wide';
              if (layout === 'Boxed') {
                message = 'We\'ve changed the layout to boxed';
              }
              $scope.save(toastrSuccessMessage, message);
            }

            //#region === Image Function ===

            $scope.saveImage = function(itemUpload, isImage, context) {

                $scope.isSaving = true;
                if (isImage) {
                    itemUpload.file.progress = 90;
                }

                if (angular.isDefined($scope.fund.identification) && $scope.fund.identification > 0) {
                    fdDashboardSvc.saveFundUpload($scope.fund.identification, itemUpload).then(
                        function(fundImage) {
                            if (isImage) {
                                itemUpload.file.progress = 100;
                                itemUpload.file.actionVerb = '';
                            } else {
                                context.videoUrl = "";
                            }

                            var img = initFileCreate(fundImage, fundImage.sortOrder);
                            itemUpload.uploadId = fundImage.uploadId;
                            itemUpload.upload.identification = fundImage.uploadId;
                            itemUpload.imgUrl = img.imgUrl;
                            itemUpload.thumbUrl = img.thumbUrl;

                            if (img.file) {
                                itemUpload.file = img.file;
                            }

                            $scope.isSaving = false;
                            toastr.success("Image(s) saved successfully");
                            //$scope.fund.item.itemUploadList.push(img);
                            $scope.fund.item.itemUploadList.push(itemUpload);
                        },
                        function(response) {
                            toastr.error('We could not upload your file.  Please refresh and try again');
                            $scope.fund.item.itemUploadList = origUploads;
                            $scope.isSaving = false;
                            if (isImage) {
                                itemUpload.file.progress = 0;
                            }
                        });
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.getThumbnail = function(u) {

                var thumbNail = u.thumbUrl;

                switch (u.upload.typeId) {
                    case 'web.Video.Vimeo':
                    case 'web.Video.YouTube':
                        thumbNail = u.upload.name;
                        break;
                }

                return thumbNail;
            };
            $scope.sortableOptions = {
                update: function(e, ui) {

                },
                stop: function(e, ui) {
                    for (var index = 0; index < $scope.fund.item.itemUploadList.length; index++) {
                        $scope.fund.item.itemUploadList[index].sortOrder = index;
                    }

                    fdDashboardSvc.updateFundUploads($scope.fund.identification, $scope.fund.item.itemUploadList).then(
                        function(response) {

                            toastr.success('Success!');
                        }, function(response) {
                            toastr.error('There was a problem updating.  Please refresh and try again');
                        });
                }
            };

            $scope.remove = function(u) {
                var id = u.upload.identification;
                u.isRemoving = true;
                //TODO: Create confirmation modal
                fdDashboardSvc.deleteFundUploads($scope.fund.identification, id).then(
                    function(response) {

                        $scope.uploadList = $filter('orderBy')(organize($scope.uploadList.filter(
                            function(itemUpload) {
                                return itemUpload.uploadId !== id;
                            }), false, null, true), 'sortOrder');

                        $scope.fund.item.itemUploadList = $scope.uploadList;

                        toastr.success('Upload removed successfully');
                    },
                    function(response) {
                        u.isRemoving = false;
                        toastr.error('We\'re having trouble removing this image.  Try refreshing your page and trying again');
                    });
            };
            $scope.addVideoUrl = function() {
                $scope.isSaving = true;
                if (this.fundEditUploadVideoForm.$valid) {
                    var video = {
                        isDefault: false,
                        sortOrder: findLatestSortOrder(),
                        itemId: $scope.fund.identification,
                        upload: {
                            contentType: 'video/mpeg',
                            locationHttp: this.videoUrl,
                            description: this.videoUrl,
                            location: this.videoUrl,
                            name: this.videoUrl,
                            originalFileName: this.videoUrl,
                            isPrivate: false,
                            CategoryId: 'Multimedia',
                            typeId: 'web.Video'
                        },
                        imgUrl: this.videoUrl,
                        thumbUrl: this.videoUrl,
                    };

                    $scope.saveImage(video, false, this);
                } else {
                    $scope.showValidationMessages = true;
                    $scope.isSaving = false;
                }
            };

            $scope.getThumbnail = function(u) {

                var thumbNail = u.thumbUrl;

                switch (u.upload.typeId) {
                    case 'web.Video.Vimeo':
                    case 'web.Video.YouTube':
                        thumbNail = u.upload.name;
                        break;
                }

                return thumbNail;
            };
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
            };
            $scope.getUploadRowIcon = function(u) {
                return {
                    'fa-image': u.upload.typeId === 'web.Image',
                    'fa-youtube': u.upload.typeId === 'web.Video.YouTube',
                    'fa-vimeo-square': u.upload.typeId === 'web.Video.Vimeo'
                };
            }; //#endregion

            //#endregion


            //#region === Private Methods ===

            //#region === Fund Categories ===

            function findCategory(categoryToFind) {
                if (angular.isDefined(categoryToFind)) {
                    var result = $.grep($scope.fundCategoryOptions, function(e) {
                        return e.identification === categoryToFind;
                    });

                    //should only be one result
                    return result[0].identification;
                } else {
                    return null;
                }
            };

            function getFundCategories() {
                mdCoreDataSvc.getAllFundCategories().then(
                    function(categories) {
                        $scope.fundCategoryOptions = categories;
                        $scope.categoryId = findCategory($scope.fund.categoryId);
                    },
                    function(response) {
                        $log.error(response);
                    });
            }

            //#endregion

            //#region === Image Function ===

            var findLatestSortOrder = function() {
                var length = 0;
                angular.forEach($scope.uploadList, function(value, key) {
                    if (value.sortOrder >= length) {
                        length = value.sortOrder + 1;
                    }
                });
                return length || 0;
            };

            function generateThumb(file) {
                if (file != null) {
                    if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                        $timeout(function() {
                            var fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function(e) {
                                $timeout(function() {
                                    file.dataUrl = e.target.result;
                                });
                            };
                        });
                    }
                }
            }

            function upload(file) {
                var data = $scope.formUpload ? {
                    //Place from properties here if applicable
        
                } : {};

                Upload.upload({
                    url: '/api/uploader',
                    method: 'POST',
                    fields: data,
                    file: file
                }).progress(function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    if (angular.isUndefined(file.actionVerb)) {
                        file.actionVerb = 'Uploading';
                    }
                    var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    file.progress = progress > 80 ? 80 : progress;

                }).success(function(data, status, headers, config) {
                    file.progress   = 85;
                    file.actionVerb = 'Saving';
                    file.result     = data;
                    var newFile     = traverse(file.result, true, false, file);
                    $scope.saveImage(newFile, true);

                }).error(function(err) {
                    if (err.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
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
                    imgUrl = '/azure/' + file.containerName + '/'
                        + file.name
                        + '?height=560&width=550&mode=crop&scale=both';

                    thumbUrl = '/azure/' + file.containerName + '/'
                        + file.name
                        + '?height=180&width=180&mode=crop&scale=both';
                }

                var img = {
                    isDefault: false,
                    sortOrder: sortOrder,
                    uploadId: file.identification || 0,
                    itemId: $scope.fund.identification,
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
                if (itemUpload.upload.typeId == 'web.Image') {
                    imgUrl = '/azure/' + itemUpload.upload.containerName + '/'
                        + itemUpload.upload.name
                        + '?height=560&width=550&mode=crop&scale=both';

                    thumbUrl = '/azure/' + itemUpload.upload.containerName + '/'
                        + itemUpload.upload.name
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

            //#region === Style ===

              function toastrSuccessMessage(message, title) {
                $window.App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
                toastr.success(message);
              }

            //#endregion

              //Kill the timer:good practice
              $scope.$on('destroy', function(event) {
                  $timeout.cancel(timer);
              });

              //#endregion
        };
        p.scope = {
            fund: '=',
            activeTab: '@'
        };

        //#endregion
        return p;
    }
]);