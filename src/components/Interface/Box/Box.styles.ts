import { classnames } from "tailwindcss-classnames";

export const root = classnames(
  "bg-white",
  "overflow-hidden",
  "rounded-lg",
  "shadow-lg",
  "mb-8",
  "relative"
);

export const padding = classnames("p-6");
export const reducedPadding = classnames("p-3");
export const noPadding = classnames("p-0");
export const noMargin = classnames("mb-0");
export const overflowVisible = classnames("overflow-visible");
export const fullscreen = classnames("w-full", "h-screen", "rounded-none");
export const fullHeight = classnames("h-full");
