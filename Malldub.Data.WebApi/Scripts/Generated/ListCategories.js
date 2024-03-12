$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var listTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/listType",
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
                    Code: {
                        type: "string"
                    },
                    Description: {
                        type: "string"
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
    
    var listCategoryDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/listCategory",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/listCategory",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/listCategory",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/listCategory/" + o.Identification;
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
                    ListPortalTypeId: {
                        type: "number"
                    },
                    Description: {
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
        dataSource: listCategoryDataSource,
        detailInit: listCategoryDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: listPostDropDownEditor
            },
            {
                field: "ListPortalTypeId",
                title: "List Portal Type Id",
                editor: listTypeDropDownEditor
            },
            {
                field: "Description",
                title: "Description"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function listCategoryDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/listType",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/listType",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/listType/" + o.Identification;
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
                            Code: {
                                type: "string",
                                validation: { required: true }
                            },
                            Description: {
                                type: "string"
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.ListPortalTypeId },
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
                    template: "<a href='/api/listType/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "Code",
                    title: "Code"
                },
                {
                    field: "Description",
                    title: "Description"
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
                filter: { field: "ListCategoryId", operator: "eq", value: e.data.Identification },
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
    }

    function listTypeDropDownEditor(container, options) {
        $('<input data-text-field="Code" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: listTypeDataSource
            });
    }
    function listPostDropDownEditor(container, options) {
        $('<input data-text-field="SpecificLocation" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: listPostDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Code",
        autoBind: false,
        optionLabel: "All",
        dataSource: listTypeDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "ListPortalTypeId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});