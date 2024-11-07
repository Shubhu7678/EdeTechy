import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
    return (
        <div>
            {/* Section1  */}

            <div className="relative w-11/12 mx-auto text-white flex flex-col justify-between max-w-maxContent items-center" >
                <NavLink to="/signup">
                    <div className="group mt-16 p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200
                                  transition-all duration-200 hover:scale-95 w-fit " >
                        <div className="flex flex-row group-hover:bg-richblack-900 items-center gap-2 rounded-full px-10 py-[5px]" >
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </NavLink>
                <div className="text-center text-4xl font-semibold mt-6" >
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>
                <div className="mt-4 w-[90%] text-lg font-bold text-richblack-300 text-center">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world
                    and get access to a wealth of resources, including hands on projects, quizzes, and personalized feedback from instructor.
                </div>
                <div className="flex flex-row gap-7 mt-8" >
                    <CTAButton active={true} linkto={"/signup"} >
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"} >
                        Book a Demo
                    </CTAButton>
                </div>
                <div className="mx-3 w-[75%] my-12 shadow-blue-200" >
                    <video muted autoPlay loop >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section1  */}

                <div>
                    <CodeBlocks
                        position={`flex-col lg:flex-row`}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your <HighlightText text={"coding potential"} /> with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            { active: true, linkto: '/signup', text: "Try it Yourself" }
                        }
                        ctabtn2={
                            { active: false, linkto: '/login', text: "Learn More" }
                        }
                        codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title>Coding Era</title>
                        </head>
                        <body>
                          <h2>Unlock Your Coding Potential</h2>
                          <p>With Online Courses</p>
                          <button>Buy Course</button>
                        </body>
                        </html>`}
                        codeColor={`text-yellow-25`}
                    />
                </div>

                {/* Code Section2  */}

                <div>
                    <CodeBlocks
                        position={`lg:flex-row-reverse`}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            { active: true, linkto: '/signup', text: "Continue Lesson" }
                        }
                        ctabtn2={
                            { active: false, linkto: '/login', text: "Learn More" }
                        }
                        codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>              
                            <title>Document</title>
                        </head>
                        <body>
                           <h1>Hello</h1>
                           <p>World</p>
                           <button>Buy Course</button>
                        </body>
                        </html>`}
                        codeColor={`text-yellow-25`}
                    />
                </div>

                <ExploreMore />
            </div>

            {/* Section2  */}

            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[100px]" >
                    <div className="relative w-11/12 mx-auto max-w-maxContent h-[100px] flex justify-center items-center gap-5">
                        <div className="flex gap-10 text-white ">
                            <CTAButton active={true} linkto="/signup" >
                                <div className="flex flex-row gap-2 items-center ">
                                    <div>
                                        Explore Full Catalog
                                    </div>
                                    <div>
                                        <FaArrowRight />

                                    </div>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto="/login" >
                                <div className="flex flex-row gap-2 items-center ">
                                    <div>
                                        Learn More
                                    </div>
                                    <div>
                                        <FaArrowRight />

                                    </div>
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 mx-auto flex flex-col items-center gap-5 justify-between max-w-maxContent">
                    <div className="flex flex-row gap-12 mt-28 mb-10">
                        <div className="w-[45%] text-4xl font-semibold ">Get the skills you need for a <HighlightText text={"job that is in demand."} /> </div>
                        <div className="w-[40%] flex flex-col gap-7 items-start">
                            <div className="text-[16px]" >The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                            <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section3  */}

            <div className="relative w-11/12 mx-auto text-white bg-richblack-900 flex flex-col max-w-maxContent items-center gap-5 justify-between"  >

                <InstructorSection />
                {/* <h2 className="text-4xl font-bold my-4">Review From Our Students</h2> */}
                <div className="text-4xl font-bold my-4">
                    Review From Our
                <HighlightText className="" text={' Students'} />
                </div>
                <ReviewSlider/>

            </div>

            {/* Footer  */}

            <Footer />
        </div>
    )
}

export default Home