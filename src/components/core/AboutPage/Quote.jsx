import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-4xl flex justify-center mt-60 mb-20">
      <div className="text-center">
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"} />
        <span className="text-brown-50" >
          {" "}
          expertise
        </span>
        , and community to create an
        <span className="text-brown-50" >
          {" "}
          unparallelled educational experience.
        </span>
      </div>
    </div>
  )
}

export default Quote