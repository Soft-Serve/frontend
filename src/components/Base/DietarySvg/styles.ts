import { classnames, TArg } from "tailwindcss-classnames";

const buildSvgStyles = (themeColour: string, themeTint: number) => {
  const svgColor = `text-${themeColour}-${themeTint}` as TArg;
  return classnames("mx-1", "inline-block", "mb-1", "fill-current", svgColor);
};

export { buildSvgStyles };
