import React, { useState } from 'react'
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";


const CourseContent = ({ course, sections, lectures }) => {

    const [openCourses, setOpenCourses] = useState({});

    const toggleCourse = (index) => { 

        setOpenCourses((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the course open state
        }));

    }

    return (
        <div>
            <p className="text-2xl font-semibold text-richblack-100">Course Content</p>
            <div className="flex flex-row gap-2 text-richblack-100 mt-2">
                <p>{sections + " section(s)"}</p>
                <p>{lectures + " lecture(s)"}</p>
                <p>10+ hrs total length</p>
            </div>
            <div className="mt-3 mb-12">
                {
                    course?.courseContent.map((course, index) => (

                        <div className="cursor-pointer" onClick={() => toggleCourse(index)} key={index}>
                            <div className="py-4 px-3 flex items-center border border-richblack-700 justify-between bg-richblack-700">
                                <div className="flex items-center gap-2">
                                    <RiArrowDropDownLine className="text-lg" />
                                    <p className="">
                                        {course?.sectionName}
                                    </p>
                                </div>
                                <p className="text-yellow-50">{ course?.subSection.length + " Lecture(s)" }</p>
                            </div>
                            { 
                              openCourses[index] &&  course?.subSection.map((lecture, index) => (
                                    
                                    <div className="py-4 px-3 border border-richblack-700 flex items-center gap-2" key={index}>
                                        <IoVideocamOutline className="text-base" />
                                        <p className="text-base">{lecture?.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseContent