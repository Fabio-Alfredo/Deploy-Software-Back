import React from 'react'
import PropTypes from 'prop-types'

export const Counter = ({ time }) => {
    
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-28 max-w-28 relative">
            {/* Fondos */}
            <div
                className="absolute bg-white size-full z-[2] rounded-md border-2 border-black"
                aria-hidden="true"
            ></div>
            <div
                className="absolute left-1 top-1 size-full rounded-md border-2 border-black"
                style={{
                    "background": "black"
                }}
                aria-hidden="true"
            ></div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center w-full h-full p-3 relative z-10">
                <p
                    id="task-title"
                    className="text-black text-6xl font-black truncate"
                >
                    {time}
                </p>
            </div>
        </div>
    )
}

Counter.propTypes = {
    time: PropTypes.number.isRequired,
}
