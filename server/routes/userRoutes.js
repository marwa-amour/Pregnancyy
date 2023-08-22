const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser,updateScore, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', authenticateUser, authorizeUser(['Admin']), getAllUsers);
router.get('/:id', authenticateUser, authorizeUser(['Admin','User']), getUserById);
router.post('/', authenticateUser, authorizeUser(['Admin','User']), createUser);
router.put('/:id', authenticateUser, authorizeUser(['Admin','User']), updateUser);
router.put('/addScore/:id', authenticateUser, authorizeUser(['Admin','User']), updateScore);
router.delete('/:id', authenticateUser, authorizeUser(['Admin']), deleteUser);

module.exports = router;