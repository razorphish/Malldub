$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var auctionDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auction",
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
                    StartingPrice: {
                        type: "number"
                    },
                    Duration: {
                        type: "number"
                    },
                    BuyItNowPrice: {
                        type: "number"
                    },
                    ReserveAmount: {
                        type: "number"
                    },
                    CurrentHighBid: {
                        type: "number"
                    },
                    BeginTime: {
                        type: "date"
                    },
                    EndTime: {
                        type: "date"
                    },
                    HasEnded: {
                        type: "boolean"
                    },
                    Increment: {
                        type: "number"
                    },
                    StatusId: {
                        type: "number"
                    },
                    WinningBidderUserId: {
                        type: "number"
                    },
                    TypeId: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var auctionInvoiceBillToTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoiceBillToType",
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
    
    var auctionInvoiceTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoiceType",
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
    
    var auctionInvoiceDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoice",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/auctionInvoice",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: auctionInvoiceDataSource,
        detailInit: auctionInvoiceDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "AuctionId",
                title: "Auction Id",
                filterable: false,
                editor: auctionDropDownEditor
            },
            {
                field: "InvoiceId",
                title: "Invoice Id",
                filterable: false,
                editor: invoiceDropDownEditor
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
                title: "Type Id",
                editor: auctionInvoiceTypeDropDownEditor
            },
            {
                field: "SystemInvoice",
                title: "System Invoice"
            },
            {
                field: "BillToTypeId",
                title: "Bill To Type Id",
                editor: auctionInvoiceBillToTypeDropDownEditor
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function auctionInvoiceDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/auction",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auction",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auction/" + o.Identification;
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
                            StartingPrice: {
                                type: "number"
                            },
                            Duration: {
                                type: "number"
                            },
                            BuyItNowPrice: {
                                type: "number",
                                validation: { required: true }
                            },
                            ReserveAmount: {
                                type: "number",
                                validation: { required: true }
                            },
                            CurrentHighBid: {
                                type: "number",
                                validation: { required: true }
                            },
                            BeginTime: {
                                type: "date",
                                validation: { required: true }
                            },
                            EndTime: {
                                type: "date",
                                validation: { required: true }
                            },
                            HasEnded: {
                                type: "boolean"
                            },
                            Increment: {
                                type: "number"
                            },
                            StatusId: {
                                type: "number"
                            },
                            WinningBidderUserId: {
                                type: "number",
                                validation: { required: true }
                            },
                            TypeId: {
                                type: "number",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.AuctionId },
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
                    template: "<a href='/api/auction/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "StartingPrice",
                    title: "Starting Price"
                },
                {
                    field: "Duration",
                    title: "Duration"
                },
                {
                    field: "BuyItNowPrice",
                    title: "Buy It Now Price"
                },
                {
                    field: "ReserveAmount",
                    title: "Reserve Amount"
                },
                {
                    field: "CurrentHighBid",
                    title: "Current High Bid"
                },
                {
                    field: "BeginTime",
                    title: "Begin Time"
                },
                {
                    field: "EndTime",
                    title: "End Time"
                },
                {
                    field: "HasEnded",
                    title: "Has Ended"
                },
                {
                    field: "Increment",
                    title: "Increment"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "WinningBidderUserId",
                    title: "Winning Bidder User Id"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
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
                        url: crudServiceBaseUrl + "/auctionInvoiceBillToType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionInvoiceBillToType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionInvoiceBillToType/" + o.Identification;
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
                filter: { field: "Identification", operator: "eq", value: e.data.BillToTypeId },
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
                    template: "<a href='/api/auctionInvoiceBillToType/${ Identification }'>${ Identification }</a>",
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
                        url: crudServiceBaseUrl + "/auctionInvoiceType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionInvoiceType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionInvoiceType/" + o.Identification;
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
                    template: "<a href='/api/auctionInvoiceType/${ Identification }'>${ Identification }</a>",
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
                filter: { field: "Identification", operator: "eq", value: e.data.InvoiceId },
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

    function auctionDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionDataSource
            });
    }
    function auctionInvoiceBillToTypeDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionInvoiceBillToTypeDataSource
            });
    }
    function auctionInvoiceTypeDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionInvoiceTypeDataSource
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
        dataSource: auctionDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "AuctionId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});