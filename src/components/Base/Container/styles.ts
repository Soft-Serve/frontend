import { classnames, TArg } from "tailwindcss-classnames";

export const baseStyles = (css?: TArg) => {
  return classnames("mx-auto", "w-full", "flex-1", "p-2", "pt-0", "sm:px-6", "lg:px-8", css);
};
