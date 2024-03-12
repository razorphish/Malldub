'use strict';

malldubAdminApp.factory('usrUserSvc', [
  '$resource', '$q', 'seAuthSvc', 'BASE_API_URL', function ($resource, $q, seAuthSvc, BASE_API_URL) {
    var p = {};

    //#region === Resources ===

    var resource = $resource(BASE_API_URL + '/api/aspnetuser/:action/:id',
    { id: '@id', action: '@action' }, {
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'query': { method: 'GET', params: { action: 'all' }, headers: { 'authorization': seAuthSvc.getBearerToken() }, isArray: true },
    });

    //#endregion === Resources ===

    //#region === Get All ===

    p.query = function () {
      var deferred = $q.defer();


      resource.query({},
        function (users) {
          deferred.resolve(users);
        },
        function (response) {

          deferred.reject({
            error_description: 'Unable to get the users',
            error: response
          });
        }
      );

      return deferred.promise;
    };

    //#endregion === Get All ===

    //#region Column
    p.columnNames = [' ', 'Id', 'First Name', 'Last Name', 'Username','Email', 'Status'];
    p.columnModel = [
      {
        name: 'myac',
        index: '',
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
                identification: id
              }
            },
            url: BASE_API_URL + '/api/aspnetuser',
            mtype: 'DELETE',
            reloadAfterSubmit: true,
            ajaxDelOptions: {
              contentType: "application/json",
              beforeSend: function (jqXhr, settings) {
                jqXhr.setRequestHeader('authorization', seAuthSvc.getBearerToken());
                settings.url = settings.url + "?" + settings.data;
              }
            },
            afterComplete:myJqGridModule.afterComplete
          },
          //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
        }
      }, {
        name: 'identification',
        index: 'identification',
        width: 90,
        sorttype: "int",
        editable: false
      }, {
        name: 'firstName',
        index: 'firstName',
        width: 40,
        editable: true,
        editoptions: {
          size: "30",
          maxlength: "50"
        }
      }, {
        name: 'lastName',
        index: 'lastName',
        width: 40,
        editable: true,
        editoptions: {
          size: "30",
          maxlength: "50"
        }
      }, {
        name: 'userName',
        index: 'userName',
        width: 70,
        editable: true,
        editoptions: {
          size: "20",
          maxlength: "256"
        }
      }, {
        name: 'userName',
        index: 'userName',
        width: 70,
        editable: true,
        editoptions: {
          size: "20",
          maxlength: "256"
        }
      }, {
        name: 'statusId',
        index: 'statusId',
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