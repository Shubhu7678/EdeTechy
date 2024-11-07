import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setStep,resetCourseState } from '../../../../../slices/courseSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateCourseData } from '../../../../../services/operations/courseDetailsApi';

const PublishCourse = () => {

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful },

    } = useForm();

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    const goToCourses = () => { 

        dispatch(resetCourseState());
        navigate('/dashboard/my-courses');

    }

    const handleCoursePublish = async (data) => {

        if (course?.status === 'Published' && getValues('public') === true || 
             course?.status === 'Draft' && getValues('public') === false) {

            goToCourses();
            return;

        }

        const formData = new FormData();
        formData.append('courseId', course._id);
        const status = getValues('public') ? 'Published' : 'Draft';
        formData.append('status', status);

        setLoading(true);
        const result = await updateCourseData(formData, token);
        setLoading(false);
        if (result) { 
            goToCourses();
        }

    }
    const onSubmit = async (data) => {

        handleCoursePublish(data); 
        // console.log(getValues('public'));
    }

    useEffect(() => {

        if (course?.status === 'published') {
            setValue('public', course?.status);
        }
    }, [])

    return (
        <div className="bg-richblack-800 border-[1px] mt-5 rounded-md py-6 pl-12 pr-6 border-richblack-800">
            <p className="text-xl font-mono">Publish Course </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-white mt-3">
                    <label htmlFor="public" className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            name="public"
                            id="public"
                            {
                            ...register('public')
                            }
                            className="w-4 h-4 rounded-md"
                        />
                        <span>Make Course Public</span>
                    </label>
                </div>
                <div className="flex gap-2 justify-end mt-10">
                    <button
                        disabled={loading}
                        className="bg-richblack-900 text-yellow-50 px-6 py-2 rounded-md"
                        type='button'
                        onClick={() => dispatch(setStep(2))}
                    >Back</button>
                    <button
                        disabled={loading}
                        className="bg-yellow-50 text-richblack-800 px-6 py-2 rounded-md"
                        type='submit'
                    >Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;