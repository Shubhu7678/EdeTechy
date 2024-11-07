import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/settingAPI';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const submitRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();


  const handleSubmitButton = () => {

    submitRef.current.click();
  }

  useEffect(() => {

    reset({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      about: '',
      contact: '',

    })

  }, [isSubmitSuccessful, reset])

  const profileSubmit = (data) => {

    // e.preventDefault();
    // console.log(data);

    dispatch(updateProfile(token, data, navigate));
  }

  // console.log(user);

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="w-full bg-richblack-800 flex items-center justify-between py-5 px-10 rounded-md border-[1px] border-richblack-700">
        <form onSubmit={handleSubmit(profileSubmit)} className="w-full">
          <div className="flex flex-row gap-3 w-full mb-3">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">First Name</label>
              <input type="text"
                placeholder="Enter your first name"
                name="firstName"
                className="w-full p-[12px] rounded-md text-richblack-5 font-medium bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('firstName', { required: true })
                }
              />
              {
                errors.firstName && (
                  <span className='text-pink-200 my-1'>First Name field is required*</span>
                )
              }
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Last Name</label>
              <input type="text"
                placeholder="Enter your last name"
                name="lastName"
                className="w-full p-[12px] rounded-md text-richblack-100 bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('lastName', { required: true })
                }
              />
              {
                errors.lastName && (
                  <span className="text-pink-200 my-1">Last Name field is required*</span>
                )
              }
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full mb-3">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">D.O.B</label>
              <input type="date"
                placeholder="Enter your date of birth"
                name="dateOfBirth"
                className="w-full p-[12px] rounded-md text-richblack-50 font-regular bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('dateOfBirth', { required: true })
                }
              />
              {
                errors.dateOfBirth && (
                  <span className="text-pink-200 my-1">Date of Birth field is required*</span>
                )
              }
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Gender</label>
              <input type="text"
                placeholder="Enter your gender"
                name="gender"
                className="w-full p-[12px] rounded-md text-richblack-100 bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('gender', { required: true })
                }
              />
              {
                errors.gender && (
                  <span className="text-pink-200 my-1">Gender field is required*</span>
                )
              }
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Contact Number</label>
              <input type='number'
                placeholder="Enter your contact number"
                name="contact"
                className="w-full p-[12px] rounded-md text-richblack-100 bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('contact', {

                  required: { value: true, message: "Contact field is required" },
                  maxLength: { value: 10, message: "Invalid contact number" },
                  minLength: { value: 9, message: "Invalid contact number" }

                })
                }
              />
              {
                errors.contact && (
                  <span className="text-pink-200 my-1">{errors.contact.message + "*"}</span>
                )
              }
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">About</label>
              <input type="text"
                placeholder="Enter about yourself"
                name="about"
                className="w-full p-[12px] rounded-md text-richblack-100 bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('about', { required: true })
                }
              />
              {
                errors.about && (
                  <span className="text-pink-200 my-1">About field is required*</span>
                )
              }
            </div>
          </div>
          <div>
            <button ref={submitRef} type="submit" className="hidden">Submit</button>
          </div>
        </form>
      </div>
      <div className="w-full text-right">
        <div className="flex flex-row justify-end gap-2">
          <button className="bg-richblack-400 text-richblack-5 py-2 px-3 text-sm rounded-md font-semibold">
            Cancel
          </button>
          <button onClick={handleSubmitButton} className="bg-yellow-50 text-richblack-900 py-1 px-5 text-base rounded-md font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile