/**
 * Created by cshampur on 1/16/17.
 */

var express = require('express');
var app = express();
var mongose = require('mongoose');
var port = process.env.PORT || 3000;
var database = require('./config/database');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var logger = require('./config/logger');

// Api Endpoints
var userRoute = require('./app/users/usersroute');

mongoose.connect(database.localUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    logger.info("Mongo DB connection successfull");
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/users',userRoute);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port);
logger.info("App listening on port :"+ port);