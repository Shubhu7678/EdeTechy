import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {

        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {

        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {

        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {

        Logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
    return (
        <div className="">
            <div className="flex flex-row gap-16 items-center" >
                <div className="w-[35%] flex flex-col gap-12">
                    {timeline.map((value, key) => (
                        <div key={key} className="flex flex-row items-center gap-10">
                            <div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center shadow " >
                                <img src={value.Logo} alt="" />
                            </div>
                            <div className="flex flex-col gap-1 " >
                                <div className="font-semibold text-[18px]" >{value.heading}</div>
                                <div className="text-base" >{value.description}</div>
                            </div>                                                        
                        </div> 
                    ))}
                </div>
                <div className="w-[50%] relative shadow-blue-200" >
                    <img className="shadow-white h-fit object-cover" src={TimelineImage} alt="" />
                    <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-row bg-caribbeangreen-700 text-white uppercase py-7">
                          <div className="flex flex-row gap-4 items-center border-r border-caribbeangreen-300 px-7" >
                            <p className="text-3xl font-bold"  >10</p> 
                            <p className="text-caribbeangreen-200 text-sm " >Years Experiences</p>
                        </div>
                        <div className="flex flex-row gap-4 px-7 items-center" >
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-sm text-caribbeangreen-200">Types of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection