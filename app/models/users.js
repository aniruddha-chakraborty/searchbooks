var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var bcrypt  = require('bcrypt');
var SALT_FOR_WORK_FACTOR  = 10;

var UserSchema = new Schema({

		shopname: String,
		username: { type: String, required: true, index:{ unique: true }},
		password: { type: String, required: true , select: true },
		shoplocation: { type: String, required: true },

});

UserSchema.pre('save',function(next){

	var user = this;

		if (!user.isModified('password')) {
			return next();
		}

		bcrypt.genSalt(SALT_FOR_WORK_FACTOR,function(err,salt){

				if (err) {
					return next(err);
				}

				bcrypt.hash(user.password,salt,function(err,hash){
						if (err) {
							return next(err);
						}
						user.password = hash;
						next();
				});

		});

});

UserSchema.methods.comparePassword = function(candidatePassword,cb){

	bcrypt.compare(candidatePassword,this.password,function(err,isMatch){

			if (err) {
				cb(err);
			}

			cb(null,isMatch);

	});

}


module.exports = mongoose.model('Users',UserSchema);