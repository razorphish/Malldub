$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var noteDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/note",
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
                        type: "date"
                    },
                    ApplicationId: {
                        type: "string"
                    },
                    Viewed: {
                        type: "boolean"
                    },
                    Email: {
                        type: "string"
                    },
                    Name: {
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
            },
            create: {
                url: crudServiceBaseUrl + "/noteType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: noteTypeDataSource,
        detailInit: noteTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: noteDropDownEditor
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
    function noteTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/note",
                        dataType: "json"
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
                filter: { field: "TypeId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/note/${ Identification }'>${ Identification }</a>",
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
                    title: "Type Id"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    field: "ApplicationId",
                    title: "Application Id"
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
    }

    function noteDropDownEditor(container, options) {
        $('<input data-text-field="Subject" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: noteDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Subject",
        autoBind: false,
        optionLabel: "All",
        dataSource: noteDataSource,
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