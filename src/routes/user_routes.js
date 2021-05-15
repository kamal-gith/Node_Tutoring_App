const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
// import the router controller
const userController = require('.../controllers/userscontroller');
const auth = require('../middleware/auth')
// login user route
router.post('/api/auth/login', 
[
check("email", "Please enter a valid email address"),
check("password", "Please enter a valid password"),
],
usersController.loginUser
);


router.get("/api/auth", auth, usersController.getLoggedInUser)

module.exports = router;

