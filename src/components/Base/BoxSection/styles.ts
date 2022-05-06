import { classnames, TArg } from "tailwindcss-classnames";

const padding = classnames("py-6", "px-4", "sm:px-6", "lg:py-8", "lg:px-8");
export const container = classnames("flex-1", "max-h-screen", "z-30", "sticky", "top-0");
export const wrapper = (css?: TArg, withPadding?: boolean) =>
  classnames(
    "w-full",
    "mx-auto",
    {
      [padding]: withPadding,
    },
    css
  );
