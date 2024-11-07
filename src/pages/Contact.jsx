import React from 'react'
import ChatContact from '../components/core/ContactPage/ChatContact'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'

const Contact = () => {
    return (
        <div>
            {/* section 1 */}

            <section className="w-11/12 mx-auto max-w-maxContent my-20">
                <div className="flex flex-col lg:flex-row gap-3">
                    <ChatContact />
                    <div className="lg:w-[50%] border border-richblack-200 p-5 rounded-md mx-auto flex justify-center items-center">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl font-semibold text-richblack-5 " >Got a Idea? We've got the skills. Let's team up</h1>
                            <p className="text-medium text-richblack-100">Tell us more about yourself and what you're got in mind.</p>
                            <ContactUsForm className="w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            {/* TODO: Reviews  */}

            {/* section 3 */}
            
            <Footer/>
        </div>
    )
}

export default Contact