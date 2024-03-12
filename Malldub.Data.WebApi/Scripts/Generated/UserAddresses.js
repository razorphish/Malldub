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
    
    var userAddressDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/userAddress",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/userAddress",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: userAddressDataSource,
        detailInit: userAddressDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "UserId",
                title: "User Id",
                filterable: false,
                editor: aspNetUserDropDownEditor
            },
            {
                field: "AddressId",
                title: "Address Id",
                filterable: false,
                editor: addressDropDownEditor
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
    function userAddressDetails(e) {
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
                filter: { field: "Identification", operator: "eq", value: e.data.AddressId },
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
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Address1",
        autoBind: false,
        optionLabel: "All",
        dataSource: addressDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "AddressId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});