import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import toast from 'react-hot-toast';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSectionData,deleteSubSectionData } from '../../../../../services/operations/courseDetailsApi';

const NestedView = ({ handleChangeEditSectionName }) => {

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleDeleteSection = async (sectionId,courseId) => {

    const toastId = toast.loading('Loading...');
    try {

      const result = await deleteSectionData({ sectionId,courseId, token });
      console.log(result);

      if (result) { 

        dispatch(setCourse(result));
      }

      
    } catch (error) { 
      
      console.log("Error occured : ", error);

    }
    
    setConfirmationModal(null);
    toast.dismiss(toastId);
  }


  const handleDeleteSubSection = async (subSectionId, sectionId,courseId) => {
 
    try {

      const result = await deleteSubSectionData({ subSectionId, sectionId,courseId, token });

      if (result) { 

        dispatch(setCourse(result));
      }

      setConfirmationModal(null);

    } catch (err) { 

      console.log("Error :", err);
    }
  }

  return (
    <div className="mt-4">
      <div className="bg-richblack-700 rounded-sm p-2 px-4">
        {
          course?.courseContent?.map((section, index) => (

            <details key={section._id} className="mb-3" open>
              <summary className="border-b-1 flex justify-between">
                <div className="flex items-center gap-2">
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-richblack-100 "
                    onClick={() => handleChangeEditSectionName(section.sectionName, section._id)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmationModal({
                      text1: 'Delete this Section',
                      text2: 'All the lecture in this section will be deleted',
                      btn1Text: 'Delete',
                      btn2Text: 'Cancel',
                      btn1Handler: () => handleDeleteSection(section._id,course._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })}
                  >
                    <FaTrashAlt className="text-sm text-richblack-100" />
                  </button>
                  <span>|</span>
                  <MdArrowDropDown className="text-2xl text-richblack-100" />
                </div>
              </summary>
              <div>
                {
                  section.subSection.map((data, index) => (

                    <div key={data._id}
                      onClick={() => setViewSubSection(data)}
                      className="flex items-center justify-between border-b-2"
                    >
                      <div className="flex items-center gap-2">
                        <RxDropdownMenu />
                        <p>{data.title}</p>
                      </div>

                      <div
                        onClick={(e)=>e.stopPropagation()}
                        className="flex items-center gap-3">
                        <button
                          type="button"
                          className="text-richblack-100"
                          onClick={() => setEditSubSection({ ...data, sectionId: section._id,courseId : course._id })}
                        >
                          <MdEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmationModal({

                            text1: 'Delete this Sub Section',
                            text2: 'Selected Lecture will be deleted',
                            btn1Text: 'Delete',
                            btn2Text: 'Cancel',
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id,course._id),
                            btn2Handler: () => setConfirmationModal(null),

                          })}
                        >
                          <FaTrashAlt className="text-sm text-richblack-100" />
                        </button>
                        {/* <span>|</span> */}

                      </div>

                    </div>
                  ))
                }
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 mt-2 text-sm rounded-md text-yellow-50 border-2 border-yellow-50 "
                  onClick={() => setAddSubSection({ sectionId: section._id,courseId: course._id })}

                >
                  <MdOutlineAdd />
                  <p>Add Lecture</p>
                </button>

              </div>
            </details>
          ))
        }
      </div>
      {
        addSubSection ? (<SubSectionModal

          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />)
          : editSubSection ? (<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />)
            : viewSubSection ? (<SubSectionModal

              modalData={viewSubSection}
              setModalData={setViewSubSection}
              view={true}
            />)
              : (<div></div>)

      }
      { 

        confirmationModal && (<ConfirmationModal modalData={confirmationModal } />) 
      }

    </div>
  )
}

export default NestedView