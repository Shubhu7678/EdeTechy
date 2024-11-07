import React from 'react'
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformationForm';
import { FaCheck } from "react-icons/fa";
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish"
        }
    ];

    return (
        <>
            <div className="flex flex-row  justify-between px-10">
                {

                    steps.map((item, index) => (
                        <div key={index} className="">
                            <div className=" text-center flex flex-col gap-2 items-center" >
                                <span className={`${item.id === step ? "bg-yellow-50 border border-richblack-600 text-richblack-900" : "border border-richblack-100 bg-richblack-800 text-richblack-300"}
                                      aspect-square w-[25px] rounded-full flex justify-center items-center object-cover `}>
                                    {
                                        step > item.id ? (<FaCheck className='text-white text-xs' />) : (item.id)
                                    }
                                </span>
                                <span className="text-richblack-100 text-sm">{item.title}</span>

                            </div>
                            {/* //:TODO: Add Dashes between steps */}
                        </div>
                    ))
                }
            </div>
            {step === 1 && (<CourseInformationForm />)}
            {step === 2 && (<CourseBuilderForm />)}
            { step === 3 && (<PublishCourse/>) } 
        </>
    )
}

export default RenderSteps