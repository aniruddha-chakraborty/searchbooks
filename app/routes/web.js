var Users = require('./../models/users');
var books = require('./../models/books');
var ejs   = require('ejs');

module.exports = function (app, express) {

	var web = express.Router();

	web.get('/',function (req,res){
			var title = 'Dashboard';

			res.render('index.ejs',{ title: title });

	});

	web.route('/login')

	   .get(function( req,res ){

		var title = 'Login';
		error 	  = [];
		res.render('login.ejs',{ title : title , error: error });

		})

		.post(function( req,res ) {

			var username = req.body.username;
			var password = req.body.password;
			
			var title 	 = 'Login';
			var error 	 = [];

			if (!username || !password) {

				error.push('Username and password is missing .');
			}

			if ( (password) && password.length < 3 ) {

				error.push('Password is too small');
			
			}

			if ( error.length < 1 ) {

					Users.count({ username:username },function(err,count){

							if (count == 0) {

								// login the user

							}

					});

			}

			res.render('login.ejs',{ title : title , error: error });	

	});

	web.get('/logout',function( req,res ) {



	});

	
	web.route('/signup')

	   .get(function(req,res){
	   		var title = 'Signup';
	   		res.render('signup.ejs',{ title:title });

	   })

	   .post(function(req,res){

	   		var title = 'Signup';
	   		var error = [];

	   		var bookstall = req.body.bookstall;
	   		var address   = req.body.address;
	   		var username = req.body.username;
	   		var password = req.body.password;
	   		var rpassowrd = req.body.rpassowrd;


	   		if (!username || !password || !address || !bookstall || !rpassowrd) {

				error.push('Please fill up the every field in the box');
			}

			if ( (password) && password.length < 3 ) {

				error.push('Password is too small');
			
			}

			if (bookstall.length < 3) {
				
				error.push('bookstall name is too short');
			}


			
	   		res.render('signup.ejs',{title:title});

	   });


	web.get('/book-list',function( req,res ){


	});

	web.get('/add-books',function(req,res){


	});

	web.get('/404',function( req,res ){


	});

	return web;

}