import { classnames, TArg } from "tailwindcss-classnames";

const base = classnames("w-full", "bg-white", "rounded-md", "shadow-md", "flex");

const overflow = classnames("overflow-hidden");

const padding = classnames("px-4", "py-5", "sm:p-6");

const buildStyles = (withPadding: boolean, css?: TArg, isOverflowHidden = true) => {
  return classnames(
    base,
    {
      [padding]: withPadding,
      [overflow]: isOverflowHidden,
    },
    css
  );
};

export { base, buildStyles };
