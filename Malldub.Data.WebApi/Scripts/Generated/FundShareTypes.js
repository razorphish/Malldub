$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
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
    
    var fundShareTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundShareType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fundShareType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: fundShareTypeDataSource,
        detailInit: fundShareTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: fundShareDropDownEditor
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
    function fundShareTypeDetails(e) {
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
                filter: { field: "ShareTypeId", operator: "eq", value: e.data.Identification },
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

    function fundShareDropDownEditor(container, options) {
        $('<input data-text-field="SocialId" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundShareDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "SocialId",
        autoBind: false,
        optionLabel: "All",
        dataSource: fundShareDataSource,
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