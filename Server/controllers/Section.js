const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

//Create Section handler function

const createSection = async (req, res) => { 

    try {

        // get data from request body
        const { sectionName, courseId } = req.body;

        //add validation
        
        if (!sectionName || !courseId) { 

            return res.status(401).json({

                success: false,
                message: "All fields are required",
            });
        }
        //create section

        const newSection = await Section.create({ sectionName });
        
        //update Course with section objectID
        console.log(newSection);

        const updateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {

                    courseContent: newSection._id,
                }
            },
            { new: true },
        ).populate({

            path: "courseContent",
            populate: {
                
                path: "subSection",
            }
        });

        //return response

        return res.status(200).json({

            success: true,
            message: "Section created Successfully...",
            data : updateCourse,
        });


    } catch (err) { 

       return res.status(500).json({

            success: false,
            message: "Internal Error 500",
            error: err.message,
        });

    }
}

//updateSection handler function

const updateSection = async (req, res) => { 

    try {
        
        // get data from request body

        const { sectionName, sectionId,courseId } = req.body;

        //data validation

        if (!sectionName || !sectionId) { 

           return res.status(401).json({

                success: false,
                message: "All fields are required",
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { sectionName: sectionName },
            { new: true },
        );

        const updatedCourse = await Course.findById(
            courseId
        )
            .populate({
                path: 'courseContent',
                populate: {
                    path : 'subSection',
                }
            })
                                    

        return res.status(200).json({

            success: true,
            message: "Section Updated Successfully...",
            data : updatedCourse,
        })

    } catch (err) { 

       return res.status(500).json({

           success: false,
           message: "Internal Error occured while updating section",
             
        })
    }
}

// delete section handler function

const deleteSection = async (req, res) => { 

    try {

        const { sectionId, courseId } = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        // console.log(sectionId, courseId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //delete sub section
        await SubSection.deleteMany({ _id: { $in: section.subSection } });

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
            .exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}


module.exports = { createSection, updateSection,deleteSection };