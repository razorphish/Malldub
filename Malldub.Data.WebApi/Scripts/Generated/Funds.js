$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var fundTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundType",
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
    
    var fundDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fund",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fund",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: fundDataSource,
        detailInit: fundDetails,
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
                field: "GoalAmount",
                title: "Goal Amount"
            },
            {
                field: "TypeId",
                title: "Type Id",
                editor: fundTypeDropDownEditor
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
    function fundDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/fundType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundType/" + o.Identification;
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
                    template: "<a href='/api/fundType/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "FriendlyName",
                    title: "Friendly Name"
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
                filter: { field: "FundId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "FundId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "FundId", operator: "eq", value: e.data.Identification },
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
                filter: { field: "FundId", operator: "eq", value: e.data.Identification },
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

    function fundTypeDropDownEditor(container, options) {
        $('<input data-text-field="FriendlyName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundTypeDataSource
            });
    }
    function itemDropDownEditor(container, options) {
        $('<input data-text-field="Title" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: itemDataSource
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
    function fundShareDropDownEditor(container, options) {
        $('<input data-text-field="SocialId" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundShareDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "FriendlyName",
        autoBind: false,
        optionLabel: "All",
        dataSource: fundTypeDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "TypeId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});