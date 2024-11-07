import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { MdAddCall } from "react-icons/md";

const ChatContact = () => {
    return (
        <div className="lg:w-[35%] ">
            {/* first section  */}
            <div className="bg-richblack-700 p-5 rounded-md flex flex-col gap-5">
                <div className="flex flex-col gap-1" >
                    <div className="text-richblack-50 flex flex-row gap-1 text-xl items-center font-semibold">
                        {/* icon  */}
                        <IoMdChatbubbles className="text-xl" />

                        {/* heading */}
                        <h1>Chat on us</h1>
                    </div>
                    {/* para  */}
                    <p className="text-richblack-100">Our friendly team is here to help. info@EdeTechy.com</p>
                </div>
                {/* second section  */}
                <div className="flex flex-col gap-1" >
                    <div className="text-richblack-50 flex flex-row gap-1 text-xl items-center font-semibold">
                        {/* icon  */}
                        <BiWorld className="text-xl" />
                        {/* heading */}
                        <h1>Visit us</h1>
                    </div>
                    {/* para  */}
                    <p className="text-richblack-100">Come and say hello at our office HQ.
                        Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                </div>
                {/* third section  */}
                <div className="flex flex-col gap-1" >
                    <div className="text-richblack-50 flex flex-row gap-1 text-xl items-center font-semibold">
                        {/* icon  */}
                        <MdAddCall  className="text-xl" />

                        {/* heading */}
                        <h1>Chat on us</h1>
                    </div>
                    {/* para  */}
                    <p className="text-richblack-100">Our friendly team is here to help. info@EdeTechy.com</p>
                </div>
            </div>
        </div>
    )
}

export default ChatContact