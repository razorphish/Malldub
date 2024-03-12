$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var itemDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/item",
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
                    UserId: {
                        type: "string"
                    },
                    TypeId: {
                        type: "string"
                    },
                    TransactionTypeId: {
                        type: "string"
                    },
                    Title: {
                        type: "string"
                    },
                    ShortSummary: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    },
                    StartDate: {
                        type: "date"
                    },
                    EndDate: {
                        type: "date"
                    },
                    Permalink: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    DateUpdated: {
                        type: "date"
                    },
                    Featured: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
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
    
    var itemUploadDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemUpload",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/itemUpload",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/itemUpload",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/itemUpload/" + o.ItemId + o.UploadId;
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
                id: "ItemId",
                fields: {
                    ItemId: {
                        type: "number",
                        validation: { required: true },
                        editable: false
                    },
                    UploadId: {
                        type: "number",
                        validation: { required: true },
                        editable: false
                    },
                    IsDefault: {
                        type: "boolean",
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
        dataSource: itemUploadDataSource,
        detailInit: itemUploadDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "ItemId",
                title: "Item Id",
                filterable: false,
                editor: itemDropDownEditor
            },
            {
                field: "UploadId",
                title: "Upload Id",
                filterable: false,
                editor: uploadDropDownEditor
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
    function itemUploadDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/item",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/item",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/item/" + o.Identification;
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
                            UserId: {
                                type: "string"
                            },
                            TypeId: {
                                type: "string"
                            },
                            TransactionTypeId: {
                                type: "string",
                                validation: { required: true }
                            },
                            Title: {
                                type: "string"
                            },
                            ShortSummary: {
                                type: "string",
                                validation: { required: true }
                            },
                            Description: {
                                type: "string"
                            },
                            StartDate: {
                                type: "date",
                                validation: { required: true }
                            },
                            EndDate: {
                                type: "date",
                                validation: { required: true }
                            },
                            Permalink: {
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
                            },
                            Featured: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.ItemId },
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
                    template: "<a href='/api/item/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "UserId",
                    title: "User Id"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    field: "TransactionTypeId",
                    title: "Transaction Type Id"
                },
                {
                    field: "Title",
                    title: "Title"
                },
                {
                    field: "ShortSummary",
                    title: "Short Summary"
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    field: "StartDate",
                    title: "Start Date"
                },
                {
                    field: "EndDate",
                    title: "End Date"
                },
                {
                    field: "Permalink",
                    title: "Permalink"
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
                    field: "Featured",
                    title: "Featured"
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
                filter: { field: "Identification", operator: "eq", value: e.data.UploadId },
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

    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
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
        dataTextField: "Title",
        autoBind: false,
        optionLabel: "All",
        dataSource: itemDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "ItemId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});