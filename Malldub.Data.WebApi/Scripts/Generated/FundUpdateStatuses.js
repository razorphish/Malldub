$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var fundUpdateDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUpdate",
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
                    FundId: {
                        type: "number"
                    },
                    UserId: {
                        type: "string"
                    },
                    Title: {
                        type: "string"
                    },
                    Content: {
                        type: "string"
                    },
                    StatusId: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    PostedToFacebook: {
                        type: "boolean"
                    },
                    PostedToEmail: {
                        type: "boolean"
                    },
                    PostedToTwitter: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var fundUpdateStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUpdateStatus",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fundUpdateStatus",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/fundUpdateStatus",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/fundUpdateStatus/" + o.Identification;
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
        dataSource: fundUpdateStatusDataSource,
        detailInit: fundUpdateStatusDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: fundUpdateDropDownEditor
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
    function fundUpdateStatusDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/fundUpdate",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundUpdate",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundUpdate/" + o.Identification;
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
                            FundId: {
                                type: "number"
                            },
                            UserId: {
                                type: "string"
                            },
                            Title: {
                                type: "string"
                            },
                            Content: {
                                type: "string"
                            },
                            StatusId: {
                                type: "string"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            },
                            PostedToFacebook: {
                                type: "boolean"
                            },
                            PostedToEmail: {
                                type: "boolean"
                            },
                            PostedToTwitter: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "StatusId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/fundUpdate/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "FundId",
                    title: "Fund Id"
                },
                {
                    field: "UserId",
                    title: "User Id"
                },
                {
                    field: "Title",
                    title: "Title"
                },
                {
                    field: "Content",
                    title: "Content"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    field: "PostedToFacebook",
                    title: "Posted To Facebook"
                },
                {
                    field: "PostedToEmail",
                    title: "Posted To Email"
                },
                {
                    field: "PostedToTwitter",
                    title: "Posted To Twitter"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function fundUpdateDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundUpdateDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Title",
        autoBind: false,
        optionLabel: "All",
        dataSource: fundUpdateDataSource,
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