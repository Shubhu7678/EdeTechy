import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-40">
                <div className="flex flex-col gap-3 p-4 bg-richblack-800 rounded-md w-[20%]">
                    <p className="text-xl font-medium">{modalData.text1}</p>
                    <p className="text-base text-richblack-100">{modalData.text2}</p>
                    <div className="flex flex-row gap-3 mt-1">
                        <IconButton
                            text={modalData.btn1Text}
                            customClasses="text-black font-bold py-1 px-2 rounded-md bg-yellow-50"
                            onclick={modalData.btn1Handler} />
                        <button
                            className="text-white font-bold py-1 px-2 rounded-md bg-richblack-500"
                            onClick={modalData.btn2Handler}
                        >
                            {modalData.btn2Text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal