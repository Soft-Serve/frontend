import { generateThemeAccentColours, generateThemeColours } from "@utility";
import { classnames, TArg } from "tailwindcss-classnames";

const base = classnames(
  "inline",
  "border-transparent",
  "font-medium",
  "shadow-sm",
  "focus:outline-none",
  "h-full",
  "inline-flex",
  "items-center",
  "justify-center",
  "whitespace-nowrap",
  "rounded-md"
);

const fullWidth = classnames("w-full");

const transparant = classnames(
  "bg-transparent",
  "border-transparent",
  "hover:text-white",
  "text-gray-900",
  "shadow-md"
);

const naked = classnames(
  "bg-white",
  "hover:bg-red-300",
  "text-red-500",
  "hover:text-white",
  "rounded-none",
  "shadow-none"
);

const disabled = classnames("bg-gray-400", "text-white", "cursor-not-allowed", "rounded-md");

const XS = classnames("px-1.5", "py-0.5", "text-xs", "rounded");

const S = classnames("px-2.5", "py-1.5", "text-xs", "rounded");

const M = classnames("px-3", "py-2", "text-sm", "leading-4", "rounded-md");

const LG = classnames("px-4", "py-2", "text-sm", "rounded-md");

const XL = classnames("px-4", "py-2", "text-base", "rounded-md");

const XXL = classnames("px-6", "py-3", "text-base", "rounded-md");

type Colours = "naked" | "primary" | "accent" | "transparant" | undefined;

const getColours = (colours: Colours, themeColour: string, themeTint: number) => {
  if (colours === "naked") return naked;
  if (colours === "transparant") return transparant;
  if (colours === "primary") return generateThemeColours(themeColour, themeTint);
  if (colours === "accent") return generateThemeAccentColours(themeColour, themeTint);
  return null;
};

const SIZE_MAP = {
  XS,
  S,
  M,
  LG,
  XL,
  XXL,
};

type Sizes = keyof typeof SIZE_MAP;

const loadingStyles = (colour?: Colours) =>
  classnames("animate-spin", "h-5", "w-5", colour === "primary" ? "text-white" : "text-red-400");

const buildStyles = (
  themeColour: string,
  themeTint: number,
  size?: Sizes,
  colour?: Colours,
  isFullwidth?: boolean,
  isDisabled?: boolean,
  css?: TArg
) =>
  classnames(
    base,

    SIZE_MAP[size || "S"],
    getColours(colour, themeColour, themeTint),
    {
      [fullWidth]: isFullwidth,
      [disabled]: isDisabled,
    },
    css
  );

export type { Sizes, Colours };
export { buildStyles, SIZE_MAP, loadingStyles };
