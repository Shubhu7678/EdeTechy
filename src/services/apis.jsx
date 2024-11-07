const BASE_URL = import.meta.env.VITE_BASE_URL;


export const categories = {

    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const endPoints = {

    SENDOTP_API: BASE_URL + '/auth/sendotp',
    RESETPASSWORD_API: BASE_URL + '/auth/reset-password-token',
    UPDATEPASSWORD_API: BASE_URL + '/auth/reset-password',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
}

export const contactUsEndpoints = {

    CONTACTUS_API: BASE_URL + '/contact-us',
}

export const settingsEndPoints = {

    UPDATE_DISPLAY_PICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
    UPDATE_PROFILE_API: BASE_URL + '/profile/updateProfile',
    CHANGE_PASSWORD_API: BASE_URL + '/auth/changepassword',
    GET_ENROLLED_COURSES_API: BASE_URL + '/profile/getEnrolledCourses',
}

export const courseEndpoints = {

    GET_COURSE_CATEGORIES_API: BASE_URL + '/course/showAllCategories',
    CREATE_COURSE_API: BASE_URL + '/course/createCourse',
    UPDATE_COURSE_API: BASE_URL + '/course/updateCourse',
    GET_INSTRUCTOR_COURSES_API: BASE_URL + '/course/getInstructorCourses',
    DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
    GET_FULL_COURSE_DETAILS_API: BASE_URL + '/course/getFullCourseDetails',
    GET_ALL_COMPLETED_LECTURES: BASE_URL + '/course/getAllCompletedLectures'

}

export const sectionEndPoints = {

    CREATE_SECTION_API: BASE_URL + '/course/addSection',
    DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
    UPDATE_SECTION_API: BASE_URL + '/course/updateSection'
}

export const subSectionEndPoints = {

    CREATE_SUB_SECTION_API: BASE_URL + '/course/addSubSection',
    DELETE_SUB_SECTION_API: BASE_URL + '/course/deleteSubSection',
    UPDATE_SUB_SECTION_API: BASE_URL + '/course/updateSubSection',
}

export const catalogData = {

    GET_CATALOG_PAGE_DATA_API : BASE_URL + '/course/getCategoryPageDetails',
}

export const studentEndPoints = {

    COURSE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
    COURSE_VERIFY_API : BASE_URL + '/payment/verifyPayment',
}

export const reviewRatingEndPoints = {

    CREATE_RATING_API: BASE_URL + '/course/createRating',
    FETCH_ALL_REVIEWS_API : BASE_URL + '/course/getReviews'
}

export const completedLecturesEndPoints = {

    UPDATE_COMPLETED_LECTURES_API : BASE_URL + '/course/updateCourseProgress'
}

export const instructorEndPoints = {

    GET_INSTRUCTOR_DATA_API: BASE_URL + '/profile/instructorDashboard'
}