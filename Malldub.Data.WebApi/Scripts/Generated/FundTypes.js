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
    
    var fundTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/fundType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/fundType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: fundTypeDataSource,
        detailInit: fundTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: fundDropDownEditor
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
    function fundTypeDetails(e) {
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
                filter: { field: "TypeId", operator: "eq", value: e.data.Identification },
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
    }

    function fundDropDownEditor(container, options) {
        $('<input data-text-field="PageColor" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: fundDataSource
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
                grid.data("kendoGrid").dataSource.filter({ field: "Identification", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});