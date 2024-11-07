import React from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    // if (authLoading || profileLoading) {

    //     return (

    //         <div>
    //             {toast.loading('Loading...')}
    //         </div>
    //     )
    // }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="overflow-y-auto h-[calc(100vh-3.5rem)] w-full">
                <div className="w-11/12 mx-auto max-w-maxContent py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard