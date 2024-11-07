import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsApi';

const EditCourse = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(null);
    // console.log(courseId);

    useEffect(() => {

        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            console.log(result);
            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }

        populateCourseDetails();

    }, [])

    return (
        <div className="text-white flex justify-center">
            <div className="flex w-[70%]">
                <div>
                    <h1>Edit Course</h1>
                    {
                        course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default EditCourse