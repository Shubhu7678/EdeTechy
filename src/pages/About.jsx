import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactForm from '../components/core/AboutPage/ContactForm';
import Footer from '../components/common/Footer';


const About = () => {
    return (
        <div className=" text-white" >
            {/* Section 1  */}
            <section className="bg-richblack-700">
                <div className="realtive w-11/12 mx-auto max-w-maxContent flex flex-col items-center gap-3" >
                    <header className="text-4xl lg:w-[70%] text-center pt-20 font-semibold text-richblack-5">
                        Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />
                    </header>
                    <p className="text-richblack-100 lg:w-[70%] text-medium text-center mb-16" >Studynotion is at the forefront of driving innovation in online education. We're passionate About
                        creating a brighter future by offering cutting-edge courses leveraging emerging technologies,
                        and nurturing a vibrant learning community.
                    </p>
                    <div className="h-[70px] lg:h-[150px] ">

                    </div>
                    <div className="absolute bottom-[-20%] translate-y-[-50%] flex flex-row gap-3 flex-wrap" >
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}

            <section className="border-b border-b-richblack-100">
                <div className="w-11/12 mx-auto max-w-maxContent">
                    <Quote />
                </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
                <div className="w-11/12 mx-auto max-w-maxContent mt-28">
                      {/* Founding Story  */}
                    <div className="flex flex-col lg:flex-row gap-5 lg:justify-center lg:items-center " >
                        {/* Founding Story Left Side  */}
                        <div className="flex flex-col lg:w-[50%] lg:pr-[7%] gap-5">
                            <header className="text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
                                Our Founding Story
                            </header>
                            <p className="text-richblack-100 text-base font-medium ">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-richblack-100 text-base font-medium">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        {/* Founding Story Right Side  */}
                        <div className="lg:w-[50%] lg:pl-[7%]">
                            <img src={FoundingStory} alt="" />
                        </div>

                    </div>
                    {/* Vision and Misson */}
                    <div className="flex flex-row gap-5 mt-28 justify-between" >
                        {/* Our Vision  */}
                        <div className="lg:w-[45%]">
                            <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent lg:w-[70%] mb-8" >Our Vision</h1>
                            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        {/* Our Mission  */}
                        <div className="lg:w-[45%]">
                            <h1 className="text-4xl font-semibold mb-8" ><HighlightText text={"Our Mission"} /></h1>
                            <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4  */}
            <StatsComponent />
            
            {/* section 5  */}

            <section className="w-11/12 max-w-maxContent mx-auto mt-10">
             <LearningGrid/>
            </section>            

            {/* section 6 */}
            <section className="w-11/12 mx-auto my-20">
                <ContactForm/>
            </section>
 
            {/* section 7 */}
            {/* TODO: REVIEWS ADD */}

            {/* Footer */}
             <Footer/>   
        </div>
    )
}

export default About