import { classnames, TArg } from "tailwindcss-classnames";

const smallGap = classnames("gap-2");
const gap = classnames("gap-4");
const base = classnames("grid");
const XXL = classnames("sm:grid-cols-2", "md:grid-cols-4", "lg:grid-cols-6");
const XL = classnames("sm:grid-cols-2", "lg:grid-cols-4");
const LG = classnames("sm:grid-cols-2", "lg:grid-cols-3");
const M = classnames("lg:grid-cols-2", "md:grid-cols-2");
const SM = classnames("grid-cols-1");

const SIZE_MAP = {
  SM,
  M,
  LG,
  XL,
  XXL,
};

type SizeTypes = keyof typeof SIZE_MAP;

const buildStyles = (size: SizeTypes, mobileColumns?: number, isSmallGap?: boolean) => {
  const mobileStyles = `grid-cols-${mobileColumns || 1}` as TArg;
  return classnames(base, SIZE_MAP[size], mobileStyles, isSmallGap ? smallGap : gap);
};

export { buildStyles };
export type { SizeTypes };
