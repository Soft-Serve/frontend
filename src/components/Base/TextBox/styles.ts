import { classnames, TArg } from "tailwindcss-classnames";

const label = classnames("block", "text-sm", "font-bold", "text-gray-900");

const input = classnames(
  "appearance-none",
  "shadow-sm",
  "focus:outline-none",
  "focus:bg-gray-100",
  "block",
  "w-full",
  "sm:text-sm",
  "my-2",
  "px-3",
  "py-2",
  "rounded-md"
);

const disabled = classnames(
  "appearance-none",
  "shadow-sm",
  "cursor-not-allowed",
  "block",
  "w-full",
  "sm:text-sm",
  "border-gray-100",
  "rounded-md",
  "my-2",
  "px-3",
  "py-2",
  "border-2",
  "border-gray-400",
  "bg-gray-100"
);

const buildThemeStyles = (colour: string, tint: number) => {
  const borderColour = `border-${colour}-${tint}` as TArg;
  return classnames(borderColour, "text-gray-900", "border-2");
};

const buildStyles = (isDisabled: boolean, themeColour: string, themeTint: number, css?: TArg) =>
  classnames(
    { [disabled]: isDisabled, [input]: !isDisabled },
    buildThemeStyles(themeColour, themeTint),
    css
  );

export { label, buildStyles };
