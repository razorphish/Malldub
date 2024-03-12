var azure = require('azure-storage');

var accessKey = '[accountKey]';
var storageAccount = '[accountName]';
var containerName = 'img';

//create a blob service set explicit credentials
var blobService = azure.createBlobService(storageAccount, accessKey);
