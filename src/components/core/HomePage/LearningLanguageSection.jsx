import React from 'react'
import HighlightText from './HighlightText'
import KnowYourProgress from '../../../assets/images/Know_your_progress.png';
import CompareWithOthers from '../../../assets/images/Compare_with_others.png';
import PlanYourLessons from '../../../assets/images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="mt-24 mb-24 flex flex-col gap-5 items-center">
        <div className="text-4xl text-center font-semibold" >
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <div className="text-base text-center mt-1 text-richblack-600 w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-row mt-2 items-center justify-center">
          <img className="object-contain md:w-[30%] lg:w-[30%] -mr-[7%] "  src={KnowYourProgress} alt="Know your progress" />
          <img className="object-contain md:w-[30%] lg:w-[30%] " src={CompareWithOthers} alt="" />
          <img className="object-contain md:w-[30%] lg:w-[30%] -ml-[9%]" src={PlanYourLessons} alt="" />
        </div>
        <CTAButton class="mt-4" active={true} linkto={"/signup"}>
              Learn More 
        </CTAButton>
      </div>

    </div>
  )
}

export default LearningLanguageSection