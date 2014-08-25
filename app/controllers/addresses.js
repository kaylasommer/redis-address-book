'use strict';

var Address = require('../models/address');

exports.new = function(req, res){
  res.render('addresses/new');
};

exports.index = function(req, res){
  res.render('addresses/index');
};

exports.create = function(req, res){
  Address.create(req.body, res.locals.user._id, function(err, address){
    res.redirect('/addresses');
  });
};
