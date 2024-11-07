import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { verifyPayment } from '../services/operations/studentFeaturesAPI';
import { toast } from 'react-hot-toast';
import { resetCart } from '../slices/cartSlice';


const PaymentVerification = () => {

  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {

    // console.log("Finally on this page...");
    const searchParams = new URLSearchParams(location.search);
    const coursesParam = searchParams.get('courses');
    const courses = coursesParam ? coursesParam.split(',') : [];
    console.log("Courses id's :", courses);

    const verifyPaymentData = async () => {
      setLoading(true);
      // const toastId = toast.loading('Verifying payment');

      await verifyPayment(orderId, courses, user, token, navigate);
      setLoading(false);

      navigate('/dashboard/enrolled-courses');
      dispatch(resetCart());

    }

    verifyPaymentData();

  }, [orderId, navigate, location.search])
  return (
    <>
      {
        loading &&
        (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <h1 className="text-2xl font-bold text-center text-yellow-600">Verifying Payment</h1>
              <p className="mt-4 text-center text-gray-600">
                Your payment is being processed. Please do not refresh the page.
              </p>

              {/* Loader */}
              <div className="flex justify-center mt-6">
                <svg
                  className="animate-spin h-10 w-10 text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.74 0 2 4.74 2 12h2z"
                  />
                </svg>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="text-gray-700">{orderId}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>

  )
}

export default PaymentVerification