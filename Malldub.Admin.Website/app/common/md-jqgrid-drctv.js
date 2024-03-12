'use strict';

malldubAdminApp.directive('mdJqgridDrctv', ['BASE_API_URL', 'BASE_URL', 'seAuthSvc', function (BASE_API_URL, BASE_URL, seAuthSvc) {
  var p = {};

  p.restrict = 'E';
  p.transclude = true;
  p.replace = true;
  p.templateUrl = '/app/common/md-jqgrid-drctv.html';

  p.link = function (scope, element, attrs, controller) {

    scope.$watch('data', function (newValue, oldValue) {
      if (angular.isDefined(newValue)) {

        setTimeout(function() {

          var gridSelector = "#grid-table";
          var pagerSelector = "#grid-pager";

          $(gridSelector).jqGrid({
            data: scope.data,
            datatype: "local",
            height: scope.height,
            colNames: scope.colNames,
            colModel: scope.colModel,

            viewrecords: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: pagerSelector,
            altRows: true,

            multiselect: true,
            multiboxonly: true,

            loadComplete: function() {
              var table = this;
              setTimeout(function() {
                myJqGridModule.styleCheckbox(table);
                myJqGridModule.updateActionIcons(table, BASE_URL + scope.editUrl);
                myJqGridModule.updatePagerIcons(table);
                myJqGridModule.enableTooltips(table);
              }, 0);
            },
            ajaxRowOptions: {
              contentType: "application/json",
              dataType: "json",
              beforeSend: function(jqXhr, settings) {
                jqXhr.setRequestHeader('authorization', seAuthSvc.getBearerToken());
              }
            },
            serializeRowData: function(postData) {
              return JSON.stringify(postData);
            },
            editurl: BASE_API_URL + '/api/note',
            caption: scope.caption,
            autowidth: true

          });

          jQuery(gridSelector).jqGrid('navGrid', pagerSelector, {
            //navbar options
            edit: true,
            editicon: 'icon-pencil blue',
            add: true,
            addicon: 'icon-plus-sign purple',
            del: true,
            delicon: 'icon-trash red',
            search: true,
            searchicon: 'icon-search orange',
            refresh: true,
            refreshicon: 'icon-refresh green',
            view: true,
            viewicon: 'icon-zoom-in grey'
          },
          myJqGridModule.editOptions(BASE_API_URL + '/api/note', 600, seAuthSvc.getBearerToken()),
          myJqGridModule.addOptions(BASE_API_URL + '/api/note', 600, seAuthSvc.getBearerToken(), BASE_URL + scope.editUrl),
          myJqGridModule.deleteOptions(BASE_API_URL + '/api/note', seAuthSvc.getBearerToken()),
          {
            //search form
            recreateForm: true,
            afterShowSearch: function(e) {
              var form = $(e[0]);
              form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
              myJqGridModule.styleSearchForm(form);
            },
            afterRedraw: function() {
              myJqGridModule.styleSearchFilters($(this));
            },
            multipleSearch: true,
            /**
          multipleGroup:true,
          showQuery: true
          */
          }, {
            //view record form
            recreateForm: true,
            beforeShowForm: function(e) {
              var form = $(e[0]);
              form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
            }
          });

        }, 1);
      }

    });
  };

  p.controller = function ($scope) {

  };

  p.scope = {
    data: "=",
    /* gridSelector: '@',
    gridPager: '@',*/
    height: '@',
    rowNum: '@',
    rowList: '@',
    colNames: '=',
    colModel: '=',
    editUrl: '@',
    caption: '@'
  };

  return p;
}]);