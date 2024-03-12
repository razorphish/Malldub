$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var auctionStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionStatus",
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
                    Detail: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var auctionTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionType",
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
                    Details: {
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
    
    var bidDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/bid",
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
                    AuctionId: {
                        type: "number"
                    },
                    UserId: {
                        type: "string"
                    },
                    OrderNumber: {
                        type: "number"
                    },
                    MaxBid: {
                        type: "number"
                    },
                    IsHighBid: {
                        type: "boolean"
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
    
    var auctionDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auction",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/auction",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: auctionDataSource,
        detailInit: auctionDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: itemDropDownEditor
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
                title: "Status Id",
                editor: auctionStatusDropDownEditor
            },
            {
                field: "WinningBidderUserId",
                title: "Winning Bidder User Id"
            },
            {
                field: "TypeId",
                title: "Type Id",
                editor: auctionTypeDropDownEditor
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function auctionDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/auctionStatus",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionStatus",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionStatus/" + o.Identification;
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
                            Description: {
                                type: "string"
                            },
                            Detail: {
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
                    template: "<a href='/api/auctionStatus/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    field: "Detail",
                    title: "Detail"
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
                        url: crudServiceBaseUrl + "/auctionType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionType/" + o.Identification;
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
                            Description: {
                                type: "string"
                            },
                            Details: {
                                type: "string"
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
                    template: "<a href='/api/auctionType/${ Identification }'>${ Identification }</a>",
                    filterable: false
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
                filter: { field: "Identification", operator: "eq", value: e.data.Identification },
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
                filter: { field: "AuctionId", operator: "eq", value: e.data.Identification },
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
                        url: crudServiceBaseUrl + "/bid",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/bid",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/bid/" + o.Identification;
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
                            AuctionId: {
                                type: "number"
                            },
                            UserId: {
                                type: "string"
                            },
                            OrderNumber: {
                                type: "number"
                            },
                            MaxBid: {
                                type: "number"
                            },
                            IsHighBid: {
                                type: "boolean"
                            },
                            DateEntered: {
                                type: "date"
                            },
                            DateUpdated: {
                                type: "date"
                            }
                        }
                    }
                },
                filter: { field: "AuctionId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/bid/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "AuctionId",
                    title: "Auction Id"
                },
                {
                    field: "UserId",
                    title: "User Id"
                },
                {
                    field: "OrderNumber",
                    title: "Order Number"
                },
                {
                    field: "MaxBid",
                    title: "Max Bid"
                },
                {
                    field: "IsHighBid",
                    title: "Is High Bid"
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

    function auctionStatusDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionStatusDataSource
            });
    }
    function auctionTypeDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionTypeDataSource
            });
    }
    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
            });
    }
    function auctionInvoiceDropDownEditor(container, options) {
        $('<input data-text-field="AuctionId" data-value-field="AuctionId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionInvoiceDataSource
            });
    }
    function bidDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: bidDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Description",
        autoBind: false,
        optionLabel: "All",
        dataSource: auctionStatusDataSource,
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