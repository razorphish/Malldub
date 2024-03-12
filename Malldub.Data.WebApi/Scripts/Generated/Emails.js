$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var userEmailDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userEmail",
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
                id: "UserId",
                fields: {
                    UserId: {
                        type: "string"
                    },
                    EmailId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var emailDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/email",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/email",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/email",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/email/" + o.Identification;
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
                    DateEntered: {
                        type: "date",
                        validation: { required: true }
                    },
                    Address: {
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
        dataSource: emailDataSource,
        detailInit: emailDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: userEmailDropDownEditor
            },
            {
                field: "DateEntered",
                title: "Date Entered"
            },
            {
                field: "Address",
                title: "Address"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function emailDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/userEmail",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userEmail",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userEmail/" + o.UserId + o.EmailId;
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
                        id: "UserId",
                        fields: {
                            UserId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            EmailId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            IsDefault: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "EmailId", operator: "eq", value: e.data.Identification },
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
                    field: "UserId",
                    template: "<a href='/api/userEmail/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "EmailId",
                    template: "<a href='/api/userEmail/${ EmailId }'>${ EmailId }</a>",
                    filterable: false
                },
                {
                    field: "IsDefault",
                    title: "Is Default"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function userEmailDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userEmailDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "UserId",
        dataTextField: "UserId",
        autoBind: false,
        optionLabel: "All",
        dataSource: userEmailDataSource,
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