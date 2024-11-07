import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const  token  = location.pathname.split('/').at(-1);
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(
        {
            password: "",
            confirmPassword: "",
        }
    );

    const { password, confirmPassword } = formData;
    const handleOnChange = (e) => {

        setFormData((prev) => (

            {
                ...prev,
                [e.target.name]: e.target.value,
            }
        ))

    }

    const handleOnSubmit = (e) => {

        e.preventDefault();
        // console.log(id);
        if (password !== confirmPassword) {

            toast.error('Password not matched');
            return;
        }

        dispatch(resetPassword(password, confirmPassword , token));
    }

    return (
        <div>
            {
                loading ?
                    (
                        <div className="w-full text-center" >Loading...</div>
                    )
                    :
                    (
                        <div className="w-full min-h-[calc(100vh-3.5rem)] flex justify-center items-center" >
                            <div className="w-[90%]  lg:w-[35%] flex flex-col gap-2">
                                <h1 className="text-richblack-5 text-3xl">Choose new password</h1>
                                <p className="text-richblack-100" >Almost done. Enter your new password here and you're all set.</p>
                                <form onSubmit={handleOnSubmit}>
                                    <label htmlFor="">
                                        <p className="text-richblack-100" >New Password <sup className="text-pink-200" >*</sup></p>
                                        <input type="password" required onChange={handleOnChange}
                                            className="bg-richblack-800 mb-2 text-richblack-5 w-full px-1 py-3 rounded-md"
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </label>
                                    <label htmlFor="" className="">
                                        <p className="text-richblack-100" >Confirm Password <sup className="text-pink-200" >*</sup></p>
                                        <input type="password" required onChange={handleOnChange}
                                            className="bg-richblack-800 text-richblack-5 w-full px-1 py-3 rounded-md"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                        />
                                    </label>
                                    <button type="submit" className="w-full mt-3 py-3 rounded-md bg-yellow-50 text-richblack-800">Reset Password</button>
                                </form>
                                <NavLink to="/login" className="flex gap-1 items-center group" >
                                    <FaArrowLeft className="text-blue-100 text-sm group-hover:scale-90 duration-200 transition " />
                                    <p className="text-blue-100 text-sm" >Back to Login</p>
                                </NavLink>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword