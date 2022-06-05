import { classnames } from "tailwindcss-classnames";

const base = classnames(
  "w-full",
  "p-2",
  "text-white",
  "font-bold",
  "border-b-2",
  "cursor-pointer",
  "flex",
  "flex-col",
  "items-center",
  "text-sm"
);

const button = classnames("focus:outline-none");

export { base, button };
