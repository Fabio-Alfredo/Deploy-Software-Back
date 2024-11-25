import clsx from "clsx";
import PropTypes from "prop-types";

export function SectionIntro({
  title,
  id,
  eyebrow,
  description,
  children,
  smaller = false,
  vertical = false,
  className = "py-4 md:py-6 my-3 md:my-5",
  ...props
}) {
  return (
    <div {...props} className={className}>
      {eyebrow && (
        <span className={clsx("mb-3 block font-display text-lg font-semibold")}>
          {eyebrow}
        </span>
      )}

      {vertical && children ? (
        <>
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold",
              smaller ? "text-3xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={clsx(
                "text-[#202124] font-medium leading-[normal]",
                smaller ? "text-base" : "text-lg mt-1"
              )}
            >
              {description}
            </p>
          )}
          <div className={clsx("mt-1 text-lg text-neutral-300")}>
            {children}
          </div>
        </>
      ) : children ? (
        <div className="grid md:grid-cols-2 w-full gap-8 md:gap-14">
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold",
              smaller ? "text-3xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={clsx(
                "text-[#202124] font-medium leading-[normal]",
                smaller ? "text-base" : "text-lg mt-1"
              )}
            >
              {description}
            </p>
          )}
          <div className={clsx("text-lg text-neutral-300")}>{children}</div>
        </div>
      ) : (
        <>
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold ",
              smaller ? "text-3xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={clsx(
                "text-[#202124] font-medium leading-[normal]",
                smaller ? "text-base" : "text-lg mt-1"
              )}
            >
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
}

SectionIntro.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  smaller: PropTypes.bool,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

export default SectionIntro;
