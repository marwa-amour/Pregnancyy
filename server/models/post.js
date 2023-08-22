const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
  title: String,
  explaintite:String,
  image:String,
  body:String,
  catagories: [String],
  likes: {type: Number}
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

module.exports =Post;