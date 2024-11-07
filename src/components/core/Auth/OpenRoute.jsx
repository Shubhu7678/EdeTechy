import React from 'react'
import { useSelector } from 'react-redux'

const OpenRoute = ({ children }) => {
    
    const { token } = useSelector((state) => state.auth);

    if (token === null) {

        return children
    }
    else { 

        return null
    }
  return (
      <div>
          
    </div>
  )
}

export default OpenRoute