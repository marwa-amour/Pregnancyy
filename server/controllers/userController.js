const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../config/jwt');
const { AUTH_MAX_AGE } = process.env;

// Get all users (with pagination)
const getAllUsers = async (req, res,next) => {
    try{

        const users = await User.find();
        return res.status(200).json({ data: users });
        // return res.send(weeks);
    
      } catch (error) {
        return res.status(500).send(error.message);
    next(error);
      }

 };

// Get a user by ID
const getUserById = async (req, res, next) => { 
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({data: user});
    } catch(error) {
        next(error);
    }
 };

const createUser = async (req, res, next) => {
    // Validation schema for creating a new user
    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        role: Joi.string().optional().default('User').valid('User','Admin'),
        menstrualCycle: Joi.date().required(),
        profilePicture: Joi.string().optional(),
        myScore:Joi.number().default(0),
        height:Joi.number().required().min(140).max(200),
        weight:Joi.number().required().min(40).max(150)
    
    });

    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        const { firstName, lastName, email, password,role, menstrualCycle,profilePicture, myScore,height,weight } = req.body;
        
        const found = await User.findOne({ email });

        if (found) {
            return res.status(409).json({error: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            menstrualCycle,
            profilePicture,
            myScore,
            height,
            weight
        });
        
        return res.status(201).json({ created: user });
    } catch(error) {
        next(error);
    }
 };

 const updateUser = async (req, res, next) => {

    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string(),
        role: Joi.string().optional().default('User').valid('User','Admin'),
        menstrualCycle: Joi.string().required(),
        profilePicture: Joi.string().optional(),
        myScore:Joi.number().default(0),
        height:Joi.number().required().min(140).max(200),
        weight:Joi.number().required().min(40).max(150)
    });
    
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            console.log(error)
            return res.status(400).json({error: error.details[0].message});
        }
        const { firstName, lastName, email, password,role, menstrualCycle,profilePicture, myScore,height,weight } = req.body;
        
        const user = await User.findOne({ email });
        
        const hashedPassword= await bcrypt.hash(password, 10);
        if(!password){
            console.log(password)
            hashedPassword = user.password;
        }

            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    firstName,
                    lastName,
                    email,
                    role,
                    password:hashedPassword,
                    menstrualCycle,
                    profilePicture,
                    myScore,
                    height,
                    weight
                },
                { new: true }
            ).select('-password');

            const payload = {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email:updatedUser.email,
                role:updatedUser.role,
                menstrualCycle:updatedUser.menstrualCycle,
                profilePicture: updatedUser.profilePicture,
                myScore:updatedUser.myScore,
                height:updatedUser.height,
                weight:updatedUser.weight
            };
    
            const token = await generateToken(payload);
    
            res.cookie('token', token, {
                httpOnly: false,
                maxAge: AUTH_MAX_AGE,
            });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(payload);

    } catch(error) {
        console.log(error)
        next(error);
    }
 };
 const updateScore = async (req, res, next) => {

    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string(),
        role: Joi.string().optional().default('User').valid('User','Admin'),
        menstrualCycle: Joi.string().required(),
        profilePicture: Joi.string().optional(),
        myScore:Joi.number().default(0),
        height:Joi.number().required().min(140).max(200),
        weight:Joi.number().required().min(40).max(150)
    });
    
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            console.log(error)
            return res.status(400).json({error: error.details[0].message});
        }
        const { firstName, lastName, email, password,role, menstrualCycle,profilePicture, myScore,height,weight } = req.body;

        
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    firstName,
                    lastName,
                    email,
                    role,
                    password,
                    menstrualCycle,
                    profilePicture,
                    myScore:myScore+2,
                    height,
                    weight
                },
                { new: true }
            ).select('-password');

            const payload = {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email:updatedUser.email,
                role:updatedUser.role,
                menstrualCycle:updatedUser.menstrualCycle,
                profilePicture: updatedUser.profilePicture,
                myScore:updatedUser.myScore,
                height:updatedUser.height,
                weight:updatedUser.weight
            };
    
            const token = await generateToken(payload);
    
            res.cookie('token', token, {
                httpOnly: false,
                maxAge: AUTH_MAX_AGE,
            });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(payload);

    } catch(error) {
        next(error);
    }
 };

// Delete use by id
const deleteUser = async (req, res, next) => { 

    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id).select('-password');
    
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        return res.status(200).json({ deleted: deletedUser });

    } catch(error) {
        next(error);
    }
 };

module.exports = { getAllUsers, getUserById, createUser, updateUser,updateScore, deleteUser };