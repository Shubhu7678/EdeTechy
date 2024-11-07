import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalCourses from './RenderTotalCourses';

const index = () => {

    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="text-white">
            <p className="text-3xl font-semibold text-richblack-5">Cart</p>
            <p className="border-b-2 pb-2 border-richblack-100 my-4">{totalItems} courses in Cart</p>
            {
                total > 0 ?
                    (
                        <div className="flex flex-row gap-6">
                            <RenderCartCourses />
                            <RenderTotalCourses />
                        </div>
                    ) :
                    (
                        <div className="flex w-full h-[300px] items-center justify-center">
                            <p>Your cart is empty</p>
                        </div>
                    )
            }
        </div>
    )
}

export default index