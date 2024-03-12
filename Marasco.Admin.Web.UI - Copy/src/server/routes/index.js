module.exports = function (app) {
  var api = '/api';
  var data = '/../../data/';
  var jsonfileservice = require('./utils/jsonfileservice')();
  var dummydataservice = require('./utils/dummyDataJsonFileService')();
  var azure = require('azure-storage');
  var accessKey = '[accountKey]';
  var storageAccount = '[accountName]';
  var containerName = 'img';

  //app.get(api + '/customer/:id', getCustomer);
  app.get(api + '/customers', getCustomers);
  app.get(api + '/tab', getTabs);
  app.get(api + '/tab/:tabSetName', getTabs);
  //app.post(api + '/getDummyData', getDummyData);
  //upload a file to azure blob storage
  app.get(api + '/upload', uploadFileForm);
  app.post('/upload', uploadFile);

  // function getCustomer(req, res, next) {
  //   var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
  //   var customer = json.filter(function (c) {
  //     return c.id === parseInt(req.params.id);
  //   });
  //   res.send(customer[0]);
  // }

  function getTabs(req, res, next) {
    var json = jsonfileservice.getJsonFromFile(data + 'tab.json');
    var tabs = json.filter(function (t) {
      if (req.params.tabSetName) {
        return t.tabSetName === req.params.tabSetName;
      } else {
        return true;
      }

    });
    res.send(tabs);
  }

  function getCustomers(req, res, next) {
    var json = jsonfileservice.getJsonFromFile(data + 'customers.json');
    res.send(json);
  }

  // function getDummyData(req, res, next) {
  //   /** entity name should be same as the file name
  //    * for the json */
  //   var json = dummydataservice.getJsonFromFile(data + req.body.entity + '.json');
  //   res.send(json);
  // }

  function uploadFileForm(req, res) {
    res.send(
      '<form action="/upload" method="post" enctype="multipart/form-data">' +
      '<input type="file" name="snapshot" />' +
      '<input type="submit" value="Upload" />' +
      '</form>'
    );
  }

  function uploadFile(req, res) {
    var multiparty = require('multiparty');

    var blobService = azure.createBlobService(storageAccount, accessKey);
    var form = new multiparty.Form();

    form.on('part', function (part) {
      if (part.filename) {

        var size = part.byteCount - part.byteOffset;
        var name = part.filename;

        blobService.createBlockBlobFromStream(containerName, name, part, size, function (error) {
          if (error) {
            res.send(' Blob create: error ');
          }
        });
      } else {
        form.handlePart(part);
      }
    });
    form.parse(req);
    res.send('OK');
  }
};
