import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { GiCrossedBones } from "react-icons/gi";
import UploadData from './UploadData';
import {createSubSection,updateSubSection} from '../../../../../services/operations/courseDetailsApi';

const SubSectionModal = ({ modalData, setModalData, view=false, edit=false, add }) => {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  useEffect(() => {
    if (view || edit) {

      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {

    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {

      return true
    }
    else {

      return false;
    }
  }

  const handleEditSubSection = async (data) => {

    const currentValues = getValues();
    const formData = new FormData();
    

    formData.append('sectionId', modalData.sectionId);
    formData.append('courseId', modalData.courseId);
    formData.append('subSectionId', modalData._id);

    if (currentValues.lectureTitle !== modalData.title) { 

      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) { 

      formData.append('description', currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) { 

      formData.append('videoUrl', currentValues.lectureVideo);
    }

    const result = await updateSubSection(formData, token);

    if (result) {

      dispatch(setCourse(result));
    }

    setModalData(null);
  }

  const onSubmit = async (data) => {

    if (view) {

      return;
    }
    if (edit) {

      if (!isFormUpdated()) {

        toast.error("No changes made in form !");
      }
      else {

        handleEditSubSection(data);
      }
      return;
    }

    const formData = new FormData();
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('videoUrl', data.lectureVideo);
    formData.append('sectionId', modalData.sectionId);
    formData.append('courseId', modalData.courseId);
    
    const result = await createSubSection(formData, token);
    console.log(result);
    if (result) {

      dispatch(setCourse(result));
    }
    setModalData(null);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[600px] bg-richblack-800 border border-richblack-400 rounded-lg my-10">
        <div className="flex flex-row justify-between bg-richblack-700 p-5">
          <p className="text-xl">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick={() => setModalData(null)}><GiCrossedBones /></button>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <UploadData
              label={'Video'}
              name={'lectureVideo'}
              errors={errors}
              register={register}
              setValue={setValue}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
            <div className="flex flex-col gap-1 mb-2 mt-2">
              <label htmlFor="lectureTitle" >Lecture Title <sup>*</sup></label>
              <input
                type="text"
                id="lectureTitle"
                name="lectureTitle"
                placeholder="Enter Lecture Title"
                className="p-2 rounded-md bg-richblack-700 border-richblack-900"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('lectureTitle', { required: true })
                }
              />
              {
                errors.lectureTitle && (
                  <span className="text-pink-200">Lecture title is required<sup>*</sup></span>
                )
              }
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="lectureDesc">Lecture Description</label>
              <textarea
                name="lectureDesc"
                id="lectureDesc"
                rows={3}
                className="p-2 rounded-md bg-richblack-700 border-richblack-900"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('lectureDesc', { required: true })
                }
              ></textarea>
              {
                errors.lectureDesc && (
                  <span className="text-pink-200">Lecture Description is required<sup>*</sup></span>
                )
              }
            </div>
            {
              !view && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-yellow-50 text-richblack-900 font-semibold py-2 px-5 mt-2 rounded-md"
                  >
                    {edit ? "Save Changes" : "Save"}
                  </button>
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubSectionModal