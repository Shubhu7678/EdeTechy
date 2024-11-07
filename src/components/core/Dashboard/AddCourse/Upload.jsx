import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Upload = ({ label, name, register, errors, setValue }) => {
    const handleRef = useRef(null);
    const [image, setImage] = useState(null);
    const { editCourse,course } = useSelector((state) => state.course);

    const handleAddImage = () => {
        if (handleRef.current) {

            handleRef.current.click();
        }
    };

    const handleOnChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {

                setImage(reader.result);
            }
            setValue(name, file);
        }
    };

    useEffect(() => {
        // Register the input manually with react-hook-form
    
       register(name, { required: true });
        
    }, [register, name]);

    useEffect(() => {
        
        if (editCourse) { 

            setImage(course?.thumbnail);
        }

    },[])

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label} <sup className="text-pink-200">*</sup></label>
            <div className="bg-richblack-700 w-full p-4 min-h-[250px] flex items-center justify-center cursor-pointer">
                {
                    image ?
                        (
                            <div className="flex flex-col items-center gap-2 w-full">
                                <img className="h-full w-full object-cover" src={image} alt="" />
                                <button
                                    type="button"
                                    className="bg-richblack-900 w-fit px-3 py-2 text-sm text-richblack-5 rounded-md text-center"
                                    onClick={() => (setImage(null)  )}
                                >Remove</button>
                            </div>
                        ) :
                        (
                            <div
                                className="flex flex-col w-full items-center"
                                role="presentation"
                                tabIndex={0}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={handleRef} // Assigning ref to the input
                                    id={name}
                                    name={name}
                                    accept="image/png, image/jpeg, image/jpg , video/*"
                                    onChange={handleOnChange}
                                    tabIndex={-1}
                                // {...register(name, { required: true })} // Using register from react-hook-form
                                />
                                <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                    <button
                                        type="button"
                                        onClick={handleAddImage} // Triggering the file input click
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-2xl text-yellow-50"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="16 16 12 12 8 16"></polyline>
                                            <line x1="12" y1="12" x2="12" y2="21"></line>
                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                            <polyline points="16 16 12 12 8 16"></polyline>
                                        </svg>
                                    </button>
                                </div>
                                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                    Drag and drop an image, or click to{" "}
                                    <span className="font-semibold text-yellow-50">Browse</span> a file
                                </p>
                                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                            </div>
                        )
                }
            </div>
            {errors[name] && (
                <span className="ml-2  tracking-wide text-pink-200">
                    Course Image is required**
                </span>
            )}
        </div>
    );
};

export default Upload;
