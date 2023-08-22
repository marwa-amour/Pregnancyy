const Joi = require('joi');
const Week = require('../models/week');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const getAllWeeks = async (req, res,next) => {
  try{

    const weeks = await Week.find();
    return res.status(200).json({ data: weeks });
    // return res.send(weeks);

  } catch (error) {
    return res.status(500).send(error.message);

  }
};

// Get a single week by ID
const getWeekById = async (req, res, next) => {
  try {
  
    const week = await Week.findById(new ObjectId(req.params.id));
    // Couldn't find week with this id
    if (!week) {
      return res.status(404).json({ error: 'Week not found' });
    }

    res.status(200).json({ data: week });

  } catch (error) {
    next(error);
  }
}

module.exports = { getAllWeeks, getWeekById};