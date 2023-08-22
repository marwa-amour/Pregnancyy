const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: String,
  image:String,
  body:String,
  timeplay:Number //number in second
});
const Sport = mongoose.model('Sport', sportSchema);

module.exports =Sport;