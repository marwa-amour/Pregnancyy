const Joi = require('joi');
const Sport = require('../models/sport');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const getAllSports = async (req, res) => {
  try{

    const sports = await Sport.find();
    return res.status(200).json({ data: sports });
    // return res.send(weeks);

  } catch (error) {
    return res.status(500).send(error.message);

  }
};

// Get a single sport by ID
const getSportById = async (req, res, next) => {
  try {
  
    const sport = await Sport.findById(new ObjectId(req.params.id));
    
    // Couldn't find sport with this id
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    res.status(200).json({ data: sport });

  } catch (error) {
    next(error);
  }
}

module.exports = { getAllSports, getSportById};