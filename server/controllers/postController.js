const Joi = require('joi');
const Post = require('../models/post');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Joi validation schema for post data
const postSchema = Joi.object({
  title: Joi.string(),
  explaintite: Joi.string(),
  image:Joi.string(),
  body:Joi.string(),
  catagories: Joi.array().items(Joi.string()),
  likes: Joi.number()

});

const getAllPosts = async (req, res, next) => {
  try{
    const { page=1, limit=25 } = req.query;

    if (limit>50) limit = 50;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const posts = await Post.paginate({}, options);

    const postsFixed = { ...posts };
    postsFixed.data = postsFixed.docs;
    delete postsFixed.docs;

    return res.status(200).json(postsFixed)

  } catch (error) {

    next (error);

  }
};

// Get a single post by ID
const getPostById = async (req, res, next) => {
  try {
  
    const post = await Post.findById(new ObjectId(req.params.id));
    
    // Couldn't find post with this id
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ data: post });

  } catch (error) {
    next(error);
  }
}

// Create a new post
const createPost = async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body);
    if(error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const post = await Post.create(req.body);
    res.status(200).json({ created: post });
  } catch (error) {
    next(error);
  }
}

// Update an existing post by ID
const updatePost = async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body);

    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.body.likes++;
    const post = await Post.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {
      new:true
    });

    if(!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ updated: post });
  } catch (error) {
    next(error);
  }
}

// Delete an existing post by ID
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndRemove(new ObjectId(req.params.id));

    if(!post) {
      res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ deleted: post });
  } catch (error) {
    next(error)
  }
}

// Search posts by 'title' and\or 'releasedYear'
const searchPosts = async(req, res, next) => {
  const { title } = req.query;
  const searchQuery = {};

  if (title) {
    searchQuery.title = { $regex: title, $options: 'i' }
  };
  
  try {
    
    const posts = await Post.find(searchQuery);

    if (!posts.length) {
      return res.status(404).json({ error: 'The search query returned no results' })
    }

    return res.status(200).json({ data: posts });

  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPosts, getPostById, updatePost,createPost, deletePost, searchPosts};