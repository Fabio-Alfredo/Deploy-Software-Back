import clsx from "clsx";

export function Container({
  as,
  className,
  children,
  ...rest
}) {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "w-full mx-auto max-w-7xl px-4 md:p-6 lg:px-8",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
