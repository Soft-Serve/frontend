import { classnames, TArg } from "tailwindcss-classnames";

const background = "bg-slate-50" as TArg;

export const container = classnames(
  "flex-1",
  "overflow-y-auto",
  "flex",
  "flex-col",
  "h-full",
  "w-full",
  background
);
export const wrapper = classnames(
  "max-w-5xl",
  "mx-auto",
  "py-4",
  "md:py-10",
  "px-4",
  "sm:px-6",
  "lg:px-8",
  "flex-1",
  "w-full"
);
