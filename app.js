var express = require('express');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine' , 'ejs');

mongoose.connect(config.getDbconnectionString());

app.listen(port);