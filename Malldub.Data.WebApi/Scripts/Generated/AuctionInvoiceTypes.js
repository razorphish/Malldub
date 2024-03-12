$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var auctionInvoiceDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoice",
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
                id: "AuctionId",
                fields: {
                    AuctionId: {
                        type: "number"
                    },
                    InvoiceId: {
                        type: "number"
                    },
                    ClientIdPayable: {
                        type: "number"
                    },
                    ClientIdReceivable: {
                        type: "number"
                    },
                    TypeId: {
                        type: "number"
                    },
                    SystemInvoice: {
                        type: "boolean"
                    },
                    BillToTypeId: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var auctionInvoiceTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionInvoiceType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/auctionInvoiceType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/auctionInvoiceType",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/auctionInvoiceType/" + o.Identification;
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
                    Name: {
                        type: "string"
                    },
                    Description: {
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
        dataSource: auctionInvoiceTypeDataSource,
        detailInit: auctionInvoiceTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: auctionInvoiceDropDownEditor
            },
            {
                field: "Name",
                title: "Name"
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
    function auctionInvoiceTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/auctionInvoice",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auctionInvoice",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auctionInvoice/" + o.AuctionId + o.InvoiceId;
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
                        id: "AuctionId",
                        fields: {
                            AuctionId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            InvoiceId: {
                                type: "number",
                                validation: { required: true },
                                editable: false
                            },
                            ClientIdPayable: {
                                type: "number",
                                validation: { required: true }
                            },
                            ClientIdReceivable: {
                                type: "number"
                            },
                            TypeId: {
                                type: "number"
                            },
                            SystemInvoice: {
                                type: "boolean"
                            },
                            BillToTypeId: {
                                type: "number",
                                validation: { required: true }
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
                    field: "AuctionId",
                    template: "<a href='/api/auctionInvoice/${ AuctionId }'>${ AuctionId }</a>",
                    filterable: false
                },
                {
                    field: "InvoiceId",
                    template: "<a href='/api/auctionInvoice/${ InvoiceId }'>${ InvoiceId }</a>",
                    filterable: false
                },
                {
                    field: "ClientIdPayable",
                    title: "Client Id Payable"
                },
                {
                    field: "ClientIdReceivable",
                    title: "Client Id Receivable"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    field: "SystemInvoice",
                    title: "System Invoice"
                },
                {
                    field: "BillToTypeId",
                    title: "Bill To Type Id"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function auctionInvoiceDropDownEditor(container, options) {
        $('<input data-text-field="AuctionId" data-value-field="AuctionId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionInvoiceDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "AuctionId",
        dataTextField: "AuctionId",
        autoBind: false,
        optionLabel: "All",
        dataSource: auctionInvoiceDataSource,
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