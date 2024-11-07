const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const updateCourseProgress = async (req, res) => {

    try {

        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) { 
            return res.status(404).json({

                success: false,
                message : "Invalid sub section",
            })
        }
        let courseProgress = await CourseProgress.findOne({ courseID: courseId, userId: userId });
        if (!courseProgress) { 

            return res.status(404).json({
                success: false,
                message : 'No Course Progress found !',
            })
        }

        //check for re completing video or subSection
        if (courseProgress.completedVideos.includes(subSectionId)) { 

            return res.status(404).json({

                success: false,
                message : 'Already Completed !',
            })
        }
        // courseProgress.completedVideos
        
        courseProgress.completedVideos.push(subSectionId);

        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: 'Course Progress Updated Successfully !',
            data : courseProgress,
        })

    } catch (error) { 
 
        console.log("Error Occured ::", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Backend Course Progress",
        });
    }
}

module.exports = {updateCourseProgress}