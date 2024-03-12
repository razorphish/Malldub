$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var auctionDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auction",
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
                    StartingPrice: {
                        type: "number"
                    },
                    Duration: {
                        type: "number"
                    },
                    BuyItNowPrice: {
                        type: "number"
                    },
                    ReserveAmount: {
                        type: "number"
                    },
                    CurrentHighBid: {
                        type: "number"
                    },
                    BeginTime: {
                        type: "date"
                    },
                    EndTime: {
                        type: "date"
                    },
                    HasEnded: {
                        type: "boolean"
                    },
                    Increment: {
                        type: "number"
                    },
                    StatusId: {
                        type: "number"
                    },
                    WinningBidderUserId: {
                        type: "number"
                    },
                    TypeId: {
                        type: "number"
                    }
                }
            }
        }
    });
    
    var auctionTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/auctionType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/auctionType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/auctionType",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/auctionType/" + o.Identification;
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
                    Description: {
                        type: "string"
                    },
                    Details: {
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
        dataSource: auctionTypeDataSource,
        detailInit: auctionTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: auctionDropDownEditor
            },
            {
                field: "Description",
                title: "Description"
            },
            {
                field: "Details",
                title: "Details"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function auctionTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/auction",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/auction",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/auction/" + o.Identification;
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
                            StartingPrice: {
                                type: "number"
                            },
                            Duration: {
                                type: "number"
                            },
                            BuyItNowPrice: {
                                type: "number",
                                validation: { required: true }
                            },
                            ReserveAmount: {
                                type: "number",
                                validation: { required: true }
                            },
                            CurrentHighBid: {
                                type: "number",
                                validation: { required: true }
                            },
                            BeginTime: {
                                type: "date",
                                validation: { required: true }
                            },
                            EndTime: {
                                type: "date",
                                validation: { required: true }
                            },
                            HasEnded: {
                                type: "boolean"
                            },
                            Increment: {
                                type: "number"
                            },
                            StatusId: {
                                type: "number"
                            },
                            WinningBidderUserId: {
                                type: "number",
                                validation: { required: true }
                            },
                            TypeId: {
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
                    field: "Identification",
                    template: "<a href='/api/auction/${ Identification }'>${ Identification }</a>",
                    filterable: false
                },
                {
                    field: "StartingPrice",
                    title: "Starting Price"
                },
                {
                    field: "Duration",
                    title: "Duration"
                },
                {
                    field: "BuyItNowPrice",
                    title: "Buy It Now Price"
                },
                {
                    field: "ReserveAmount",
                    title: "Reserve Amount"
                },
                {
                    field: "CurrentHighBid",
                    title: "Current High Bid"
                },
                {
                    field: "BeginTime",
                    title: "Begin Time"
                },
                {
                    field: "EndTime",
                    title: "End Time"
                },
                {
                    field: "HasEnded",
                    title: "Has Ended"
                },
                {
                    field: "Increment",
                    title: "Increment"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "WinningBidderUserId",
                    title: "Winning Bidder User Id"
                },
                {
                    field: "TypeId",
                    title: "Type Id"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function auctionDropDownEditor(container, options) {
        $('<input data-text-field="Identification" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: auctionDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "Identification",
        autoBind: false,
        optionLabel: "All",
        dataSource: auctionDataSource,
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