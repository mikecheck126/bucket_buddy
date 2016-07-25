var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

module.exports = {
  create: function(req, res) {
    new Item(req.body).save(function (err, result){
      if(err){console.log(err);}
      else {
        User.findByIdAndUpdate(result.user_id, {$push: {items: result._id}}, function (err, result){
          if(err){console.log(err);}
        });
        User.findByIdAndUpdate(req.body.shared_id, {$push: {items: result._id}}, function (err, result){
          if(err){console.log(err);}
        });
        res.send("Item added");
      }
    });
  },
  update: function(req, res) {
    Item.findByIdAndUpdate(req.params.id, {$set: {done: req.body.completed}}, function (err, result){
      if(err){console.log(err);}
      else {
        res.send("Item added");
      }
    });
  }
};