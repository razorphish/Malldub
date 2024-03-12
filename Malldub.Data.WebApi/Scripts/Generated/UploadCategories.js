$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var uploadDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/upload",
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
                    Description: {
                        type: "string"
                    },
                    IsPrivate: {
                        type: "boolean"
                    },
                    CategoryId: {
                        type: "string"
                    },
                    Name: {
                        type: "string"
                    },
                    OriginalFileName: {
                        type: "string"
                    },
                    Location: {
                        type: "string"
                    },
                    RelativeLocation: {
                        type: "string"
                    },
                    Extension: {
                        type: "string"
                    },
                    ContentLength: {
                        type: "number"
                    },
                    ContentType: {
                        type: "string"
                    },
                    LocationHttp: {
                        type: "string"
                    },
                    ContainerName: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    DateUpdated: {
                        type: "date"
                    }
                }
            }
        }
    });
    
    var uploadCategoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/uploadCategory",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/uploadCategory",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/uploadCategory",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/uploadCategory/" + o.Identification;
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
                    Details: {
                        type: "string"
                    },
                    Description: {
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
        dataSource: uploadCategoryDataSource,
        detailInit: uploadCategoryDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: uploadDropDownEditor
            },
            {
                field: "Details",
                title: "Details"
            },
            {
                field: "Description",
                title: "Description"
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
    function uploadCategoryDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/upload",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/upload",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/upload/" + o.Identification;
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
                            Description: {
                                type: "string"
                            },
                            IsPrivate: {
                                type: "boolean"
                            },
                            CategoryId: {
                                type: "string"
                            },
                            Name: {
                                type: "string"
                            },
                            OriginalFileName: {
                                type: "string"
                            },
                            Location: {
                                type: "string"
                            },
                            RelativeLocation: {
                                type: "string",
                                validation: { required: true }
                            },
                            Extension: {
                                type: "string",
                                validation: { required: true }
                            },
                            ContentLength: {
                                type: "number",
                                validation: { required: true }
                            },
                            ContentType: {
                                type: "string",
                                validation: { required: true }
                            },
                            LocationHttp: {
                                type: "string",
                                validation: { required: true }
                            },
                            ContainerName: {
                                type: "string",
                                validation: { required: true }
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            },
                            DateUpdated: {
                                type: "date",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "CategoryId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/upload/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    field: "IsPrivate",
                    title: "Is Private"
                },
                {
                    field: "CategoryId",
                    title: "Category Id"
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    field: "OriginalFileName",
                    title: "Original File Name"
                },
                {
                    field: "Location",
                    title: "Location"
                },
                {
                    field: "RelativeLocation",
                    title: "Relative Location"
                },
                {
                    field: "Extension",
                    title: "Extension"
                },
                {
                    field: "ContentLength",
                    title: "Content Length"
                },
                {
                    field: "ContentType",
                    title: "Content Type"
                },
                {
                    field: "LocationHttp",
                    title: "Location Http"
                },
                {
                    field: "ContainerName",
                    title: "Container Name"
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
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function uploadDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: uploadDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Description",
        autoBind: false,
        optionLabel: "All",
        dataSource: uploadDataSource,
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