const mongoose = require('mongoose');
const maximum=new Date();
var minimum=new Date(maximum.getFullYear(),maximum.getMonth(),parseInt(maximum.getDate())-279);
const userSchema = new mongoose.Schema({
    firstName: { type: String, minlength: 4, maxlength: 12, require: true },
    lastName: { type: String, minlength: 4, maxlength: 12, require: true },
    email: { type: String, match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, require: true},
    password: { type: String,match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, require: true },
    role: { type: String, default: 'User', require: true },
    menstrualCycle: { type:Date, min: minimum, max: maximum},
    profilePicture: { type: String, required: true, default: "https://media.istockphoto.com/id/1309468161/vector/pregnant-young-woman.jpg?s=612x612&w=0&k=20&c=NPsKnNIGSjQBXpRVDCdCTjf7uvghLAwUH5Se7ncE5jk=" },
    myScore: {type:Number, default:0},
    height:{type:Number,require:true,min:140,max:200},
    weight:{type:Number,require:true,min:40,max:150}
});
const User = mongoose.model('User', userSchema);

module.exports = User;