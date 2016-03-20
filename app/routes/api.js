var users = require('./../models/users');
var books = require('./../models/books');
var ejs   = require('ejs');

module.exports = function (app, express) {

	var api = express.Router();


	api.get('/',function (req,res){

			res.render(ejs.render('index.ejs'));

	});

	return api;

}