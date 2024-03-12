// server.js
var express = require('express');

var app = module.exports = express();

// Here we require the prerender middleware that will handle requests from Search Engine crawlers
// We set the token only if we're using the Prerender.io service
app.use(require('prerender-node')
    //.set('prerenderServiceUrl', 'http://localhost:3000/')
    .set('prerenderToken', 'kfm4Jj5wiN3TDQEvgqlI'));
app.use(express.static("public"));


// This will ensure that all routing is handed over to AngularJS
app.get('*', function (req, res) {
    var applicationDirectory = __dirname + '/index.html';
    console.log('Going to directory: ' + applicationDirectory);
    res.sendFile(applicationDirectory);
});

var port = 1337;
app.listen(process.env.port || port);
console.log("Go Prerender Go! Listening on port: " + port + '...');