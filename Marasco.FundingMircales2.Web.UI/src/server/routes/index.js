module.exports = function (app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();
    var dummydataservice = require('./utils/dummyDataJsonFileService')();

    app.get(api + '/customer/:id', getCustomer);
    app.get(api + '/customers', getCustomers);
    app.get(api + '/campEnrollRightFields', getCampEnrollRightFields);
    app.get(api + '/campEnrollLeftFields', getCampEnrollLeftFields);
    app.get(api + '/campEnrollDlrAttrFields', getCampEnrollDlrAttrFields);
    app.get(api + '/campaignListFields', getCampaignListFields);
    /** Dummy Data Api */
    app.get(api + '/dummyCustomers', getDummyCustomers);
    app.post(api + '/getDummyData', getDummyData);

    function getCustomer(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
        var customer = json.filter(function (c) {
            return c.id === parseInt(req.params.id);
        });
        res.send(customer[0]);
    }

    function getCustomers(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
        res.send(json);
    }

    function getCampEnrollRightFields(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'campEnrollRightFields.json');
        res.send(json);
    }

    function getCampEnrollLeftFields(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'campEnrollLeftFields.json');
        res.send(json);
    }

    function getCampEnrollDlrAttrFields(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'campEnrollDlrAttrFields.json');
        res.send(json);
    }

    function getCampaignListFields(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'campaignListFields.json');
        res.send(json);
    }

    /** Api calls for dummy data exposed */
    /** Dummy data calls */
    function getDummyCustomers(req, res, next) {
        var json = dummydataservice.getJsonFromFile(data + 'dummyCustomers.json');
        res.send(json);
    }

    function getDummyData(req, res, next) {
        /** entity name should be same as the file name
         * for the json */
        var json = dummydataservice.getJsonFromFile(data + req.body.entity + '.json');
        res.send(json);
    }
};
