const express = require('express');
const router = express.Router();

const { getSportById, getAllSports} = require('../controllers/sportController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', getAllSports);
router.get('/:id',authenticateUser, authorizeUser(['Admin','User']),getSportById);

module.exports = router;