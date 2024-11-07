import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const ExploreMore = () => {

  const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCard = (value) => {

    setCurrentTab(value);
    const result = HomePageExplore.filter((item) => (value === item.tag));
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div>
      <div className="text-4xl text-center font-semibold" >
        Unlock the <HighlightText text={"Power of Code"} />
      </div>
      <p className="text-richblack-300 text-center text-base font-medium mt-3" >Learn to Build anything you can imagine</p>
      <div className="mt-4 w-fit text-center mx-auto" >
        <div className="text-[16px] bg-richblack-700 px-3 py-2 rounded-full flex flex-row gap-2">
          {
            tabsName.map((value, index) => (

              <div onClick={() => (setMyCard(value))} key={index} className={` ${value === currentTab ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"} text-base font-normal px-3 py-1 cursor-pointer hover:scale-95 transition-all duration-200 rounded-full`} >
                {value}
              </div>
            ))
          }
        </div>
      </div>
        <div className={`flex flex-row gap-6 mt-12 mb-12 mx-auto w-[80%] h-full `} >
          {
            courses.map((course, index) => (

              <CourseCard
                key={index}
                course={course}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />

            ))
          }
        </div>
      </div>

  )
}

export default ExploreMore