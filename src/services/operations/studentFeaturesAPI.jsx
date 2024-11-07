import toast from 'react-hot-toast';
import { studentEndPoints } from '../apis';
import { apiConnector } from '../apiconnector';

const { COURSE_PAYMENT_API, COURSE_VERIFY_API } = studentEndPoints;

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    
    try {

        const orderResponse = await apiConnector('POST', COURSE_PAYMENT_API, { courses },
            {
                'Authorisation': `Bearer ${token}`,
            });

        if (!orderResponse.data.success) {

            throw new Error(orderResponse.data.message);
        }

        console.log("Order REsponse hai : ", orderResponse.data.url)
        window.location.href = orderResponse.data.url;

    } catch (err) {

        console.log("Error in payment :::", err);

    }

    
}

export const verifyPayment = async (orderId, courses, user, token, navigate) => {

    const toastId = toast.loading('Verifying Payment...');
    try {

        const response = await apiConnector('POST', COURSE_VERIFY_API, { orderId, courses, user },
            {
                'Authorisation': `Bearer ${token}`,
            }
        );
        if (response.data.success) {
            toast.success('Payment successful!');
        } else {
            toast.error('Payment verification failed');
        
        }

    } catch (err) {

        console.log("ERROR OCCURREDDD :::::", err);
        toast.error('Payment verification failed');
    }

    toast.dismiss(toastId);
}
