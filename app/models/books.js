var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var BooksSchema = new Schema ({

		bookname: String,
		bookkeeper: String,
		writter: [String],
		image: String

});


module.exports = mongoose.model( 'Books' , BooksSchema);