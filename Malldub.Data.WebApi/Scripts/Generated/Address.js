$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
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
    
    var userAddressDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userAddress",
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
                id: "UserId",
                fields: {
                    UserId: {
                        type: "string"
                    },
                    AddressId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var stateDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/state",
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
                    Name: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var addressDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/address",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/address",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/address",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/address/" + o.Identification;
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
                    Address1: {
                        type: "string"
                    },
                    Address2: {
                        type: "string",
                        validation: { required: true }
                    },
                    City: {
                        type: "string"
                    },
                    State: {
                        type: "string"
                    },
                    ZipCode: {
                        type: "string"
                    },
                    Longitude: {
                        type: "number",
                        validation: { required: true }
                    },
                    Latitude: {
                        type: "number",
                        validation: { required: true }
                    },
                    County: {
                        type: "string",
                        validation: { required: true }
                    },
                    Country: {
                        type: "string",
                        validation: { required: true }
                    },
                    DateEntered: {
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
        dataSource: addressDataSource,
        detailInit: addressDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: orderDropDownEditor
            },
            {
                field: "Address1",
                title: "Address 1"
            },
            {
                field: "Address2",
                title: "Address 2"
            },
            {
                field: "City",
                title: "City"
            },
            {
                field: "State",
                title: "State",
                editor: stateDropDownEditor
            },
            {
                field: "ZipCode",
                title: "Zip Code"
            },
            {
                field: "Longitude",
                title: "Longitude"
            },
            {
                field: "Latitude",
                title: "Latitude"
            },
            {
                field: "County",
                title: "County"
            },
            {
                field: "Country",
                title: "Country"
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
    function addressDetails(e) {
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
                filter: { field: "BillingAddressId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "ShippingAddressId", operator: "eq", value: e.data.Identification },
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/userAddress",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userAddress",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userAddress/" + o.UserId + o.AddressId;
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
                        id: "UserId",
                        fields: {
                            UserId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            AddressId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            IsDefault: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "AddressId", operator: "eq", value: e.data.Identification },
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
                    field: "UserId",
                    template: "<a href='/api/userAddress/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "AddressId",
                    template: "<a href='/api/userAddress/${ AddressId }'>${ AddressId }</a>",
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/state",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/state",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/state/" + o.Identification;
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
                            Name: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.State },
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
                    template: "<a href='/api/state/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function orderDropDownEditor(container, options) {
        $('<input data-text-field="Guid" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: orderDataSource
            });
    }
    function orderDropDownEditor(container, options) {
        $('<input data-text-field="Guid" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: orderDataSource
            });
    }
    function userAddressDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userAddressDataSource
            });
    }
    function stateDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: stateDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Guid",
        autoBind: false,
        optionLabel: "All",
        dataSource: orderDataSource,
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