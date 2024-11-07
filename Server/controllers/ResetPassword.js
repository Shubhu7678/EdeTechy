const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//resetPasswordToken

const resetPasswordToken = async (req, res) => {

    try {
        //get email from request body
        const email = req.body.email;

        //check if user exist or not
    

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Your email is not registered with us",
            })
        }

        //generate token

        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time

        const updateDetails = await User.findOneAndUpdate(
            { email: email },
            { token: token, resetPasswordExpires: Date.now() + 3600000 },
            { new: true });

        //create url
        // console.log(updateDetails);

        const url = `http://localhost:3000/change-password/${token}`;

        //Send email

        await mailSender(email, "Change Password Link", `Password Reset Link : ${url}`);

        return res.status(200).json({

            success: true,
            message: "Password reset link sent to your email successfully...",
        })

    } catch (err) {

        console.log("Something went wrong while sending reset mail and password : ", err);
        return res.status(500).json({

            success: false,
            message: "Something went wrong while sending reset mail and password",
            error : err.message,
        });

    }

}

//restPassword

const resetPassword = async (req, res) => {

    try {

        // get data from request body

        const { password, confirmPassword, token } = req.body;

        //validation

        if (password !== confirmPassword) {

            return res.status(401).json({

                success: false,
                message: "Password not matching",
            })
        }

        //get user data from db by token

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {

            return res.status(401).json({

                success: false,
                message: "Invalid token",
            })
        }

        //valid token token expiry time

        if (userDetails.resetPasswordExpires < Date.now()) {

            return res.status(401).json({

                sucess: false,
                message: "Token is expired please regenerate your token!",
            })
        }

        //hash password 
        const hashPassword = await bcrypt.hash(password, 10);
        //update password

        const updatePassword = await User.findOneAndUpdate(
            { token: token },
            { password: hashPassword },
            { new: true });

        //return response
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })


    } catch (err) {

        console.log("Internal Error :", err);
        res.status(500).json({

            success: true,
            message: "Internal Error in reset Password",
        });

    }

}

module.exports = { resetPasswordToken, resetPassword };