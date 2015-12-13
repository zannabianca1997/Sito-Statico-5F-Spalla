"use strict";

var express = require('express');
var port    = process.env.PORT || 8080;
var app     = express();
var router  = require('./router');

app.use('/', router);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://'+host+port);
});