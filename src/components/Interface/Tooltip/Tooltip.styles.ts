import { classnames, TArg } from "tailwindcss-classnames";

export const root = (colour: string, tint: number) => {
  const bg = `bg-${colour}-${tint}` as TArg;
  return classnames(
    "relative",
    "z-50",
    "inline-block",
    "max-w-xs",
    "rounded-lg",
    "p-4",
    "text-center",
    "font-normal",
    "text-white",
    bg
  );
};

export const tooltip = (colour: string, tint: number) => ({
  base: classnames("absolute", "h-4", "w-4", `bg-${colour}-${tint}` as TArg),
  arrow: classnames("absolute", "h-4", "w-4", "rotate-45", `bg-${colour}-${tint}` as TArg),
  top: {
    base: classnames("bottom-0"),
    arrow: classnames("-bottom-2"),
  },
  bottom: {
    base: classnames("top-0"),
    arrow: classnames("-top-2"),
  },
  left: {
    base: classnames("right-0"),
    arrow: classnames("-right-2"),
  },
  right: {
    base: classnames("left-0"),
    arrow: classnames("-left-2"),
  },
});
