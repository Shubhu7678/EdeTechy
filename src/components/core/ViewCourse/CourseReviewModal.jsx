import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { createRating } from '../../../services/operations/courseDetailsApi';

const CourseReviewModal = ({ setReviewModal }) => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {

    setValue('courseExperience', '');
    setValue('courseRating', 0);

  }, [])

  const ratingChanged = (newRating) => {

    setValue('courseRating', newRating);

  }

  const onSubmit = async(data) => {

    
    await createRating({
      courseId : courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience,
      token,
    })

    setReviewModal(false);
  }


  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 flex justify-center items-center  bg-richblack-800 bg-opacity-50 backdrop-blur-sm z-40">
        <div className="w-[500px] bg-richblack-900">
          {/* Modal header  */}

          <div className="flex flex-row justify-between px-4 py-4 bg-richblack-800 rounded-t-md text-white">
            <p className="text-richblack-100">Add Review</p>
            <button
              onClick={() => setReviewModal(false)}
            ><ImCancelCircle /></button>
          </div>
          {/* Modal Body  */}
          <div className="mt-2 flex flex-col justify-center items-center gap-1">

            <div className="flex flex-row gap-2 items-center">
              <img className="aspect-square w-[50px] rounded-full object-cover" src={user?.image} alt="" />
              <div className="flex flex-col gap-0">
                <p className="text-richblack-50 text-lg" >{user?.firstName + " " + user?.lastName}</p>
                <p className="text-richblack-100 text-sm">Posting Publicly</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-4 w-full"
            >
              <div className="text-center w-full flex flex-row items-center justify-center">
                <ReactStars
                  count={5}
                  size={24}
                  onChange={ratingChanged}
                  activeColor="#ffd700"
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-3 text-richblack-5">
                <label htmlFor="courseExperience">Add Your Experience</label>
                <textarea
                  name="courseExperience"
                  id="courseExperience"
                  rows={4}
                  className="w-full form-style px-2 py-1 bg-richblack-700"
                  placeholder="Add Your Experience Here"
                  {
                  ...register('courseExperience', { required: true })
                  }
                ></textarea>
                {
                  errors.courseExperience && (
                    <span className="text-sm text-rose-500">
                      Please add your experience
                    </span>
                  )
                }
              </div>

              <div className="flex flex-row gap-2 mt-2 justify-end px-3">
                <button
                  className="px-3 py-2 bg-richblack-700 rounded-md font-mono text-richblack-5"
                  onClick={() => setReviewModal(false)}
                >Cancel</button>
                <button
                  className="px-5 py-2 bg-yellow-50 rounded-md font-mono text-richblack-900"
                  type="submit"
                >Save</button>
              </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal