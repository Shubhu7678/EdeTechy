import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactForm = () => {
    return (
        <div className="lg:w-[40%] mx-auto flex justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-4xl font-semibold" >Get In Touch</h1>
                <p className="text-medium text-richblack-100">We'd love to hear from you. Please fill out this form</p>
                <ContactUsForm className="w-full"/>
            </div>
        </div>
    )
}

export default ContactForm