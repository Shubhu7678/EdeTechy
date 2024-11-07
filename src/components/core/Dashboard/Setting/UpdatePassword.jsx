import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewPassword } from '../../../../services/operations/settingAPI';
import { setLoading } from '../../../../slices/profileSlice';


const UpdatePassword = () => {

  const submitPasswordRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {

    reset({
      oldPassword: "",
      newPassword: "",
    })

  }, [isSubmitSuccessful])

  const handleSubmitButton = () => {

    submitPasswordRef.current.click();
  }

  const profilePasswordSubmit = async (data) => {

    dispatch(setLoading(true));
    const result = await updateNewPassword(data, token);
    dispatch(setLoading(false));
    if (result) {

      console.log("Result : ",result);
    }
  }


  return (
    <div className="w-full flex flex-col gap-7">
      <div className="w-full bg-richblack-800 flex items-center justify-between py-5 px-10 rounded-md border-[1px] border-richblack-700">
        <form onSubmit={handleSubmit(profilePasswordSubmit)} className="w-full">
          <div className="flex flex-row gap-3 w-full mb-3">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Current Password</label>
              <input type="text"
                placeholder="Enter your current password"
                name="oldPassword"
                className="w-full p-[12px] rounded-md text-richblack-5 font-medium bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('oldPassword', { required: true })
                }
              />
              {
                errors.oldPassword && (
                  <span className='text-pink-200 my-1'>Old Password field is required*</span>
                )
              }
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">New Password</label>
              <input type="text"
                placeholder="Enter your new password"
                name="newPassword"
                className="w-full p-[12px] rounded-md text-richblack-100 bg-richblack-700"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {
                ...register('newPassword', { required: true })
                }
              />
              {
                errors.newPassword && (
                  <span className="text-pink-200 my-1">New password field is required*</span>
                )
              }
            </div>
          </div>
          <div>
            <button ref={submitPasswordRef} type="submit" className="hidden">Submit</button>
          </div>
        </form>
      </div>
      <div className="w-full text-right">
        <div className="flex flex-row justify-end gap-2">
          <button className="bg-richblack-400 text-richblack-5 py-2 px-3 text-sm rounded-md font-semibold">
            Cancel
          </button>
          <button onClick={handleSubmitButton} className="bg-yellow-50 text-richblack-900 py-1 px-5 text-base rounded-md font-semibold">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword