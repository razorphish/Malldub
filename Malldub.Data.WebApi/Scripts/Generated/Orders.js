$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var addressDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/address",
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
                    Address1: {
                        type: "string"
                    },
                    Address2: {
                        type: "string"
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
                        type: "number"
                    },
                    Latitude: {
                        type: "number"
                    },
                    County: {
                        type: "string"
                    },
                    Country: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
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
                    Address1: {
                        type: "string"
                    },
                    Address2: {
                        type: "string"
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
                        type: "number"
                    },
                    Latitude: {
                        type: "number"
                    },
                    County: {
                        type: "string"
                    },
                    Country: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    }
                }
            }
        }
    });
    
    var aspNetUserDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUser",
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
                    UserName: {
                        type: "string"
                    },
                    PasswordHash: {
                        type: "string"
                    },
                    SecurityStamp: {
                        type: "string"
                    },
                    Discriminator: {
                        type: "string"
                    },
                    FirstName: {
                        type: "string"
                    },
                    LastName: {
                        type: "string"
                    },
                    Email: {
                        type: "string"
                    },
                    StatusId: {
                        type: "string"
                    },
                    AvatarUploadId: {
                        type: "number"
                    },
                    AvatarUploadTempLocation: {
                        type: "string"
                    },
                    AccountId: {
                        type: "string"
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
    
    var donationDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donation",
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
                    FundId: {
                        type: "number"
                    },
                    UserId: {
                        type: "string"
                    },
                    OrderId: {
                        type: "number"
                    },
                    FeeTypeId: {
                        type: "string"
                    },
                    StatusId: {
                        type: "string"
                    },
                    Amount: {
                        type: "number"
                    },
                    ProcessingFee: {
                        type: "number"
                    },
                    BeneficiaryAmount: {
                        type: "number"
                    },
                    SystemAmount: {
                        type: "number"
                    },
                    DonorName: {
                        type: "string"
                    },
                    Email: {
                        type: "string"
                    },
                    Message: {
                        type: "string"
                    },
                    OfflineDonation: {
                        type: "boolean"
                    },
                    ThankYouNoteSent: {
                        type: "boolean"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    IsPrivateAmount: {
                        type: "boolean"
                    },
                    IsPrivateDonorName: {
                        type: "boolean"
                    },
                    CostsCovered: {
                        type: "boolean"
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
                        type: "number"
                    },
                    ItemId: {
                        type: "number"
                    },
                    Price: {
                        type: "number"
                    },
                    ItemOrderGuid: {
                        type: "string"
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
            },
            create: {
                url: crudServiceBaseUrl + "/order",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: orderDataSource,
        detailInit: orderDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: donationDropDownEditor
            },
            {
                field: "Guid",
                title: "Guid"
            },
            {
                field: "CustomerId",
                title: "Customer Id",
                editor: aspNetUserDropDownEditor
            },
            {
                field: "BillingAddressId",
                title: "Billing Address Id",
                editor: addressDropDownEditor
            },
            {
                field: "ShippingAddressId",
                title: "Shipping Address Id",
                editor: addressDropDownEditor
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
    function orderDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/address",
                        dataType: "json"
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
                filter: { field: "Identification", operator: "eq", value: e.data.BillingAddressId },
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
                    template: "<a href='/api/address/${ Identification }'>${ Identification }</a>",
                    filterable: false
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
                    title: "State"
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/address",
                        dataType: "json"
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
                filter: { field: "Identification", operator: "eq", value: e.data.ShippingAddressId },
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
                    template: "<a href='/api/address/${ Identification }'>${ Identification }</a>",
                    filterable: false
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
                    title: "State"
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/aspNetUser",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetUser",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetUser/" + o.Identification;
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
                            UserName: {
                                type: "string"
                            },
                            PasswordHash: {
                                type: "string",
                                validation: { required: true }
                            },
                            SecurityStamp: {
                                type: "string",
                                validation: { required: true }
                            },
                            Discriminator: {
                                type: "string"
                            },
                            FirstName: {
                                type: "string",
                                validation: { required: true }
                            },
                            LastName: {
                                type: "string",
                                validation: { required: true }
                            },
                            Email: {
                                type: "string",
                                validation: { required: true }
                            },
                            StatusId: {
                                type: "string",
                                validation: { required: true }
                            },
                            AvatarUploadId: {
                                type: "number",
                                validation: { required: true }
                            },
                            AvatarUploadTempLocation: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccountId: {
                                type: "string",
                                validation: { required: true }
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
                filter: { field: "Identification", operator: "eq", value: e.data.CustomerId },
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
                    template: "<a href='/api/aspNetUser/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "UserName",
                    title: "User Name"
                },
                {
                    field: "PasswordHash",
                    title: "Password Hash"
                },
                {
                    field: "SecurityStamp",
                    title: "Security Stamp"
                },
                {
                    field: "Discriminator",
                    title: "Discriminator"
                },
                {
                    field: "FirstName",
                    title: "First Name"
                },
                {
                    field: "LastName",
                    title: "Last Name"
                },
                {
                    field: "Email",
                    title: "Email"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "AvatarUploadId",
                    title: "Avatar Upload Id"
                },
                {
                    field: "AvatarUploadTempLocation",
                    title: "Avatar Upload Temp Location"
                },
                {
                    field: "AccountId",
                    title: "Account Id"
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/donation",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/donation",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/donation/" + o.Identification;
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
                            FundId: {
                                type: "number"
                            },
                            UserId: {
                                type: "string"
                            },
                            OrderId: {
                                type: "number",
                                validation: { required: true }
                            },
                            FeeTypeId: {
                                type: "string"
                            },
                            StatusId: {
                                type: "string"
                            },
                            Amount: {
                                type: "number"
                            },
                            ProcessingFee: {
                                type: "number"
                            },
                            BeneficiaryAmount: {
                                type: "number"
                            },
                            SystemAmount: {
                                type: "number"
                            },
                            DonorName: {
                                type: "string"
                            },
                            Email: {
                                type: "string"
                            },
                            Message: {
                                type: "string",
                                validation: { required: true }
                            },
                            OfflineDonation: {
                                type: "boolean"
                            },
                            ThankYouNoteSent: {
                                type: "boolean"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            },
                            IsPrivateAmount: {
                                type: "boolean"
                            },
                            IsPrivateDonorName: {
                                type: "boolean"
                            },
                            CostsCovered: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "OrderId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/donation/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "FundId",
                    title: "Fund Id"
                },
                {
                    field: "UserId",
                    title: "User Id"
                },
                {
                    field: "OrderId",
                    title: "Order Id"
                },
                {
                    field: "FeeTypeId",
                    title: "Fee Type Id"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "Amount",
                    title: "Amount"
                },
                {
                    field: "ProcessingFee",
                    title: "Processing Fee"
                },
                {
                    field: "BeneficiaryAmount",
                    title: "Beneficiary Amount"
                },
                {
                    field: "SystemAmount",
                    title: "System Amount"
                },
                {
                    field: "DonorName",
                    title: "Donor Name"
                },
                {
                    field: "Email",
                    title: "Email"
                },
                {
                    field: "Message",
                    title: "Message"
                },
                {
                    field: "OfflineDonation",
                    title: "Offline Donation"
                },
                {
                    field: "ThankYouNoteSent",
                    title: "Thank You Note Sent"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    field: "IsPrivateAmount",
                    title: "Is Private Amount"
                },
                {
                    field: "IsPrivateDonorName",
                    title: "Is Private Donor Name"
                },
                {
                    field: "CostsCovered",
                    title: "Costs Covered"
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
                        url: crudServiceBaseUrl + "/orderItem",
                        dataType: "json"
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
                filter: { field: "OrderId", operator: "eq", value: e.data.Identification },
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
                    field: "OrderId",
                    template: "<a href='/api/orderItem/${ OrderId }'>${ OrderId }</a>",
                    filterable: false
                },
                {
                    field: "ItemId",
                    template: "<a href='/api/orderItem/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
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
    }

    function addressDropDownEditor(container, options) {
        $('<input data-text-field="Address1" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: addressDataSource
            });
    }
    function addressDropDownEditor(container, options) {
        $('<input data-text-field="Address1" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: addressDataSource
            });
    }
    function aspNetUserDropDownEditor(container, options) {
        $('<input data-text-field="UserName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserDataSource
            });
    }
    function donationDropDownEditor(container, options) {
        $('<input data-text-field="DonorName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationDataSource
            });
    }
    function orderItemDropDownEditor(container, options) {
        $('<input data-text-field="ItemOrderGuid" data-value-field="OrderId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: orderItemDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Address1",
        autoBind: false,
        optionLabel: "All",
        dataSource: addressDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "BillingAddressId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});