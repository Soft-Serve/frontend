import { classnames } from "tailwindcss-classnames";
import type { TArg } from "tailwindcss-classnames";

export const cardStyles = (isVertical: boolean) => {
  const height = `h-fit` as unknown as TArg;
  return classnames(height, "flex", "overflow-hidden", "rounded-md", "shadow-xl", {
    "flex-col": isVertical,
  });
};
