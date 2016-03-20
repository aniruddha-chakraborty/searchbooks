var Users = require('./../models/users');
var books = require('./../models/books');
var ejs   = require('ejs');

module.exports = function (app, express) {

	var web = express.Router();

	web.get('/',function (req,res){

			if (req.session.userId == undefined) {
				res.redirect('/login');
			}

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

							if (count == 0){

								error.push('Username is not executed!');

								} else {

									Users.findOne({username: username }, '_id' , function(err,user){

											if (err) {

												return err;

											} else {

												req.session.userId = user._id;
												res.redirect(200,'/');

											}

									});
							}
							console.log(count);

					});

			}

			res.render('login.ejs',{ title : title , error: error });	

	});

	web.get('/logout',function( req,res ) {



	});

	
	web.route('/signup')

	   .get(function(req,res){

	   		var title = 'Signup';
	   		var error = [];
	   		var success = false;

	   		res.render('signup.ejs',{ title : title , error: error , success: success });

	   })

	   .post(function(req,res){

	   		var title = 'Signup';
	   		var error = [];
	   		var success = false;

	   		var bookstall = req.body.bookstall;
	   		var address   = req.body.address;
	   		var username  = req.body.username;
	   		var password  = req.body.password;
	   		var rpassword = req.body.rpassword;
	   		console.log(bookstall + ' ' + address + ' '  + username + ' ' + password + ' ' + rpassword);

	   		if (!username || !password || !address || !bookstall || !rpassword) {

				error.push('Please fill up the every field in the box');
			}

			if ( (password) && password.length < 3 ) {

				error.push('Password is too small');
			
			}

			if (bookstall.length < 3) {
				
				error.push('bookstall name is too short');
			}

			if (password !== rpassword) {

				error.push('Password did\'nt match');
			
			}


				Users.count({ username:username },function(err,count){

						if (count > 0) {

							error.push('Username already exists!');
						}

				});



			if (error.length == 0) {

				var users = Users({

						shopname: bookstall,
						username: username,
						password: password,
						shoplocation: address

				});

				users.save(function(err){

						if (err) {
							res.send(err);
							error.push('There was a problem while saving..');
							return;
						}

				});

			}

			if (error.length == 0) {
				success = true;
			}

			
	   		res.render('signup.ejs',{ title : title , error: error , success: success });

	   });


	web.get('/book-list',function( req,res ){


	});

	web.get('/add-books',function(req,res){


	});

	web.get('/404',function( req,res ){


	});

	return web;

}