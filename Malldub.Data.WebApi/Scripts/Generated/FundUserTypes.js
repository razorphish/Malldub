$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var fundUserDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUser",
                dataType: "json"
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
                id: "FundId",
                fields: {
                    FundId: {
                        type: "number"
                    },
                    UserId: {
                        type: "string"
                    },
                    UserTypeId: {
                        type: "string"
                    },
                    AllowEmail: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var fundUserTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUserType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fundUserType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/fundUserType",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/fundUserType/" + o.Identification;
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
                id: "Identification",
                fields: {
                    Identification: {
                        type: "string",
                        validation: { required: true },
                        editable: false
                    },
                    FriendlyName: {
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
        dataSource: fundUserTypeDataSource,
        detailInit: fundUserTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: fundUserDropDownEditor
            },
            {
                field: "FriendlyName",
                title: "Friendly Name"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function fundUserTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/fundUser",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundUser",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundUser/" + o.FundId + o.UserId;
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
                        id: "FundId",
                        fields: {
                            FundId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            UserId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            UserTypeId: {
                                type: "string"
                            },
                            AllowEmail: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "UserTypeId", operator: "eq", value: e.data.Identification },
                serverFiltering: true,
                serverSorting: true,
                allowUnsort: true,
                serverPaging: true,
                pageSize: 5
            },
            pageable: true,
            filterable: true,
            sortable: true,
            navigatable: true,
            columns: [
                {
                    field: "FundId",
                    template: "<a href='/api/fundUser/${ FundId }'>${ FundId }</a>",
                    filterable: false
                },
                {
                    field: "UserId",
                    template: "<a href='/api/fundUser/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "UserTypeId",
                    title: "User Type Id"
                },
                {
                    field: "AllowEmail",
                    title: "Allow Email"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function fundUserDropDownEditor(container, options) {
        $('<input data-text-field="FundId" data-value-field="FundId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundUserDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "FundId",
        dataTextField: "FundId",
        autoBind: false,
        optionLabel: "All",
        dataSource: fundUserDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "Identification", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});