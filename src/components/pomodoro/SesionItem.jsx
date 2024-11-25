import React from 'react'
import PropTypes from 'prop-types'

export const SesionItem = ({ title, dividerColor, onClick }) => {
    return (
        <div
          onClick={onClick}
          className="flex overflow-hidden items-center w-full h-16 rounded-md border-2 border-gray-800 bg-white transition transform hover:scale-[1.01] hover:shadow-md"
          role="group"
          aria-labelledby="task-title"
        >
          <div
            style={{ backgroundColor: dividerColor }}
            className={`w-3 h-full border-r-2 border-gray-800`}
            aria-hidden="true"
          ></div>
    
          <div className="flex flex-col justify-center px-4 w-full">
            <h2
              id="task-title"
              className="text-black text-lg font-semibold truncate"
            >
              {title}
            </h2>
          </div>
        </div>
    )
}

SesionItem.propTypes = {
  title: PropTypes.string.isRequired,
  dividerColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

