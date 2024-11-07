const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const uploadImageToCloudinary = require('../utils/imageUploader');
require('dotenv').config();

//Create Course handler function

const createCourse = async (req, res) => {

    try {

        //get data from request body
        const {
            courseName,
            courseDescription,
            price,
            tag: _tag,
            whatYouWillLearn,
            category,
            instructions: _instructions,
            status
        } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnail;
        // console.log("Thumbnail : ", thumbnail);

        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        //validation

        if (!courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !instructions.length ||
            !tag.length ||
            !thumbnail ||
            !status
        ) {

            res.status(401).json({

                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        // console.log("Instructor Details : ", instructorDetails);

        if (!instructorDetails) {

            return res.status(404).json({

                success: false,
                message: "Instructor not found",
            });

        }

        // check for Category

        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {

            res.status(404).json({

                success: false,
                message: "Category Details not found",
            })
        }

        //Upload image to cloudinary

        const uploadThumbnail = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({

            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            tag,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: uploadThumbnail.secure_url,
            instructions,
            status
        })

        //update the new course to User Schema of Instructor

        await User.findByIdAndUpdate(

            { _id: instructorDetails._id },
            {
                $push: { courses: newCourse._id },
            },
            {
                new: true,
            });

        //update the Category Schema

        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true },
        )

        // console.log("Updated Category : ", updatedCategory);

        res.status(200).json({

            success: true,
            message: "Course Created Successfully...",
            data: newCourse,
        })

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: "Failed to create Course",
            error: err.message,

        })
    }
}

//update course handler function

const updateCourse = async (req, res) => {

    try {

        const {
            courseId,
            courseName,
            courseDescription,
            price,
            tag,
            whatYouWillLearn,
            category,
            instructions,
            status
        } = req.body;


        const courseExist = await Course.findById(courseId);

        if (!courseExist) {

            return res.status(404).json({

                success: false,
                message: "Course not exist !",

            });
        }

        if (courseName !== undefined) {

            courseExist.courseName = courseName;
        }
        if (courseDescription !== undefined) {

            courseExist.courseDescription = courseDescription;
        }
        if (price !== undefined) {

            courseExist.price = price;
        }
        if (tag !== undefined) {

            try {
                const parsedTag = JSON.parse(tag);
                courseExist.tag = parsedTag;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid tag format',
                });
            }
        }
        if (instructions !== undefined) {

            try {
                const parsedInstructions = JSON.parse(instructions);
                courseExist.instructions = parsedInstructions;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid instructions format',
                });
            }
        }
        if (whatYouWillLearn !== undefined) {

            courseExist.whatYouWillLearn = whatYouWillLearn;
        }
        if (category !== undefined) {

            const categoryDetails = await Category.findById(category);

            if (!categoryDetails) {

                return res.status(404).json({

                    success: false,
                    message: 'Category not exist !',
                });
            }

            courseExist.category = categoryDetails._id;
        }

        if (status !== undefined) {

            courseExist.status = status;
        }

        if (req.files && req.files.thumbnail !== undefined) {

            const thumbnail = req.files.thumbnail;
            const uploadThumbnail = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            courseExist.thumbnail = uploadThumbnail.secure_url;
        }

        await courseExist.save();

        const updatedCourse = await Course.findById(courseId)
            .populate({

                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            })
            .exec();

        // console.log("UpdatedCourse :", updatedCourse);
        // console.log("courseId : ", courseId);

        return res.status(200).json({

            success: true,
            message: 'Course Updated Successfully...',
            data: updatedCourse
        });

    } catch (err) {

        console.log("ERROR IN SERVER : ", err);
        return res.status(500).json({

            success: false,
            message: 'Internal Server Error',
            error: err.message,
        })

    }
}


//Get All Courses handler function

const getAllCourses = async (req, res) => {

    try {

        const courses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }).populate("instructor").exec();


        return res.status(200).json({

            success: true,
            message: "Data for all courses fetched successfully...",
            data: courses,
        })

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: "Cannot fetch course data",
            error: err.message,
        });

    }
}

