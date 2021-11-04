import { classnames, TArg } from "tailwindcss-classnames";

const dropdown = {
  base: classnames("cursor-pointer", "select-none", "relative", "p-4", "text-sm"),
  isActive: classnames("text-white", "bg-red-400"),
  isNotActive: classnames("text-gray-900"),
};

const activeDropdownStyles = (themeColour: string, themeTint: number) => {
  const styles = `bg-${themeColour}-${themeTint}` as TArg;
  return classnames(styles, "text-white");
};

const buildStyles = (isActive: boolean, themeColour: string, themeTint: number) =>
  classnames(dropdown.base, {
    [activeDropdownStyles(themeColour, themeTint)]: isActive,
    [dropdown.isNotActive]: !isActive,
  });

export { buildStyles };
