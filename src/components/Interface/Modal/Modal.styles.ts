import { classnames, TArg } from "tailwindcss-classnames";

export const dialog = classnames("fixed", "inset-0", "overflow-y-auto");
export const overlay = (colour: string, tint: number) => {
  const from = `from-${colour}-${tint}` as TArg;
  const to = `to-${colour}-${tint + 100}` as TArg;
  return classnames("fixed", "inset-0", "bg-gradient-to-b", from, to, "transition-opacity");
};
