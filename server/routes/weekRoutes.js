const express = require('express');
const router = express.Router();

const { getWeekById, getAllWeeks} = require('../controllers/weekController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', getAllWeeks);
router.get('/:id',authenticateUser, authorizeUser(['Admin','User']),getWeekById);

module.exports = router;