import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';

const RequirementField = ({ label, name, errors, register, setValue, getValues }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course);

    const handleAddRequirement = () => {

        if (requirement) {

            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {

        const newRequirementList = [...requirementList];
        const updatedList = newRequirementList.filter((item, i) => i !== index);
        setRequirementList(updatedList);

    }

    useEffect(() => {

        register(name, { required: true });
        if (editCourse) { 

            setRequirementList(course?.instructions);
        }

    }, [])

    useEffect(() => {

        setValue(name, requirementList);

    }, [requirementList])

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full mt-1 p-2 rounded-md bg-richblack-700 border-richblack-900"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            <button
                type="button"
                onClick={handleAddRequirement}
                className="px-3 py-2 text-yellow-50 w-fit flex flex-row items-center gap-1 rounded-md text-base font-medium bg-richblack-900"
            >
                <span>Add</span>
                <IoIosAddCircleOutline className="text-base" />
            </button>
            { 
                errors[name] && (
                    <span className="text-pink-200" >Requirement Field is required**</span>
                )
            }
            <div>
                {
                    requirementList.length > 0 && (
                        <ul className="text-richblack-100 text-sm mt-1">
                            {
                                requirementList.map((data, index) => (
                                    
                                    <li
                                        key={index}
                                        className="flex flex-row items-center gap-1 mb-1"
                                    >
                                        <span>
                                            {data}
                                            </span>
                                        
                                            <button
                                                className="text-xs text-white bg-yellow-300 px-2 py-1 rounded-md"
                                                type="button"
                                                onClick={() => handleRemoveRequirement(index)}
                                            >
                                                Remove
                                            </button>
                                        
                                        </li>
                                    
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default RequirementField