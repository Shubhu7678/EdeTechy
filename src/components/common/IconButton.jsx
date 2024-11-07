import React from 'react'

const IconButton = ({ children, text, onclick, disabled, type, outline = false, customClasses }) => {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={customClasses}

        >
            {
                children ? (
                    <>
                        <span>
                            {children}
                        </span>
                        {text}
                    </>
                ) : (text)
            }
        </button>
    )
}

export default IconButton