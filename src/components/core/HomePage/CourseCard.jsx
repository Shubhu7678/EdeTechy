import React from 'react'
import { MdPeople } from "react-icons/md";
import { FcReading } from "react-icons/fc";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
    return (
        <div className={`flex w-[45%] flex-col p-3 rounded-md pt-4 gap-3 ${currentCard === course.heading ? "bg-white text-richblack-800" : "bg-richblack-700"} `} >

            <div className="font-semibold text-2xl">{course.heading}</div>
            <div className="mb-6">{course.description}</div>
            <div className="flex mt-auto flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <MdPeople />
                    <p>{course.level}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <FcReading />
                    <p>{course.lessionNumber}</p></div>
            </div>
        </div>
    )
}

export default CourseCard