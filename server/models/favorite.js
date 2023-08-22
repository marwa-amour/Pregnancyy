const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const favoriteSchema = new mongoose.Schema({
    userId:{type: ObjectId,ref:'User',required:true},
    postId: { type: ObjectId,ref: 'Post' },
    myComment:{type:String,default:" "}
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;