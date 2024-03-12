$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
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
    
    var fundShareTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundShareType",
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
    
    var fundShareDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundShare",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fundShare",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: fundShareDataSource,
        detailInit: fundShareDetails,
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
                title: "Share Type Id",
                editor: fundShareTypeDropDownEditor
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
    function fundShareDetails(e) {
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
                        url: crudServiceBaseUrl + "/fundShareType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/fundShareType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/fundShareType/" + o.Identification;
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
                filter: { field: "Identification", operator: "eq", value: e.data.ShareTypeId },
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
                    template: "<a href='/api/fundShareType/${ Identification }'>${ Identification }</a>",
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

    function fundDropDownEditor(container, options) {
        $('<input data-text-field="PageColor" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundDataSource
            });
    }
    function fundShareTypeDropDownEditor(container, options) {
        $('<input data-text-field="FriendlyName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundShareTypeDataSource
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
        dataTextField: "PageColor",
        autoBind: false,
        optionLabel: "All",
        dataSource: fundDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "FundId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});