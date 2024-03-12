$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var migrationHistoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/migrationHistory",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/migrationHistory",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/migrationHistory",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/migrationHistory/" + o.MigrationId + o.ContextKey;
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
                id: "MigrationId",
                fields: {
                    MigrationId: {
                        type: "string",
                        validation: { required: true },
                        editable: false
                    },
                    ContextKey: {
                        type: "string",
                        validation: { required: true },
                        editable: false
                    },
                    Model: {
                        type: "number"
                    },
                    ProductVersion: {
                        type: "string"
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
        dataSource: migrationHistoryDataSource,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "MigrationId",
                title: "Migration Id",
                filterable: false
            },
            {
                field: "ContextKey",
                title: "Context Key",
                filterable: false
            },
            {
                field: "ProductVersion",
                title: "Product Version"
            },
            {
                command: ["edit", "destroy"]
            }],
        editable: "inline"
    });
});