const mongoose = require('mongoose');
const dbNames = require('../middleware/db_names.json');
const randomize = require('randomatic');

var schema =  new mongoose.Schema({
    "code": {type:String},
    "range_in_km":{type:Number,default:5},
   "created_user":{type:String,default:''},
   "created_time" :{type:Date, default:new Date()}
});

 schema.pre('save',async function(next){
        var test = this;
        var str1 = 'RN'; 
      	var rand = randomize('0', 4);
        const counts = await rangeModel.countDocuments({})
        test.code = str1.concat(rand + counts + 1);
      next();
 });

var rangeModel = mongoose.model(dbNames.ranges,schema);

exports.RangeModel = rangeModel;
