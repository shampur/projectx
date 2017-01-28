/**
 * Created by cshampur on 1/16/17.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = require('./config/database');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var logger = require('./config/logger');
var bluebird = require('bluebird');
// Api Endpoints
var userRoute = require('./app/users/usersroute');
mongoose.Promise = bluebird;
mongoose.connect(database.localUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    logger.info("Mongo DB connection successfull");
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/users',userRoute);
app.use(express.static(path.join(__dirname, 'client')));

// This is an error handler for all the Internal server errors.
app.use(function(err, req, res, next){
    if(err.status !== '500' || err.status !== '501')
        return next();

    res.status(err.status).send(err.message || 'Internal server error');
});

app.listen(port);
logger.info("App listening on port :"+ port);