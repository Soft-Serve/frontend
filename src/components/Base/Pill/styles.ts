import { classnames } from "tailwindcss-classnames";

const base = classnames(
  "flex-shrink-0",
  "inline-block",
  "font-medium",
  "rounded-full",
  "py-0.5",
  "m-2"
);

const success = classnames("bg-green-100", "text-green-800");

const error = classnames("bg-red-100", "text-red-800");

const warning = classnames("bg-yellow-100", "text-yellow-800");

const outline = classnames("bg-white", "border-2", "border-red-400", "text-red-400");

const SM = classnames("px-2", "text-xs");

const LG = classnames("px-3", "text-sm");

const XL = classnames("px-5", "text-base");

const COLOUR_MAP = {
  success,
  error,
  warning,
  outline,
};

const PILL_SIZES = {
  SM,
  LG,
  XL,
};

type COLOUR_TYPES = keyof typeof COLOUR_MAP | undefined;
type SIZE_TYPES = keyof typeof PILL_SIZES | undefined;

const buildStyles = (size: SIZE_TYPES, colour: COLOUR_TYPES) =>
  classnames(base, PILL_SIZES[size || "SM"], COLOUR_MAP[colour || "success"]);

export { buildStyles };
export type { COLOUR_TYPES, SIZE_TYPES };
