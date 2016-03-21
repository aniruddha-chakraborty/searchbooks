var Users = require('./../models/users');
var Books = require('./../models/books');
var ejs   = require('ejs'),
   	util = require("util"),
	path  = require('path'),
	fs 	  = require('fs');

module.exports = function (app, express) {

	var web = express.Router();

	web.get('/',function (req,res){

			if (req.session.userId == undefined) {
			
				res.redirect('/login');
			
			} else {

				var title = 'Dashboard';
				res.render('index.ejs',{ title: title });
				
			}

	});

	web.route('/login')

	   .get(function( req,res ){

	   		if (req.session.userId == undefined) {

					var title = 'Login';
					error 	  = [];
					res.render('login.ejs',{ title : title , error: error });
	   		
	   		} else {

	   			res.redirect('/');
	   		
	   		}

		})

		.post(function( req,res,next ) {

			var username = req.body.username;
			var password = req.body.password;
			var view 	 = 1;
			
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

							Users.findOne({username: username }, function(err,user){

								if (err) {

										throw err;

									} else {
										
										user.comparePassword(password,function(err,isMatch) {

											if (err) {
											
												throw err;

											}												
												if (isMatch == true) {

													req.session.userId = user._id;
													res.redirect('/');

												} else {

													error.push('Username and password didn\'t match');
												}

										});

									}

							});
					}

				});

			}
						
			// res.render('login.ejs',{ title : title , error: error });


	});

	web.get('/logout',function( req,res ) {

		req.session.destroy(function(e){ res.redirect('/login');});

	});

	
	web.route('/signup')

	   .get(function(req,res){

	   		if (req.session.userId == undefined) {
		   		var title = 'Signup';
		   		var error = [];
		   		var success = false;

		   		res.render('signup.ejs',{ title : title , error: error , success: success });
	   		
	   		} else {

	   			res.redirect('/');

	   		}

	   })

	   .post(function(req,res){

	   	 if (req.session.userId == undefined) {

	   		var title = 'Signup';
	   		var error = [];
	   		var success = false;

	   		var bookstall = req.body.bookstall;
	   		var address   = req.body.address;
	   		var username  = req.body.username;
	   		var password  = req.body.password;
	   		var rpassword = req.body.rpassword;

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


				Users.count({ username:username },function(err,count) {

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
							error.push('There was a problem while saving..');
							return;
						}

				});

			}

			if (error.length == 0) {
				success = true;
			}

			
	   		res.render('signup.ejs',{ title : title , error: error , success: success });
	   	
	   	} else {

	   		res.redirect('/login');
	   	}

	   });

	web.route('/add-books')

		.get(function(req,res) {

				var title = 'Add books';
				var error = [];
				var success = false;

				res.render('add_books.ejs',{ title: title , error: error , success: success});
			

		})

		.post(function(req,res) {

		

			/*
				var title = 'Add books';
				var error = [];
				var success = false;


				var bookname = req.body.bookname;
				var writtersname = req.body.writtersname;
				var keywords 	= req.body.keywords;
				var temppath = req.files;
				var targetPath	= path.resolve('./public/assets/images'+req.files);

				console.log(temppath+'\n');

				if (!bookname || !writtersname || !keywords || !req.files.image.name) {

						error.push('Please fill all the fields!');

				}

				if (bookname.length < 3) {

					error.push('Please enter correct book name');
				}

				if (keywords.length < 3 ) {

					error.push('Please enter more keywords');

				}


				  if ((path.extname(req.files.image.name).toLowerCase() !== '.jpg') || (path.extname(req.files.image.name).toLowerCase() !== '.jpeg') || (path.extname(req.files.image.name).toLowerCase() !== '.png')) {

				  	error.push('We only accept jpg , jpeg and png images');
				  }

				  if (error.length === 0) {

				  	var books = Books({

						bookname: bookname,
						bookkeeper: username,
						writter: password,
						image: targetPath,
						keywords: keywords,
						popular: 0

					});

				  	books.save(function(err){

						if (err) {
							error.push('There was a problem while saving..');
						}

				  		fs.rename(temppath,targetPath,function(err) {

				  				if (err) {

				  					throw err;
				  				
				  				} else {

				  					console.log("picture uploaded");
				  				
				  				}
				  		});


					});

				 }

				res.render('add_books.ejs',{ title: title , error: error , success: success});

			*/

		});


	web.get('/book-list',function( req,res ) {


			if (req.session.userId !== undefined) {
				
				var title = 'Book list';
				var userId = req.session.userId;
				var books;
				
				console.log(userId);

				res.render('book_list.ejs',{ title:title });

					Users.findOne({bookkeeper: userId }, function(err,book){

						if (err) {
							
							throw err;
						
							} else {

							console.log(book);
						}

					});

					//console.log(books);

				} else {

				res.redirect('/login');
			}


	});

	web.get('/404',function( req,res ){


	});

	return web;

}