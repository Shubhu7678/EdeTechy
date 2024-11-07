import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player'
import { FaCirclePlay } from "react-icons/fa6";
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const playerRef = useRef();
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {

      return true;
    }
    else {

      return false;
    }

  }

  const isLastVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === subSectionTotalCount - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  const goToNextVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSubSectionIndex !== subSectionTotalCount - 1) {
      // same section next video 
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`);
    }
    else {

      //  different section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const differentSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${differentSubSectionId}`);
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection?._id === subSectionId;
    })

    if (currentSubSectionIndex === 0) {

      const prevSection = courseSectionData[currentSectionIndex - 1]?._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length;
      const lastPrevSubSection = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]?._id;
      navigate(`/view-course/${courseId}/section/${prevSection}/subSection/${lastPrevSubSection}`);
    }
    else {

      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`);
    }

  }

  const handleLectureCompletion = async () => {

    setLoading(true);
    const result = await markLectureAsComplete(courseId, subSectionId, token);
    if (result) {
      dispatch(setCompletedLectures(result));
    }
    setLoading(false);
  }

  useEffect(() => {

    const setVideoSpecificDetails = async () => {

      if (!courseSectionData.length) {

        return;
      }
      if (!courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      }
      else {

        const filterSection = courseSectionData.filter((section) => {
          return section._id === sectionId;
        })

        const filterSubSection = filterSection[0]?.subSection.filter((subSection) => {

          return subSection._id === subSectionId;
        })

        setVideoData(filterSubSection?.[0]);
        setVideoEnded(false);

      }
    }

    setVideoSpecificDetails();
  }, [courseEntireData, courseSectionData, location.pathname])

  return (
    <div className="text-white w-[95%] mx-auto border border-richblack-700">
      {
        !videoData ?
          (
            <div> There is no video available</div>
          ) :
          (
            <div className="mt-4 relative">
              <ReactPlayer
                ref={playerRef}
                width='100%'
                height='70%'
                playsinline
                onEnded={() => setVideoEnded(true)}
                url={videoData.videoUrl}
                controls={true}
              />

              <FaCirclePlay className="text-3xl absolute top-[50%] left-[50%] translate-x-[-50%] -translate-y-[-50%]" />
              {

                videoEnded && (
                  <div>
                    {
                      !completedLectures.completedVideos.includes(subSectionId) && (

                        <button
                          disabled={loading}
                          onClick={handleLectureCompletion}
                          className="bg-yellow-50 px-3 py-2 rounded-md text-richblack-900"
                        >
                          {!loading ? "Mark As Completed" : "Loading..."}
                        </button>
                      )
                    }
                    <button
                      className="bg-richblack-800 px-3 py-2 rounded-md text-yellow-50"
                      disabled={loading}
                      onClick={() => {
                        if (playerRef?.current) {

                          playerRef.current.seekTo(0);
                          setVideoEnded(false);
                        }
                      }}
                    >
                      Rewatch
                    </button>
                    <div>
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="bg-yellow-50 px-3 py-2 rounded-md text-richblack-900">
                          Prev
                        </button>
                      )}
                      {
                        !isLastVideo() && (

                          <button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className="bg-yellow-50 px-3 py-2 rounded-md text-richblack-900">
                            Next
                          </button>
                        )
                      }
                    </div>
                  </div>
                )
              }
              <div className="mt-4">
                <p>{videoData.title}</p>
                <p>{videoData.description}</p>
              </div>
            </div>

          )
      }
    </div>
  )
}

export default VideoDetails