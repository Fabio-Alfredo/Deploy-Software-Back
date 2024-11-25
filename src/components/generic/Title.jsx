import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Title = ({
  as: Tag = "h2",
  title,
  highlight,
  icon,
  hiddenTitle,
  description,
  center = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <div {...props} className={clsx(className, center && "text-center")}>
      {hiddenTitle && <h1 className="sr-only">{hiddenTitle}</h1>}

      <Tag className="text-[#202124] font-extrabold text-6xl">
        {title}{" "}
        <span className="text-accent_color inline-flex items-center gap-4">
          {highlight} {icon && <span className="inline-block">{icon}</span>}
        </span>
      </Tag>

      {description && (
        <p className="text-[#202124] font-medium text-lg leading-normal mt-1">
          {description}
        </p>
      )}

      {children && (
        <div className="text-lg text-neutral-300 mt-1">{children}</div>
      )}
    </div>
  );
};

Title.propTypes = {
  as: PropTypes.string,
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string,
  icon: PropTypes.node, 
  hiddenTitle: PropTypes.string,
  description: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Title;
