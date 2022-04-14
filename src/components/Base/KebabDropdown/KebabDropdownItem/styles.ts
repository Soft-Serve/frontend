import { classnames, TArg } from "tailwindcss-classnames";

export const activeStyles = (fontColor: TArg) =>
  classnames("bg-white", "w-full", "p-2", "w-full", "text-left", "rounded-md", fontColor);

export const nonActiveStyles = classnames("p-2", "w-full", "text-left", "text-white");
