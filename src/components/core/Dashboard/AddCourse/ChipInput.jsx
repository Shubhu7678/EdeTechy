import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';


const ChipInput = ({ label, name, placeholder, register, errors, setValue, getValues }) => {

    const [chips, setChips] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course);


    const deleteChip = (chipIndex) => {

        const newChips = chips.filter((item, index) => index !== chipIndex);
        setChips(newChips);

    }

    const handleKeyDown = (e) => {

        // console.log(e.key);
        // console.log(e.target);
        if (e.key === 'Enter' || e.key === ',') {

            // e.preventDefault();
            e.preventDefault();
            const currentValue = e.target.value.trim();

            if (currentValue && !chips.includes(currentValue)) {

                const newChip = [...chips, currentValue];
                setChips(newChip);
                e.target.value = '';
                // console.log(e.target.value);
            }

        }

    }

    useEffect(() => {

        register(name, { required: true });

    }, [register, name])

    useEffect(() => {
        setValue(name, chips);

    }, [chips, name, setValue]);

    useEffect(() => {

        if (editCourse) {
            setChips(course?.tag);
        }
    }, [])


    return (
        <div className="w-full">

            <label htmlFor={name} >{label}</label>
            <div className="w-full flex flex-col gap-1 flex-wrap">
                <div className="w-full flex flex-wrap mt-1">
                    {
                        chips.map((chip, index) => (

                            <div key={index} className="bg-yellow-400 flex flex-row items-center gap-1 rounded-md px-2 py-1 text-white mr-2 mb-1 text-sm">
                                {
                                    chip
                                }
                                <button type="button" onClick={() => deleteChip(index)}>
                                    <MdClose className="text-sm" />
                                </button>
                            </div>
                        ))
                    }
                </div>
                <input
                    type="text"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className="w-full p-2 mt-1 rounded-md bg-richblack-700"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onKeyDown={handleKeyDown}

                />
                {

                    errors[name] && (
                        <span className="text-pink-200 my-1">Tags are required</span>
                    )
                }
            </div>
        </div>
    )
}

export default ChipInput