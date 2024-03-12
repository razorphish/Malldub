$(document).ready(function () {
    var crudServiceBaseUrl = "http://local.api.malldub.com/api";
    
    var donationDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donation",
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
                    OrderId: {
                        type: "number"
                    },
                    FeeTypeId: {
                        type: "string"
                    },
                    StatusId: {
                        type: "string"
                    },
                    Amount: {
                        type: "number"
                    },
                    ProcessingFee: {
                        type: "number"
                    },
                    BeneficiaryAmount: {
                        type: "number"
                    },
                    SystemAmount: {
                        type: "number"
                    },
                    DonorName: {
                        type: "string"
                    },
                    Email: {
                        type: "string"
                    },
                    Message: {
                        type: "string"
                    },
                    OfflineDonation: {
                        type: "boolean"
                    },
                    ThankYouNoteSent: {
                        type: "boolean"
                    },
                    DateEntered: {
                        type: "date"
                    },
                    IsPrivateAmount: {
                        type: "boolean"
                    },
                    IsPrivateDonorName: {
                        type: "boolean"
                    },
                    CostsCovered: {
                        type: "boolean"
                    }
                }
            }
        }
    });
    
    var donationFeeTypeDataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: crudServiceBaseUrl + "/donationFeeType",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/donationFeeType",
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/donationFeeType",
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            destroy: {
                url: function (o) {
                    return crudServiceBaseUrl + "/donationFeeType/" + o.Identification;
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
                    },
                    Description: {
                        type: "string"
                    },
                    SortOrderNumber: {
                        type: "number",
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
        dataSource: donationFeeTypeDataSource,
        detailInit: donationFeeTypeDetails,
        pageable: true,
        filterable: true,
        sortable: true,
        navigatable: true,
        columns: [
            {
                field: "Identification",
                title: "Identification",
                filterable: false,
                editor: donationDropDownEditor
            },
            {
                field: "FriendlyName",
                title: "Friendly Name"
            },
            {
                field: "Description",
                title: "Description"
            },
            {
                field: "SortOrderNumber",
                title: "Sort Order Number"
            },
            {
                command: ["edit", "destroy"]
            }],
        toolbar: kendo.template($("#template").html()),
        editable: "inline"
    });
    function donationFeeTypeDetails(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource:             {
                type: "json",
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/donation",
                        dataType: "json"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/donation",
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function (o) {
                            return crudServiceBaseUrl + "/donation/" + o.Identification;
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
                                type: "string"
                            },
                            OrderId: {
                                type: "number",
                                validation: { required: true }
                            },
                            FeeTypeId: {
                                type: "string"
                            },
                            StatusId: {
                                type: "string"
                            },
                            Amount: {
                                type: "number"
                            },
                            ProcessingFee: {
                                type: "number"
                            },
                            BeneficiaryAmount: {
                                type: "number"
                            },
                            SystemAmount: {
                                type: "number"
                            },
                            DonorName: {
                                type: "string"
                            },
                            Email: {
                                type: "string"
                            },
                            Message: {
                                type: "string",
                                validation: { required: true }
                            },
                            OfflineDonation: {
                                type: "boolean"
                            },
                            ThankYouNoteSent: {
                                type: "boolean"
                            },
                            DateEntered: {
                                type: "date",
                                validation: { required: true }
                            },
                            IsPrivateAmount: {
                                type: "boolean"
                            },
                            IsPrivateDonorName: {
                                type: "boolean"
                            },
                            CostsCovered: {
                                type: "boolean"
                            }
                        }
                    }
                },
                filter: { field: "FeeTypeId", operator: "eq", value: e.data.Identification },
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
                    template: "<a href='/api/donation/${ Identification }'>${ Identification }</a>",
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
                    field: "OrderId",
                    title: "Order Id"
                },
                {
                    field: "FeeTypeId",
                    title: "Fee Type Id"
                },
                {
                    field: "StatusId",
                    title: "Status Id"
                },
                {
                    field: "Amount",
                    title: "Amount"
                },
                {
                    field: "ProcessingFee",
                    title: "Processing Fee"
                },
                {
                    field: "BeneficiaryAmount",
                    title: "Beneficiary Amount"
                },
                {
                    field: "SystemAmount",
                    title: "System Amount"
                },
                {
                    field: "DonorName",
                    title: "Donor Name"
                },
                {
                    field: "Email",
                    title: "Email"
                },
                {
                    field: "Message",
                    title: "Message"
                },
                {
                    field: "OfflineDonation",
                    title: "Offline Donation"
                },
                {
                    field: "ThankYouNoteSent",
                    title: "Thank You Note Sent"
                },
                {
                    field: "DateEntered",
                    title: "Date Entered"
                },
                {
                    field: "IsPrivateAmount",
                    title: "Is Private Amount"
                },
                {
                    field: "IsPrivateDonorName",
                    title: "Is Private Donor Name"
                },
                {
                    field: "CostsCovered",
                    title: "Costs Covered"
                },
                {
                    command: ["edit", "destroy"]
                }],
            toolbar: kendo.template($("#template").html()),
            editable: "inline"
        });
    }

    function donationDropDownEditor(container, options) {
        $('<input data-text-field="DonorName" data-value-field="Identification" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: donationDataSource
            });
    }
    $("#toolbarFilter").kendoDropDownList({
        dataValueField: "Identification",
        dataTextField: "DonorName",
        autoBind: false,
        optionLabel: "All",
        dataSource: donationDataSource,
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