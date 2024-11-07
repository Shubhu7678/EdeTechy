import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { MdSettingsBackupRestore } from "react-icons/md";
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';


const VerifyEmail = () => {

    const { loading,signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (!signupData) {

            navigate('/');
        }
    }, []);
    
    const { firstName, lastName, email, password, confirmPassword, accountType } = signupData;

    const resendOtp = () => { 

        dispatch(sendOtp(email, navigate));
    }

    const handleOnSubmit = (e) => { 

        e.preventDefault();
        // console.log(otp);
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp,navigate));        
    }

    return (
        <div>
            {
                loading ?
                    (
                        <div className="w-full text-center" >Loading...</div>
                    ) :
                    (
                        <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
                            <div className="w-[90%] lg:w-[35%] flex flex-col gap-3" >
                                <h1 className="text-richblack-5 font-semibold text-3xl" >Verify Email</h1>
                                <p className="text-richblack-100 " >A verification code has been sent to your email. Enter the Code below</p>
                                <form onSubmit={handleOnSubmit}>
                                    {/* //* User npm react otp input package here for adding otp  */}
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span
                                            style={{
                                                color: "white",
                                                
                                             }}>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                        inputStyle={{
                                            width: "60px",
                                            height: "40px",
                                            backgroundColor: "white",
                                            borderRadius: "5px",
                                            marginRight: "5px",
                                            marginLeft : "5px",
                                        }}
                                    />
                                    <button type="submit" className="w-full mt-4 rounded-md bg-yellow-100 py-3 text-richblack-800">
                                        Verify Email
                                    </button>
                                </form>
                                <div className="flex justify-between">
                                    <NavLink to="/login" className="flex items-center gap-1 group"  >
                                        <FaArrowLeft className="text-blue-100 text-sm group-hover:scale-90 duration-200 transition " />
                                        <p className="text-blue-100 text-sm" >Back to Login</p>
                                    </NavLink>
                                    <button onClick={resendOtp} className="flex items-center gap-1 text-blue-100 text-sm" >
                                        <MdSettingsBackupRestore />
                                        <p className="text-blue-100 text-sm" >Resend it</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    )
            }
        </div>
    )
}

export default VerifyEmail