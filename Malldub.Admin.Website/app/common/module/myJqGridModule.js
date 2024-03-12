'use strict';

var myJqGridModule = function() {
  var that = {};

  //#region Publibly Exposed Methods

  //#region Events
  that.beforeDeleteCallback =function (e) {
    var form = $(e[0]);
    if (form.data('styled')) return false;

    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
    styleDeleteForm(form);

    form.data('styled', true);
  }

  that.beforeEditCallback = function(e) {
      var form = $(e[0]);
      form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
      that.styleEditForm(form);
  }

  that.beforeAddCallback = function (e) {
    var form = $(e[0]);
    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
    myJqGridModule.styleEditForm(form);
  }

  that.afterComplete = function () {
    //var data = $("#grid-table").jqGrid("getGridParam", "data");
    //var allParameters = $("#grid-table").jqGrid("getGridParam");
    $("#grid-table").trigger("reloadGrid");
    //allParameters.data = newData; // or newData.slice(0)
  }

  //#endregion

  that.pickDate = function (cellvalue, options, cell) {
    setTimeout(function () {
      $(cell).find('input[type=text]')
          .datepicker({ format: 'yyyy-mm-dd', autoclose: true });
    }, 0);
  }

  that.aceSwitch = function (cellvalue, options, cell) {
    setTimeout(function () {
      $(cell).find('input[type=checkbox]')
          .wrap('<label class="inline" />')
        .addClass('ace ace-switch ace-switch-5')
        .after('<span class="lbl"></span>');
    }, 0);
  }

  that.styleEditForm = function(form) {
    //enable datepicker on "sdate" field and switches for "stock" field
    form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
      .end().find('input[name=stock]')
      .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

    //update buttons classes
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
    buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>');

    buttons = form.next().find('.navButton a');
    buttons.find('.ui-icon').remove();
    buttons.eq(0).append('<i class="icon-chevron-left"></i>');
    buttons.eq(1).append('<i class="icon-chevron-right"></i>');
  }

  that.styleDeleteForm = function(form) {
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
    buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>');
  }

  that.styleSearchFilters = function(form) {
    form.find('.delete-rule').val('X');
    form.find('.add-rule').addClass('btn btn-xs btn-primary');
    form.find('.add-group').addClass('btn btn-xs btn-success');
    form.find('.delete-group').addClass('btn btn-xs btn-danger');
  }

  that.styleSearchForm = function(form) {
    var dialog = form.closest('.ui-jqdialog');
    var buttons = dialog.find('.EditTable')
    buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
    buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
    buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
  }

  //it causes some flicker when reloading or navigating grid
  //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
  //or go back to default browser checkbox styles for the grid
  that.styleCheckbox = function(table) {
    /**
  $(table).find('input:checkbox').addClass('ace')
  .wrap('<label />')
  .after('<span class="lbl align-top" />')


  $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
  .find('input.cbox[type=checkbox]').addClass('ace')
  .wrap('<label />').after('<span class="lbl align-top" />');
  */
  }


  //unlike navButtons icons, action icons in rows seem to be hard-coded
  //you can change them like this in here if you want
  that.updateActionIcons = function(table, redirectUrl) {
    /**
  var replacement = 
  {
    'ui-icon-pencil' : 'icon-pencil blue',
    'ui-icon-trash' : 'icon-trash red',
    'ui-icon-disk' : 'icon-ok green',
    'ui-icon-cancel' : 'icon-remove red'
  };
  $(table).find('.ui-pg-div span.ui-icon').each(function(){
    var icon = $(this);
    var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
    if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
  })
  */
    var grid = $(table);
    var iCol = getColumnIndexByName(grid, 'myac');
    grid.find(">tbody>tr.jqgrow>td:nth-child(" + (iCol + 1) + ")")
      .not(':has(div>div.jDetailsButton)')
      .each(function () {
        $("<div>", {
          title: "Edit Details",
          mouseover: function () {
            $(this).addClass('ui-state-hover');
          },
          mouseout: function () {
            $(this).removeClass('ui-state-hover');
          },
          click: function (e) {
            var data = $("#grid-table").jqGrid("getGridParam", "data");
            var i = $(e.target).closest("tr.jqgrow").attr("id");
            window.location = redirectUrl + data[i - 1].identification;
          }
        }
      )
        .css({ "margin-right": "5px", float: "left", cursor: "pointer" })
        .addClass("ui-pg-div ui-inline-edit jDetailsButton")
        .append('<span class="ui-icon ui-icon-folder-open"></span>')
        .prependTo($(this).children("div"));
      });
  }

  //replace icons with FontAwesome icons like above
  that.updatePagerIcons = function(table) {
    var replacement =
    {
      'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
      'ui-icon-seek-prev': 'icon-angle-left bigger-140',
      'ui-icon-seek-next': 'icon-angle-right bigger-140',
      'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
      var icon = $(this);
      var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

      if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
    });
  }

  that.enableTooltips = function(table) {
    $('.navtable .ui-pg-button').tooltip({
      container: 'body'
    });
    $(table).find('.ui-pg-div').tooltip({
      container: 'body'
    });
  }

  that.editOptions = function(url, width, token) {
    var editOptions = {
      closeAfterEdit: true,
      beforeShowForm: that.beforeEditCallback,
      width: 500,
      recreateForm: true,
      url: url,
      mtype: 'PUT',
      serializeEditData: function(postData) {
        postData.identification = postData.id;
        return JSON.stringify(postData);
      },
      ajaxEditOptions: {
        contentType: 'application/json',
        beforeSend: function(jqXhr, settings) {
          jqXhr.setRequestHeader('authorization', token);
          settings.url = settings.url + "?" + settings.data;
        }
      },
      afterComplete: function(e,f,g,h) {
        $("#grid-table").trigger("reloadGrid");
      }
    }

    return editOptions;
  }
  that.deleteOptions = function (url, token) {
    var deleteOptions = {
      recreateForm: true,
      beforeShowForm: that.beforeDeleteCallback,
      onclickSubmit: function (options, postdata) {
        var id = $(this).jqGrid("getCell", postdata, "identification");
        return {
          identification: id
        }
      },
      url: url,
      mtype: 'DELETE',
      reloadAfterSubmit: true,
      ajaxDelOptions: {
        contentType: "application/json",
        beforeSend: function (jqXhr, settings) {
          jqXhr.setRequestHeader('authorization', token);
          settings.url = settings.url + "?" + settings.data;
        }
      },
      afterComplete: that.afterComplete
    }

    return deleteOptions;
  }

  that.addOptions = function(url, width, token, editUrl) {
    var addOptions = {
      //new record form
      width: width,
      closeAfterAdd: true,
      recreateForm: true,
      viewPagerButtons: false,
      url: url,
      mtype: 'POST',
      reloadAfterSubmit: true,
      beforeShowForm: that.beforeAddCallback,
      serializeEditData: function (postData) {
        return JSON.stringify(postData);
      },
      ajaxEditOptions: {
        contentType: 'application/json',
        beforeSend: function (jqXhr, settings) {
          jqXhr.setRequestHeader('authorization', token);
          settings.url = settings.url + "?" + settings.data;
        }
      },
      afterComplete: function (e, f, g, h) {
        var data = $("#grid-table").jqGrid("getGridParam", "data");
        $("#grid-table").jqGrid("addRowData", data.length + 1, e.responseJSON, "first");
        myJqGridModule.updateActionIcons(this, editUrl);
      }
    }

    return addOptions;
  }
  //#endregion

  //#region Methods

  function styleDeleteForm(form) {
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
    buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>');
  }

  var getColumnIndexByName = function (grid, columnName) {
    var cm = grid.jqGrid('getGridParam', 'colModel');
    var i = 0;
    var l = cm.length;

    for (; i < l; i += 1) {
      if (cm[i].name === columnName) {
        return i; // return the index
      }
    }
    return -1;
  };

  //#endregion

  return that;
}();