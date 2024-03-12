$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var invoiceStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/invoiceStatus",
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
    
    var auctionInvoiceDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoice",
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
                id: "AuctionId",
                fields: {
                    AuctionId: {
                        type: "number"
                    },
                    InvoiceId: {
                        type: "number"
                    },
                    ClientIdPayable: {
                        type: "number"
                    },
                    ClientIdReceivable: {
                        type: "number"
                    },
                    TypeId: {
                        type: "number"
                    },
                    SystemInvoice: {
                        type: "boolean"
                    },
                    BillToTypeId: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var invoiceItemDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/invoiceItem",
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
                    InvoiceId: {
                        type: "number"
                    },
                    PaymentItemId: {
                        type: "number"
                    },
                    Quantity: {
                        type: "number"
                    },
                    Amount: {
                        type: "number"
                    },
                    DiscountValue: {
                        type: "number"
                    },
                    DiscountPercentage: {
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
    
    var invoiceDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/invoice",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/invoice",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: invoiceDataSource,
        detailInit: invoiceDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: auctionInvoiceDropDownEditor
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
                title: "Status Id",
                editor: invoiceStatusDropDownEditor
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
    function invoiceDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/invoiceStatus",
                        dataType: "json"
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
                filter: { field: "Identification", operator: "eq", value: e.data.StatusId },
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
                    template: "<a href='/api/invoiceStatus/${ Identification }'>${ Identification }</a>",
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
                        url: crudServiceBaseUrl + "/auctionInvoice",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionInvoice",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionInvoice/" + o.AuctionId + o.InvoiceId;
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
                        id: "AuctionId",
                        fields: {
                            AuctionId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            InvoiceId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            ClientIdPayable: {
                                type: "number",
                                validation: { required: true }
                            },
                            ClientIdReceivable: {
                                type: "number"
                            },
                            TypeId: {
                                type: "number"
                            },
                            SystemInvoice: {
                                type: "boolean"
                            },
                            BillToTypeId: {
                                type: "number",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "InvoiceId", operator: "eq", value: e.data.Identification },
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
                    field: "AuctionId",
                    template: "<a href='/api/auctionInvoice/${ AuctionId }'>${ AuctionId }</a>",
                    filterable: false
                },
                {
                    field: "InvoiceId",
                    template: "<a href='/api/auctionInvoice/${ InvoiceId }'>${ InvoiceId }</a>",
                    filterable: false
                },
                {
                    field: "ClientIdPayable",
                    title: "Client Id Payable"
                },
                {
                    field: "ClientIdReceivable",
                    title: "Client Id Receivable"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    field: "SystemInvoice",
                    title: "System Invoice"
                },
                {
                    field: "BillToTypeId",
                    title: "Bill To Type Id"
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
                        url: crudServiceBaseUrl + "/invoiceItem",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/invoiceItem",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/invoiceItem/" + o.Identification;
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
                            InvoiceId: {
                                type: "number"
                            },
                            PaymentItemId: {
                                type: "number"
                            },
                            Quantity: {
                                type: "number"
                            },
                            Amount: {
                                type: "number"
                            },
                            DiscountValue: {
                                type: "number",
                                validation: { required: true }
                            },
                            DiscountPercentage: {
                                type: "number",
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
                filter: { field: "InvoiceId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/invoiceItem/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "InvoiceId",
                    title: "Invoice Id"
                },
                {
                    field: "PaymentItemId",
                    title: "Payment Item Id"
                },
                {
                    field: "Quantity",
                    title: "Quantity"
                },
                {
                    field: "Amount",
                    title: "Amount"
                },
                {
                    field: "DiscountValue",
                    title: "Discount Value"
                },
                {
                    field: "DiscountPercentage",
                    title: "Discount Percentage"
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

    function invoiceStatusDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: invoiceStatusDataSource
            });
    }
    function auctionInvoiceDropDownEditor(container, options) {
        $('<input data-text-field="AuctionId" data-value-field="AuctionId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionInvoiceDataSource
            });
    }
    function invoiceItemDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: invoiceItemDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Name",
        autoBind: false,
        optionLabel: "All",
        dataSource: invoiceStatusDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "StatusId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});