import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PomodoroPreview = ({ color = "#8CC6E7", title, session, link }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center justify-center w-40 h-40 relative transition-transform hover:scale-[1.01] hover:shadow-lg"
    >
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

      <div className="flex flex-col items-center justify-center w-full h-full p-3 relative z-10">
        <h3 className="text-black text-lg font-semibold text-center leading-snug overflow-hidden text-ellipsis line-clamp-2">
          {title}
        </h3>
        <p className="text-black text-xs font-['Nunito'] mt-2 truncate">
          {session}
        </p>
      </div>
    </Link>
  );
};

PomodoroPreview.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PomodoroPreview;
