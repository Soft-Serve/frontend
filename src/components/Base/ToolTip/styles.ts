import { classnames, TArg } from "tailwindcss-classnames";

const buildStyles = (css?: TArg) =>
  classnames(
    "absolute",
    "whitespace-nowrap",
    "bg-black",
    "px-4",
    "py-2",
    "rounded",
    "flex",
    "items-center",
    "transition-all",
    "duration-150",
    css
  );

export { buildStyles };
