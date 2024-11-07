import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/enrolledAPI';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import { NavLink } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import { LiaPrayingHandsSolid } from "react-icons/lia";

const Instructor = () => {

     const [loading, setLoading] = useState(false);
     const [instructorData, setInstructorData] = useState([]);
     const [courses, setCourses] = useState([]);
     const { token } = useSelector((state) => state.auth);
     const { user } = useSelector((state) => state.profile);

     useEffect(() => {

          const getCourseDataWithStats = async () => {

               setLoading(true);
               //pending

               const instructorApiData = await getInstructorData(token);
               const result = await fetchInstructorCourses(token);

               if (instructorApiData.length) {

                    setInstructorData(instructorApiData);
               }
               if (result.length) {

                    setCourses(result);
               }

               setLoading(false);

          }

          getCourseDataWithStats();
     }, [])

     console.log("Instructor Data : ", instructorData);
     const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
     const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
     console.log("Total Amount : ", totalAmount);
     console.log("Total Students : ", totalStudents);
     console.log("Courses : ", courses);
     return (
          <div className="text-white w-[800px] mx-auto">
               <div className="mb-2">
                    <div className="flex flex-row items-center gap-2 text-xl">
                    <p className="font-mono">Hi {user?.firstName}</p>
                         <LiaPrayingHandsSolid className="text-richblack-100" />
                         </div>
                    <p className="text-richblack-100">Let's start something new</p>
               </div>
               {
                    loading ?
                         (
                              <div> Loading...</div>
                         )
                         :
                         courses.length > 0 ?
                              (
                                   <div>
                                        <div>
                                             <div className="flex gap-3">
                                                  <InstructorChart courses={instructorData} />
                                                  <div className="bg-richblack-800 w-[230px] p-5 rounded-md">
                                                       <div className="flex flex-col gap-2">
                                                            <p className="font-semibold text-richblack-50 text-xl">Statistics</p>
                                                            <div className="">
                                                                 <p className="text-richblack-400 mb-1">Total Courses</p>
                                                                 <p className="text-richblack-100 text-xl font-bold">{courses.length}</p>
                                                            </div>
                                                            <div>
                                                                 <p className="text-richblack-400 mb-1">Total Students</p>
                                                                 <p className="text-richblack-100 text-xl font-bold">{totalStudents}</p>
                                                            </div>
                                                            <div>
                                                                 <p className="text-richblack-400 mb-1">Total Income</p>
                                                                 <p className="text-richblack-100 text-xl font-bold">{totalAmount}</p>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="bg-richblack-800 rounded-md p-4 mt-2">
                                             {/* Render 3 courses  */}
                                             <div className="flex flex-row justify-between gap-2 mb-2">
                                                  <p className="text-richblack-50 font-semibold text-xl" >Your Courses</p>
                                                  <NavLink to='/dashboard/my-courses' className="text-yellow-50">View All</NavLink>
                                             </div>
                                             <div className="flex flex-row justify-between">
                                                  {
                                                       courses?.slice(0, 3).map((course, index) => (
                                                            <div className="flex flex-col gap-1" key={index}>
                                                                 <img className="w-60 rounded-md flex-grow" src={course?.thumbnail} alt="" />
                                                                 <p className="text-richblack-100">{course?.courseName}</p>
                                                                 <div className="flex flex-row items-center text-richblack-100 gap-1 text-sm">
                                                                      <p>{course?.studentsEnrolled?.length + " Students "}</p>
                                                                      <p> | </p>
                                                                      <p>{" " + course?.price}</p>
                                                                 </div>
                                                            </div>
                                                       ))
                                                  }
                                             </div>
                                        </div>
                                   </div>
                              )
                              :
                              (
                                   <div>
                                        <p>You have not created any courses Yet</p>
                                        <NavLink to='/dashboard/add-course'>Create a Course</NavLink>
                                   </div>
                              )

               }
          </div>
     )
}

export default Instructor