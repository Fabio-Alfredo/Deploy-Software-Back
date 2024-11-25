import React from "react";
import PropTypes from "prop-types";

const TaskItem = ({ title, date, color, isChecked, onCheckboxChange }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[3.8rem] relative">
      {/* Fondos */}
      <div
        className="absolute bg-white size-full z-[2] rounded-md border-2 border-black"
        aria-hidden="true"
      ></div>
      <div
        className="absolute left-1 top-1 size-full rounded-md border-2 border-black"
        style={{
          background: color,
        }}
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-full h-full p-3 relative z-10">
        <div className="flex flex-row gap-4 items-center w-full">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckboxChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <h2
            id="task-title"
            className="text-black text-lg font-semibold truncate"
          >
            {title}
          </h2>
        </div>

        <p className="absolute bottom-2 right-2 text-xs text-gray-700 z-10">
          {date}
        </p>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default TaskItem;
