const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');
const { generateToken } = require('../config/jwt');
const { AUTH_MAX_AGE } = process.env;

const signUp = async (req,res) => {
    
    const {firstName, lastName, email, password, profilePicture, menstrualCycle, height, weight}=req.body;
        try{

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
            profilePicture,
            menstrualCycle,
            height,
            weight
        });
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            role:user.role,
            menstrualCycle:user.menstrualCycle,
            profilePicture: user.profilePicture,
            myScore:user.myScore,
            height:user.height,
            weight:user.weight
         
        };
        const token = await generateToken(payload);

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: AUTH_MAX_AGE,
        });

        return res.status(200).json(payload);

    } catch(error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
};

const signIn = async (req,res) => {

    const { email, password } = req.body;

    try {

        // 1. Check if user exists in db
        const user = await User.findOne({ email });
        
        // this email does not exist
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 2. Compare passwords

        const isMatch = await bcrypt.compare(password, user.password);

        // the password is incorrect
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 3. Generate and send token

        // create the payload object
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            role:user.role,
            menstrualCycle:user.menstrualCycle,
            profilePicture: user.profilePicture,
            myScore:user.myScore,
            height:user.height,
            weight:user.weight
        };

        // wrap the payload inside a jwt token
        const token = await generateToken(payload);
        // send a cookie containing the token
        res.cookie('token', token, {
            httpOnly: false,
            maxAge: AUTH_MAX_AGE,
        });

        res.status(200).json(payload);
        
    } catch(error) {

        res.status(400).json({error: 'Cannot sign you in'});

    }

};

const signOut = (req,res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Signed out successfully'});
};

module.exports = { signUp, signIn, signOut };