import { classnames, TArg } from "tailwindcss-classnames";

export const cardStyles = (isVertical: boolean) =>
  classnames("flex", "overflow-hidden", "rounded-md", "shadow-md", {
    "flex-col": isVertical,
  });
