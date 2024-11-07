import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/CTAButton'

const LearningGrid = () => {

    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ]
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-4 mb-10" >
            {
                LearningGridArray.map((data, index) => (

                    <div key={index}
                        className={`${index === 0 && "lg:col-span-2 bg-richblack-900"}
                    ${data.order % 2 !== 0 ? "bg-richblack-700" : "bg-richblack-900"}
                    ${data.order === 3 && "lg:col-start-2"}
                    lg:h-[250px]
                  `} >
                        {
                            data.order < 0 ? (
                                <div className="lg:w-[90%] mx-auto pb-5 pr-5 bg-richblack-900 flex flex-col gap-3">
                                    <div className="text-4xl font-semibold">
                                        {data.heading}
                                        <HighlightText text={data.highlightText} />
                                    </div>
                                    <p className="font-medium text-richblack-100" >
                                        {data.description}
                                    </p>
                                    <div className="w-fit" >
                                        <CTAButton className="" active={'true'} linkto={'/'} children={'Learn More'} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 p-5" >
                                    <h1 className="text-xl font-semibold text-white" >{data.heading}</h1>
                                    <p className="font-medium text-richblack-100">{data.description}</p>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LearningGrid