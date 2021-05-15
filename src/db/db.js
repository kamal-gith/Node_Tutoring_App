const mongoose = require('mongoose');
require('dotenv').config();
// const { MONGO_URI } = process.env;

// create the connection function and basic mongoose setups

const MONGO_URI = "mongodb://localhost/Tutoring_app_db";

const connectDB = () => {
    mongoose.connect(MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useFindAndModify: false,
       useCreateIndex: true, 
    }) 
    .then(() => {
        console.log("*******************************")
        console.log("******************************")
        console.log("Mongodb connected succesfully")
        console.log("******************************")
        console.log("******************************")
    
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1)
    });
};
    module.exports = connectDB;