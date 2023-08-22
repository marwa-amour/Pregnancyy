const express = require('express');
const router = express.Router();

const {getMyPostList,addPostToList, deletePostFromList} = require('../controllers/myFavListController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', authenticateUser, authorizeUser(['User','Admin']), getMyPostList);
router.post('/', authenticateUser, authorizeUser(['User','Admin']), addPostToList);
router.delete('/:id', authenticateUser, authorizeUser(['User','Admin']), deletePostFromList);

module.exports = router; 