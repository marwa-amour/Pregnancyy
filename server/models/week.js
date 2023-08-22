const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
    weeksnumber: {type:Number, min:1, max:40},
    title:{type:String , require:true},
    image:{type:String, require:true},
    whatHappen: {type:String}
});


const Week = mongoose.model('Week', pregnancySchema);

module.exports = Week;