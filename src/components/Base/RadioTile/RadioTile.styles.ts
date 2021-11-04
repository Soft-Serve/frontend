import { classnames, TArg } from "tailwindcss-classnames";

interface MappableObject {
  [key: string]: TArg;
}

const tile = {
  base: classnames(
    "relative",
    "block",
    "border-b",
    "shadow-md",
    "cursor-pointer",
    "flex",
    "justify-start",
    "items-center",
    "focus:outline-none"
  ),
  primary: classnames("bg-red-400", "text-white"),
  naked: classnames("bg-white"),
} as MappableObject;

const radioSizes = {
  SM: classnames("px-4", "py-2"),
  MED: classnames("px-6", "py-4"),
} as MappableObject;

type Size = keyof typeof radioSizes;
type Tiles = "primary" | "naked";

const buildStyles = (size: Size, type: Tiles, css?: TArg) => {
  return classnames(tile.base, radioSizes[size], tile[type], css);
};

const buildRadioCheckedStyles = (themeColour: string, themeTint: number) => {
  const style = `border-${themeColour}-${themeTint}` as TArg;
  return classnames(style, "rounded-md");
};

const radio = {
  base: classnames("absolute", "-inset-px", "border-2", "pointer-events-none"),
  unchecked: "border-transparent",
};

const buildRadioStyles = (isChecked: boolean, themeColour: string, themeTint: number) => {
  return classnames(radio.base, {
    [buildRadioCheckedStyles(themeColour, themeTint)]: isChecked,
    [radio.unchecked]: !isChecked,
  });
};

export { buildStyles, buildRadioStyles };
