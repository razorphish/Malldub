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
    
    var stateDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/state",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/state",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/state",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/state/" + o.Identification;
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
                    Name: {
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
        dataSource: stateDataSource,
        detailInit: stateDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: addressDropDownEditor
            },
            {
                field: "Name",
                title: "Name"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function stateDetails(e) {
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
                filter: { field: "State", operator: "eq", value: e.data.Identification },
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
    }

    function addressDropDownEditor(container, options) {
        $('<input data-text-field="Address1" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: addressDataSource
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
                grid.data("kendoGrid").dataSource.filter({ field: "Identification", operator: "eq", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
});