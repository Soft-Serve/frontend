import { classnames, TArg } from "tailwindcss-classnames";

const label = classnames("block", "text-sm", "font-medium", "text-gray-700");

const input = classnames(
  "py-2",
  "px-4",
  "block",
  "w-full",
  "shadow-md",
  "sm:text-sm",
  "border-2",
  "rounded-md",
  "mt-2"
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
  const focusColour = `focus:ring-${colour}-${tint + 100}` as TArg;
  const focusborderColour = `focus:border-${colour}-${tint + 100}` as TArg;
  const borderColour = `border-${colour}-${tint}` as TArg;

  return classnames(borderColour, focusColour, focusborderColour);
};

const buildStyles = (isDisabled: boolean, themeColour: string, themeTint: number, css?: TArg) => {
  return classnames(
    { [disabled]: isDisabled, [input]: !isDisabled },
    buildThemeStyles(themeColour, themeTint),
    css
  );
};

export { label, buildStyles };
