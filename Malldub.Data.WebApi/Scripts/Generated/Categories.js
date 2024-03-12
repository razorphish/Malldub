$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var itemCategoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemCategory",
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
                    CategoryId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var categoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/category",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/category",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: categoryDataSource,
        detailInit: categoryDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: itemCategoryDropDownEditor
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
    function categoryDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/itemCategory",
                        dataType: "json"
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
                    field: "ItemId",
                    template: "<a href='/api/itemCategory/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
                },
                {
                    field: "CategoryId",
                    template: "<a href='/api/itemCategory/${ CategoryId }'>${ CategoryId }</a>",
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

    function itemCategoryDropDownEditor(container, options) {
        $('<input data-text-field="ItemId" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemCategoryDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "ItemId",
        dataTextField: "ItemId",
        autoBind: false,
        optionLabel: "All",
        dataSource: itemCategoryDataSource,
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