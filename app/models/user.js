'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(){
}

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.all = function(cb){
  User.collection.find().toArray(cb);
};


User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(user);
  });
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

module.exports = User;
