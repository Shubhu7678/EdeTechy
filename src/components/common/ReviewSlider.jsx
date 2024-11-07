import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { Pagination,Autoplay } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
// import ReactStars from 'react-stars'
import { apiConnector } from '../../services/apiconnector';
import { reviewRatingEndPoints } from '../../services/apis'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const ReviewSlider = () => {

    const { FETCH_ALL_REVIEWS_API } = reviewRatingEndPoints;
    console.log(FETCH_ALL_REVIEWS_API);

    const [review, setReview] = useState([]);
    const truncateWords = 15;
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {

        const fetchAllReviews = async () => {

            const toastId = toast.loading('Loading...');
            try {
                const response = await apiConnector('GET', FETCH_ALL_REVIEWS_API, {})

                if (!response.data.success) {

                    throw new Error(response.data.message);
                }

                setReview(response.data?.data);

            } catch (error) {

                console.log("Error occured ::", error)
            }
            toast.dismiss(toastId);

        }

        fetchAllReviews();
    }, [])

    console.log("Printing Reviews : ", review);

    return (
        <div className="text-white mb-10">
            <div className="h-[190px] max-w-maxContent w-11/12 mx-auto">
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                     navigation={{ clickable: true }}
                    spaceBetween={24}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    // loop={true}
                    breakpoints={
                        {
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }
                    }
                    className="mySwiper w-full"
                >


                    {
                        review.map((data, index) => (

                            <SwiperSlide className="bg-richblack-800 p-4 h-[190px] rounded-md" key={index}>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div>
                                            <img className="w-10 h-10 rounded-full object-cover" src={data?.user?.image} alt="User Image" />
                                        </div>
                                        <div className="flex flex-col gap-0">
                                            <p>{data?.user?.firstName + " " + data?.user?.lastName}</p>
                                            <p className="text-richblack-100">{data?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <div className="flex-grow mb-1">
                                        <p>
                                            {
                                                data?.review?.split(" ").length > 15 ?
                                                    (
                                                        <>
                                                            {
                                                                data?.review?.split(' ').slice(0, 15).join(' ') + '...'
                                                            }
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            {
                                                                data?.review
                                                            }
                                                        </>
                                                    )
                                            }
                                        </p>
                                    </div>
                                    <div className="">
                                        <ReactStars
                                            count={5}
                                            value={data?.rating || 0}
                                            size={24}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider