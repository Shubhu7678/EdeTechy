const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require('../models/Course');
const uploadImageToCloudinary = require('../utils/imageUploader');

require('dotenv').config();

//Create subSection

const createSubSection = async (req, res) => {

    try {
        //fetch data from req body

        const { sectionId, title, description, courseId } = req.body;

        //extract file video url

        const videoUrl = req.files.videoUrl;

        //validation

        if (!sectionId || !title || !description || !videoUrl) {

            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }
        //create sub section

        const uploadDetails = await uploadImageToCloudinary(videoUrl, process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({

            title: title,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update section with this subsection objectId

        const sectionUpdate = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: { subSection: newSubSection._id },
            },
            { new: true });

        //HW: add populate if it's not work
        //return response

        const updatedCourse = await Course.findById(
            courseId,
        ).populate(
            {
                path: 'courseContent',
                populate: {

                    path: 'subSection',
                }
            }
        )
            .exec();

        return res.status(200).json({

            success: true,
            message: "Sub Section Created Successfully",
            data: updatedCourse
        })


    } catch (err) {

        console.log("Error occured when create sub section", err.message);
        return res.status(500).json({

            success: false,
            message: "Internal server error",
            error: err.message
        })
    }


}

//update SubSection handler function
const updateSubSection = async (req, res) => {

    try {

        const { subSectionId, title, description, courseId } = req.body;
        
        const subSectionExist = await SubSection.findById(subSectionId);
        
        //validation

        if (!subSectionExist) { 

            return res.status(500).json({

                status: false,
                message: 'Sub Section not exist',
            });
        }

        // update sub section

        if (title !== undefined) { 

            subSectionExist.title = title;             
        }

        if (description !== undefined) { 

            subSectionExist.description = description;
        }

        if (req.files && req.files.videoUrl !== undefined) { 

            const videoUrl = req.files.videoUrl;
            const uploadDetails = await uploadImageToCloudinary(videoUrl, process.env.FOLDER_NAME);
            subSectionExist.videoUrl = uploadDetails.secure_url;
        }

        await subSectionExist.save();
        
        // populate the updated course

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'courseContent',
                populate: {

                    path: 'subSection',
                }
            }
            )
            .exec();

        return res.status(200).json({

            success: true,
            message: "Sub Section Updated Successfully...",
            data: updatedCourse,
        })

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: "Internal server error",
            error: err,
        })
    }
}

//Delete Sub section handler function

const deleteSubSection = async (req, res) => {

    try {
        //get data from request body

        const { subSectionId, sectionId, courseId } = req.body;

        //validation


        const existData = await SubSection.findById(subSectionId);

        if (!existData) {

            return res.status(401).json({

                success: false,
                message: "Invalid Sub Section",
            });
        }

        // remove from sections

        await Section.findByIdAndUpdate(sectionId,
            {
                $pull: { subSection: subSectionId }
            }
        );

        //delete subsection

        await SubSection.findByIdAndDelete(subSectionId);

        const updatedCourse = await Course.findById(courseId)
            .populate(
                {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection'
                    }
                }
            ).exec();

        return res.status(200).json({

            success: true,
            message: "Sub Section Deleted Successfully...",
            data: updatedCourse,
        });

    } catch (err) {

        console.error("Error occur when delete sub section", err);
        res.status(500).json({

            success: false,
            message: "Internal Server Error",
        });
    }

}

module.exports = { createSubSection, updateSubSection, deleteSubSection };