'use strict';

fundoloApp.controller('fdDashboardEditCtrl',['$modal', '$scope', '$stateParams', '$location', '$log', '$filter','fdDashboardSvc', 'mdCoreDataSvc',
  function fdDashboardEditCtrl($modal, $scope, $stateParams, $location, $log, $filter, fdDashboardSvc, mdCoreDataSvc) {
    var fundId = angular.isUndefined($stateParams.fundId) ? 0 : $stateParams.fundId;

    //#region Initialize
    $scope.isAuthorized           = true;
    $scope.isLoading              = true;
    $scope.mode                   = 'create';
    $scope.beneMode               = 'create';
    $scope.showValidationMessages = false;
    $scope.maskingAgent           = "(999) 999-9999";

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
    };
    initialize();

    function initialize() {
      fdDashboardSvc.summary($stateParams.fundId).then(
        //BUG: ANGULAR If object has array as property then it requires isArray: true
        function (fund) {
          $scope.fund       = angular.isArray(fund) ? fund[0] : fund;
          $scope.files      = $scope.fund.item.itemUploadList;
          $scope.fileList   = $scope.files.length;
          $scope.isUpdating = true;
          $scope.tabSection = angular.isUndefined($stateParams.section) || $stateParams.section === 'info' ? 'info' : $stateParams.section;
          $scope.mode       = 'edit';
          App.mallDub.setDomainColor($scope.fund.pageColor, $scope.fund.pageSkin, $scope.fund.pageLayout);
        },
        function() {
          $scope.fund = {
            typeId: 'Campaign',
            item: {
              typeId: 'FundoloFund',
              transactionTypeId: 'Donation'
            },
            fundUserList: [
            {
               userTypeId: 'Originator', allowEmail:true, postToFacebook: true
            }, {
              userTypeId: 'Beneficiary', allowEmail: true, postToFacebook: true
            } ]
          };
          $scope.isUpdating = false;
        }
      );

      getStates();
      getFundCategories();
    }

    function displayBeneWarning() {
      $scope.title = "PLEASE READ BEFORE ADDING A BENEFICIARY";
      $scope.showAlert = true;
      $scope.alertType = "warning";
      $scope.message = "Just a couple of things to note before you add a beneficiary to this fund.  "
        + "1) The Beneficiary will need to setup their own account(s).  [WePay, Miracles].  Don't worry, we'll assist them!  "
        + "2) Only the beneficiary is allowed to withdraw from account.  "
        + "3) You will not be required to setup a WePay account for this fund.  "
        + "4) You will not be able to edit the beneficiary account info.  ";

    }

    function getStates() {
      mdCoreDataSvc.getAllStates().then(
        function (states) {
          $scope.stateOptions = states;
        },
        function (response) {
          toastr.error('Have you seen our states list?.  If not, please try again');
          $log.error(response);
        });
    }

    function getFundCategories() {
      mdCoreDataSvc.getAllFundCategories().then(
        function (categories) {
          $scope.fundCategoryOptions = categories;
        },
        function (response) {
          toastr.error('Have you seen our fund types?  If not, please try again');
          $log.error(response);
        });
    }


    function findState(stateToFind) {
      if (angular.isDefined(stateToFind)) {
        var result = $.grep($scope.stateOptions, function(e) {
          return e.identification === stateToFind;
        });

        //should only be one result
        return result[0].identification;
      } else {
        return null;
      }
    };


    function findCategory(categoryToFind) {
      if (angular.isDefined(categoryToFind)) {
        var result = $.grep($scope.fundCategoryOptions, function (e) {
          return e.identification === categoryToFind;
        });

        //should only be one result
        return result[0].identification;
      } else {
        return null;
      }
    };

    $scope.$watch('stateOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedState = $scope.stateOptions[0].identification;
      }
    });

    $scope.$watch('fundCategoryOptions', function (newValue, oldValue) {
      if (angular.isDefined(newValue) && angular.isArray(newValue)) {
        $scope.selectedCategory = $scope.fundCategoryOptions[0].identification;
      }
    });

    $scope.$watch('fundUser', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        if (angular.isDefined($scope.fundUser.aspNetUser.userAddressList[0].address)) {
          $scope.selectedState = findState($scope.fundUser.aspNetUser.userAddressList[0].address.state);
        }
      }
    });

    $scope.$watch('fund', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {
        if (angular.isDefined($scope.fund)) {
          $scope.selectedCategory = findCategory($scope.fund.categoryId);
        }
      }
    });

