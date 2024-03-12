$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
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
    
    var aspNetUserClaimDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/aspNetUserClaim",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/aspNetUserClaim",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: aspNetUserClaimDataSource,
        detailInit: aspNetUserClaimDetails,
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
                field: "ClaimType",
                title: "Claim Type"
            },
            {
                field: "ClaimValue",
                title: "Claim Value"
            },
            {
                field: "UserId",
                title: "User Id",
                editor: aspNetUserDropDownEditor
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function aspNetUserClaimDetails(e) {
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

    function aspNetUserDropDownEditor(container, options) {
        $('<input data-text-field="UserName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: aspNetUserDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "UserName",
        autoBind: false,
        optionLabel: "All",
        dataSource: aspNetUserDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "UserId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});