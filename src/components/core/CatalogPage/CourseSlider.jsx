import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import './styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import CourseCard from './CourseCard';

const CourseSlider = ({Courses}) => {
  return (
    <div>
      { 
        Courses?.length ?
          (<Swiper
        pagination={{
          dynamicBullets: true,
        }}
            modules={[Pagination]}
          
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
            spaceBetween={30}
        
        className="mySwiper"
          >
            {Courses.map((course, index) => (
              
              <SwiperSlide key={index}>
                 <CourseCard course={course} Height={'h-[250px]'} />
              </SwiperSlide>
               
            )) }
        
      </Swiper>)
          :
          (<div>No Course Found</div>)
      }
    </div>
  )
}

export default CourseSlider