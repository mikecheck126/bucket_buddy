var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  items: [{type: Schema.Types.ObjectId, ref: "Item"}],
  created_at: {type: Date, default: Date.now}
});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
UserSchema.plugin(deepPopulate, {
	populate: {
    'items.user_id': {
      select: 'username'
    }
  }
});

UserSchema.path('username').required(true, 'Username cannot be empty');
UserSchema.path('username')
	.validate(function (v) {
	  return v.length >= 2;
	}, 'Username must be at least 2 chars');

UserSchema.path('email').required(true, 'Email cannot be empty');
UserSchema.path('email')
	.validate(function (v) {
	  return v.length >= 5;
	}, 'Email must be at least 5 chars');

UserSchema.path('password').required(true, 'Password cannot be empty');
UserSchema.path('password')
	.validate(function (v) {
	  return v.length >= 8;
	}, 'Password must be at least 8 chars');

mongoose.model('User', UserSchema);