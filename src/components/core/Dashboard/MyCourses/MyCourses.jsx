import React, { useEffect, useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import CoursesTable from '../InstructorCourses/CoursesTable';

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {

    const fetchCourses = async () => {

      setLoading(true);
      const result = await fetchInstructorCourses(token);
      setLoading(false);
      setCourses(result);
    }

    fetchCourses();

  }, [])

  console.log(courses);

  return (
    <div className="text-white flex justify-center w-full">
      <div className="w-[70%] p-3">
        <div className="flex justify-between">
          <p className="text-3xl font-mono ">My Courses</p>
          <button
            className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-md text-black"
            onClick={() => navigate('/dashboard/add-course')}
          >
            <span className="font-mono">Add Course</span>
            <IoMdAddCircle className="text-lg" />
          </button>
        </div>
        <div>
          {
            courses && (<CoursesTable courses={courses} setCourses={setCourses} />)
          }
        </div>

      </div>
    </div>
  )
}

export default MyCourses