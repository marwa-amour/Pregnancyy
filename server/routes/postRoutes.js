const express = require('express');
const router = express.Router();

const { getPostById, getAllPosts, updatePost,createPost, deletePost, searchPosts} = require('../controllers/postController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/search',authenticateUser, authorizeUser(['Admin','User']), searchPosts);
router.get('/', getAllPosts);
router.get('/:id',authenticateUser, authorizeUser(['Admin','User']),getPostById);
router.post('/',authenticateUser, authorizeUser(['Admin']),createPost);
router.put('/:id',authenticateUser, authorizeUser(['Admin','User']),updatePost);
router.delete('/:id',authenticateUser, authorizeUser(['Admin']),deletePost);



module.exports = router;