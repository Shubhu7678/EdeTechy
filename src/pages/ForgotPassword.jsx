import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authAPI';
import { FaArrowLeft } from "react-icons/fa6";

const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {

        e.preventDefault();
        dispatch(getResetPasswordToken(email, setEmailSent, setEmail));

    }


    return (
        <div className="" >
            {
                loading ? (
                    <div className="text-richblack-5 w-full text-center" >
                        Loading...
                    </div>
                ) : (
                    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
                    <div className="w-[35%] flex flex-col justify-center gap-3" >
                        <h1 className="text-3xl font-semibold text-richblack-5" >
                            {!emailSent ? "Reset your password" : "Check your Email"}
                        </h1>
                        <p className="text-richblack-100 text-[1.125rem] leading-[1.625rem]" >
                            {
                                !emailSent ? "Have no fear, we will send you a link to reset your password.If you don't receive an email, please check your spam folder."
                                    : `We have sent reset Email to ${email}`
                            }
                        </p>
                        <form action="" onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (

                                    <label htmlFor="" className="relative mb-3" >
                                        <p className="text-richblack-5 text-sm leading-[1.375rem]">Email Address
                                            <sup className="text-pink-200" > *</sup>
                                        </p>
                                        <input
                                            className="w-full text-richblack-5 rounded-md bg-richblack-800 p-[12px]"
                                            required type="email" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your Email Address"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                        />
                                    </label>
                                )
                            }
                            <button className="mt-4 rounded-md w-full text-richblack-900 bg-yellow-50 py-3"
                                    type="submit" >
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>
                            <NavLink to="/login" className="flex gap-1 items-center group" >
                                <FaArrowLeft className="text-blue-100 text-sm group-hover:scale-90 duration-200 transition "  />
                            <p className="text-blue-100 text-sm" >Back to Login</p>
                        </NavLink>
                            </div>
                            </div>
                )

            }
        </div>
    )
}

export default ForgotPassword