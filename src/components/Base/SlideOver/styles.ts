import { classnames } from "tailwindcss-classnames";

const section = {
  container: classnames("fixed", "inset-0", "overflow-hidden"),
  wrapper: classnames("absolute", "inset-0", "overflow-hidden"),
};

const slideOver = {
  container: classnames("absolute", "inset-y-0", "right-0", "pl-10", "max-w-full", "flex"),
  wrapper: classnames(
    "h-full",
    "divide-y",
    "divide-gray-200",
    "flex",
    "flex-col",
    "bg-white",
    "shadow-xl",
    "w-screen",
    "max-w-md"
  ),
  content: classnames("min-h-0", "flex-1", "flex", "flex-col", "py-6", "overflow-y-scroll"),
  actions: classnames("flex-shrink-0", "px-4", "py-4", "flex", "justify-end"),
};

export { section, slideOver };
