import { toast } from 'react-hot-toast';

import { apiConnector } from '../apiconnector';
import { endPoints } from '../apis';
import { setLoading, setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';


const {
    SENDOTP_API,
    RESETPASSWORD_API,
    UPDATEPASSWORD_API,
    SIGNUP_API,
    LOGIN_API,
} = endPoints;


export function sendOtp(email, navigate) {

    return async (dispatch) => {

        const toastId = toast.loading('Sending OTP...');
        dispatch(setLoading(true));

        try {

            const response = await apiConnector('POST', SENDOTP_API, { email, checkUserPresent: true });

            // console.log("Send otp response...", response);

            // console.log(response.data.success);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success('OTP Send Successfully');
            navigate('/verify-email');

        } catch (err) {

            console.log("Send otp response error...", err.response.data.message);
            toast.error(err.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getResetPasswordToken(email, setEmailSent, setEmail) {

    return async (dispatch) => {

        dispatch(setLoading(true));
        try {

            const response = await apiConnector('POST', RESETPASSWORD_API, { email });

            // console.log("Reset password token response : ", response);
            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
            // console.log(response.data.message);

        } catch (err) {

            console.log("Reset password token error : ", err.response.data.message);
            toast.error(err.response.data.message);
        }

        dispatch(setLoading(false));
        setEmail("");

    }
}

export function resetPassword(password, confirmPassword, token) {

    return async (dispatch) => {

        dispatch(setLoading(true));
        try {

            const response = await apiConnector('POST', UPDATEPASSWORD_API, { password, confirmPassword, token });

            // console.log(response.data.success);
            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
        } catch (err) {

            console.log("Reset Error : ", err.response.data.message);
            toast.error(err.response.data.message);
        }

        dispatch(setLoading(false));
    }
}

export function signUp(firstName, lastName, email, password, confirmPassword, accountType, otp,navigate) {


    return async (dispatch) => {

        dispatch(setLoading(true));

        try {

            const response = await apiConnector(
                'POST',
                SIGNUP_API,
                { firstName, lastName, email, password, confirmPassword, accountType, otp }
            );

            // console.log(response);
            if (!response.data.success) { 

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            navigate('/login');

        } catch (err) {

            console.log("Error in signing up", err.response.data.message);
            toast.error(err.response.data.message);

        }

        dispatch(setLoading(false));

    }
}

export function login(email, password, navigate) { 

    return async (dispatch) => { 

        const toastId = toast.loading('Logging in...');
        dispatch(setLoading(true));

        try {

            const response = await apiConnector('POST', LOGIN_API, { email, password });
            // console.log(response);

            if (!response.data.success) { 

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(setToken(response.data.token));
            const userImage = response.data.userExist.image ? response.data.userExist.image : null;
            dispatch(setUser({ ...response.data.userExist, image: userImage }));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.userExist));
            navigate('/dashboard/my-profile');
            
        } catch (err) { 

            toast.error(err.response.data.message);
            console.log("Error in logging in", err.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}

export function logout(navigate) { 

    return async (dispatch) => { 

        const toastId = toast.loading('Logging out...');
        dispatch(setLoading(true));

        try {

            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(resetCart());
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
            navigate('/');
             
        } catch (err) { 

            toast.error(err.message);

        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }
}
