import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState('');
    const [videobarActive, setVideobarActive] = useState('');
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    const location = useLocation();
    const { courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {

        if (!courseSectionData.length) {

            return;
        }

        const currentSectionData = courseSectionData.findIndex((section) => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionData]?.subSection.findIndex((data) => data._id === subSectionId);
        const activeSubSectionId = courseSectionData[currentSectionData]?.subSection[currentSubSectionIndex]._id;

        console.log("Active :: ", courseSectionData);
        // set current section here  
        setActiveStatus(courseSectionData[currentSectionData]?._id);
        //set current sub section here
        setVideobarActive(activeSubSectionId);

    }, [courseSectionData, courseEntireData, sectionId, subSectionId]);

    return (
        <div className="min-w-[222px] h-[calc(100vh-3.5rem)] flex flex-col bg-richblack-800 border-r-[1px]">
            {/* Buttons and heading  */}
            <div className="py-4 px-3 flex flex-col gap-4">
                {/* buttons */}
                <div className="flex flex-row items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard/enrolled-courses')}
                        className="text-3xl text-richblack-200"><IoChevronBackCircleOutline />
                    </button>
                    <button
                        onClick={() => setReviewModal(true)}
                        className="px-2 py-2 bg-yellow-50 text-richblack-900 rounded-sm"
                    >
                        Add Review
                    </button>
                </div>
                {/* heading  */}
                <div>
                    <p className="text-richblack-50 text-lg">{courseEntireData?.courseName}</p>
                    <p className="text-richblack-100">{completedLectures?.completedVideos?.length + "/" + totalNoOfLectures}</p>
                </div>
            </div>

            {/* for sections and subSections  */}
            <div>
                {
                    courseSectionData.map((section, index) => (
                        <div
                            onClick={() => setActiveStatus(section._id)}
                            key={index}
                            className=""
                        >
                            {/* // sections  */}
                            <div className="relative px-2 py-3 flex flex-row justify-between items-center cursor-pointer bg-richblack-700 border border-richblack-900 text-richblack-5">
                                <p>{section.sectionName}</p>
                                <MdOutlineArrowDropDownCircle className="text-xl" />
                                {
                                    activeStatus === section._id && (
                                        <p className="absolute top-0 left-0 h-full w-[3px] bg-yellow-50"></p>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    activeStatus === section?._id && (

                                        <div className="">
                                            {
                                                section?.subSection?.map((data, index) => (

                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/subSection/${data?._id}`)
                                                            setVideobarActive(data._id)
                                                        }}
                                                        className={`py-2 px-2 text-base font-mono flex flex-row gap-3 items-center cursor-pointer ${videobarActive === data._id ? 'bg-yellow-200 text-richblack-900' : 'bg-richblack-700'} text-richblack-5`}>
                                                        <input
                                                            readOnly
                                                            type="checkbox"
                                                            checked={completedLectures?.completedVideos?.includes(data._id)}
                                                        />
                                                        <p>{data.title}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar