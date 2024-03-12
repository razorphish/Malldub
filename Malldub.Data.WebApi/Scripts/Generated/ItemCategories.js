$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var categoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/category",
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
    
    var itemCategoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemCategory",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/itemCategory",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/itemCategory",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/itemCategory/" + o.ItemId + o.CategoryId;
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
                    CategoryId: {
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
        dataSource: itemCategoryDataSource,
        detailInit: itemCategoryDetails,
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
                field: "CategoryId",
                title: "Category Id",
                filterable: false,
                editor: categoryDropDownEditor
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
    function itemCategoryDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/category",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/category",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/category/" + o.Identification;
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
                            Name: {
                                type: "string"
                            },
                            Description: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.CategoryId },
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
                    template: "<a href='/api/category/${ Identification }'>${ Identification }</a>",
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
    }

    function categoryDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: categoryDataSource
            });
    }
    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Name",
        autoBind: false,
        optionLabel: "All",
        dataSource: categoryDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "CategoryId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});