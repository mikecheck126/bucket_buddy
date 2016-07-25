var mongoose  = require('mongoose'),
    User      = mongoose.model('User'),
    bcrypt    = require("bcryptjs"),
    _         = require('lodash'),
    jwt       = require('jsonwebtoken')
    tokenSalt = "unicorngiraffepineapplepepper";

function createToken (user) {
  return jwt.sign(_.pick(user, '_id', 'username'), tokenSalt, { expiresIn: 60*60*24*31*3 }); //expires in 3 months
}

module.exports = {
  all: function(req, res) {
    User.find({_id: {$ne: req.params.id}}, "_id username", function (err, result){
      if(err) {res.status(500).send("Couldn't find users.");}
      else {res.status(200).send(result);}
    });
  },
  get_one: function(req, res) {
    User.findOne({_id: req.params.id}, "items username")
      .deepPopulate(["items.user_id"])
      .exec(function (err, result){
        if(err) {res.status(500).send("Couldn't find user.");}
        else {res.status(200).send(result);}
      });
  },
  nav_get_one: function(req, res) {
    User.findOne({_id: req.params.id}, "_id username", function (err, result){
      if(err) {res.status(500).send("Couldn't find user.");}
      else {res.status(200).send(result)}
    });
  },
  login: function(req, res) {
    if (!req.body.email || !req.body.password) {res.status(400).send("Please enter your email and password.");}
    else {
      User.findOne({email: req.body.email}, function (err, result) {
          if (result) {
            bcrypt.compare(req.body.password, result.password, function(err, verified) {
              if (err) {res.status(400).send("Email or password don't match.")}
              else if(verified) {
                var user = _.pick(result, 'username', "_id");
                res.status(200).send({id_token: createToken(user)});
              }
              else {res.status(400).send("Email or password don't match.")}
            });
          }
          else res.status(400).send("Email or password don't match.");
        });
    }
  },
  create: function(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.confirm_password) {
      res.status(400).send("Please enter a username, email, password, and password confirmation.");
    }
    else if (req.body.password != req.body.confirm_password) {
      res.status(400).send("Password and password confirmation don't match.");
    }
    else {
      User.find({email: req.body.email}, function (err, result){
        if (result.length === 0) {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) {res.status(500).send("Couldn't save password properly.");}
            else {
              var user = _.pick(req.body, 'username', 'email');
              user.password = hash;
              new User(user).save(function (err, result) {
                if (err) {res.status(500).send("Couldn't save user.");}
                else {
                  var user = _.pick(result, 'username', "_id");
                  res.status(201).send({id_token: createToken(user)});
                }
              });
            }

          });
        }
        else {res.status(400).send("User with that username or email already exists.");}
      });
    }
  }
};