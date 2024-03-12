$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var malldubApplicationDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/malldubApplication",
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
                        type: "string"
                    },
                    Name: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var noteTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/noteType",
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
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    },
                    Details: {
                        type: "string"
                    },
                    SortOrderNumber: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var noteDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/note",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/note",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/note",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/note/" + o.Identification;
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
                    Subject: {
                        type: "string"
                    },
                    Comments: {
                        type: "string"
                    },
                    Sent: {
                        type: "boolean"
                    },
                    IsPrivate: {
                        type: "boolean"
                    },
                    TypeId: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date",
                        validation: { required: true }
                    },
                    ApplicationId: {
                        type: "string"
                    },
                    Viewed: {
                        type: "boolean"
                    },
                    Email: {
                        type: "string",
                        validation: { required: true }
                    },
                    Name: {
                        type: "string",
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
        dataSource: noteDataSource,
        detailInit: noteDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false
            },
            {
                field: "Subject",
                title: "Subject"
            },
            {
                field: "Comments",
                title: "Comments"
            },
            {
                field: "Sent",
                title: "Sent"
            },
            {
                field: "IsPrivate",
                title: "Is Private"
            },
            {
                field: "TypeId",
                title: "Type Id",
                editor: noteTypeDropDownEditor
            },
            {
                field: "DateEntered",
                title: "Date Entered"
            },
            {
                field: "ApplicationId",
                title: "Application Id",
                editor: malldubApplicationDropDownEditor
            },
            {
                field: "Viewed",
                title: "Viewed"
            },
            {
                field: "Email",
                title: "Email"
            },
            {
                field: "Name",
                title: "Name"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function noteDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/malldubApplication",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/malldubApplication",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/malldubApplication/" + o.Identification;
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
                            Name: {
                                type: "string"
                            },
                            Description: {
                                type: "string"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.ApplicationId },
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
                    template: "<a href='/api/malldubApplication/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/noteType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/noteType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/noteType/" + o.Identification;
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
                            Description: {
                                type: "string"
                            },
                            Details: {
                                type: "string",
                                validation: { required: true }
                            },
                            SortOrderNumber: {
                                type: "number"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.TypeId },
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
                    template: "<a href='/api/noteType/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    field: "Details",
                    title: "Details"
                },
                {
                    field: "SortOrderNumber",
                    title: "Sort Order Number"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function malldubApplicationDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: malldubApplicationDataSource
            });
    }
    function noteTypeDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: noteTypeDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Name",
        autoBind: false,
        optionLabel: "All",
        dataSource: malldubApplicationDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "ApplicationId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});