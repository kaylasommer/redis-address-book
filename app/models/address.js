'use strict';

var Mongo  = require('mongodb');

function Address(obj, id){
  this._id     = new Mongo.ObjecID();
  this.name    = obj.name;
  this.color   = obj.color;
  this.twitter = obj.twitter;
  this.email   = obj.email;
  this.userId  = id;
}

Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.create = function(obj, id, cb){
  var address = new Address(obj, id);
  Address.collection.save(address, cb);
};

Address.findByUserId = function(userId, cb){
  Address.collection.find({userId: userId}).toArray(cb);
};
