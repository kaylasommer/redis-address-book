'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.login = function(req,res){
  res.render('users/login');
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      //make a cookie
      req.session.userId = user._id;
      req.session.save(function(){
        res.redirect('/');
      });
    }else{
      res.redirect('/login');
    }
  });
};

