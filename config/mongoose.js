var mongoose=require('mongoose');
var config=require('./config.js');

module.exports=function () {
  require('../models/user.server.model.js');
  db=mongoose.connect(config.mongodb,{"useMongoClient":true});

  return db;
};