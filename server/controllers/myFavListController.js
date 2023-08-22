const Joi = require('joi');
const Favorite = require('../models/favorite');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

// Get the movie list of the logged-in user
const getMyPostList = async (req, res, next) => {
  
  const { id } = req.user;

  const favorite = await Favorite.find({userId: new ObjectId(id)});

  if (!favorite.length) {
    return res.status(404).json({ error: 'Could not find a post list for this user' });
  }

  return res.status(200).json({ data: favorite });

}

// // Add a movie to the user's list
const addPostToList = async (req, res, next) => {

  const schema = Joi.object({
    postId: Joi.string().required(),
    myComment: Joi.string().default(' ')
  });

  const { error } = schema.validate(req.body);
  if(error) {
    return res.status(400).json({ error: error.details[0].message });
  };

  const userId = req.user.id;

  const { postId, myComment } = req.body;

  try {

    // does movie exists in database ?
    const foundPost = await Favorite.find({postId});
    if (!foundPost) {
      return res.status(400).json({ error: 'This post does not exists in database' });
    };

    // is movie already in the user's movie list ?
    const postAlreadyInUserList = await Favorite.find({userId: new ObjectId(userId), postId: new ObjectId(postId)});
    console.log(postAlreadyInUserList);

    if (postAlreadyInUserList.length) {
      return res.status(400).json({ error: 'This post is already in your list' });
    };

    // add the movie to the list
    const addedPost = await Favorite.create({
      userId,
      postId,
      myComment
    });

    return res.status(200).json({ created: addedPost });
    
  } catch (error) {
    next(error);
  }


}

// // Delete a movie from the user's list
const deletePostFromList = async (req, res, next) => {

  const userId = req.user.id;
  const { id } = req.params;

  try {

    const deletePost = await Favorite.findByIdAndRemove({_id: new ObjectId(id)});
    if(!deletePost) {
      return res.status(404).json({ error: 'This object id does not exist' });
    }
  
    return res.status(200).json({ deleted: deletePost });

  } catch(error) {
    next(error);
  }

}

module.exports = {getMyPostList,addPostToList,deletePostFromList};