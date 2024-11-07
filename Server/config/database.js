const mongoose = require('mongoose');
require('dotenv').config();
const DB_URI = process.env.DB_URI;

const dbConnect = () => { 

    mongoose.connect(DB_URI)
        .then(() => { 

            console.log("Database connection successful...");
        })
        .catch((err) => { 

            console.log("Error connecting database :", err);
        })
}

module.exports = dbConnect;