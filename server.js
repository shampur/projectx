/**
 * Created by cshampur on 1/16/17.
 */

var express = require('express');
var app = express();
var mongose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port);
console.log("App listening on port :" + port);