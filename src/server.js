const express = require('express');
// initialise express
const app = express();

// require('dotenv').config();

const port = process.env.PORT || 5000;





// initialise the middleware
app.use(express.json({ extended: false }));

// connect to database...
const connectDB = require('./db/db.js');
// connect to db
connectDB;

// create a basic express route
app.get('/', (req, res) => res.json({ message: "Welcome to Tutoring app!"}));

// listen to the port
app.listen(port, () => {
    console.log("******************************")
    console.log(`App running on port ${port}`)
    console.log("******************************") 
});