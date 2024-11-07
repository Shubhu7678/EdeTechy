import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosArrowDropdown } from "react-icons/io";
import countryCode from '../../../data/countrycode';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../services/apiconnector';
import { contactUsEndpoints } from '../../../services/apis';


const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {

        console.log(data);

        try {
            setLoading(true);
            const toastId = toast.loading('Please wait...');

            // const response = await apiConnector('POST', contactUsEndpoints.CONTACTUS_API, { ...data });
            const response = { status: 'OK' }
            console.log("Response log : ", response);
            setLoading(false);
            toast.dismiss(toastId);

        } catch (err) {

            console.log("Error : ", err.message);
            setLoading(false);

        }

    }

    useEffect(() => {

        if (isSubmitSuccessful) {

            reset({

                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
            })

        }

    }, [reset, isSubmitSuccessful])

    return (

        <form onSubmit={handleSubmit(submitContactForm)} className="w-full flex flex-col gap-y-4">
            <div className="flex gap-x-4 w-full">
                <div className="w-full" >
                    <label htmlFor='firstName' className="text-richblack-5 text-[0.875rem] leading-[1.375rem]       ">First Name <sup className="text-pink-200">*</sup></label>
                    <input type="text" name="firstName" placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 py-3 px-2 text-richblack-5"
                        {...register('firstName', { required: true })}
                    />
                    {
                        errors.firstName && (
                            <span className="text-pink-200">Firstname field is required</span>
                        )
                    }
                </div>
                <div className="w-full">
                    <label htmlFor='lastName' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] py-3 px-2 bg-richblack-800  text-richblack-5"
                        {
                        ...register('lastName', { required: true })
                        }
                    />
                    {
                        errors.lastName && (
                            <span className="text-pink-200">Lastname field is required</span>
                        )
                    }
                </div>
            </div>
            <div>
                <label htmlFor='email' className=" mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 py-3 px-2  text-richblack-5"
                    {...register('email', { required: true })}
                />
                {
                    errors.email && (
                        <span className="text-pink-200" >Email field is required</span>
                    )
                }

            </div>
            <div className="w-full">
                <label htmlFor="phone" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Phone Number <sup className="text-pink-200">*</sup>
                </label>
                <div className="flex gap-3">
                    <div className="relative w-1/4 bg-richblack-800 rounded-md">
                        <select className="w-full bg-richblack-800 text-richblack-100 py-3 px-2 rounded-md"
                            name="dropdown"
                            id="dropdown"
                            {...register('countrycode', { required: true })}

                            defaultValue={`<option  className="bg-richblack-800 text-richblack-100 py-3 px-2" value="+91">+91 <span>India</span></option>`}
                        >
                            {
                                countryCode.map((data, index) => (
                                    <option
                                        key={index}
                                        className="bg-richblack-800 text-richblack-100 py-3 px-2" value={data.code}>
                                        {data.code}
                                        {" "}
                                        {data.country}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            errors.dropdown && (
                                <span className="text-pink-200" >Dropdown field is required</span>
                            )
                        }
                    </div>
                    <input
                        name="phone"
                        className="w-3/4 py-3 px-2 rounded-md bg-richblack-800"
                        placeholder="Enter phone number"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        {...register('phone',
                            {
                                required: { value: true, message: 'phone number is required' },
                                maxLength: { value: 10, message: 'Invalid phone number' },
                                minLength: { value: 8, message: 'Invalid phone number' },
                            })
                        }
                    />
                </div>
                {
                    errors.phone && (
                        <span className="text-pink-200" >{errors.phone.message}</span>
                    )
                }
            </div>
            <div className="w-full">
                <label htmlFor='message' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Message <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    name="message"
                    placeholder="Enter your message here"
                    cols="30" rows="7"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register('message',
                        {
                            required: { value: true, message: "Message field is required" }
                        })
                    }
                />
                {
                    errors.message && (
                        <span className="text-pink-200" >{errors.message.message}</span>
                    )
                }
            </div>
            <button
                type="submit"
                className="w-full mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Send Message
            </button>
        </form >
    )
}

export default ContactUsForm