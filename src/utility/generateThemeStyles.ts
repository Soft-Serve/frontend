import { classnames } from "tailwindcss-classnames";
import type { TArg } from "tailwindcss-classnames";

const generateThemeColours = (colour: string, tint: number) => {
  const backgroundColour = `bg-${colour}-${tint}` as TArg;
  const hoverBackgroundColour = `hover:bg-${colour}-${tint + 100}` as TArg;
  const focusColour = `focus:ring-${colour}-${tint + 100}` as TArg;
  return classnames(backgroundColour, hoverBackgroundColour, focusColour, "text-white");
};

const generateThemeAccentColours = (colour: string, tint: number) => {
  const borderColour = `border-${colour}-${tint}` as TArg;
  const textColour = `text-${colour}-${tint}` as TArg;
  const hoverBackgroundColour = `hover:bg-${colour}-${tint}` as TArg;
  const hoverBorderColour = `hover:border-${colour}-${tint}` as TArg;
  return classnames(
    "bg-white",
    "hover:text-white",
    "border-2",
    borderColour,
    textColour,
    hoverBackgroundColour,
    hoverBorderColour
  );
};

export { generateThemeColours, generateThemeAccentColours };
