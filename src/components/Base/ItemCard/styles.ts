import { classnames } from "tailwindcss-classnames";
import type { TArg } from "tailwindcss-classnames";

export const cardStyles = (isVertical: boolean) => {
  const shadowColour = `shadow-gray-300` as unknown as TArg;
  return classnames(shadowColour, "flex", "overflow-hidden", "rounded-md", "shadow-xl", {
    "flex-col": isVertical,
  });
};
