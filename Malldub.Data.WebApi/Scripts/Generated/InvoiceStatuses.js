$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var invoiceDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/invoice",
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
                    Tax: {
                        type: "number"
                    },
                    TaxRate: {
                        type: "number"
                    },
                    SubTotal: {
                        type: "number"
                    },
                    TotalAmount: {
                        type: "number"
                    },
                    StatusId: {
                        type: "number"
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
    
    var invoiceStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/invoiceStatus",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/invoiceStatus",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/invoiceStatus",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/invoiceStatus/" + o.Identification;
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
                        validation: { required: true },
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
        dataSource: invoiceStatusDataSource,
        detailInit: invoiceStatusDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: invoiceDropDownEditor
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
    function invoiceStatusDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/invoice",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/invoice",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/invoice/" + o.Identification;
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
                            Tax: {
                                type: "number"
                            },
                            TaxRate: {
                                type: "number",
                                validation: { required: true }
                            },
                            SubTotal: {
                                type: "number"
                            },
                            TotalAmount: {
                                type: "number"
                            },
                            StatusId: {
                                type: "number"
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
                    template: "<a href='/api/invoice/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Tax",
                    title: "Tax"
                },
                {
                    field: "TaxRate",
                    title: "Tax Rate"
                },
                {
                    field: "SubTotal",
                    title: "Sub Total"
                },
                {
                    field: "TotalAmount",
                    title: "Total Amount"
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

    function invoiceDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: invoiceDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Identification",
        autoBind: false,
        optionLabel: "All",
        dataSource: invoiceDataSource,
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