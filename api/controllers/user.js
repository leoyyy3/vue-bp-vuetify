var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app = express();
app.set('secret', 'temp');
// Connecting models
var User = require('../models/user');

//module.exports
exports.createUser = function(req, res) {
    User.count( {email: req.body.email}, function(err, count){
    if (count > 0) {
      if (!err) { err = 'User already exists'}
      res.json({success: false, message: 'Error creating user', err: err});
    } else {
      var user = new User();
      user.email = sanitizeHtml(req.body.email);
      user.password = sanitizeHtml(req.body.password);
      user.save();
      res.json({ success: true, message: 'User created'});
    }
  });
};

exports.userLogin = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err)
        res.send(err);
      else if (!user) {
        res.json({success: false, message: 'Please create an account'});
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, valid) {
          if (valid === true) {
          // password matches
          var token = jwt.sign({user: user.email}, app.get('secret'));
          res.json({success: true, message: 'Login sucessful', token: token, userid: user._id});
        } else if (valid === false) {
          // password does not match
          res.json({ success: false, message: 'Login failed. Incorrect password!'});
      }
    });
    }
  });
};

  exports.updateUser = function(req, res) {
    var userReq = req.body;
    var updReq = {};
    User.find({email: userReq.email}, function(err, user){
      if (err) {
        res.json(err);
      }
      if (user.length < 1) {
        res.json('No account exsists');
      }
      if (userReq.newEmail) {
        updReq.email = userReq.newEmail;
      }
      if (!updReq) {
        res.json({error: 'Bad data'});
    } else {
      User.update({email: userReq.email}, updReq, {}, function(err, newUser) {
        if (err) {
          res.send(err);
        }
        console.log(user);
        res.json({message: "update sucess"});
      });
    }
  });
};
