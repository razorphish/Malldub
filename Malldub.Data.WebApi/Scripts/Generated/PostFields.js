$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var listPortalPostAttributeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/listPortalPostAttribute",
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
                id: "PostFieldId",
                fields: {
                    PostFieldId: {
                        type: "number"
                    },
                    ListPortalPostId: {
                        type: "number"
                    },
                    FieldContent: {
                        type: "string"
                    }
                }
            }
        }
    });
    
    var postFieldDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/postField",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/postField",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
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
        serverFiltering: true,
        serverSorting: true,
        allowUnsort: true,
        serverPaging: true,
        pageSize: 5
    });
    var grid = $("#grid").kendoGrid({
        dataSource: postFieldDataSource,
        detailInit: postFieldDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: listPortalPostAttributeDropDownEditor
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
    function postFieldDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/listPortalPostAttribute",
                        dataType: "json"
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
                filter: { field: "PostFieldId", operator: "eq", value: e.data.Identification },
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
                    field: "PostFieldId",
                    template: "<a href='/api/listPortalPostAttribute/${ PostFieldId }'>${ PostFieldId }</a>",
                    filterable: false
                },
                {
                    field: "ListPortalPostId",
                    template: "<a href='/api/listPortalPostAttribute/${ ListPortalPostId }'>${ ListPortalPostId }</a>",
                    filterable: false
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
    }

    function listPortalPostAttributeDropDownEditor(container, options) {
        $('<input data-text-field="FieldContent" data-value-field="PostFieldId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: listPortalPostAttributeDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "PostFieldId",
        dataTextField: "FieldContent",
        autoBind: false,
        optionLabel: "All",
        dataSource: listPortalPostAttributeDataSource,
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