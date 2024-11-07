import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsApi';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const handleCourseBuilderSubmit = async (data) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    if (editSectionName) {

      const formData = new FormData();
      formData.append('sectionName', data.sectionName);
      formData.append('courseId', course._id);
      formData.append('sectionId', editSectionName);
      result = await updateSection(formData, token); 
     
    }
    else {

      const formData = new FormData();
      formData.append('sectionName', data.sectionName);
      formData.append('courseId', course._id);
      result = await createSection(formData, token);

    }
    if (result) {

      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName', '');
    }

    toast.dismiss(toastId);
  }

   const cancelEdit = () => {

    setEditSectionName(null);
    setValue('sectionName', '');
  }

  const handleChangeEditSectionName = (sectionName, sectionId) => {

    if (editSectionName === sectionId) {

      setEditSectionName(null);
      setValue('sectionName', '');
      return;
    }
    
    
    setValue('sectionName', sectionName);
    setEditSectionName(sectionId);
  }

  const goBack = () => {

    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {

    if (course.courseContent.length === 0) {

      toast.error('Please add atleast one section');
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {

      toast.error('Please add atleast one lecture in each section');
      return;
    }

    //If everything working properly then go to next step
    dispatch(setStep(3));

  }
 

  return (
    <div className="text-white p-3 mt-9 bg-richblack-800">
      <div className="mt-1">
        <p className="text-xl text-richblack-50 mb-5">Course Builder</p>
        <form onSubmit={handleSubmit(handleCourseBuilderSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="sectionName" className="text-richblack-100">Section Name <sup>*</sup></label>
            <input type="text"
              placeholder="Enter Section Name"
              name="sectionName"
              id="sectionName"
              className="p-2 rounded-md bg-richblack-700 border-richblack-900"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register('sectionName', { required: true })}
            />
            {
              errors.sectionName && (
                <span className="text-red-500">Section Name is required</span>
              )
            }
          </div>
          <div className="mt-4">
            <div className={`${editSectionName ? 'flex flex-row gap-2' : ''}`}>
              <button
                type="submit"
                className="text-yellow-50 px-3 text-base font-medium py-2 rounded-sm flex items-center gap-1 bg-richblack-900"

              >
                <span>{!editSectionName ? 'Create Section' : 'Edit Section Name'}</span>
                <IoMdAddCircleOutline />
              </button>
              {
                editSectionName && (
                  <button
                    type="button"
                    className="bg-yellow-50 text-base font-medium px-3 py-2 rounded-sm flex items-center gap-1 text-richblack-800"
                    onClick={cancelEdit}
                  >
                    <span>Cancel Edit</span>

                  </button>
                )
              }
            </div>
          </div>
        </form>

        {
          course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
          )
        }

        <div className="mt-3 flex flex-row gap-3 justify-end pr-3">
          <button
            className="bg-richblack-900 text-yellow-50 px-3 py-1 rounded-sm"
            onClick={goBack}
          >
            Back
          </button>
          <button
            className="bg-yellow-50 text-base text-richblack-800 font-medium px-3 py-1 rounded-sm"
            onClick={goToNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>

  )

}

export default CourseBuilderForm;