//#endregion /Initialize*/

    /* Scope Variables */
    $scope.files         = [];
    $scope.step          = 1;
    $scope.fileList      = 0;
    $scope.isSaving      = false;
    $scope.editFormClass = $scope.isUpdating ? "col-md-8" : "col-md-6";
    /*/Scope Variables */
    

    /* Scope Publicly Exposed Method*/
    $scope.BackToList = function() {
      $location.path('/controlpanel/fund/list');
    };

    $scope.gotoBasics = function () {
      $location.path('/account/basics');
    };
    
    $scope.fileExist = function () {
      return $scope.files.length > 0;
    };
    
    $scope.removeFile = function (idx) {
      var fileToDelete = $scope.files[idx];
      fdDashboardSvc.removeFile(fileToDelete).then(
        function (response) {
          $scope.files.splice(idx, 1);
          $scope.fileList = $scope.files.length;
          toastr.success("File removed successfully");
        },
        function (response) {
          toastr.error('There were some problems removing the file upload.  Please try again');
          $log.error(response);
        });
    };

    $scope.setDefault = function (idx) {
      var fileToDefault = $scope.files[idx];
      angular.forEach($scope.files, function(value, key) {
        value.isDefault = false;
      });
      fileToDefault.isDefault = true;
    };

    $scope.initSection = function () {
      return angular.isUndefined($stateParams.section) || $stateParams.section === 'info' ? 'info' : $stateParams.section;
    };

    $scope.redirectHome = function(promisedFund) {
      $location.path('/fund/dashboard/' + promisedFund.identification);
    };

    $scope.redirectFund = function (promisedFund) {
      $location.path('/' + promisedFund.item.permalink);
    };

    $scope.SaveFund = function (form, success) {
      $scope.isSaving = true;

      if (form.$valid) {
        $scope.fund.item.itemUploadList = $scope.files;
        $scope.fund.categoryId = this.selectedCategory;
        $scope.selectedCategory = this.selectedCategory;

        fdDashboardSvc.save($scope.fund).then(
          function (promisedFund) {
            $scope.isSaving = false;
            toastr.success("Fund saved successfully");
            $scope.fund.identification = promisedFund.identification;

            mdCoreDataSvc.reCache(promisedFund.item.permalink).then(
              function(resp) {
                $log.info(resp);
              }, function(resp) {
                $log.error(resp);
              });

            if (angular.isFunction(success)) {
              success(promisedFund);
            }
          },
          function(response) {
            toastr.error('There was an error saving this fund.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.isSaving = false;
        $scope.showValidationMessages = true;
      }
    };


    $scope.saveFundImage = function () {
      $scope.isSaving = true;

      if (angular.isDefined($scope.fund.identification) && $scope.fund.identification > 0) {
        $scope.fund.item.itemUploadList = $scope.files;
        fdDashboardSvc.saveFundImage($scope.fund).then(
          function (promisedFund) {
            $scope.isSaving = false;
            toastr.success("Image saved successfully");
          },
          function (response) {
            toastr.error('There was an error saving this image.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.isSaving = false;
      }
    };

    $scope.goToBeneficiary = function () {
      $scope.step = 2;
    };

    $scope.SaveFundUser = function (form, userTypeId, success) {
      $scope.isSaving = true;
      if (form.$valid) {
        $scope.fundUser.userTypeId = userTypeId;
        $scope.fundUser.fundId = $scope.fund.identification;
        $scope.fundUser.aspNetUser.userAddressList[0].address.state = this.selectedState;
        $scope.fundUser.aspNetUser.email = $scope.fundUser.aspNetUser.userEmailList[0].email.address;
        $scope.fundUser.aspNetUser.userName = $scope.fundUser.aspNetUser.email;
        
        fdDashboardSvc.saveFundUser($scope.fundUser).then(function (promised) {
          $scope.fundUser.userId = promised.userId;
          $scope.fundUser.aspNetUser.identification = promised.userId;
          $scope.isSaving = false;
          $scope.showAlert = false; //turn off bene warning, if on
          $scope.beneMode = 'summary';
          toastr.success(userTypeId + " Saved Successfully");

          mdCoreDataSvc.reCache($scope.fund.item.permalink).then(
            function (resp) {
              $log.success(resp);
            }, function (resp) {
              $log.error(resp);
            });

          if (angular.isFunction(success)) {
            success(promised);
          }

        },
          function (response) {
            toastr.error('There was an problem saving this fund.  Please try again');
            $log.error(response);
            $scope.isSaving = false;
          });
      } else {
        $scope.isSaving = false;
        $scope.showValidationMessages = true;
      }
    };

    $scope.saveSettings = function(form) {
      $scope.fund.item.endDate = $filter('date')($scope.fund.item.endDate, 'M/dd/yyyy');
      $scope.SaveFund(form);
    };


    //#region Uploader
    $scope.uploader = ({
      multiple: false,
      showFileList: false,
      async: {
        saveUrl: '/api/uploader',
        removeUrl: '/api/uploader',
        removeVerb: 'DELETE',
        autoUpload: true
      },
      localization: {
        cancel: 'Cancel Upload',
        dropFilesHere: 'Drop Files Here',
        headerStatusUploading: 'Please Wait...',
        remove: 'Remove File',
        retry: 'Retry Upload',
        select: 'Select',
        statusFailed: 'Upload has failed',
        statusUploaded: 'File has been uploaded',
        uploadSelectedFiles: 'Upload Files'
      },
      cancel: function(e) {
        
      },
      complete: function(e) {
        e.sender.options.enabled = false;
      },
      error: function(e) {
        //e.files (name, extension, size)
        //e.operation - upload/remove
        //e.XMLHttpRequest (responseText,status, statusText)
        toastr.error('There were some problems with the file upload.  Please try again');
        $log.error(e);

      },
      upload: function(e) {
        var files = e.files;

        // Check the extension of each file and abort the upload if it is not .jpg
        $.each(files, function () {
          if (this.extension != ".jpg" && this.extension != ".gif" && this.extension != ".jpeg" && this.extension != ".png") {
            toastr.warning("Only .jpg, jpeg, png, or gif files can be uploaded");
            e.preventDefault();
          }
        });
      },
      success: function (e) {
        if (e.operation === 'upload') {
          $scope.$apply(function () {
            var itemUpload = {
              isDefault: $scope.files.length === 0 ? true : false,
              upload: e.response[0]
            };
            $scope.files.push(itemUpload);
            $scope.fileList = $scope.files.length;
          });
          //Let's save the fund
          $scope.saveFundImage();
        }
      },
      template: "<span class='k-progress'></span><div class='file-wrapper'><h4 class='file-heading file-name-heading'>Name: #=name#</h4><h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4><button type='button' class='k-upload-action'></button></div>"
    });
    //#endregion

    //#region Modal
    $scope.saveAndAddBeneficiary = function (success) {
      $scope.isSaving = true;
      if (this.step1form.$valid) {
        var form = this.step1form;
        var modalInstance = $modal.open({
          templateUrl: '/app/fund/dashboard/edit/fdDashboardEditBeneInfoMdl.html',
          controller: fdDashboardEditBeneInfoMdlCtrl,
          backdrop: 'true', //true:false:static(user click on background)
          resolve: {
            fund: function() {
              return $scope.fund;
            }
          }
        });

        modalInstance.result.then(
          function() {
            $scope.SaveFund(form, success);
          }, function() {
            $scope.SaveFund(form, $scope.redirectHome);
          });
      } else {
        $scope.showValidationMessages = true;
        $scope.isSaving = false;
      }
    };
    //#endregion
  }
]);


var fdDashboardEditBeneInfoMdlCtrl = ['$scope', '$modalInstance',
  function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }];