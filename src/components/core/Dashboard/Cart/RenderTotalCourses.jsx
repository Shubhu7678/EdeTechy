import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconButton"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalCourses() {
    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user, navigate, dispatch)
    }

    return (
        <div className="min-w-[280px] h-fit rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
            <button
                onClick={handleBuyCourse}
                className="w-full bg-yellow-50 py-2 font-medium text-richblack-900 rounded-md"
            >
                Buy Now
            </button>
        </div>
    )
}