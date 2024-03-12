$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var donationFeeTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donationFeeType",
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
                    FriendlyName: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    },
                    SortOrderNumber: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var donationStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donationStatus",
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
                    FriendlyName: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
                    },
                    SortOrderNumber: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var fundDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fund",
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
                    GoalAmount: {
                        type: "number"
                    },
                    TypeId: {
                        type: "string"
                    },
                    IsPrivate: {
                        type: "boolean"
                    },
                    EnableSocialSharing: {
                        type: "boolean"
                    },
                    PageColor: {
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
    
    var donationNoteDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donationNote",
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
                    DonationId: {
                        type: "number"
                    },
                    Message: {
                        type: "string"
                    },
                    TypeId: {
                        type: "string"
                    },
                    DateEntered: {
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
            },
            create: {
                url: crudServiceBaseUrl + "/donation",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: donationDataSource,
        detailInit: donationDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: donationNoteDropDownEditor
            },
            {
                field: "FundId",
                title: "Fund Id",
                editor: fundDropDownEditor
            },
            {
                field: "UserId",
                title: "User Id",
                editor: aspNetUserDropDownEditor
            },
            {
                field: "OrderId",
                title: "Order Id",
                editor: orderDropDownEditor
            },
            {
                field: "FeeTypeId",
                title: "Fee Type Id",
                editor: donationFeeTypeDropDownEditor
            },
            {
                field: "StatusId",
                title: "Status Id",
                editor: donationStatusDropDownEditor
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
    function donationDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/donationFeeType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/donationFeeType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/donationFeeType/" + o.Identification;
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
                            FriendlyName: {
                                type: "string"
                            },
                            Description: {
                                type: "string"
                            },
                            SortOrderNumber: {
                                type: "number",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.FeeTypeId },
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
                    template: "<a href='/api/donationFeeType/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "FriendlyName",
                    title: "Friendly Name"
                },
                {
                    field: "Description",
                    title: "Description"
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/donationStatus",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/donationStatus",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/donationStatus/" + o.Identification;
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
                            FriendlyName: {
                                type: "string"
                            },
                            Description: {
                                type: "string"
                            },
                            SortOrderNumber: {
                                type: "number",
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
                    template: "<a href='/api/donationStatus/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "FriendlyName",
                    title: "Friendly Name"
                },
                {
                    field: "Description",
                    title: "Description"
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/fund",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fund",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fund/" + o.Identification;
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
                            GoalAmount: {
                                type: "number"
                            },
                            TypeId: {
                                type: "string"
                            },
                            IsPrivate: {
                                type: "boolean"
                            },
                            EnableSocialSharing: {
                                type: "boolean"
                            },
                            PageColor: {
                                type: "string"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.FundId },
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
                    template: "<a href='/api/fund/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "GoalAmount",
                    title: "Goal Amount"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    field: "IsPrivate",
                    title: "Is Private"
                },
                {
                    field: "EnableSocialSharing",
                    title: "Enable Social Sharing"
                },
                {
                    field: "PageColor",
                    title: "Page Color"
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
                filter: { field: "Identification", operator: "eq", value: e.data.UserId },
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
                        url: crudServiceBaseUrl + "/donationNote",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/donationNote",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/donationNote/" + o.Identification;
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
                            DonationId: {
                                type: "number"
                            },
                            Message: {
                                type: "string"
                            },
                            TypeId: {
                                type: "string"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "DonationId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/donationNote/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "DonationId",
                    title: "Donation Id"
                },
                {
                    field: "Message",
                    title: "Message"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
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

    function donationFeeTypeDropDownEditor(container, options) {
        $('<input data-text-field="FriendlyName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationFeeTypeDataSource
            });
    }
    function donationStatusDropDownEditor(container, options) {
        $('<input data-text-field="FriendlyName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationStatusDataSource
            });
    }
    function fundDropDownEditor(container, options) {
        $('<input data-text-field="PageColor" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundDataSource
            });
    }
    function orderDropDownEditor(container, options) {
        $('<input data-text-field="Guid" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: orderDataSource
            });
    }
    function aspNetUserDropDownEditor(container, options) {
        $('<input data-text-field="UserName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserDataSource
            });
    }
    function donationNoteDropDownEditor(container, options) {
        $('<input data-text-field="Message" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationNoteDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "FriendlyName",
        autoBind: false,
        optionLabel: "All",
        dataSource: donationFeeTypeDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "FeeTypeId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});