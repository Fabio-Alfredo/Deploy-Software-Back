import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getTimeAgo } from "../../lib/utils/getTimeAgo";

const TaskPreview = ({ title, date, dividerColor, link }) => {
  const timeAgo = getTimeAgo(date);
  return (
    <Link
      to={link}
      className="flex overflow-hidden items-center w-full h-16 rounded-md border-2 border-gray-800 bg-white transition transform hover:scale-[1.01] hover:shadow-md"
      role="group"
      aria-labelledby="task-title"
    >
      <div
        className={`w-2.5 h-full border-r-2 border-gray-800`}
        style={{
          backgroundColor: dividerColor,
        }}
        aria-hidden="true"
      ></div>

      <div className="flex flex-col justify-center px-4 w-full">
        <h2
          id="task-title"
          className="text-black text-lg font-semibold truncate"
        >
          {title}
        </h2>
        <p className="text-gray-800 text-xs">{timeAgo}</p>
      </div>
    </Link>
  );
};

TaskPreview.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dividerColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default TaskPreview;
