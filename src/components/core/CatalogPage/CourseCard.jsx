import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';

const CourseCard = ({ course, Height }) => {

    const [avgRatingCount, setAvgRatingCount] = useState(0);

    useEffect(() => {

        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgRatingCount(count);

    }, [course])

    return (
        <div>
            <NavLink to={`/courses/${course._id}`} >
                <div>
                    <div>
                        <img className="w-[450px] rounded-lg" src={course.thumbnail} alt={course._id} />
                    </div>
                    <div className="mt-3">
                        <div className="">
                            <p>{course?.courseName}</p>
                            <p className="text-richblack-100 ">{course?.instructor?.firstName + " " + course?.instructor?.lastName}</p>
                        </div>
                        <div className="flex gap-2">
                            <span>{avgRatingCount || 0}</span>
                            <RatingStars Review_Count={avgRatingCount} />
                            <span className="text-richblack-100">{course?.ratingAndReviews?.length + " Ratings"}</span>
                        </div>
                        <p>{"Rs. " + course?.price}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default CourseCard