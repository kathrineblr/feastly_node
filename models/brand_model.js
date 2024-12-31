const mongoose = require('mongoose');
const dbNames = require('../middleware/db_names.json');
const randomize = require('randomatic');

var schema =  new mongoose.Schema({
    "code": {type:String},
    "name":{type:String,default:''},
   "created_user":{type:String,default:''},
   "created_time" :{type:Date, default:new Date()}
});

 schema.pre('save',async function(next){
        var test = this;
        var str1 = 'BR'; 
      	var rand = randomize('0', 4);
        const counts = await brandModel.countDocuments({})
        test.code = str1.concat(rand + counts + 1);
      next();
 });

var brandModel = mongoose.model(dbNames.brands,schema);

exports.BrandModel = brandModel;
