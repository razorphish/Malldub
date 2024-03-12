'use strict';

malldubAdminApp.factory('mdAdminSvc', [
  '$resource', '$q', 'seAuthSvc', 'BASE_API_URL', function ($resource, $q, seAuthSvc, BASE_API_URL) {
    var p = {};

    //#region === Resources ===

    var resource = $resource(BASE_API_URL + '/api/fund/:action/:id',
    { id: '@id', action: '@action' }, {
      'get': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'query': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken() }, params: { action: 'all' }, isArray: true },
    });

    var noteResource = $resource(BASE_API_URL + '/api/note/:action/:id',
    { id: '@id', action: '@action' }, {
      'get':            { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'save':           { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken() } },
      'query':          { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken() }, params: { action: 'all' }, isArray: true },
      'byApplication':  { method: 'GET', headers:  { 'authorization': seAuthSvc.getBearerToken() }, params: { action: 'application' }, isArray: true },
      'byApplications': { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken() }, params: { action: 'applications' }, isArray: true },
    });

    //#endregion === Resources ===

    //#region Publicly Exposed Methods

    //#region Notes
    p.notesByApplication = function(application) {
      var deferred = $q.defer();

      if (angular.isUndefined(application)) {
        deferred.reject({
          error: 'Application Id',
          error_description: 'Missing or invalid application Id'
        });
      } else {
        noteResource.byApplication({ id: application },
          function(response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    }

    p.notesByApplications = function () {
      var deferred = $q.defer();

      noteResource.byApplications({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
      
      return deferred.promise;
    }

    p.notesAll = function() {
      var deferred = $q.defer();

      noteResource.query({},
        function (data) {
          deferred.resolve(data);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    //#region === Notes Column ===

    p.noteColumnNames = [' ', 'Id', 'Application', 'Type', 'Subject', 'Comments', 'Viewed', 'Sent', 'Private'];
    p.noteColumnModel = [
      { name: 'myac', index: 'myac', width: 95, fixed: true, sortable: true, resize: true, formatter: 'actions', delbutton: 'true',
        formatoptions: {
          keys: true,
          delOptions: myJqGridModule.deleteOptions(BASE_API_URL + '/api/note', seAuthSvc.getBearerToken()),
          editformbutton:true,
          editOptions: myJqGridModule.editOptions(BASE_API_URL + '/api/note', 600, seAuthSvc.getBearerToken())
        }
      },
      { name: 'identification', index: 'identification', width: 70, sorttype: "int", fixed: true, editable: false, key: true },
      { name: 'applicationId', index: 'applicationId', width: 150, editable: true, fixed: true, editoptions: { size: "30", maxlength: "20" } },
      { name: 'typeId', index: 'typeId', width: 150, fixed: true, editable: true, editoptions: { size: "30", maxlength: "20" } },
      { name: 'subject', index: 'subject', width: 100, editable: true, editoptions: { size: "40", maxlength: "50" } },
      { name: 'comments', index: 'comments', width: 200, editable: true, edittype: "textarea", editoptions: { rows: 2, cols: 20, maxlength: "1000" } },
      { name: 'viewed', index: 'viewed', width: 70, editable: true, fixed: true, edittype: "checkbox", editoptions: { value: "true:false" }, unformat: myJqGridModule.aceSwitch },
      { name: 'sent', index: 'sent', width: 70, editable: true, fixed: true, edittype: "checkbox", editoptions: { value: "true:false" }, unformat: myJqGridModule.aceSwitch },
      { name: 'isPrivate', index: 'isPrivate', width: 70, editable: true, fixed: true, edittype: "checkbox", editoptions: {value: "true:false"}, unformat: myJqGridModule.aceSwitch}
    ];

    //#endregion

    //#endregion

    //#endregion

    //#region Methods

    //#endregion
    return p;
  }
]);