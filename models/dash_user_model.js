const mongoose = require('mongoose');
const dbNames = require('../middleware/db_names.json');
const randomize = require('randomatic');

var schema =  new mongoose.Schema({
    "code": {type:String},
    "name":{type:String,default:''},
    "phone":{type:String,default:''},
    "user_name":{type:String,default:''},
    "password":{type:String,default:''},
    "address":{type:String,default:''},
    "role":{type:String,default:''},
    "token":{type:String,default:''},
   "created_user":{type:String,default:''},
   "created_time" :{type:Date, default:new Date()}
});

 schema.pre('save',async function(next){
        var test = this;
        var str1 = 'D'; 
      	var rand = randomize('0', 4);
        const counts = await dashUserModel.countDocuments({})
        test.code = str1.concat(rand + counts + 1);
      next();
 });

var dashUserModel = mongoose.model(dbNames.dash_users,schema);

exports.DashUserModel = dashUserModel;
