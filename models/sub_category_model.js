const mongoose = require('mongoose');
const dbNames = require('../middleware/db_names.json');
const randomize = require('randomatic');

var schema =  new mongoose.Schema({
    "code": {type:String},
    "category":{type:String,default:''},
    "name":{type:String,default:''},
   "created_user":{type:String,default:''},
   "created_time" :{type:Date, default:new Date()}
});

 schema.pre('save',async function(next){
        var test = this;
        var str1 = 'SCAT'; 
      	var rand = randomize('0', 4);
        const counts = await subCategoryModel.countDocuments({})
        test.code = str1.concat(rand + counts + 1);
      next();
 });

var subCategoryModel = mongoose.model(dbNames.sub_categories,schema);

exports.SubCategoryModel = subCategoryModel;
