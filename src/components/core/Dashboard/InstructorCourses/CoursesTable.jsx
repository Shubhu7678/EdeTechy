import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { IoIosTime } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({ courses, setCourses }) => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleDeleteCourse = async (courseId) => {

        setLoading(true);
        const result = await deleteCourse(courseId, token);
        if (result) {
            const updatedCourses = await fetchInstructorCourses(token);
            setCourses(updatedCourses);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        // <div className="text-white w-full mt-8">
        <>
            <Table className="rounded-xl border border-richblack-800">
                <Thead>
                    <Tr className="flex gap-x-10 px-6 py-2 rounded-t-md border-b border-b-richblack-800" >
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">COURSES</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">DURATION</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">PRICES</Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">ACTIONS</Th>
                    </Tr>
                </Thead>
                <Tbody className="">
                    {
                        courses?.length === 0 ?
                            (
                                <Tr>
                                    <Td colSpan={4} className="text-center">No Course Found</Td>
                                </Tr>
                            )
                            :
                            (
                                courses.map((course, index) => (

                                    <Tr
                                        className="flex gap-x-10 px-6 py-2 rounded-t-md border-b border-b-richblack-800"
                                        key={index}
                                    //   className="flex justify-between w-full  border border-richblack-800 p-6"
                                    >
                                        <Td className="flex flex-1 gap-x-4">

                                            <img
                                                src={course?.thumbnail}
                                                alt=""
                                                className="h-[150px] w-[220px] rounded-lg object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <p>{course?.courseName}</p>
                                                <p>{course?.courseDescription}</p>
                                                <p>Created : </p>
                                                {
                                                    course?.status &&
                                                    (
                                                        <p
                                                            className={`${course?.status === 'Published' ? 'text-yellow-50' : 'text-pink-300'} bg-richblack-700 w-fit px-2 py-1 flex items-center gap-1 font-mono rounded-xl text-sm`}>
                                                            {
                                                                course?.status === 'Published' ? (<FaCircleCheck />) : (<IoIosTime />)
                                                            }
                                                            <span>{course?.status === 'Published' ? 'Published' : 'Draft'}</span>
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </Td>
                                        <Td className="text-sm font-medium text-richblack-100">2hr 30min</Td>
                                        <Td className="text-sm font-medium text-richblack-100">{course?.price}</Td>
                                        <Td className="text-sm font-medium text-richblack-100">
                                            <div className="flex gap-x-1">
                                                <button
                                                    disabled={loading}
                                                    onClick={() => navigate(`/dashboard/edit-course/${course?._id}`)}
                                                    className="group"
                                                ><MdOutlineModeEdit className="text-xl group-hover:text-caribbeangreen-300" />
                                                </button>
                                                <button
                                                    disabled={loading}
                                                    className="group"
                                                    onClick={() => setConfirmationModal(
                                                        {
                                                            text1: "Do you want to delete this course",
                                                            text2: "All the data related to this course will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handleDeleteCourse(course?._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        }
                                                    )}
                                                >
                                                    <FaTrashCan className="text-lg group-hover:text-pink-400" />
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            )
                    }
                </Tbody>
            </Table>
            {
                confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)
            }
    {/* </div> */}
     </>
    )
}

export default CoursesTable