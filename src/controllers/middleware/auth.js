// check to see if there is a token and header
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");
    // check if token doesnt exist
    if (!token)
        return res.status(401).json({ statusCode: 401, message: "No token, authorization denied!" })
    // else 
    try {
        const decoded = jwt.verify(token, SECRET);

        // assign user to request object
        req.user = decoded.user;

        next();
    } catch (err) { res.status(401).json({ statusCode: 401, message: "Token is not valid!" })
        
    }
}