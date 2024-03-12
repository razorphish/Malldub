$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var postFieldDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/postField",
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
                    SectionId: {
                        type: "number"
                    },
                    ListPortalCategoryId: {
                        type: "number"
                    },
                    Name: {
                        type: "string"
                    },
                    DefaultValue: {
                        type: "string"
                    },
                    IsRequired: {
                        type: "boolean"
                    },
                    Option1: {
                        type: "string"
                    },
                    Option2: {
                        type: "string"
                    },
                    Option3: {
                        type: "string"
                    },
                    Option4: {
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
    
    var listPortalPostAttributeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/listPortalPostAttribute",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/listPortalPostAttribute",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/listPortalPostAttribute",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/listPortalPostAttribute/" + o.PostFieldId + o.ListPortalPostId;
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
                id: "PostFieldId",
                fields: {
                    PostFieldId: {
                        type: "number",
                        editable: false
                    },
                    ListPortalPostId: {
                        type: "number",
                        validation: { required: true },
                        editable: false
                    },
                    FieldContent: {
                        type: "string",
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
        dataSource: listPortalPostAttributeDataSource,
        detailInit: listPortalPostAttributeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "PostFieldId",
                title: "Post Field Id",
                filterable: false,
                editor: postFieldDropDownEditor
            },
            {
                field: "ListPortalPostId",
                title: "List Portal Post Id",
                filterable: false,
                editor: listPostDropDownEditor
            },
            {
                field: "FieldContent",
                title: "Field Content"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function listPortalPostAttributeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/postField",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/postField",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/postField/" + o.Identification;
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
                            SectionId: {
                                type: "number"
                            },
                            ListPortalCategoryId: {
                                type: "number"
                            },
                            Name: {
                                type: "string"
                            },
                            DefaultValue: {
                                type: "string",
                                validation: { required: true }
                            },
                            IsRequired: {
                                type: "boolean",
                                validation: { required: true }
                            },
                            Option1: {
                                type: "string",
                                validation: { required: true }
                            },
                            Option2: {
                                type: "string",
                                validation: { required: true }
                            },
                            Option3: {
                                type: "string",
                                validation: { required: true }
                            },
                            Option4: {
                                type: "string",
                                validation: { required: true }
                            }
                        }
                    }
                },
                filter: { field: "Identification", operator: "eq", value: e.data.PostFieldId },
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
                    template: "<a href='/api/postField/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "SectionId",
                    title: "Section Id"
                },
                {
                    field: "ListPortalCategoryId",
                    title: "List Portal Category Id"
                },
                {
                    field: "Name",
                    title: "Name"
                },
                {
                    field: "DefaultValue",
                    title: "Default Value"
                },
                {
                    field: "IsRequired",
                    title: "Is Required"
                },
                {
                    field: "Option1",
                    title: "Option 1"
                },
                {
                    field: "Option2",
                    title: "Option 2"
                },
                {
                    field: "Option3",
                    title: "Option 3"
                },
                {
                    field: "Option4",
                    title: "Option 4"
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
                filter: { field: "Identification", operator: "eq", value: e.data.ListPortalPostId },
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

    function postFieldDropDownEditor(container, options) {
        $('<input data-text-field="Name" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: postFieldDataSource
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
        dataTextField: "Name",
        autoBind: false,
        optionLabel: "All",
        dataSource: postFieldDataSource,
        change: function () {
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "PostFieldId", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});