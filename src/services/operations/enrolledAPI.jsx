import toast from 'react-hot-toast';
import { setLoading } from '../../slices/profileSlice';
import { apiConnector } from '../apiconnector';
import { settingsEndPoints } from '../apis';
import { instructorEndPoints } from '../apis';

const { GET_ENROLLED_COURSES_API } = settingsEndPoints;
const {

    GET_INSTRUCTOR_DATA_API
} = instructorEndPoints;

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

        // console.log(response);

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

export async function getInstructorData(token) { 
    
    const toastId = toast.loading('Loading...');
    let result = [];
    try {


        const response = await apiConnector('GET',GET_INSTRUCTOR_DATA_API, {},
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        result = response.data.data;
        // console.log("Result : ", response);
        toast.success(response.data.message);

    } catch (error) { 

        console.log("Error in getting instructor data : ", error);
        toast.error('Could not get instructor data');

    }

    toast.dismiss(toastId);
    return result;
}