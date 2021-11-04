import { TArg, classnames } from "tailwindcss-classnames";

const base = classnames("flex", "w-full", "items-start", "justify-between");
const buildStyles = (css?: TArg) => {
  return classnames(base, css);
};

export { buildStyles };
