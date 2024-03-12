$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var itemTransactionTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemTransactionType",
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
    
    var itemTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemType",
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
    
    var auctionPaymentItemDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionPaymentItem",
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
                id: "PaymentItemId",
                fields: {
                    PaymentItemId: {
                        type: "number"
                    },
                    UserId: {
                        type: "number"
                    },
                    BasedOnWinningPrice: {
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
    
    var itemCategoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemCategory",
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
                id: "ItemId",
                fields: {
                    ItemId: {
                        type: "number"
                    },
                    CategoryId: {
                        type: "number"
                    },
                    IsDefault: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var itemMetumDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemMetum",
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
                id: "ItemId",
                fields: {
                    ItemId: {
                        type: "number"
                    },
                    MetaKeyId: {
                        type: "string"
                    },
                    StringValue: {
                        type: "string"
                    },
                    NumericValue: {
                        type: "number"
                    },
                    DateValue: {
                        type: "date"
                    },
                    XmlDom: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var itemUploadDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/itemUpload",
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
                id: "ItemId",
                fields: {
                    ItemId: {
                        type: "number"
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
    
    var listPostDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/listPost",
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
                    ListSiteId: {
                        type: "number"
                    },
                    ListTypeId: {
                        type: "number"
                    },
                    ListCategoryId: {
                        type: "number"
                    },
                    ListAreaId: {
                        type: "number"
                    },
                    SpecificLocation: {
                        type: "string"
                    },
                    PostReplyEmailTypeId: {
                        type: "number"
                    },
                    IsSolicitable: {
                        type: "boolean"
                    },
                    StatusId: {
                        type: "number"
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
    
    var itemDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/item",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/item",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: itemDataSource,
        detailInit: itemDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: auctionDropDownEditor
            },
            {
                field: "UserId",
                title: "User Id",
                editor: aspNetUserDropDownEditor
            },
            {
                field: "TypeId",
                title: "Type Id",
                editor: itemTypeDropDownEditor
            },
            {
                field: "TransactionTypeId",
                title: "Transaction Type Id",
                editor: itemTransactionTypeDropDownEditor
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
    function itemDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/itemTransactionType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemTransactionType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemTransactionType/" + o.Identification;
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
                filter: { field: "Identification", operator: "eq", value: e.data.TransactionTypeId },
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
                    template: "<a href='/api/itemTransactionType/${ Identification }'>${ Identification }</a>",
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
                        url: crudServiceBaseUrl + "/itemType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemType/" + o.Identification;
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
                    template: "<a href='/api/itemType/${ Identification }'>${ Identification }</a>",
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
                        url: crudServiceBaseUrl + "/auctionPaymentItem",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionPaymentItem",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionPaymentItem/" + o.PaymentItemId + o.UserId;
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
                        id: "PaymentItemId",
                        fields: {
                            PaymentItemId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            UserId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            BasedOnWinningPrice: {
                                type: "boolean"
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
                filter: { field: "PaymentItemId", operator: "eq", value: e.data.Identification },
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
                    field: "PaymentItemId",
                    template: "<a href='/api/auctionPaymentItem/${ PaymentItemId }'>${ PaymentItemId }</a>",
                    filterable: false
                },
                {
                    field: "UserId",
                    template: "<a href='/api/auctionPaymentItem/${ UserId }'>${ UserId }</a>",
                    filterable: false
                },
                {
                    field: "BasedOnWinningPrice",
                    title: "Based On Winning Price"
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
                filter: { field: "PaymentItemId", operator: "eq", value: e.data.Identification },
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
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/itemCategory",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemCategory",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemCategory/" + o.ItemId + o.CategoryId;
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
                        id: "ItemId",
                        fields: {
                            ItemId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            CategoryId: {
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
                filter: { field: "ItemId", operator: "eq", value: e.data.Identification },
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
                    field: "ItemId",
                    template: "<a href='/api/itemCategory/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
                },
                {
                    field: "CategoryId",
                    template: "<a href='/api/itemCategory/${ CategoryId }'>${ CategoryId }</a>",
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
                        url: crudServiceBaseUrl + "/itemMetum",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemMetum",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemMetum/" + o.ItemId + o.MetaKeyId;
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
                        id: "ItemId",
                        fields: {
                            ItemId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            MetaKeyId: {
                                type: "string",
                                validation: { required: true },
                                editable: false
                            },
                            StringValue: {
                                type: "string",
                                validation: { required: true }
                            },
                            NumericValue: {
                                type: "number",
                                validation: { required: true }
                            },
                            DateValue: {
                                type: "date",
                                validation: { required: true }
                            },
                            XmlDom: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "ItemId", operator: "eq", value: e.data.Identification },
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
                    field: "ItemId",
                    template: "<a href='/api/itemMetum/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
                },
                {
                    field: "MetaKeyId",
                    template: "<a href='/api/itemMetum/${ MetaKeyId }'>${ MetaKeyId }</a>",
                    filterable: false
                },
                {
                    field: "StringValue",
                    title: "String Value"
                },
                {
                    field: "NumericValue",
                    title: "Numeric Value"
                },
                {
                    field: "DateValue",
                    title: "Date Value"
                },
                {
                    field: "XmlDom",
                    title: "Xml Dom"
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
                        url: crudServiceBaseUrl + "/itemUpload",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/itemUpload",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/itemUpload/" + o.ItemId + o.UploadId;
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
                        id: "ItemId",
                        fields: {
                            ItemId: {
                                type: "number",
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
                filter: { field: "ItemId", operator: "eq", value: e.data.Identification },
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
                    field: "ItemId",
                    template: "<a href='/api/itemUpload/${ ItemId }'>${ ItemId }</a>",
                    filterable: false
                },
                {
                    field: "UploadId",
                    template: "<a href='/api/itemUpload/${ UploadId }'>${ UploadId }</a>",
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
                        url: crudServiceBaseUrl + "/listPost",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/listPost",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/listPost/" + o.Identification;
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
                            ListSiteId: {
                                type: "number"
                            },
                            ListTypeId: {
                                type: "number"
                            },
                            ListCategoryId: {
                                type: "number",
                                validation: { required: true }
                            },
                            ListAreaId: {
                                type: "number",
                                validation: { required: true }
                            },
                            SpecificLocation: {
                                type: "string",
                                validation: { required: true }
                            },
                            PostReplyEmailTypeId: {
                                type: "number"
                            },
                            IsSolicitable: {
                                type: "boolean"
                            },
                            StatusId: {
                                type: "number"
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
                    template: "<a href='/api/listPost/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "ListSiteId",
                    title: "List Site Id"
                },
                {
                    field: "ListTypeId",
                    title: "List Type Id"
                },
                {
                    field: "ListCategoryId",
                    title: "List Category Id"
                },
                {
                    field: "ListAreaId",
                    title: "List Area Id"
                },
                {
                    field: "SpecificLocation",
                    title: "Specific Location"
                },
                {
                    field: "PostReplyEmailTypeId",
                    title: "Post Reply Email Type Id"
                },
                {
                    field: "IsSolicitable",
                    title: "Is Solicitable"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
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
                filter: { field: "ItemId", operator: "eq", value: e.data.Identification },
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

    function itemTransactionTypeDropDownEditor(container, options) {
        $('<input data-text-field="Details" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemTransactionTypeDataSource
            });
    }
    function itemTypeDropDownEditor(container, options) {
        $('<input data-text-field="Details" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemTypeDataSource
            });
    }
    function aspNetUserDropDownEditor(container, options) {
        $('<input data-text-field="UserName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserDataSource
            });
    }
    function auctionDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionDataSource
            });
    }
    function auctionPaymentItemDropDownEditor(container, options) {
        $('<input data-text-field="PaymentItemId" data-value-field="PaymentItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionPaymentItemDataSource
            });
    }
    function fundDropDownEditor(container, options) {
        $('<input data-text-field="PageColor" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundDataSource
            });
    }
    function invoiceItemDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: invoiceItemDataSource
            });
    }
    function itemCategoryDropDownEditor(container, options) {
        $('<input data-text-field="ItemId" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemCategoryDataSource
            });
    }
    function itemMetumDropDownEditor(container, options) {
        $('<input data-text-field="StringValue" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemMetumDataSource
            });
    }
    function itemUploadDropDownEditor(container, options) {
        $('<input data-text-field="ItemId" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemUploadDataSource
            });
    }
    function listPostDropDownEditor(container, options) {
        $('<input data-text-field="SpecificLocation" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: listPostDataSource
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
        dataTextField: "Details",
        autoBind: false,
        optionLabel: "All",
        dataSource: itemTransactionTypeDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "TransactionTypeId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});