//get course Details handler function

const getCourseDetails = async (req, res) => {

    try {

        const { courseId } = req.body;

        // * find course details

        const courseDetails = await Course.find(
            { _id: courseId })
            .populate({

                path: "instructor",
                populate: {

                    path: "additionalDetails",
                }
            })
            .populate("Category")
            // .populate("ratingAndReviews")
            .populate({

                path: "courseContent",
                populate: {

                    path: "subSection"
                }
            })
            .exec();

        if (!courseDetails) {

            console.log("Could not find the course");
            return res.status(400).json({

                success: false,
                message: `Couldn't find the course with Course Id : ${courseId}`,

            });
        }

        return res.status(200).json({

            success: true,
            message: "Course Details fetched successfully...",
            data: courseDetails,
        });

    } catch (err) {

        console.error("Internal Error : ", err);
        return res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error: err.message,
        });

    }
}

const getInstructorCourses = async (req, res) => {

    try {

        const instructorId = req.user.id;
        // console.log(instructorId);

        const instructorCourses = await Course.find({
            instructor: instructorId
        }).sort({ createdAt: -1 })

        return res.status(200).json({

            success: true,
            message: "Course fetched successfully...",
            data: instructorCourses,
        });

    } catch (err) {

        console.log("Error occured in Courses fetching : ", err);
        return res.status(500).json({

            success: false,
            message: "Course fetching failed",
            error: err.message,
        })
    }
}

const deleteCourse = async (req, res) => {

    try {

        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found",
            })
        }

        // remove course from students enrolled courses

        const studentEnrolled = course.studentsEnrolled;
        for (const studentId of studentEnrolled) {

            await User.findByIdAndUpdate(studentId,
                {
                    $pull: { courses: courseId }
                }
            )
        }

        //remove Sections and Sub sections

        const courseSections = course.courseContent;

        for (const sectionId of courseSections) {

            const section = await Section.findById(sectionId);
            if (section) {
                for (const subSectionId of section.subSection) {
                    //delete sub section
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            //delete section
            await Section.findByIdAndDelete(sectionId);
        }

        //delete course

        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({

            success: true,
            message: 'Course deleted successfully',
        });

    } catch (err) {

        console.log("Error occured while deleting course : ", err);
        return res.status(500).json({

            success: false,
            message: 'Internal Server Error',
            error: err.message,
        })
    }
}

const getFullCourseDetails = async (req, res) => {

    try {

        const { courseId } = req.body;
        // const userId = req.user.id;

        const course = await Course.findById(
            courseId
        )
            .populate({

                path: "instructor",
                populate: {

                    path: "additionalDetails",
                }
            })
            // .populate("category")
            // .populate("ratingAndReviews")
            .populate({

                path: "courseContent",
                populate: {

                    path: "subSection"
                }
            })
            .exec();
        // console.log("Course in Backend ", course);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: 'Course Not Found !',
            });
        }

        return res.status(200).json({

            success: true,
            message: 'Course Details Fetched Successfully !',
            data: course,
        })

    } catch (err) {

        console.log("ERROR AT FETCHING COURSE DETAILS =>>> ", err);
        return res.status(500).json({

            success: false,
            message: "Internal Server Error",
        })
    }
}

const getAllCompletedLectures = async(req, res) => { 

    try {

        const { courseId } = req.body;
        const userId = req.user.id;
        const courseProgressCount = await CourseProgress.findOne({ courseID: courseId, userId: userId });
        
        if (!courseProgressCount) { 

            return res.status(404).json({ success: false, message: 'No Course Progress found !' });
        }

        return res.status(200).json({
            success: true,
            message: 'Course Progress Fetched Successfully !',
            data: courseProgressCount,
        });

    } catch (err) { 

        return res.status(500).json({

            success: false,
            message : 'Internal Server Error in Backend Course Progress'
        })

    }

}

module.exports = { createCourse, updateCourse, getAllCourses, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails,getAllCompletedLectures };