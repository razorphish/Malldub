$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var @defaultDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/@default",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/@default",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/@default",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/@default/" + o.SId;
                },
                dataType: "json",
                type: "DELETE"
            },
            parameterMap: function(data) {
                return JSON.stringify(data);
            }
        },
        schema: {
            data: function (result) {
                return result.Data || result;
            },
            total: function (result) {
                return result.TotalCount || 1;
            },
            model: {
                id: "SId",
                fields: {
                    SId: {
                        type: "string",
                        validation: { required: true },
                        editable: false
                    },
                    IsPrimary: {
                        type: "boolean"
                    },
                    DateEntered: {
                        type: "date",
                        validation: { required: true }
                    }
                }
            }
        },
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: @defaultDataSource,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "SId",
                title: "S Id",
                filterable: false
            },
            {
                field: "IsPrimary",
                title: "Is Primary"
            },
            {
                field: "DateEntered",
                title: "Date Entered"
            },
            {
                command: ["edit", "destroy"]
            }],
        editable: "inline"
    });
});