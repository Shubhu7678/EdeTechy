const OTP = require('../models/OTP');
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
require('dotenv').config();
const jwt = require('jsonwebtoken');

//sendOtp

const sendOTP = async (req, res) => { 

    try {
        const { email } = req.body;

        //Check if user is exist or not

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {

            return res.status(401).json({

                success: false,
                message: 'User already exist!',
            });
        }

        let otp = otpGenerator.generate(6, {

            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let findOtpExist = await OTP.findOne({ otp: otp });

        while (findOtpExist) { 

            let otp = otpGenerator.generate(6, {

            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            });
            
            let findOtpExist = await OTP.findOne({ otp: otp });

        }

        const otpPayload = { email, otp };

        //create an entry for otp

        let createOtp = await OTP.create(otpPayload);
        // console.log(createOtp);

        //return response

        if (createOtp) {

            return res.status(200).json({
                
                success: true,
                message: "Otp Sent Successfully",
                otp,
            })
        } else { 

            return res.status(500).json({

                success: false,
                message: "Otp sent but not created",              
            })
        }
        

    } catch (err) { 

        console.log("Error in submiting otp in signup", err);
        res.status(500).json({

            success: false,
            message : "Error occured in sent OTP",
        })
    }


}

//signup

const signUp = async (req, res) => { 

    //fetch data from the req body

    try {

        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;
    
        //validate fields

        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {

            return res.status(403).json({

                success: false,
                message: "All fields are required",
            
            });
        }

        //both password and confirm pass matched

        if (password !== confirmPassword) {

            return res.status(403).json({

                success: false,
                message: "Passwords do not match",
            })
        }
    
        //check user already exit or not

        const userExist = await User.findOne({ email });

        if (userExist) {

            return res.status(401).json({

                success: false,
                message: "User already exist!",
            });
        }
    
        //find most recent otp from the database

        let recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        // console.log(recentOtp);
    
        //otp length is empty

        if (recentOtp.length === null || recentOtp.length === 0 ) {

            return res.status(401).json({

                success: false,
                message: "There is an empty otp",
            });
        }

        //otp matching fail
    
        if (recentOtp.otp !== otp) {

            return res.status(401).json({

                success: false,
                message: "Invalid Otp",
            })
        }

        //hash password and save

        const hashPassword = await bcrypt.hash(password, 10);

        //Submit Signup data

        const profileDetails = await Profile.create({

            gender: null,
            dateOfBirth: null,
            about: null,
            contact: null,
        });

        const userData = await User.create(
            {
                firstName,
                lastName,
                email,
               password: hashPassword,
                accountType,
                additionalDetails: profileDetails._id,
                image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
            }
        );

        res.status(200).json({

            success: true,
            message : "User Created Successfully...",
        })   


    } catch (err) { 

        console.log("Signup Internal Error : ", err);
        res.status(500).json({

            success: false,
            message: "Singup Internal Error",
            error : err.message,
        })
    }



}

//login

const login = async (req, res) => { 

    // get data from request body

    try {
        const { email, password } = req.body

        // validation of data

        if (!email || !password) {

            return res.status(403).json({

                success: false,
                message: "All fields are required, please try again!"
            })
        }

        // user exist or not

        const userExist = await User.findOne({ email }).populate("additionalDetails").exec();

        if (!userExist) {

            return res.status(401).json({

                success: false,
                message: "User is not exist!",
            })
        }

        //match password and generate jwt token

        if (await bcrypt.compare(password, userExist.password)) {

            const payload = {

                email: userExist.email,
                id: userExist._id,
                accountType: userExist.accountType,
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {

                expiresIn: "10h",
            })

            userExist.token = token;
            userExist.password = undefined;

            //create cookie and send response.

            const options = {

                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({

                success: true,
                message: "Logged in successfully...",
                token,
                userExist,

            })
        
        }
        else {

            return res.status(401).json({

                success: false,
                message: "Password is incorrect!",
            })
        }
    
    } catch (err) { 

        console.log("Internal Error in login", err);
        return res.status(500).json({

            success: false,
            message: "Internal Error",
            error : err.message,
        })
    }

}

//change password

const changePassword = async(req, res) => { 

    try {

        //get data from req body

        const { oldPassword, newPassword } = req.body;
        
        const id = req.user.id;

        //old password , new password and confirm new password


        //Validation on field for field is not empty 

        if (!oldPassword || !newPassword) { 

            return res.status(401).json({

                success: false,
                message : "All fields are required"
            })
        }

        //check user exist or not 

        const user = await User.findById(id);

        if (!user) { 

            return res.status(401).json({

                success: false,
                message: "User do not exist!",
            });
        }

        //password match or not

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) { 

            return res.status(401).json({

                success: false,
                message : "Please enter correct password",
            })
        }

        //update password in database
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword },{new:true});
         
        const userExist = await User.findById(id).populate("additionalDetails").exec();
        //send mail password updated
        //return response

        res.status(200).json({

            success: true,
            message: "Password Changed Successfully..",
            data: userExist,
        })


    } catch (err) { 

        console.log("Internal Server error : ", err);
        return res.status(500).json({

            success: false,
            message : "Internal Server Error",
        })

    }

}

module.exports = { sendOTP, signUp, login, changePassword };