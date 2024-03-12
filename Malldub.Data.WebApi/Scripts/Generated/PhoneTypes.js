$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var phoneDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/phone",
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
                    TypeId: {
                        type: "string"
                    },
                    Number: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    }
                }
            }
        }
    });
    
    var phoneTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/phoneType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/phoneType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/phoneType",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/phoneType/" + o.Identification;
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
        dataSource: phoneTypeDataSource,
        detailInit: phoneTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: phoneDropDownEditor
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
    function phoneTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/phone",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/phone",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/phone/" + o.Identification;
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
                            TypeId: {
                                type: "string"
                            },
                            Number: {
                                type: "string"
                            },
                            DateEntered: {
                                type: "date",
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
                    template: "<a href='/api/phone/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    field: "Number",
                    title: "Number"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function phoneDropDownEditor(container, options) {
        $('<input data-text-field="Number" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: phoneDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Number",
        autoBind: false,
        optionLabel: "All",
        dataSource: phoneDataSource,
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