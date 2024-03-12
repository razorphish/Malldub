$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var uploadDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/upload",
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
                    IsPrivate: {
                        type: "boolean"
                    },
                    CategoryId: {
                        type: "string"
                    },
                    Name: {
                        type: "string"
                    },
                    OriginalFileName: {
                        type: "string"
                    },
                    Location: {
                        type: "string"
                    },
                    RelativeLocation: {
                        type: "string"
                    },
                    Extension: {
                        type: "string"
                    },
                    ContentLength: {
                        type: "number"
                    },
                    ContentType: {
                        type: "string"
                    },
                    LocationHttp: {
                        type: "string"
                    },
                    ContainerName: {
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
    
    var userStatusDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userStatus",
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
                    Details: {
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
    
    var accountDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/account",
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
                    StatusId: {
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
    
    var aspNetUserClaimDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUserClaim",
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
                    ClaimType: {
                        type: "string"
                    },
                    ClaimValue: {
                        type: "string"
                    },
                    UserId: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var aspNetUserLoginDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUserLogin",
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
                    LoginProvider: {
                        type: "string"
                    },
                    ProviderKey: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var aspNetRoleDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetRole",
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
    
    var fundUpdateDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUpdate",
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
                    Title: {
                        type: "string"
                    },
                    Content: {
                        type: "string"
                    },
                    StatusId: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    PostedToFacebook: {
                        type: "boolean"
                    },
                    PostedToEmail: {
                        type: "boolean"
                    },
                    PostedToTwitter: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var fundUserDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundUser",
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
                id: "FundId",
                fields: {
                    FundId: {
                        type: "number"
                    },
                    UserId: {
                        type: "string"
                    },
                    UserTypeId: {
                        type: "string"
                    },
                    AllowEmail: {
                        type: "boolean"
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
    
    var mallDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/mall",
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
                    Url: {
                        type: "string"
                    },
                    Title: {
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
    
    var userEmailDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userEmail",
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
                    EmailId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var userPhoneDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userPhone",
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
                    PhoneId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var userUploadDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userUpload",
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
                    UploadId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var aspNetUserGatewayDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUserGateway",
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
                    GatewayId: {
                        type: "string"
                    },
                    AspNetUserId: {
                        type: "string"
                    },
                    GatewayUserId: {
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
                    AccessToken: {
                        type: "string"
                    },
                    TokenType: {
                        type: "string"
                    },
                    TokenExpiration: {
                        type: "string"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    DateUpdated: {
                        type: "date"
                    },
                    AccountId: {
                        type: "string"
                    },
                    AccountReferenceId: {
                        type: "string"
                    },
                    UserState: {
                        type: "string"
                    },
                    AccountState: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var fundShareDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundShare",
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
                    SocialId: {
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
                    Recipients: {
                        type: "string"
                    },
                    ShareTypeId: {
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
            },
            create: {
                url: crudServiceBaseUrl + "/aspNetUser",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: aspNetUserDataSource,
        detailInit: aspNetUserDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: accountDropDownEditor
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
                title: "Status Id",
                editor: userStatusDropDownEditor
            },
            {
                field: "AvatarUploadId",
                title: "Avatar Upload Id",
                editor: uploadDropDownEditor
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
    function aspNetUserDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/upload",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/upload",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/upload/" + o.Identification;
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
                            Description: {
                                type: "string"
                            },
                            IsPrivate: {
                                type: "boolean"
                            },
                            CategoryId: {
                                type: "string"
                            },
                            Name: {
                                type: "string"
                            },
                            OriginalFileName: {
                                type: "string"
                            },
                            Location: {
                                type: "string"
                            },
                            RelativeLocation: {
                                type: "string",
                                validation: { required: true }
                            },
                            Extension: {
                                type: "string",
                                validation: { required: true }
                            },
                            ContentLength: {
                                type: "number",
                                validation: { required: true }
                            },
                            ContentType: {
                                type: "string",
                                validation: { required: true }
                            },
                            LocationHttp: {
                                type: "string",
                                validation: { required: true }
                            },
                            ContainerName: {
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
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.AvatarUploadId },
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
                    template: "<a href='/api/upload/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Description",
                    title: "Description"
                },
                {
                    field: "IsPrivate",
                    title: "Is Private"
                },
                {
                    field: "CategoryId",
                    title: "Category Id"
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    field: "OriginalFileName",
                    title: "Original File Name"
                },
                {
                    field: "Location",
                    title: "Location"
                },
                {
                    field: "RelativeLocation",
                    title: "Relative Location"
                },
                {
                    field: "Extension",
                    title: "Extension"
                },
                {
                    field: "ContentLength",
                    title: "Content Length"
                },
                {
                    field: "ContentType",
                    title: "Content Type"
                },
                {
                    field: "LocationHttp",
                    title: "Location Http"
                },
                {
                    field: "ContainerName",
                    title: "Container Name"
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
                        url: crudServiceBaseUrl + "/userStatus",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userStatus",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userStatus/" + o.Identification;
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
                            Details: {
                                type: "string"
                            },
                            Description: {
                                type: "string",
                                validation: { required: true }
                            },
                            SortOrderNumber: {
                                type: "number"
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
                    template: "<a href='/api/userStatus/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Details",
                    title: "Details"
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
                        url: crudServiceBaseUrl + "/account",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/account",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/account/" + o.Identification;
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
                            StatusId: {
                                type: "string"
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
                    template: "<a href='/api/account/${ Identification }'>${ Identification }</a>",
                    filterable: false
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/aspNetUserClaim",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetUserClaim",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetUserClaim/" + o.Identification;
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
                            ClaimType: {
                                type: "string",
                                validation: { required: true }
                            },
                            ClaimValue: {
                                type: "string",
                                validation: { required: true }
                            },
                            UserId: {
                                type: "string"
                            }
                        }
                    }
                },
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/aspNetUserClaim/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "ClaimType",
                    title: "Claim Type"
                },
                {
                    field: "ClaimValue",
                    title: "Claim Value"
                },
                {
                    field: "UserId",
                    title: "User Id"
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
                        url: crudServiceBaseUrl + "/aspNetUserLogin",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetUserLogin",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetUserLogin/" + o.UserId + o.LoginProvider + o.ProviderKey;
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
                            LoginProvider: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            ProviderKey: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            }
                        }
                    }
                },
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/aspNetUserLogin/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "LoginProvider",
                    template: "<a href='/api/aspNetUserLogin/${ LoginProvider }'>${ LoginProvider }</a>",
                    filterable: false
                },
                {
                    field: "ProviderKey",
                    template: "<a href='/api/aspNetUserLogin/${ ProviderKey }'>${ ProviderKey }</a>",
                    filterable: false
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
                        url: crudServiceBaseUrl + "/aspNetRole",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetRole",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetRole/" + o.Identification;
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
            },
            pageable: true,
            filterable: true,
            sortable: true,
            navigatable: true,
            columns: [
                {
                    field: "Identification",
                    template: "<a href='/api/aspNetRole/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    command: ["edit", "destroy"]
                }],
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                        url: crudServiceBaseUrl + "/fundUpdate",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundUpdate",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundUpdate/" + o.Identification;
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
                            Title: {
                                type: "string"
                            },
                            Content: {
                                type: "string"
                            },
                            StatusId: {
                                type: "string"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            },
                            PostedToFacebook: {
                                type: "boolean"
                            },
                            PostedToEmail: {
                                type: "boolean"
                            },
                            PostedToTwitter: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/fundUpdate/${ Identification }'>${ Identification }</a>",
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
                    field: "Title",
                    title: "Title"
                },
                {
                    field: "Content",
                    title: "Content"
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
                    field: "PostedToFacebook",
                    title: "Posted To Facebook"
                },
                {
                    field: "PostedToEmail",
                    title: "Posted To Email"
                },
                {
                    field: "PostedToTwitter",
                    title: "Posted To Twitter"
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
                        url: crudServiceBaseUrl + "/fundUser",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundUser",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundUser/" + o.FundId + o.UserId;
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
                        id: "FundId",
                        fields: {
                            FundId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            UserId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            UserTypeId: {
                                type: "string"
                            },
                            AllowEmail: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    field: "FundId",
                    template: "<a href='/api/fundUser/${ FundId }'>${ FundId }</a>",
                    filterable: false
                },
                {
                    field: "UserId",
                    template: "<a href='/api/fundUser/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "UserTypeId",
                    title: "User Type Id"
                },
                {
                    field: "AllowEmail",
                    title: "Allow Email"
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                        url: crudServiceBaseUrl + "/mall",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/mall",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/mall/" + o.Identification;
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
                            Url: {
                                type: "string"
                            },
                            Title: {
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
                    template: "<a href='/api/mall/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Url",
                    title: "Url"
                },
                {
                    field: "Title",
                    title: "Title"
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
                filter: { field: "CustomerId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                        url: crudServiceBaseUrl + "/userEmail",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userEmail",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userEmail/" + o.UserId + o.EmailId;
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
                            EmailId: {
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/userEmail/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "EmailId",
                    template: "<a href='/api/userEmail/${ EmailId }'>${ EmailId }</a>",
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
                        url: crudServiceBaseUrl + "/userPhone",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userPhone",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userPhone/" + o.UserId + o.PhoneId;
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
                            PhoneId: {
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/userPhone/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "PhoneId",
                    template: "<a href='/api/userPhone/${ PhoneId }'>${ PhoneId }</a>",
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
                        url: crudServiceBaseUrl + "/userUpload",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/userUpload",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/userUpload/" + o.UserId + o.UploadId;
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
                            UploadId: {
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
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/userUpload/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "UploadId",
                    template: "<a href='/api/userUpload/${ UploadId }'>${ UploadId }</a>",
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
                        url: crudServiceBaseUrl + "/aspNetUserGateway",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/aspNetUserGateway",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/aspNetUserGateway/" + o.Identification;
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
                            GatewayId: {
                                type: "string"
                            },
                            AspNetUserId: {
                                type: "string"
                            },
                            GatewayUserId: {
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
                            AccessToken: {
                                type: "string",
                                validation: { required: true }
                            },
                            TokenType: {
                                type: "string",
                                validation: { required: true }
                            },
                            TokenExpiration: {
                                type: "string",
                                validation: { required: true }
                            },
                            DateEntered: {
                                type: "date"
                            },
                            DateUpdated: {
                                type: "date"
                            },
                            AccountId: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccountReferenceId: {
                                type: "string",
                                validation: { required: true }
                            },
                            UserState: {
                                type: "string",
                                validation: { required: true }
                            },
                            AccountState: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "AspNetUserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/aspNetUserGateway/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "GatewayId",
                    title: "Gateway Id"
                },
                {
                    field: "AspNetUserId",
                    title: "Asp Net User Id"
                },
                {
                    field: "GatewayUserId",
                    title: "Gateway User Id"
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
                    field: "AccessToken",
                    title: "Access Token"
                },
                {
                    field: "TokenType",
                    title: "Token Type"
                },
                {
                    field: "TokenExpiration",
                    title: "Token Expiration"
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
                    field: "AccountId",
                    title: "Account Id"
                },
                {
                    field: "AccountReferenceId",
                    title: "Account Reference Id"
                },
                {
                    field: "UserState",
                    title: "User State"
                },
                {
                    field: "AccountState",
                    title: "Account State"
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
                        url: crudServiceBaseUrl + "/fundShare",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundShare",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundShare/" + o.Identification;
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
                                type: "string",
                                validation: { required: true }
                            },
                            SocialId: {
                                type: "string",
                                validation: { required: true }
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
                            Recipients: {
                                type: "string",
                                validation: { required: true }
                            },
                            ShareTypeId: {
                                type: "string"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "UserId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/fundShare/${ Identification }'>${ Identification }</a>",
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
                    field: "SocialId",
                    title: "Social Id"
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
                    field: "Recipients",
                    title: "Recipients"
                },
                {
                    field: "ShareTypeId",
                    title: "Share Type Id"
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

    function uploadDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: uploadDataSource
            });
    }
    function userStatusDropDownEditor(container, options) {
        $('<input data-text-field="Details" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userStatusDataSource
            });
    }
    function accountDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: accountDataSource
            });
    }
    function aspNetUserClaimDropDownEditor(container, options) {
        $('<input data-text-field="ClaimType" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserClaimDataSource
            });
    }
    function aspNetUserLoginDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserLoginDataSource
            });
    }
    function bidDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: bidDataSource
            });
    }
    function donationDropDownEditor(container, options) {
        $('<input data-text-field="DonorName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationDataSource
            });
    }
    function fundUpdateDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundUpdateDataSource
            });
    }
    function fundUserDropDownEditor(container, options) {
        $('<input data-text-field="FundId" data-value-field="FundId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundUserDataSource
            });
    }
    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
            });
    }
    function mallDropDownEditor(container, options) {
        $('<input data-text-field="Url" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: mallDataSource
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
    function userEmailDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userEmailDataSource
            });
    }
    function userPhoneDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userPhoneDataSource
            });
    }
    function userUploadDropDownEditor(container, options) {
        $('<input data-text-field="UserId" data-value-field="UserId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: userUploadDataSource
            });
    }
    function aspNetUserGatewayDropDownEditor(container, options) {
        $('<input data-text-field="GatewayUserId" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserGatewayDataSource
            });
    }
    function fundShareDropDownEditor(container, options) {
        $('<input data-text-field="SocialId" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundShareDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Description",
        autoBind: false,
        optionLabel: "All",
        dataSource: uploadDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "AvatarUploadId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});