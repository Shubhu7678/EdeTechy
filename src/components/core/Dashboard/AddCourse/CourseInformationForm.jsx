import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories, addCourseDetails, updateCourseData } from '../../../../services/operations/courseDetailsApi';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { FaSave } from "react-icons/fa";
import { ImNext2 } from "react-icons/im";


const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(null);
    const [courseCategories, setCourseCategories] = useState(null);
    const { token } = useSelector((state) => state.auth);

    // console.log(course);

    const isFormUpdated = () => {

        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        )
            return true;
        else
            return false;
    }

    // handle next button click 
    const onSubmit = async (data) => {

        if (editCourse) {

            if (isFormUpdated) {

                const currentValues = getValues();
                const formData = new FormData();

                formData.append('courseId', course._id);
                if (currentValues.courseTitle !== course.courseName) {

                    formData.append('courseName', data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {

                    formData.append('courseDescription', data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {

                    formData.append('price', data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {

                    formData.append('tag', JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {

                    formData.append('whatYouWillLearn', data.courseBenefits);
                }
                if (currentValues.courseCategory !== course.category._id) {

                    formData.append('category', data.courseCategory);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {

                    formData.append('instructions', JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {

                    formData.append('thumbnail', data.courseImage);
                }

                setLoading(true);
                const result = await updateCourseData(formData, token);
                setLoading(false);

                if (result) {

                    dispatch(setCourse(result));
                    console.log(result);
                    dispatch(setStep(2));
                }

            }
            else {

                toast.error('No changes made to the form');
            }
            return;
        }

        //Create a new course

        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append('courseDescription', data.courseShortDesc);
        formData.append('price', data.coursePrice);
        formData.append('tag', JSON.stringify(data.courseTags));
        formData.append('whatYouWillLearn', data.courseBenefits);
        formData.append('category', data.courseCategory);
        formData.append('instructions', JSON.stringify(data.courseRequirements));
        formData.append('thumbnail', data.courseImage);
        formData.append('status', COURSE_STATUS.DRAFT);

        setLoading(true);
        const toastId = toast.loading("Loading...");
        const result = await addCourseDetails(formData, token);
        if (result) {

            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        toast.dismiss(toastId);
        setLoading(false);

    }

    useEffect(() => {

        const getCategoriesData = async () => {
            setLoading(true);
            const toastId = toast.loading('Loading...');
            try {

                const categories = await fetchCourseCategories();
                if (categories.length > 0) {

                    setCourseCategories(categories);
                }

            } catch (err) {

                console.log("Error :", err);
            }

            toast.dismiss(toastId);
            setLoading(false);
        }

        getCategoriesData();

    }, [])

    useEffect(() => {
        if (editCourse && !loading) {
            // Only set values if editing a course and categories are loaded
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            // const category = course?.category ? course.category : course.category._id;
            setValue('courseCategory', course.category); 
            // setValue('courseCategory', category);
            setValue('courseImage', course.thumbnail);
            setValue('courseRequirements', course.instructions);
        }
        
        //! Added useEffect on loading because when we set value 
        //! we need to wait for categories to be loaded
    }, [editCourse, loading]);




    return (
        <div className="p-3">
            <div className="bg-richblack-800 rounded-md mt-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-richblack-800 rounded-md border-richblack-700 p-6"
                >
                    <div className="flex flex-col gap-5">
                        <div className="">
                            <label htmlFor='courseTitle' className="text-base font-medium text-richblack-5 ">Course Title <sup>*</sup></label>
                            <input
                                type="text"
                                name="courseTitle"
                                id="courseTitle"
                                className="w-full mt-1 p-2 rounded-md bg-richblack-700 border-richblack-900"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                {...register('courseTitle', { required: true })}
                            />
                            {
                                errors.courseTitle &&
                                (
                                    <span className="text-sm text-pink-500">Course title is required</span>
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor='courseShortDesc' className="text-base font-medium text-richblack-5">Course Description <sup>*</sup></label>
                            <textarea
                                type="text"
                                name="courseShortDesc"
                                id="courseShortDesc"
                                rows={6}
                                className="w-full rounded-md bg-richblack-700 p-2 mt-1"
                                placeholder="Enter Description"
                                {
                                ...register('courseShortDesc', { required: true })
                                }
                            />
                            {
                                errors.courseShortDesc &&
                                (
                                    <span className="text-sm text-pink-500">Course short description is required</span>
                                )
                            }
                        </div>
                        <div className="relative">
                            <label htmlFor='coursePrice' className="text-base font-medium text-richblack-5 ">Course Price <sup>*</sup></label>
                            <input
                                type="text"
                                name="coursePrice"
                                id="coursePrice"
                                className="w-full mt-1 py-2 px-10 rounded-md bg-richblack-700 border-richblack-900"

                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                {
                                ...register('coursePrice',
                                    {
                                        required: true,
                                        valueAsNumber: true,

                                    })
                                }
                            />
                            <HiOutlineCurrencyRupee className="absolute text-2xl text-richblack-400 top-[50%] left-2" />
                            {
                                errors.coursePrice &&
                                (
                                    <span className="text-sm text-pink-500">{errors.coursePrice.message}</span>
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor="courseCategory">Course Cateogry <sup>*</sup></label>
                            <select
                                name="courseCategory"
                                id="courseCategory"
                                defaultValue=''
                                className="w-full px-2 py-2 mt-1 rounded-md bg-richblack-700 "
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                {
                                ...register('courseCategory', { required: true })
                                }
                            >

                                <option value="" disabled>Choose a Category</option>
                                {
                                    courseCategories?.map((category, index) => (

                                        <option key={index} value={category?._id}>
                                            {category?.name}
                                        </option>

                                    ))
                                }
                            </select>
                            {
                                errors.courseCategory && (
                                    <span className="text-pink-400">Course category is required*</span>
                                )
                            }
                        </div>
                        {/* Create a custome component for handling tags input  */}
                        <ChipInput
                            label="Tags"
                            name="courseTags"
                            placeholder="Enter tags and press enter"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                        />
                        {/* Create a custom component for handling course thumbnail  */}
                        <Upload
                            label="Course Thumbnail"
                            name="courseImage"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                        {/* Benefits of the course  */}
                        <div>
                            <label htmlFor="">Benefits of the Course <sup>*</sup></label>
                            <textarea
                                type="text"
                                id="courseBenefits"
                                name="courseBenefits"
                                rows={3}
                                className="w-full rounded-md bg-richblack-700 p-2 mt-1"
                                placeholder="Enter Benefits"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                {
                                ...register('courseBenefits', { required: true })
                                }
                            />
                            {
                                errors.courseBenefits && (
                                    <span className="text-pink-200">Course benefits is required*</span>
                                )
                            }
                        </div>
                        <RequirementField

                            name="courseRequirements"
                            label="Requirements/Instructions"
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                            register={register}
                        />

                        <div className="flex gap-2 justify-end mt-2">
                            {
                                editCourse &&
                                (
                                    <button
                                        className="bg-richblack-900 px-2 py-2 font-mono text-yellow-50 rounded-sm mr-2 flex items-center gap-1"
                                        onClick={() => dispatch(setStep(2))}
                                    >
                                        <span>Without Saving</span>
                                        <ImNext2 />
                                    </button>
                                )
                            }
                            <button
                                className="bg-yellow-200  font-mono text-richblack-900 px-2 py-2 rounded-sm flex items-center gap-1"
                                type="submit"
                            >
                                <span>{!editCourse ? "Save & Next" : "Save Changes"}</span>
                                <FaSave />
                            </button>
                        </div>

                    </div>
                </form>
            </div >
        </div >
    )
}

export default CourseInformationForm