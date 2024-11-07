import React, { useEffect, useRef, useState } from 'react'
import IconButton from '../../../common/IconButton'
import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPictureData } from '../../../../services/operations/settingAPI';

const ChangeProfilePicture = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    

    const handleClick = () => { 

        fileInputRef.current.click();
    }

    const handleFileChange = (e) => { 

        const file = e.target.files[0];

        if (file) { 

            setImageFile(file);
            previewFile(file);
        }
    }

     const previewFile = (file) => { 

         const reader = new FileReader();
         reader.readAsDataURL(file);
        reader.onload = (e) => { 

            setPreviewSource(e.target.result);
        }
    }
    // console.log("Preview Source : ",previewSource);
    // console.log(user.image);
    const handleFileUpload = async() => {

        setLoading(true); // Start loading state
        if (!imageFile) { 

            return;
        }
        console.log(imageFile);
            const formData = new FormData();
            formData.append('displayPicture', imageFile);
    
         try {
            await dispatch(updateDisplayPictureData(formData, token));
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    useEffect(() => { 
        
        if (imageFile) { 

            previewFile(imageFile);
        }

    },[imageFile])

    return (
        <div className="bg-richblack-800 flex items-center justify-between py-5 px-10 rounded-md border-[1px] border-richblack-700">
            <div className="flex items-center gap-5">
                <img src={previewSource ||user?.image} alt="" className="aspect-square w-[78px] rounded-full object-cover" />
                <div className="flex flex-col gap-3">
                    <p className="text-richblack-100 " >Change Profile Picture</p>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/png image/jpeg image/gif"
                            onChange={handleFileChange}
                        />
                        <button
                            className="bg-richblack-400 text-richblack-5 px-4 py-1 font-semibold rounded-md"
                            onClick={handleClick}
                        >
                            Select
                        </button>
                        <IconButton
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                            customClasses={`flex flex-row items-center px-3 py-1 rounded-md bg-yellow-100 text-black font-semibold gap-1 `}
                        >
                            {
                                !loading && (

                                    <FaUpload className="text-lg text-richblack-900" />

                                )
                            }
                        </IconButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChangeProfilePicture