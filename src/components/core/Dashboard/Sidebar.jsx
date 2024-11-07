import React, { useState } from 'react';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';
import toast from 'react-hot-toast';

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);

    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    // if (authLoading || profileLoading) {
    //     return (
    //         <div className="mt-10 text-center">
    //             {toast.loading('Loading...')}
    //         </div>
    //     )
    // }

    const handleClick = () => {

        setConfirmationModal({

            text1: "Are you sure?",
            text2: "You will be logged out of your account",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    return (
        <div className="text-white">
            <div className="min-w-[222px] h-[calc(100vh-3.5rem)] flex flex-col bg-richblack-800 border-r-[1px]" >
                <div className="flex flex-col gap-3 pt-10">
                    {
                        <>
                            {sidebarLinks.map((data, index) => {
                                
                                if (index === 0 || user.accountType === data.type) {
                                    return (
                                        <SidebarLink key={index} link={data} iconName={data.icon} />
                                    );
                                }
                                return null;
                            })}
                        </>
                    }
                </div>
                <div className="w-10/12 mx-auto my-6 h-[1px] bg-richblack-600"></div>
                <div className="flex flex-col gap-3">
                    <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName='VscSettingsGear' />
                    <button onClick={handleClick} className="font-medium px-8 py-2 text-sm text-richblack-300">
                        <div className="flex items-center gap-2" >
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {
                confirmationModal && (

                    <ConfirmationModal modalData={confirmationModal} />
                )
            }
        </div>
    )
}

export default Sidebar