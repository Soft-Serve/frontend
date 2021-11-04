import { classnames, TArg } from "tailwindcss-classnames";

const buildStyles = (css?: TArg) =>
  classnames("flex-1", "flex", "w-full", "lg:overflow-hidden", css);

export { buildStyles };
