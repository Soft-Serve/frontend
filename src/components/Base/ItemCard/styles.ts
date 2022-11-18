import { classnames } from "tailwindcss-classnames";
import type { TArg } from "tailwindcss-classnames";

export const cardStyles = (isVertical: boolean) => {
  const height = `h-fit` as unknown as TArg;
  return classnames(
    height,
    "flex",
    "overflow-hidden",
    "rounded-lg",
    "border",
    "border-l-0",
    "border-gray-100",
    "shadow-md",
    {
      "flex-col": isVertical,
    }
  );
};
