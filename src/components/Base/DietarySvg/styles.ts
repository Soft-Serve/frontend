import { classnames, TArg } from "tailwindcss-classnames";

const buildSvgStyles = (themeColour: string, themeTint: number, css?: TArg) => {
  const svgColor = `bg-${themeColour}-${themeTint}` as TArg;
  return classnames(
    "mx-1",
    "inline-block",
    "mb-1",
    "fill-current",
    svgColor,
    css,
    "text-white",
    "rounded-md",
    "h-6",
    "w-6"
  );
};

export { buildSvgStyles };
