var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: {type: Boolean, default: false},
  user_id: {type: Schema.Types.ObjectId, ref: "User"},
  created_at: {type: Date, default: Date.now}
});
ItemSchema.path('title').required(true, 'Title cannot be empty');
ItemSchema.path('title')
	.validate(function (v) {
	  return v.length >= 5;
	}, 'Title must be at least 5 chars');
ItemSchema.path('description').required(true, 'Description cannot be empty');
ItemSchema.path('description')
	.validate(function (v) {
	  return v.length >= 10;
	}, 'Description must be at least 10 chars');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
ItemSchema.plugin(deepPopulate);

mongoose.model('Item', ItemSchema);