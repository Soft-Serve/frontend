import { classnames } from "tailwindcss-classnames";

const base = classnames(
  "w-full",
  "mx-4",
  "p-4",
  "text-white",
  "font-bold",
  "border-b-2",
  "cursor-pointer",
  "flex",
  "items-center",
  "justify-between"
);

const button = classnames("focus:outline-none");

export { base, button };
