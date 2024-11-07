// const { instance } = require('../config/razorpay');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress');
const crypto = require('crypto');
const axios = require('axios');

const courseEnrollementEmail = require('../mail/templates/courseEnrollmentEmail');
const mailSender = require('../utils/mailSender');

//* Capture the razorpay payment

const capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {

        return res.status(401).json({
            success: false,
            message: 'Please provide course id',
        })
    }

    let totalAmount = 0;

    for (const course_id of courses) {

        let course;
        try {

            course = await Course.findById(course_id);
            if (!course) {

                return res.status(401).json({ success: false, message: 'Could not found the course' });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {

                return res.status(200).json({ success: false, message: 'Student is already enrolled' });
            }

            totalAmount += course.price;

        } catch (error) {

            return res.status(500).json({ success: false, message: error.message });
        }
    }

    let MERCHANT_ID = 'PGTESTPAYUAT86';
    const orderId = `ORDER_${new Date().getTime()}`;
    const PHONEPE_SALT_KEY = '96434309-7796-489d-8924-ab56988a6076';
    let normalPayload = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: orderId,
        merchantUserId: userId,
        amount: totalAmount * 100, // converting to paise
        redirectUrl: `http://localhost:3000/payment/verify/${orderId}?courses=${courses.join(',')}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    const payload = Buffer.from(JSON.stringify(normalPayload)).toString('base64');
    const keyIndex = 1;
    const string = payload + "/pg/v1/pay" + PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash("sha256")
        .update(string)
        .digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
        method: 'POST',
        url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        headers: {
            accept: 'application/json',
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
        },
        data: {
            request: payload
        }
    }
    try {

        const response = await axios.request(option);
        // console.log("Response ::", response.data.data.instrumentResponse.redirectInfo.url);

        return res.status(200).json({
            success: true,
            message: "ok",
            url: response.data.data.instrumentResponse.redirectInfo.url,
        });

    } catch (error) {
        console.error("Error initiating payment:", error.message);
        return res.status(500).json({ success: false, error: "Could not initiate order" });
    }
}

const verifyPayment = async (req, res) => {
    
    const { orderId, courses, user } = req.body;
    const userId = req.user.id;
    const MERCHANT_ID = 'PGTESTPAYUAT86';
    const PHONEPE_SALT_KEY = '96434309-7796-489d-8924-ab56988a6076';
    const keyIndex = 1;
    const string = `/pg/v1/status/${MERCHANT_ID}/${orderId}` + PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash("sha256")
        .update(string)
        .digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${orderId}`,
        headers: {
            accept: 'application/json',
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            'X-MERCHANT-ID': MERCHANT_ID,
        },

    }

    try {
        const response = await axios.request(option);

        if (response.data.success) {
            await enrollStudent(courses, userId);
            return res.status(200).json({ success: true, message: 'Payment Successful...' });
        } else {
            return res.status(200).json({ success: false, message: 'Payment Failed' });
        }
    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ success: false, message: 'Payment processing error' });
    }

}

const enrollStudent = async (courses, userId) => {

    try {

        if (!courses || !userId) {
            return res.status(401).json({ success: false, message: 'Please provide data for courses or userId' });
        }

        for (const courseId of courses) {

            try {

                //find the course and enrolled student in the course
                const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                    {
                        $push: { studentsEnrolled: userId }
                    },
                    { new: true },
                )
                if (!enrolledCourse) {
                    return res.status(500).json({ success: false, message: 'Course not found !' });
                }
                
                const courseProgressCreate = await CourseProgress.create({courseID:courseId, userId: userId});
                //find the student and enrolled course in the student
                const enrolledStudent = await User.findByIdAndUpdate(userId,
                    {
                        $push: {
                            courses: courseId,
                            courseProgress: courseProgressCreate._id
                         }
                    },
                    { new: true },
                );


                //mail send to student 
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    "Congratulations you are onboarded into new SpecySpecs Course"
                );

            } catch (error) {

                console.log("Error : ", error);
                return res.status(500).json({ success: false, message: error.message });
            }
        }
    } catch (err) {
        console.error("Error enrolling student:", err);
        return res.status(500).json({ success: false, message: 'Error enrolling student' });
    }
}

module.exports = { capturePayment, verifyPayment };