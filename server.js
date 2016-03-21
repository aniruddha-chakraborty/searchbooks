var express = require('express'),
	morgan 	= require('morgan'),
	config  = require('./databaseConfig.js'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	methodOverride = require('method-override');

var app = express();


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use('/assets',express.static(__dirname + '/public/assets'));
app.use(methodOverride());
app.set('view engine','ejs');
app.use(cookieParser());
app.use(expressSession({ resave: true ,secret: '123456' , saveUninitialized: true}));


mongoose.connect(config.database,function(err) {

	if (!err) {

		console.log("Connecttion established!");
	
		} else {

		console.log(err);
	}

});


var web = require('./app/routes/web')(app,express);
var api = require('./app/routes/api')(app,express);

app.use('/',web);
app.use('/api',api);

app.listen(config.port,function(err){

	if (!err) {
		console.log("server running...");
	}

});