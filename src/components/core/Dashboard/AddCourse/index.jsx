import React from 'react';
import RenderSteps from './RenderSteps';

const index = () => {
    return (
        <div className="text-white w-[85%] mx-auto">
            <div className="flex flex-row gap-5 w-full p-6">
                <div className="w-[65%]">
                    <h1 className="text-3xl richblack-100 font-regular">Add Course</h1>
                    <div className="mt-6">
                        <RenderSteps />
                    </div>
                </div>
                <div className="w-[35%]">
                    <div className="p-3 bg-richblack-800 rounded-md">
                        <p className="text-richblack-50 text-lg mb-3">Code Upload Tips</p>
                        <ul className="flex flex-col gap-1">
                            <li>Set the course price option or make it free.</li>
                            <li>Standard size for the course thumbnail in 1024x576.</li>
                            <li>Video Section controls the course duration.</li>
                            <li>Course builder is where you create and organize a course.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index