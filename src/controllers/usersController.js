const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jswebtoken');
const bcrypt = require('bcryptjs');
const e = require('express');
const { SECRET } = process.env;

exports.getLoggedInUser = async (req, res) => {
    try {
        // GET user from database
        const user = await user.findById(req.user.id).select("password");

        // return user
        res.json({
            statusCode: 200,
            message: "user gotten successfully",
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!")

        
    }
}

// @route POST api/auth/login
// @description: Auth users(student, tutor, admin) and get token
// @access: Public route
exports.loginUser = async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array()});
// else
// destruction the request body
const { email, password } = req.body;

try {
    // initialise new user
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ statusCode: 400, message: 'invalid credentials'});
    // else
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ statusCode: 400, message: "Invalid credentials"});
    // else
    // there is a match, send token, payload and signed token
    const payload = {
        user: {
            id: user.id,
        }
    };

    jwt.sign(
        payload,
        SECRET,
        {
            expiresIn: 360000,
        },
        (err, token) => {
            if (err) throw err;
            res.json({
                statusCode: 200,
                message: "logged in successfully",
                user:{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userRole: user.userRole,
                    isTutor: user.isTutor,
                    isAdmin: user.isAdmin
                },
                token
            })
        }
    )
} catch (err) {
    console.error(err.message);

    res.status(500).send("server Error...");
}
}