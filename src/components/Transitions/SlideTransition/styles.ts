import { classnames } from "tailwindcss-classnames";

const transition = classnames(
  "transform-gpu",
  "transition",
  "ease-in-out",
  "duration-500",
  "sm:duration-700"
);

const from = classnames("translate-x-full");
const to = classnames("translate-x-0");

const getFromStyles = (direction: "x" | "y") => {
  if (direction === "x") return classnames("translate-x-full");
  return classnames("translate-y-full");
};

const getToStyles = (direction: "x" | "y") => {
  if (direction === "x") return classnames("translate-x-full");
  return classnames("translate-y-full");
};

export { transition, from, to, getFromStyles, getToStyles };
