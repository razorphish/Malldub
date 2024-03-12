$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var metaDataTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/metaDataType",
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
                    Details: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    },
                    SortOrderNumber: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var metumDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/metum",
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
                    MetaKeyId: {
                        type: "string"
                    },
                    MetaOption: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var itemMetumDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemMetum",
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
                id: "ItemId",
                fields: {
                    ItemId: {
                        type: "number"
                    },
                    MetaKeyId: {
                        type: "string"
                    },
                    StringValue: {
                        type: "string"
                    },
                    NumericValue: {
                        type: "number"
                    },
                    DateValue: {
                        type: "date"
                    },
                    XmlDom: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var metaKeyDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/metaKey",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/metaKey",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/metaKey",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/metaKey/" + o.Identification;
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
                    MetaDataTypeId: {
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
        dataSource: metaKeyDataSource,
        detailInit: metaKeyDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: metumDropDownEditor
            },
            {
                field: "MetaDataTypeId",
                title: "Meta Data Type Id",
                editor: metaDataTypeDropDownEditor
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function metaKeyDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/metaDataType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/metaDataType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/metaDataType/" + o.Identification;
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
                filter: { field: "Identification", operator: "eq", value: e.data.MetaDataTypeId },
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
                    template: "<a href='/api/metaDataType/${ Identification }'>${ Identification }</a>",
                    filterable: false
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/metum",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/metum",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/metum/" + o.Identification;
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
                            MetaKeyId: {
                                type: "string"
                            },
                            MetaOption: {
                                type: "string"
                            }
                        }
                    }
                },
                filter: { field: "MetaKeyId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/metum/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "MetaKeyId",
                    title: "Meta Key Id"
                },
                {
                    field: "MetaOption",
                    title: "Meta Option"
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
                        url: crudServiceBaseUrl + "/itemMetum",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemMetum",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemMetum/" + o.ItemId + o.MetaKeyId;
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
                            MetaKeyId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            StringValue: {
                                type: "string",
                                validation: { required: true }
                            },
                            NumericValue: {
                                type: "number",
                                validation: { required: true }
                            },
                            DateValue: {
                                type: "date",
                                validation: { required: true }
                            },
                            XmlDom: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "MetaKeyId", operator: "eq", value: e.data.Identification },
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
                    field: "ItemId",
                    template: "<a href='/api/itemMetum/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
                },
                {
                    field: "MetaKeyId",
                    template: "<a href='/api/itemMetum/${ MetaKeyId }'>${ MetaKeyId }</a>",
                    filterable: false
                },
                {
                    field: "StringValue",
                    title: "String Value"
                },
                {
                    field: "NumericValue",
                    title: "Numeric Value"
                },
                {
                    field: "DateValue",
                    title: "Date Value"
                },
                {
                    field: "XmlDom",
                    title: "Xml Dom"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function metaDataTypeDropDownEditor(container, options) {
        $('<input data-text-field="Details" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: metaDataTypeDataSource
            });
    }
    function metumDropDownEditor(container, options) {
        $('<input data-text-field="MetaOption" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: metumDataSource
            });
    }
    function itemMetumDropDownEditor(container, options) {
        $('<input data-text-field="StringValue" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemMetumDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Details",
        autoBind: false,
        optionLabel: "All",
        dataSource: metaDataTypeDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "MetaDataTypeId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});