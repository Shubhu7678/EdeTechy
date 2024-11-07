const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect = () => { 

    try {

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });
        // console.log("Cloudinary connected successfully...")

    } catch (err) { 

        console.log("Error connecting to cloudinary :", err);
    }
}

module.exports = cloudinaryConnect;
