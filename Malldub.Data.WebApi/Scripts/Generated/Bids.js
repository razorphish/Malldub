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
    
    var bidDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/bid",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/bid",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: bidDataSource,
        detailInit: bidDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false
            },
            {
                field: "AuctionId",
                title: "Auction Id",
                editor: auctionDropDownEditor
            },
            {
                field: "UserId",
                title: "User Id",
                editor: aspNetUserDropDownEditor
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
    function bidDetails(e) {
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
    }

    function auctionDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionDataSource
            });
    }
    function aspNetUserDropDownEditor(container, options) {
        $('<input data-text-field="UserName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserDataSource
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