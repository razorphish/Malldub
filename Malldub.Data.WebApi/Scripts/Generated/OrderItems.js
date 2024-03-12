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
    
    var orderDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/order",
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
                    Guid: {
                        type: "string"
                    },
                    CustomerId: {
                        type: "string"
                    },
                    BillingAddressId: {
                        type: "number"
                    },
                    ShippingAddressId: {
                        type: "number"
                    },
                    StatusId: {
                        type: "string"
                    },
                    PaymentStatusId: {
                        type: "string"
                    },
                    PaymentMethodSystemName: {
                        type: "string"
                    },
                    CardType: {
                        type: "string"
                    },
                    CardName: {
                        type: "string"
                    },
                    CardNumber: {
                        type: "string"
                    },
                    MaskedCreditCardNumber: {
                        type: "string"
                    },
                    CardCvv2: {
                        type: "string"
                    },
                    CardExpirationMonth: {
                        type: "string"
                    },
                    CardExpirationYear: {
                        type: "string"
                    },
                    AuthorizationTransactionId: {
                        type: "string"
                    },
                    AuthorizationTransactionCode: {
                        type: "string"
                    },
                    AuthorizationTransactionResult: {
                        type: "string"
                    },
                    CaptureTransactionId: {
                        type: "string"
                    },
                    CaptureTransactionResult: {
                        type: "string"
                    },
                    SubscriptionTransactionId: {
                        type: "string"
                    },
                    PurchaseOrderNumber: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    }
                }
            }
        }
    });
    
    var orderItemDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/orderItem",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/orderItem",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/orderItem",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/orderItem/" + o.OrderId + o.ItemId;
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
                id: "OrderId",
                fields: {
                    OrderId: {
                        type: "number",
                        validation: { required: true },
                        editable: false
                    },
                    ItemId: {
                        type: "number",
                        validation: { required: true },
                        editable: false
                    },
                    Price: {
                        type: "number"
                    },
                    ItemOrderGuid: {
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
        dataSource: orderItemDataSource,
        detailInit: orderItemDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "OrderId",
                title: "Order Id",
                filterable: false,
                editor: orderDropDownEditor
            },
            {
                field: "ItemId",
                title: "Item Id",
                filterable: false,
                editor: itemDropDownEditor
            },
            {
                field: "Price",
                title: "Price"
            },
            {
                field: "ItemOrderGuid",
                title: "Item Order Guid"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function orderItemDetails(e) {
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
                        url: crudServiceBaseUrl + "/order",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/order",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/order/" + o.Identification;
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
                            Guid: {
                                type: "string"
                            },
                            CustomerId: {
                                type: "string"
                            },
                            BillingAddressId: {
                                type: "number"
                            },
                            ShippingAddressId: {
                                type: "number",
                                validation: { required: true }
                            },
                            StatusId: {
                                type: "string"
                            },
                            PaymentStatusId: {
                                type: "string"
                            },
                            PaymentMethodSystemName: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardType: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardName: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardNumber: {
                                type: "string",
                                validation: { required: true }
                            },
                            MaskedCreditCardNumber: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardCvv2: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardExpirationMonth: {
                                type: "string",
                                validation: { required: true }
                            },
                            CardExpirationYear: {
                                type: "string",
                                validation: { required: true }
                            },
                            AuthorizationTransactionId: {
                                type: "string",
                                validation: { required: true }
                            },
                            AuthorizationTransactionCode: {
                                type: "string",
                                validation: { required: true }
                            },
                            AuthorizationTransactionResult: {
                                type: "string",
                                validation: { required: true }
                            },
                            CaptureTransactionId: {
                                type: "string",
                                validation: { required: true }
                            },
                            CaptureTransactionResult: {
                                type: "string",
                                validation: { required: true }
                            },
                            SubscriptionTransactionId: {
                                type: "string",
                                validation: { required: true }
                            },
                            PurchaseOrderNumber: {
                                type: "string",
                                validation: { required: true }
                            },
                            DateEntered: {
                                type: "date"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.OrderId },
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
                    template: "<a href='/api/order/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Guid",
                    title: "Guid"
                },
                {
                    field: "CustomerId",
                    title: "Customer Id"
                },
                {
                    field: "BillingAddressId",
                    title: "Billing Address Id"
                },
                {
                    field: "ShippingAddressId",
                    title: "Shipping Address Id"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "PaymentStatusId",
                    title: "Payment Status Id"
                },
                {
                    field: "PaymentMethodSystemName",
                    title: "Payment Method System Name"
                },
                {
                    field: "CardType",
                    title: "Card Type"
                },
                {
                    field: "CardName",
                    title: "Card Name"
                },
                {
                    field: "CardNumber",
                    title: "Card Number"
                },
                {
                    field: "MaskedCreditCardNumber",
                    title: "Masked Credit Card Number"
                },
                {
                    field: "CardCvv2",
                    title: "Card Cvv 2"
                },
                {
                    field: "CardExpirationMonth",
                    title: "Card Expiration Month"
                },
                {
                    field: "CardExpirationYear",
                    title: "Card Expiration Year"
                },
                {
                    field: "AuthorizationTransactionId",
                    title: "Authorization Transaction Id"
                },
                {
                    field: "AuthorizationTransactionCode",
                    title: "Authorization Transaction Code"
                },
                {
                    field: "AuthorizationTransactionResult",
                    title: "Authorization Transaction Result"
                },
                {
                    field: "CaptureTransactionId",
                    title: "Capture Transaction Id"
                },
                {
                    field: "CaptureTransactionResult",
                    title: "Capture Transaction Result"
                },
                {
                    field: "SubscriptionTransactionId",
                    title: "Subscription Transaction Id"
                },
                {
                    field: "PurchaseOrderNumber",
                    title: "Purchase Order Number"
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

    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
            });
    }
    function orderDropDownEditor(container, options) {
        $('<input data-text-field="Guid" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: orderDataSource
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