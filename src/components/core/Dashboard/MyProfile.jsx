import React from 'react'
import IconButton from '../../common/IconButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className="text-white flex justify-center w-full">
            <div className="w-[70%] flex flex-col gap-7">
                <h1 className="text-3xl font-medium mb-2">My Profile</h1>
                {/* section 1  */}
                <div className="flex flex-row justify-between p-4 rounded-md bg-richblack-800 ">
                    <div className="flex flex-row gap-4 items-center">
                        <img className="aspect-square w-[80px] rounded-full object-cover" src={user?.image} alt={`profile-${user?.firstName}`} />
                        <div>
                            <h1 className="text-xl font-semibold mb-1">
                                {user?.firstName + " " + user?.lastName}
                            </h1>
                            <p className="font-regular text-sm text-richblack-100" >{user?.email}</p>
                        </div>
                    </div>
                    <div>
                        <IconButton
                            onclick={() => (navigate('/dashboard/settings'))}
                            customClasses={`text-richblack-800 bg-yellow-50 rounded-md px-3 py-1`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <p className="font-regular text-sm" >Edit</p>
                                <FaRegEdit />
                            </div>
                        </IconButton>
                    </div>
                </div>

                {/* section 2  */}
                <div className="p-4 bg-richblack-800 rounded-md flex flex-col gap-3 ">
                    <div className="flex flex-row justify-between">
                        <p>About</p>
                        <IconButton
                            onclick={() => (navigate('/dashboard/settings'))}
                            customClasses={`text-richblack-800 bg-yellow-50 rounded-md px-3 py-1`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <p className="font-regular text-sm" >Edit</p>
                                <FaRegEdit />
                            </div>
                        </IconButton>
                    </div>
                    <p className="w-[90%] text-richblack-100">
                        {
                            user?.additionalDetails?.about ? (user?.additionalDetails?.about)
                                :
                                ("Write Something About Yourself")
                        }
                    </p>
                </div>

                {/* section 3 */}

                <div className="p-4 bg-richblack-800 rounded-md flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                        <p className="text-xl font-regular">Personal Details</p>
                        <IconButton
                            onclick={() => (navigate('/dashboard/settings'))}
                            customClasses={`text-richblack-800 bg-yellow-50 rounded-md px-3 py-1`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <p className="font-regular text-sm">Edit</p>
                                <FaRegEdit />
                            </div>
                        </IconButton>
                    </div>
                    <div className="w-[70%] flex justify-between">
                        <div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">First Name</p>
                                <p>{user?.firstName}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">Email</p>
                                <p>{user?.email}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">Contact</p>
                                <p>{user?.additionalDetails?.contact ?? "Add Contact Number"}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">Last Name</p>
                                <p>{user?.lastName}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">Gender</p>
                                <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-richblack-100">Date of Birth</p>
                                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile