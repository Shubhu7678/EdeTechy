const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//Auth

const auth = (req, res, next) => {

    try {

        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");

        //Check if token exist or not

        if (!token) {

            return res.status(401).json({

                success: false,
                message: "Token is missing",
            });
        }

        // verify the token

        try {

            const payload = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(payload);
            req.user = payload;
            next();

        } catch (err) {

            return res.status(401).json({

                success: false,
                message: "Token is Invalid bro",
            });

        }

    } catch (err) {

        console.log("Something is wrong when validating the token :", err);
        return res.status(500).json({

            success: false,
            message: "Internal Server Error",

        });
    }
}

//isStudent

const isStudent = (req, res, next) => {

    try {

        if (req.user.accountType !== "Student") {

            return res.status(401).json({

                success: false,
                message: "This is protected route for student only",
            })
        }

        next();

    } catch (err) {

        console.log("Error in Student Middleware", err);
        return res.status(401).json({

            success: false,
            message: "Internal Error in Student Middleware",
        })
    }
}

//isInstructor

const isInstructor = (req, res, next) => {

    try {

        if (req.user.accountType !== "Instructor") {

            return res.status(401).json({

                success: false,
                message: "This is protected route for Instructor only",

            })
        }

        next();
    } catch (err) {

        console.log("Error in Instructor Middleware", err);
        return res.status(401).json({

            success: false,
            message: "Internal Error in Instructor Middleware",
        })
    }
}

//isAdmin

const isAdmin = (req, res, next) => {

    try {

        if (req.user.accountType !== "Admin") {

            return res.status(401).json({

                success: false,
                message: "This is protected route for Admin only",

            })
        }

        next();
    } catch (err) {

        console.log("Error in Admin Middleware", err);
        return res.status(401).json({

            success: false,
            message: "Internal Error in Admin Middleware",
        })
    }
}

module.exports = { auth, isStudent, isInstructor, isAdmin }