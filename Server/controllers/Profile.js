const CourseProgress = require('../models/CourseProgress');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const User = require('../models/User');
const uploadImageToCloudinary = require('../utils/imageUploader');

//update profile handler function

const updateProfile = async (req, res) => {

    try {

        //get data from request body
        const { firstName = "", lastName = "", dateOfBirth = "", gender = "", about, contact } = req.body;

        const id = req.user.id;

        //validation

        if (!id || !about || !contact) {

            return res.status(401).json({

                success: false,
                message: "All fields are required",
            });
        }

        //user_id

        const userDetail = await User.findById(id);
        //find profile
        const profileId = userDetail.additionalDetails;
        //update user 
        const updateUser = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
        //update profile
        const updateProfile = await Profile.findByIdAndUpdate({ _id: profileId },
            {
                gender: gender,
                dateOfBirth: dateOfBirth,
                about: about,
                contact: contact,
            }, { new: true },
        )
        //return response

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({

            success: true,
            message: "Profile Updated Successfully...",
            updateProfile,
            updateUser,
            updatedUserDetails,
        });

    } catch (err) {

        console.log("Error occured : ", err);
        return res.status(500).json({

            success: false,
            message: "Internal server error",
        })
    }

}

//delete account handler function

const deleteAccount = async (req, res) => {

    try {

        //get id

        const id = req.user.id;

        // * validation

        if (!id) {

            // ! User invalid

            return res.status(401).json({

                success: false,
                message: "User Invalid!",
            })
        }
        // * delete profile first

        const userDetails = await User.findById(id);
        const deleteProfile = await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // * delete user

        const deleteUser = await User.findByIdAndDelete(id);

        // * return response

        // TODO : Unenroll user from all enroll courses.

        res.status(200).json({

            success: true,
            message: "User deleted successfully...",
        })


    } catch (err) {

        // !Internal server error

        console.error("Invalid Server error : ", err);

        res.status(500).json({

            success: false,
            message: "Internal Server Error",
        })
    }
}

// get all the details of user

const getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()
        // console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//update display picture

const updateDisplayPicture = async (req, res) => {
    try {

        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        // console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );

        return res.status(200).send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        console.error("Error is coming in server:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error aari hai',
            error: error.stack,
        })
    }
}



const getUserDetails = async (req, res) => {

    try {

        //* get id
        const id = req.user.id;

        //* validation

        const userDetails = await User.findById(id).populate("additionDetails").exec();

        if (!userDetails) {

            return res.status(401).json({

                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({

            success: true,
            message: "User found successfully...",
            userDetails,
        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: "Internal Server Error",
        })
    }

}

const getEnrolledCourses = async (req, res) => {

    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId)
            .populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection',
                    }
                }
            })
            .lean();

        if (!userDetails) {

            return res.status(401).json({

                success: false,
                message: "User is not authorized"
            });
        }

        // console.log(userDetails.courses[0].courseContent);
        

        for (let i = 0; i < userDetails.courses.length; i++) {

            // console.log(`Course ${i}`, userDetails.courses[i].courseContent);
            let totalLectures = 0;
            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {

                totalLectures += userDetails.courses[i].courseContent[j].subSection.length;
            }

            console.log(`Total Lectures for Course ${i} : ${totalLectures}`);

            const courseProgressData = await CourseProgress.findOne(
                {
                    courseID: userDetails.courses[i]._id,
                    userId: userId,
                }
            )

            let completedLectures = courseProgressData?.completedVideos.length;
            console.log(`Completed ${completedLectures} Lectures for Course ${i}`);
            if (totalLectures === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (completedLectures / totalLectures) * 100 * multiplier
                    ) / multiplier
            }

        }

        return res.status(200).json({

            success: true,
            message: "Enrolled courses fetched successfully",
            enrolledCourses: userDetails,
        })

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: "Internal Server Error aa gya",
        })
    }



}

const instructorDashboard = async (req,res) =>{

    try {

        const courseDetails = await Course.find({ instructor: req.user.id });

        // console.log(courseDetails);

        const courseData = courseDetails.map((course) => { 

            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = course.price * totalStudentsEnrolled;

            //create a new object with the additional fields

            const courseDataWithStats = {

                _id: course._id,
                courseName: course.courseName,
                courseDescription : course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats;
        })

        return res.status(200).json({

            success: true,
            message: "Course data fetched successfully",
            data: courseData
        })

    } catch (err) { 

        console.log("ERROR OCCURRED IN INSTRUCTOR DASHBOARD : ", err);
        return res.status(500).json({

            success: false,
            message : 'Internal Server Error'
        
        })
    }
}

// const getInstructorDashboard = async (req, res) => { 

//     try {
        
//         const InstructorDetails = await User.findById(req.user.id);

//     } catch (err) { 

//         return res.status(500).json({

//             success: false,
//             message : "Internal Server Error",
//         })
//     }
// }

module.exports = { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getUserDetails, getEnrolledCourses,instructorDashboard };