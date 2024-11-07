import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { courseEndpoints, sectionEndPoints, subSectionEndPoints, reviewRatingEndPoints,completedLecturesEndPoints } from '../apis';

const {
    GET_COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    GET_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_API,
    GET_ALL_COMPLETED_LECTURES
} = courseEndpoints;

const {

    CREATE_SECTION_API,
    DELETE_SECTION_API,
    UPDATE_SECTION_API
} = sectionEndPoints;

const {

    DELETE_SUB_SECTION_API,
    CREATE_SUB_SECTION_API,
    UPDATE_SUB_SECTION_API,
} = subSectionEndPoints;

const {

    CREATE_RATING_API
} = reviewRatingEndPoints;

const {

    UPDATE_COMPLETED_LECTURES_API,
} = completedLecturesEndPoints;


export const fetchCourseCategories = async () => {

    let result = [];

    try {

        const response = await apiConnector('GET', GET_COURSE_CATEGORIES_API);
        // console.log("Course category response :", response);

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.allCategories;

    } catch (err) {

        console.log("Error in getting course categories : ", err);
        toast.error(err.response.data.message);
    }

    return result;
}

export const addCourseDetails = async (formData, token) => {

    let result = [];

    try {

        const response = await apiConnector('POST', CREATE_COURSE_API, formData,
            {
                'Authorisation': `Bearer ${token}`,
            }
        )
        // console.log("Response : ", response);

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);
        return result;

    } catch (err) {

        console.log("Error in adding course details : ", err);
        toast.error(err.response.data.message);
    }

    return result;
}

export const updateCourseData = async (formData, token) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await apiConnector('POST', UPDATE_COURSE_API, formData,
            {
                'Authorisation': `Bearer ${token}`,
            }
        );

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (error) {

        console.log("Error in updating course details : ", error);
        toast.error(error.response.data.message);

    }
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (courseId, token) => {

    const toastId = toast.loading('Loading...');
    let result = false;
    try {

        const response = await apiConnector('DELETE', DELETE_COURSE_API, { courseId },
            {
                'Authorisation': `Bearer ${token}`
            }
        )

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        toast.success(response.data.message);
        result = true;

    } catch (err) {

        console.log("Error occurred while deleting course : ", err);
        toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const getFullDetailsOfCourse = async (courseId) => { 

    const toastId = toast.loading('Loading...');
    let result = [];
    try {
 
        const response = await apiConnector('POST', GET_FULL_COURSE_DETAILS_API,{courseId}
        );

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }
        result = response.data.data;
        // console.log("Result : ", response);
        toast.success(response.data.message);


    } catch (err) { 

        console.log("Error occurred while getting full course details : ", err);
        toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const getCompletedLectures = async (courseId, token) => { 

    let result = [];
    try {

        const response = await apiConnector('POST', GET_ALL_COMPLETED_LECTURES, { courseId },
            {
                'Authorisation': `Bearer ${token}`
            }
        );

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        result = response.data.data;
        
    } catch (err) { 
 
        console.log("Error occured in getting completed videos ...::", err);
        toast.error(err.response.data.message);

    }

    return result;
}

export const createSection = async (formData, token) => {

    let result = [];
    try {

        const response = await apiConnector('POST', CREATE_SECTION_API, formData, {

            'Authorisation': `Bearer ${token}`,
        })

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (error) {

        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }

    return result;
}

export const updateSection = async (formData, token) => {

    let result = [];
    try {

        const response = await apiConnector('POST', UPDATE_SECTION_API, formData,
            {
                'Authorisation': `Bearer ${token}`,
            }
        );

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (error) {

        console.log("ERROR OCCURED : ", error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const deleteSectionData = async ({ sectionId, courseId, token }) => {

    let result = [];
    try {

        const response = await apiConnector('POST', DELETE_SECTION_API, { sectionId, courseId },
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (err) {

        console.log("Error : ", err);
        toast.error(err.response.data.message);

    }

    return result;
}

export const createSubSection = async (formData, token) => {

    let result = [];
    const toastId = toast.loading('Loading...');
    try {

        const response = await apiConnector('POST', CREATE_SUB_SECTION_API, formData,
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response?.data?.data;
        toast.success(response.data.message);

    } catch (error) {

        console.log("Error occured in Create Section :", error);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result;

}

export const deleteSubSectionData = async ({ subSectionId, sectionId, courseId, token }) => {

    const toastId = toast.loading("Loading...");
    let result = [];

    try {

        const response = await apiConnector('POST', DELETE_SUB_SECTION_API, { subSectionId, sectionId, courseId },
            {
                'Authorisation': `Bearer ${token}`,
            }
        )

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);
    } catch (err) {

        console.log("Error :", err);
        toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (formData, token) => {

    let result = [];
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector('POST', UPDATE_SUB_SECTION_API, formData,
            {
                'Authorisation': `Bearer ${token}`,
            }
        );

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (err) {

        console.log("ERROR IN UPDATING SUBSECTION : ", err);
        if (err.response && err.response.data) {
            toast.error(err.response.data.message);
        } else {
            toast.error("An error occurred while updating the subsection.");
        }
    }

    toast.dismiss(toastId);
    return result;

}

export const fetchInstructorCourses = async (token) => {

    let result = [];
    const toastId = toast.loading('Loading');
    try {

        const response = await apiConnector('GET', GET_INSTRUCTOR_COURSES_API, {},
            {
                'Authorisation': `Bearer ${token}`,
            }
        );

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success(response.data.message);

    } catch (err) {

        console.log("ERROR IN FETCHING INSTRUCTOR COURSES : ", err);
        toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const createRating = async ({ courseId, rating, review, token }) => { 

    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector('POST', CREATE_RATING_API, { courseId, rating, review },
            {
                'Authorisation' : `Bearer ${token}`
            }
        )
        
        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        toast.success(response.data.message);
        
    } catch (err) { 

        console.log("Error occured ::", err);
        toast.error(err.response.data.message);

    }

    toast.dismiss(toastId);

}

export const markLectureAsComplete = async (courseId, subSectionId, token) => { 

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await apiConnector('POST', UPDATE_COMPLETED_LECTURES_API, { courseId, subSectionId },
            {
                'Authorisation': `Bearer ${token}`
            }
        );

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        result = response.data.data;
        // console.log(response)
    } catch (err) { 

        console.log("Error occured ::", err);
        toast.error(err.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}
