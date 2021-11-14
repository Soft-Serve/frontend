import { classnames } from "tailwindcss-classnames";

const base = classnames(
  "w-full",
  "p-4",
  "text-white",
  "font-bold",
  "border-b-2",
  "cursor-pointer",
  "flex",
  "items-start",
  "justify-between"
);

const button = classnames("focus:outline-none");

export { base, button };
