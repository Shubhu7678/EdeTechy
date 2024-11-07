import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi';
import { getCompletedLectures } from '../services/operations/courseDetailsApi';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const setCourseSpecificDetails = async () => {
            setLoading(true);
            try {
                const courseData = await getFullDetailsOfCourse(courseId);
                dispatch(setCourseSectionData(courseData.courseContent));
                dispatch(setCourseEntireData(courseData));
                const allCompletedLectures = await getCompletedLectures(courseId, token);

                dispatch(setCompletedLectures(allCompletedLectures));
                let lectures = 0;
            

                courseData?.courseContent?.forEach((section) => {

                    lectures += section.subSection.length;
                });

                console.log(courseData);

                dispatch(setTotalNoOfLectures(lectures))
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
            
        }

        setCourseSpecificDetails();
    }, [])


    if (loading) return <div>Loading...</div>;
    return (
        <>
            <div>
                <div className="flex flex-row">
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                    <div className="w-full overflow-y-auto h-[calc(100vh-3.5rem)]">
                        <Outlet />
                    </div>
                </div>

                {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
            </div>
        </>
    )
}

export default ViewCourse