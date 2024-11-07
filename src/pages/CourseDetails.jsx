import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import { MdOutlineInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { IoMdArrowDropright } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import CourseContent from '../components/core/CourseDetails/CourseContent';
import Footer from '../components/common/Footer';



const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [totalNoOfSections, setTotalNoOfSections] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {

        let lectures = 0;
        let sections = 0;
        courseData?.courseContent?.forEach((section) => {

            lectures += section.subSection.length || 0;
            sections++;
        })

        setTotalNoOfLectures(lectures);
        setTotalNoOfSections(sections);
    }, [courseData])


    useEffect(() => {

        const count = GetAvgRating(courseData?.ratingAndReviews);
        setAvgReviewCount(count);

    }, [courseData])

    useEffect(() => {

        const getCourseDataById = async () => {
            setLoading(true);
            try {
                const result = await getFullDetailsOfCourse(courseId);
                setCourseData(result);
                console.log(result);

            } catch (error) {

                console.log("Error occured : ", error);
            }
            setLoading(false);
        }
        getCourseDataById();

    }, [courseId])


    const handleBuyCourse = async () => {

        if (user && user?.accountType === 'Instructor') { 
            
            toast.error("Instructor can't buy course at this moment");
            return;
        }
        setLoading(true);
        if (token) {

            buyCourse(token, [courseId], user, navigate, dispatch);
        }
        else {
            setConfirmationModal(
                {
                    text1: "You are not Logged In",
                    text2: "Login to purchase the course",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1hander: () => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null),
                }
            )
        }
        setLoading(false);
    }


    const handleAddToCart = () => { 
           
        if (user && user?.accountType === 'Instructor') { 

            toast.error("Instructor can't add course to cart");
            return;
        }

        if (token) {

            dispatch(addToCart(courseData));
        }
        else {
            setConfirmationModal(
                {
                    text1: "You are not Logged In",
                    text2: "Please Login to add to cart",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1hander: () => navigate('/login'),
                    btn2handler: () => setConfirmationModal(null),
                }
            )
        }
         
    }

    const handleShare = () => { 

        copy(window.location.href);
        toast.success("Link copied to clipboard");

    }
    return (
        <div className="text-white">

            <div className="w-full bg-richblack-700 h-[300px]">
                <div className="w-11/12 max-w-maxContent mx-auto relative">
                    <div className="pt-10 flex flex-col gap-2">
                        <p className="text-3xl font-semibold">{courseData?.courseName}</p>
                        <p>{courseData?.courseDescription}</p>
                        <div className="flex flex-row gap-2">
                            <p>{avgReviewCount}</p>
                            <RatingStars Review_Count={avgReviewCount} />
                            <p>{`(${courseData?.ratingAndReviews?.length} Reviews)`}</p>
                            <p>{`${courseData?.studentsEnrolled?.length} Students Enrolled`}</p>
                        </div>
                        <p>{`Created By ${courseData?.instructor?.firstName + " " + courseData?.instructor?.lastName} `}</p>
                        <div className="flex flex-row items-center gap-2">
                            <MdOutlineInfo />
                            <p>Created At {formatDate(courseData?.createdAt)}</p>
                            <TbWorld />
                            <p> English</p>
                        </div>
                    </div>
                    <div className="absolute top-10 right-0 w-[350px] rounded-md bg-richblack-800 p-4">
                        <div className="flex flex-col gap-3">
                            <img className="rounded-md" src={courseData?.thumbnail} alt="" />
                            <p className="text-xl font-semibold text-richblack-50 pl-2">{"Rs. " + courseData?.price}</p>
                            <button
                                onClick={user && courseData?.studentsEnrolled.includes(user?._id) ?
                                    (() => navigate('/dashboard/enrolled-courses')) :
                                    (() => handleBuyCourse())
                                }

                                className="w-full py-2 rounded-md bg-yellow-50 text-richblack-900 font-bold"
                            >
                                {user && courseData?.studentsEnrolled.includes(user._id) ? "Go to Course" : "Buy Now"}
                            </button>
                            {user && !courseData?.studentsEnrolled.includes(user._id) &&
                                (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-2 rounded-md bg-richblack-900 text">
                                        Add to Cart
                                    </button>
                                )
                            }
                            <p className="text-sm text-richblack-100 text-center">30-Days Money-Back Guarantee</p>
                            <div>
                                <p className="text-white text-xl">This Course Includes :</p>
                                <div className="mt-1 flex flex-col gap-1">
                                    {
                                        courseData?.instructions?.map((instruction, index) =>
                                        (
                                            <div key={index}
                                                className="text-caribbeangreen-25 text-sm flex items-center gap-1">
                                                <IoMdArrowDropright />
                                                <p>{instruction}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <p className="text-center">
                                <button
                                    className="inline-flex flex-row items-center gap-1 text-yellow-50"
                                    onClick={handleShare}
                                >
                                    <FaShareFromSquare />
                                    <span>Share</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 2  */}
            <div>
                <div className="w-11/12 max-w-maxContent mx-auto mt-10">
                    <div className="w-[67%]">
                        <div className="flex flex-col gap-2 border border-richblack-700 p-5">
                            <p className="text-2xl font-semibold text-richblack-100">What You Will Learn</p>
                            <div className="text-richblack-100">
                                { courseData?.whatYouWillLearn }
                            </div>
                        </div>   
                        <div className="mt-5">
                            <CourseContent course={courseData} sections={totalNoOfSections} lectures={totalNoOfLectures} />
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer/>
            {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
        </div>
    )
}

export default CourseDetails
