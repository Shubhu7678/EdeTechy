import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { settingsEndPoints } from '../apis';
import { setLoading, setUser } from '../../slices/profileSlice';

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    GET_ENROLLED_COURSES_API,
} = settingsEndPoints;


export function updateDisplayPictureData(formData, token) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
                {
                    'Authorisation': `Bearer ${token}`,
                }
            );

            // console.log(response.data.message);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response.data.message);
            dispatch(setUser(response.data.data));
            const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

            if (userData) {

                localStorage.setItem('user', JSON.stringify({ ...userData, image: response.data.data.image }));
            }

        } catch (error) {
            console.log("Update display picture error : ", error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, data, navigate) {

    return async (dispatch) => {

        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {

            const response = await apiConnector('PUT', UPDATE_PROFILE_API, data,
                {
                    'Authorisation': `Bearer ${token}`,
                }
            );

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            const userDetails = response.data.updatedUserDetails;
            const userImage = userDetails.image ? userDetails.image : null;
            dispatch(setUser({ ...userDetails, image: userImage }));
            localStorage.setItem('user', JSON.stringify({ ...userDetails, image: userImage }));
            toast.success(response.data.message);
            navigate('/dashboard/my-profile');

        } catch (err) {

            console.log("Error : ", err);
            toast.error(err.response.data.message);

        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const updateNewPassword = async (data, token) => {

    const toastId = toast.loading("Loading...");
    let result = null;

    try {

        const response = await apiConnector('POST', CHANGE_PASSWORD_API, data,
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        console.log(response);
        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        toast.success(response.data.message);
        result = response.data.data;

    } catch (err) {

        console.log("Error : ", err);
        toast.error(err.response.data.message);

    }
    finally {

        toast.dismiss(toastId);
    }

    return result;
}

export async function getEnrolledCoursesData(token, dispatch) {

    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    let result = [];
    try {

        const response = await apiConnector('GET', GET_ENROLLED_COURSES_API, null,
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        console.log(response);

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        // toast.success(response.data.message);
        result = response.data.enrolledCourses;

    } catch (err) {

        console.log("Error : ", err);
        toast.error(err.response.data.message);

        dispatch(setLoading(false));
        toast.dismiss(toastId);
        throw err;
    }


    toast.dismiss(toastId);
    dispatch(setLoading(false));
    return result;
}