'use strict';

malldubAdminApp.factory('foloFundsSvc', [
  '$resource', '$q', 'seAuthSvc', 'BASE_API_URL', function ($resource, $q, seAuthSvc, BASE_API_URL) {
    var p = {};

    //#region === Resources ===

    var resource = $resource(BASE_API_URL + '/api/fund/:action/:id',
    { id: '@id', action: '@action' }, {
      'get':         { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'save':        { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'update':      { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'query':       { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken() }, params: { action: 'all' }, isArray: true },
    });

    //#endregion === Resources ===

    //#region === Get All ===

    p.query = function () {
      var deferred = $q.defer();

      resource.query({ },
        function (funds) {
          deferred.resolve(funds);
        },
        function (response) {

          deferred.reject({
            error_description: 'Unable to get the funds',
            error: response
          });
        }
      );

      return deferred.promise;
    };

    //#endregion === Get All ===

    //#region === Get ===

    p.get = function (id) {
      var deferred = $q.defer();
      if (angular.isUndefined(id) || id.length === 0) {
        deferred.resolve({});
      } else {

        resource.get({ id: id },
          function (fund) {
            deferred.resolve(fund);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    //#endregion

    // #region === Save ===

    p.save = function (fund) {
      var deferred = $q.defer();

      if (angular.isUndefined(fund)) {
        deferred.reject({
          error: 'Fund',
          error_description: 'Invalid Fund'
        });
      } else {
        if (angular.isDefined(fund.identification)) {
          p.update(fund).then(function(response) {
              deferred.resolve(response);
            },
            function(response) {
              deferred.reject(response);
            });
        } else {
          p.create(fund).then(function (response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
        }
        
      }

      return deferred.promise;
    }

    p.create = function (fund) {
      var deferred = $q.defer();

      if (angular.isUndefined(fund)) {
        deferred.reject({
          error: 'Fund',
          error_description: 'Invalid Fund'
        });
      } else {
        resource.save({ fund: fund },
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    }

    p.update = function(fund) {
      var deferred = $q.defer();

      if (angular.isUndefined(fund.identification)) {
        deferred.reject({
          error: 'Fund Id',
          error_description: 'Invalid Fund id'
        });
      } else {
        resource.update({ fund: fund },
          function(response) {
            deferred.resolve(response);
          },
          function(response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    }

    // #endregion

    //#region === Column ===

    p.columnNames = [' ', 'Id', 'Title', 'End Date', 'Link', 'Featured'];
    p.columnModel = [
      {
        name: 'myac',
        index: 'myac',
        width: 95,
        fixed: true,
        sortable: true,
        resize: true,
        formatter: 'actions',
        delbutton: 'true',
        formatoptions: {
          keys: true,

          delOptions: {
            recreateForm: true,
            beforeShowForm: myJqGridModule.beforeDeleteCallback,
            onclickSubmit: function (options, postdata) {
              var id = $(this).jqGrid("getCell", postdata, "identification");
              return {
                identification : id
              }
            },
            url: BASE_API_URL + '/api/fund',
            mtype: 'DELETE',
            reloadAfterSubmit: true,
            ajaxDelOptions: {
              contentType: "application/json",
              beforeSend: function (jqXhr, settings) {
                jqXhr.setRequestHeader('authorization', seAuthSvc.getBearerToken());
                settings.url = settings.url + "?" + settings.data;
              }
            },
            afterComplete: myJqGridModule.afterComplete
          },
          //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
        }
      }, {
        name: 'identification',
        index: 'identification',
        width: 60,
        sorttype: "int",
        editable: false
      }, {
        name: 'item.title',
        index: 'item.title',
        width: 150,
        editable: true,
        editoptions: {
          size: "30",
          maxlength: "50"
        }
      }, {
        name: 'item.endDate',
        index: 'item.endDate',
        width: 90,
        editable: true,
        sorttype: "date",
        unformat: myJqGridModule.pickDate
      }, {
        name: 'item.permalink',
        index: 'item.permalink',
        width: 50,
        editable: true,
        editoptions: {
          size: "20",
          maxlength: "100"
        }
      }, {
        name: 'item.featured',
        index: 'item.featured',
        width: 70,
        editable: true,
        edittype: "checkbox",
        editoptions: {
          value: "true:false"
        },
        unformat: myJqGridModule.aceSwitch
      }
    ];

    //#endregion

    return p;
  }
]);