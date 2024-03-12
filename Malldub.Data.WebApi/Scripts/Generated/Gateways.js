$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var aspNetUserGatewayDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUserGateway",
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
                id: "Identification",
                fields: {
                    Identification: {
                        type: "number"
                    },
                    GatewayId: {
                        type: "string"
                    },
                    AspNetUserId: {
                        type: "string"
                    },
                    GatewayUserId: {
                        type: "string"
                    },
                    FirstName: {
                        type: "string"
                    },
                    LastName: {
                        type: "string"
                    },
                    Email: {
                        type: "string"
                    },
                    AccessToken: {
                        type: "string"
                    },
                    TokenType: {
                        type: "string"
                    },
                    TokenExpiration: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    DateUpdated: {
                        type: "date"
                    },
                    AccountId: {
                        type: "string"
                    },
                    AccountReferenceId: {
                        type: "string"
                    },
                    UserState: {
                        type: "string"
                    },
                    AccountState: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var gatewayDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/gateway",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/gateway",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/gateway",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/gateway/" + o.Identification;
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
        dataSource: gatewayDataSource,
        detailInit: gatewayDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: aspNetUserGatewayDropDownEditor
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
    function gatewayDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/aspNetUserGateway",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetUserGateway",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetUserGateway/" + o.Identification;
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
                                type: "number",
                                editable: false
                            },
                            GatewayId: {
                                type: "string"
                            },
                            AspNetUserId: {
                                type: "string"
                            },
                            GatewayUserId: {
                                type: "string"
                            },
                            FirstName: {
                                type: "string",
                                validation: { required: true }
                            },
                            LastName: {
                                type: "string",
                                validation: { required: true }
                            },
                            Email: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccessToken: {
                                type: "string",
                                validation: { required: true }
                            },
                            TokenType: {
                                type: "string",
                                validation: { required: true }
                            },
                            TokenExpiration: {
                                type: "string",
                                validation: { required: true }
                            },
                            DateEntered: {
                                type: "date"
                            },
                            DateUpdated: {
                                type: "date"
                            },
                            AccountId: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccountReferenceId: {
                                type: "string",
                                validation: { required: true }
                            },
                            UserState: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccountState: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "GatewayId", operator: "eq", value: e.data.Identification },
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
                    field: "Identification",
                    template: "<a href='/api/aspNetUserGateway/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "GatewayId",
                    title: "Gateway Id"
                },
                {
                    field: "AspNetUserId",
                    title: "Asp Net User Id"
                },
                {
                    field: "GatewayUserId",
                    title: "Gateway User Id"
                },
                {
                    field: "FirstName",
                    title: "First Name"
                },
                {
                    field: "LastName",
                    title: "Last Name"
                },
                {
                    field: "Email",
                    title: "Email"
                },
                {
                    field: "AccessToken",
                    title: "Access Token"
                },
                {
                    field: "TokenType",
                    title: "Token Type"
                },
                {
                    field: "TokenExpiration",
                    title: "Token Expiration"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    field: "DateUpdated",
                    title: "Date Updated"
                },
                {
                    field: "AccountId",
                    title: "Account Id"
                },
                {
                    field: "AccountReferenceId",
                    title: "Account Reference Id"
                },
                {
                    field: "UserState",
                    title: "User State"
                },
                {
                    field: "AccountState",
                    title: "Account State"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function aspNetUserGatewayDropDownEditor(container, options) {
        $('<input data-text-field="GatewayUserId" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserGatewayDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "GatewayUserId",
        autoBind: false,
        optionLabel: "All",
        dataSource: aspNetUserGatewayDataSource,
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