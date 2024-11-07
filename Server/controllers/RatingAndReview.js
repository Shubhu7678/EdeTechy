const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// * create Rating handler function

const createRating = async (req, res) => {

    try {

        //get data from req body
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;
        //check if user enrolled the course or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!courseDetails) {

            return res.status(404).json({

                success: false,
                message: "Student is not Enrolled in course",
            });
        }

        //check if user already reviewed the course

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {

            return res.status(403).json({

                success: false,
                message: "Course is already Reviewed by the User",
                error: err.message,
            });
        }
        //create rating and review

        const createRating = await RatingAndReview.create(
            {
                user: userId,
                course: courseId,
                rating: rating,
                review: review,
            }
        );
        //update course with this rating and review

        const updateCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {

                    ratingAndReviews: createRating._id,
                },
            },
            { new: true },
        );
        //return response

        return res.status(200).json({

            success: true,
            message: "Rating and Review created successfully..",
            data : createRating,
        })

    } catch (err) {

        console.log("Internal Server Error", err.message);
        res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

//*get average rating

const getAverageRating = async (req, res) => {

    try {

        //* get courseId
        const courseId = req.body.courseId;
        //* calculate average rating 
        const result = await RatingAndReview.aggregate([
            {
                $match: {

                    course: new mongoose.Schema.Types.ObjectId(courseId),
                },
            },
            {
                $group: {

                    _id: null,
                    averageRating: {

                        $avg: "$rating",
                    },
                },
            },

        ]);

        // * return response
        if (result.length > 0) { 

            return res.status(200).json({

                success: true,
                averageRating: result[0].averageRating,
            });
        }

        //* if no rating/review exist
        return res.status(200).json({

            success: true,
            message : "Average rating is 0, no rating given till now",
        })


    } catch (err) {

        console.log("Internal Server Error", err.message);
        res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}


// * get all rating and reviews

const getAllRating = async (req, res) => {

    try {

        const result = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({

                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
             
                path: "course",
                select: "courseName",
            })
            .exec();
        
        if (!result) { 

            return res.status(404).json({

                success: false,
                message : "Rating And Review Not Exist!"
            })
        }
        
        return res.status(200).json({

            success: true,
            message: "All reviews fetched successfully...",
            data : result,
        })

    } catch (err) {

        console.log("Internal Server Error", err.message);
        res.status(500).json({

            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

// on the basis of courseId get rating and reviews

module.exports = { createRating, getAverageRating, getAllRating };