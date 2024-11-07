import React from 'react';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const index = () => {
  return (
    <div className="w-[70%] mx-auto flex flex-col gap-5 text-white">
      <h1 className="text-3xl font-semibold text-richblack-5">Edit Profile</h1>
      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  )
}

export default index