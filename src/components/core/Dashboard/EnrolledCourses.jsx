import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCoursesData } from '../../../services/operations/enrolledAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { setUser } from "../../../slices/profileSlice";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const getEnrolledCourses = async () => {
            try {
                setLoading(true);
                const response = await getEnrolledCoursesData(token, dispatch);
                // console.log("Enrolled Courses ::",response.courses[0]);
                setLoading(false);
                setEnrolledCourses(response.courses);
            } catch (err) {
                console.log("Error in getting enrolled courses", err);
            }
        }
        getEnrolledCourses();

    }, [])

    return (
        <div className="text-white">
            <div className="text-3xl font-semibold">Enrolled Courses</div>
            {
                !enrolledCourses ?
                    (
                        <div>
                            Loading...
                        </div>
                    ) :
                    !enrolledCourses.length ?
                        (
                            <div>You haven't enrolled in any course yet.</div>
                        ) :
                        (
                            <div className="my-8 text-richblack-5">
                                <div className="flex rounded-t-lg bg-richblack-700">
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3">Duration</p>
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>
                                {
                                    enrolledCourses.map((course, index) => (

                                        <div
                                            onClick={() =>
                                            (
                                                navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/subSection/${course?.courseContent[0]?.subSection[0]?._id}`)
                                            )}
                                            className="flex cursor-pointer items-center border border-richblack-700" key={index}
                                        >
                                            <div className="w-[45%] p-3 flex gap-3 items-center">
                                                <img className="w-14 h-14 rounded-md" src={course.thumbnail} />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>
                                            <div className="w-1/4">
                                                {course?.totalDuration}
                                            </div>
                                            <div className="w-1/5 flex flex-col gap-2">
                                                <p>Progress: {course?.progressPercentage || 0}</p>
                                                <ProgressBar
                                                    completed={course?.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }
        </div>
    )
}

export default EnrolledCourses