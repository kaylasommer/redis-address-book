'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.create = function(req, res){
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };
  User.register(credentials, function(err, user){
    var credentials = {
      email: req.body.email,
      password: req.body.password
    };
    User.authenticate(credentials, function(user){
      if(user){
        req.session.regenerate(function(){
          req.session.userId = user._id;
          req.session.save(function(){
            res.redirect('/');
          });
        });
      }else{
        res.redirect('/register');
      }
    });
  });
};

exports.login = function(req,res){
  //console.log('looking into res.locals');
  //console.log(res.locals);
  res.render('users/login');
};

exports.authenticate = function(req, res){
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };
  User.authenticate(credentials, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

